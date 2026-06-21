# Reino Pet 🐾

🚀 **Aplicação em Produção:** [https://reinopet.vercel.app/](https://reinopet.vercel.app/)

## Descrição
O **Reino Pet** é um e-commerce moderno e completo voltado para o bem-estar animal. O sistema permite que os usuários naveguem por um catálogo de rações, acessórios e serviços de banho e tosa. O grande diferencial da plataforma é o **Assistente de IA**, que analisa a descrição do animal (raça, idade, necessidades especiais) e recomenda os produtos mais adequados do catálogo, justificando as escolhas de forma empática e especializada.

## Tecnologias Utilizadas
- **Frontend & Backend**: [Next.js](https://nextjs.org/) (App Router) e React
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/) com design responsivo e `lucide-react` para ícones
- **Banco de Dados**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Inteligência Artificial**: API do [Google Gemini](https://ai.google.dev/) (Substituindo a OpenAI por maior velocidade e eficiência de tokens)
- **Linguagem**: TypeScript

## Instalação e Execução Local

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/ReinoPet.git
   cd ReinoPet
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Copie o arquivo de exemplo para criar o seu próprio `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Abra o `.env.local` e preencha com as suas chaves.*

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:3000` no seu navegador.

## Configuração do Supabase

1. Crie uma conta e um projeto no [Supabase](https://supabase.com).
2. Acesse o menu **SQL Editor** no painel do seu projeto.
3. Copie o conteúdo do arquivo `supabase_setup.sql` (encontrado na raiz deste projeto) e execute-o. Isso criará a tabela `produtos`, populará com o catálogo inicial, configurará as políticas de segurança (RLS) e criará as funções de busca.
4. Vá em **Project Settings > API** e copie a **Project URL** e a **Publishable Key (anon)**.
5. Cole esses valores no seu arquivo `.env.local`.

## Configuração da Inteligência Artificial (Gemini / OpenAI)

*Nota: O projeto foi projetado para integrar IA. Utilizamos o Google Gemini (modelo `gemini-2.5-flash`) via SDK `@google/genai` por ser extremamente rápido e gerar respostas estruturadas (JSON) de alta qualidade para as recomendações.*

1. Acesse o [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Gere uma nova chave de API.
3. Adicione a chave no arquivo `.env.local` na variável `GEMINI_API_KEY`.

## Deploy na Vercel

1. Crie uma conta na [Vercel](https://vercel.com/) e vincule ao seu GitHub.
2. Clique em **"Add New..." > "Project"** e importe o repositório do Reino Pet.
3. Na seção **Environment Variables** (Variáveis de Ambiente), adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
4. Clique em **Deploy**.
5. Em poucos minutos, a Vercel fornecerá a URL pública de produção do seu site!
