-- Execute no PostgreSQL do EasyPC antes de iniciar o cadastro de produtos.
create table if not exists tb_produto (
  cd_produto varchar(100) primary key,
  tx_nome varchar(200) not null,
  tx_categoria varchar(100) not null,
  tx_marca varchar(120) not null,
  nr_preco numeric(12, 2) not null check (nr_preco > 0),
  nr_estoque integer not null default 0 check (nr_estoque >= 0),
  tx_imagem text,
  tx_detalhes jsonb not null default '{}'::jsonb
);
