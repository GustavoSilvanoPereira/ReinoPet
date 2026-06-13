-- Script de Configuração do Banco de Dados - Reino Pet
-- Execute este script no SQL Editor do seu projeto Supabase.

-- 1. Criar Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL,
  preco NUMERIC(10, 2) NOT NULL,
  imagem TEXT,
  estoque INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Configurar Políticas de Segurança (Row Level Security - RLS)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Política para permitir que qualquer pessoa consulte os produtos (leitura pública)
DROP POLICY IF EXISTS "Permitir leitura publica de produtos" ON produtos;
CREATE POLICY "Permitir leitura publica de produtos" ON produtos
  FOR SELECT USING (true);

-- 3. Popular Banco de Dados (SEED) com 12 produtos
TRUNCATE TABLE produtos;

INSERT INTO produtos (nome, descricao, categoria, preco, imagem, estoque) VALUES
-- Rações
('Ração Golden Special Cães Adultos - Frango & Carne (15kg)', 
 'Nutrição completa e balanceada para cães adultos, desenvolvida com ingredientes selecionados, sem corantes e aromatizantes artificiais.', 
 'racoes', 
 169.90, 
 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&auto=format&fit=crop&q=80', 
 20),

('Ração Premier Cães Adultos Raças Pequenas - Frango & Salmão (12kg)', 
 'Alimento super premium indicado para cães adultos de pequeno porte. Grãos em tamanho ideal para facilitar a mastigação.', 
 'racoes', 
 219.90, 
 'https://images.unsplash.com/photo-1608454367599-c11394f0e0df?w=600&auto=format&fit=crop&q=80', 
 15),

('Ração Royal Canin Golden Retriever Adulto (12kg)', 
 'Alimento super premium completo sob medida para cães da raça Golden Retriever a partir dos 15 meses de idade. Auxilia na saúde cardíaca.', 
 'racoes', 
 389.90, 
 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80', 
 8),

('Ração GranPlus Choice Cães Adultos - Ovelha & Arroz (15kg)', 
 'Alimento de alta qualidade que proporciona aos cães adultos todos os nutrientes necessários para uma vida saudável e ativa.', 
 'racoes', 
 149.90, 
 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=600&auto=format&fit=crop&q=80', 
 25),

-- Acessórios
('Coleira Ajustável Premium Refletiva - Preta', 
 'Coleira de nylon de alta resistência com costura refletiva para dar segurança máxima ao seu cão em passeios noturnos.', 
 'acessorios', 
 39.90, 
 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80', 
 50),

('Guia Retrátil para Cães Premium - 5 metros', 
 'Cabo de fita super resistente com sistema de freio inteligente e gatilho ergonômico para um passeio livre e seguro.', 
 'acessorios', 
 79.90, 
 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&auto=format&fit=crop&q=80', 
 30),

('Cama Pet Nuvem Ortopédica Luxo - Tamanho G', 
 'Confeccionada com material ultra macio em formato circular com bordas elevadas que aliviam dores articulares e estresse.', 
 'acessorios', 
 189.90, 
 'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?w=600&auto=format&fit=crop&q=80', 
 12),

('Comedouro Elevado Ergonômico de Inox & Madeira', 
 'Suporte elevado em bambu com tigela de inox. Melhora a digestão e reduz a tensão no pescoço e articulações do pet.', 
 'acessorios', 
 119.90, 
 'https://images.unsplash.com/photo-1615678815958-5910c6811c25?w=600&auto=format&fit=crop&q=80', 
 18),

-- Banho e Tosa
('Shampoo Neutro Hipoalergênico Pet - 500ml', 
 'Formulado com ativos naturais como camomila e aloe vera. Limpa suavemente a pelagem respeitando o pH natural da pele do pet.', 
 'banho-e-tosa', 
 42.90, 
 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80', 
 40),

('Condicionador Hidratante Pet Camomila - 500ml', 
 'Promove brilho e maciez intensa. Facilita o desembaraço de nós e deixa um perfume suave e agradável após o banho.', 
 'banho-e-tosa', 
 45.90, 
 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&auto=format&fit=crop&q=80', 
 35),

('Escova Rasqueadeira de Cerdas Macias Autolimpante', 
 'Remove pelos mortos e sujeira com cerdas em ângulo de proteção. Mecanismo traseiro ejeta os pelos de forma fácil.', 
 'banho-e-tosa', 
 54.90, 
 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80', 
 22),

('Cortador de Unhas Pet Profissional com Trava', 
 'Lâminas afiadas de aço inox com limitador de segurança e trava de fechamento para evitar cortes profundos e acidentes.', 
 'banho-e-tosa', 
 34.90, 
 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&auto=format&fit=crop&q=80', 
 15);


-- 4. Criar Funções PostgreSQL

-- Listar todos os produtos
CREATE OR REPLACE FUNCTION listar_produtos()
RETURNS SETOF produtos AS $$
BEGIN
  RETURN QUERY SELECT * FROM produtos ORDER BY created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Buscar produtos por termo de pesquisa no nome ou descrição
CREATE OR REPLACE FUNCTION buscar_produtos(termo_pesquisa TEXT)
RETURNS SETOF produtos AS $$
BEGIN
  RETURN QUERY SELECT * FROM produtos 
  WHERE nome ILIKE '%' || termo_pesquisa || '%' 
     OR descricao ILIKE '%' || termo_pesquisa || '%';
END;
$$ LANGUAGE plpgsql;

-- Filtrar produtos por categoria
CREATE OR REPLACE FUNCTION filtrar_por_categoria(cat TEXT)
RETURNS SETOF produtos AS $$
BEGIN
  RETURN QUERY SELECT * FROM produtos WHERE categoria = cat;
END;
$$ LANGUAGE plpgsql;

-- Buscar produto individual por ID
CREATE OR REPLACE FUNCTION buscar_produto_por_id(prod_id UUID)
RETURNS SETOF produtos AS $$
BEGIN
  RETURN QUERY SELECT * FROM produtos WHERE id = prod_id;
END;
$$ LANGUAGE plpgsql;
