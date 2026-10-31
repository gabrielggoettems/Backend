-- public.tb_categoria definição

-- Drop table

-- DROP TABLE public.tb_categoria;

CREATE TABLE public.tb_categoria (
	cd_categoria int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	tx_nome varchar(60) NOT NULL,
	CONSTRAINT pk_categoria PRIMARY KEY (cd_categoria),
	CONSTRAINT uq_categoria_nome UNIQUE (tx_nome)
);


-- public.tb_imagem definição

-- Drop table

-- DROP TABLE public.tb_imagem;

CREATE TABLE public.tb_imagem (
	id_imagem int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	tx_caminho text NOT NULL,
	CONSTRAINT pk_imagem PRIMARY KEY (id_imagem)
);


-- public.tb_pagamentos definição

-- Drop table

-- DROP TABLE public.tb_pagamentos;

CREATE TABLE public.tb_pagamentos (
	id_pagamento int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	tx_query varchar(800) NULL,
	tx_forma varchar(255) NULL,
	valor_antes numeric(18, 2) NULL,
	valor_depois numeric(18, 2) NULL,
	data_modificacao timestamp NULL,
	CONSTRAINT tb_pagamentos_pkey PRIMARY KEY (id_pagamento)
);

-- Table Triggers

create trigger trg_pagamentos_antes before
insert
    or
update
    on
    public.tb_pagamentos for each row execute function pagamentos_antes();


-- public.tb_produto_catalogo definição

-- Drop table

-- DROP TABLE public.tb_produto_catalogo;

CREATE TABLE public.tb_produto_catalogo (
	cd_produto varchar(100) NOT NULL,
	tx_nome varchar(200) NOT NULL,
	tx_categoria varchar(100) NOT NULL,
	tx_marca varchar(120) NOT NULL,
	nr_preco numeric(12, 2) NOT NULL,
	nr_estoque int4 DEFAULT 0 NOT NULL,
	tx_imagem text NULL,
	tx_detalhes jsonb DEFAULT '{}'::jsonb NOT NULL,
	CONSTRAINT tb_produto_catalogo_nr_estoque_check CHECK ((nr_estoque >= 0)),
	CONSTRAINT tb_produto_catalogo_nr_preco_check CHECK ((nr_preco > (0)::numeric)),
	CONSTRAINT tb_produto_catalogo_pkey PRIMARY KEY (cd_produto)
);

-- public.tb_tipousuario definição

-- Drop table

-- DROP TABLE public.tb_tipousuario;

CREATE TABLE public.tb_tipousuario (
	id_tipousuario int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	tx_tipo varchar(30) NOT NULL,
	CONSTRAINT pk_tipousuario PRIMARY KEY (id_tipousuario),
	CONSTRAINT uq_tipousuario_tipo UNIQUE (tx_tipo)
);


-- public.tb_produto definição

-- Drop table

-- DROP TABLE public.tb_produto;

CREATE TABLE public.tb_produto (
	id_produto int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	tx_nome varchar(120) NOT NULL,
	tx_marca varchar(60) NOT NULL,
	nr_preco numeric(10, 2) NOT NULL,
	nr_estoque int4 DEFAULT 0 NOT NULL,
	cd_categoria int4 NOT NULL,
	cd_img int4 NULL,
	CONSTRAINT ck_produto_estoque CHECK ((nr_estoque >= 0)),
	CONSTRAINT ck_produto_preco CHECK ((nr_preco >= (0)::numeric)),
	CONSTRAINT pk_produto PRIMARY KEY (id_produto),
	CONSTRAINT fk_produto_categoria FOREIGN KEY (cd_categoria) REFERENCES public.tb_categoria(cd_categoria),
	CONSTRAINT fk_produto_imagem FOREIGN KEY (cd_img) REFERENCES public.tb_imagem(id_imagem)
);


-- public.tb_usuario definição

-- Drop table

-- DROP TABLE public.tb_usuario;

CREATE TABLE public.tb_usuario (
	cd_usuario int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	tx_nome varchar(100) NOT NULL,
	tx_email varchar(255) NOT NULL,
	tx_senha text NOT NULL,
	tx_telefone varchar(20) NOT NULL,
	dt_datanascimento date NOT NULL,
	cd_tipousuario int4 NOT NULL,
	cd_status int2 DEFAULT 1 NOT NULL,
	CONSTRAINT ck_usuario_data_nascimento CHECK ((dt_datanascimento <= CURRENT_DATE)),
	CONSTRAINT ck_usuario_email_formato CHECK (((tx_email)::text ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'::text)),
	CONSTRAINT ck_usuario_senha_hash CHECK ((char_length(tx_senha) >= 60)),
	CONSTRAINT ck_usuario_status CHECK ((cd_status = ANY (ARRAY[0, 1]))),
	CONSTRAINT pk_usuario PRIMARY KEY (cd_usuario),
	CONSTRAINT uq_usuario_email UNIQUE (tx_email),
	CONSTRAINT uq_usuario_nome UNIQUE (tx_nome),
	CONSTRAINT fk_usuario_tipousuario FOREIGN KEY (cd_tipousuario) REFERENCES public.tb_tipousuario(id_tipousuario)
);


-- public.tb_compra definição

-- Drop table

-- DROP TABLE public.tb_compra;

CREATE TABLE public.tb_compra (
	id_compra int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	cd_usuario int4 NOT NULL,
	id_produto int4 NOT NULL,
	dt_datacompra timestamptz DEFAULT now() NOT NULL,
	nr_valor numeric(10, 2) NOT NULL,
	CONSTRAINT ck_compra_valor CHECK ((nr_valor >= (0)::numeric)),
	CONSTRAINT pk_compra PRIMARY KEY (id_compra),
	CONSTRAINT fk_compra_produto FOREIGN KEY (id_produto) REFERENCES public.tb_produto(id_produto),
	CONSTRAINT fk_compra_usuario FOREIGN KEY (cd_usuario) REFERENCES public.tb_usuario(cd_usuario)
);
