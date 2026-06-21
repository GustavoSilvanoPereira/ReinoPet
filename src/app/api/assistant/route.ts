import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/supabase';
import { GoogleGenAI, Type } from '@google/genai';

// Instância do cliente Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { description } = await request.json();

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'A descrição do pet é obrigatória.' },
        { status: 400 }
      );
    }

    // 1. Obter todos os produtos disponíveis
    const products = await getProducts();
    
    // Filtramos produtos em estoque para recomendar apenas o que pode ser comprado
    const availableProducts = products.filter(p => p.in_stock);

    // Simplificamos o formato do catálogo para enviar à IA (reduzir tokens e focar no essencial)
    const catalogForAI = availableProducts.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      price: p.price
    }));

    // 2. Definir o Schema de saída esperado
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        recommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              productId: {
                type: Type.STRING,
                description: 'O ID do produto recomendado.'
              },
              justification: {
                type: Type.STRING,
                description: 'Uma justificativa amigável e persuasiva explicando por que este produto é ideal para o pet descrito.'
              }
            },
            required: ['productId', 'justification']
          },
          description: 'Lista de 2 a 4 recomendações de produtos baseadas na descrição do pet.'
        }
      },
      required: ['recommendations']
    };

    // 3. Chamar a API do Gemini
    const systemInstruction = `Você é um Assistente Pet especializado e atencioso de uma loja chamada "Reino Pet".
Seu objetivo é ler a descrição do pet do usuário e recomendar de 2 a 4 produtos ou serviços perfeitos para ele.

Catálogo de Produtos Disponíveis (JSON):
${JSON.stringify(catalogForAI)}

Regras:
- Analise a descrição do pet (idade, porte, características especiais como pele sensível, necessidades).
- Escolha produtos do catálogo fornecido que se alinhem perfeitamente a essas necessidades.
- Recomende sempre com base no ID exato do produto.
- Escreva uma justificativa curta (1 ou 2 frases), calorosa e convincente do porquê esse produto vai ajudar o pet. Use um tom empático e profissional de veterinário/especialista.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: description,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const textOutput = response.text;
    
    if (!textOutput) {
      throw new Error('Resposta vazia da IA.');
    }

    const parsedData = JSON.parse(textOutput);

    // 4. Cruzar dados da IA com os dados completos do produto
    const finalRecommendations = parsedData.recommendations.map((rec: any) => {
      const fullProduct = products.find(p => p.id === rec.productId);
      return {
        product: fullProduct,
        justification: rec.justification
      };
    }).filter((rec: any) => rec.product !== undefined); // Remove se a IA recomendou um ID inválido

    return NextResponse.json({ recommendations: finalRecommendations });

  } catch (error: any) {
    console.error('Erro no Assistente Pet:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao processar sua solicitação.', details: error.message },
      { status: 500 }
    );
  }
}
