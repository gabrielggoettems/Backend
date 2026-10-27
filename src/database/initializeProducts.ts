import { bancoDados } from "./pool";

const produtosIniciais = [
  {
    codigo: "rtx-4060",
    nome: "NVIDIA GeForce RTX 4060",
    categoria: "gpu",
    marca: "NVIDIA",
    preco: 2199.9,
    estoque: 10,
    imagem: null,
    detalhes: { memoria: "8 GB GDDR6", interface: "PCIe 4.0" },
  },
  {
    codigo: "ryzen-5-7600",
    nome: "AMD Ryzen 5 7600",
    categoria: "cpu",
    marca: "AMD",
    preco: 1299.9,
    estoque: 12,
    imagem: "https://www.amd.com/system/files/2023-05/ryzen-5-7600-600x600.png",
    detalhes: { nucleos: 6, threads: 12, socket: "AM5" },
  },
  {
    codigo: "kingston-fury-16",
    nome: "Kingston Fury 16 GB DDR5",
    categoria: "ram",
    marca: "Kingston",
    preco: 349.9,
    estoque: 20,
    imagem: null,
    detalhes: { capacidade: "16 GB", frequencia: "5600 MHz" },
  },
  {
    codigo: "ssd-nvme-1tb",
    nome: "SSD NVMe 1 TB",
    categoria: "storage",
    marca: "Kingston",
    preco: 429.9,
    estoque: 15,
    imagem: null,
    detalhes: { capacidade: "1 TB", leitura: "3500 MB/s" },
  },
  {
    codigo: "fonte-650w",
    nome: "Fonte 650 W 80 Plus Bronze",
    categoria: "psu",
    marca: "Corsair",
    preco: 399.9,
    estoque: 8,
    imagem: null,
    detalhes: { potencia: "650 W", certificacao: "80 Plus Bronze" },
  },
  {
    codigo: "b650m",
    nome: "Placa-mãe B650M",
    categoria: "motherboard",
    marca: "Gigabyte",
    preco: 899.9,
    estoque: 6,
    imagem: null,
    detalhes: { socket: "AM5", memoria: "DDR5" },
  },
  {
    codigo: "g502-hero",
    nome: "Logitech G502 HERO",
    categoria: "mouse",
    marca: "Logitech",
    preco: 249.9,
    estoque: 18,
    imagem: null,
    detalhes: { dpi: "25600 DPI", conexao: "USB" },
  },
];

export async function initializeProducts() {
  await bancoDados.query(`
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
  `);

  await bancoDados.query(
    `insert into tb_produto
      (cd_produto, tx_nome, tx_categoria, tx_marca, nr_preco, nr_estoque, tx_imagem, tx_detalhes)
     values ${produtosIniciais.map((_, index) => {
       const offset = index * 8;
       return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, $${offset + 6}, $${offset + 7}, $${offset + 8})`;
     }).join(", ")}
     on conflict (cd_produto) do nothing;`,
    produtosIniciais.flatMap((produto) => [
      produto.codigo,
      produto.nome,
      produto.categoria,
      produto.marca,
      produto.preco,
      produto.estoque,
      produto.imagem,
      JSON.stringify(produto.detalhes),
    ]),
  );
}
