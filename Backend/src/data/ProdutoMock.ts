import { ProdutoInterface } from "../interfaces/Produtos";

export const produtos: ProdutoInterface[] =[
  {
    id: "rtx-4060",
    nome: "NVIDIA GeForce RTX 4060",
    categoria: "gpu",
    Marca: "NVIDIA",
    price: 2199.9,
    potencia:80,
    detalhes: {
      memoria: "8 GB GDDR6",
      interface: "PCIe 4.0",
    },
  },
  {
    id: "ryzen-5-7600",
    nome: "AMD Ryzen 5 7600",
    categoria: "cpu",
    Marca: "AMD",
    price: 1299.9,
    potencia:70,
    detalhes: {
      nucleos: 6,
      threads: 12,
      socket: "AM5",
    },
  },
  {
    id: "kingston-fury-16",
    nome : "Kingston Fury 16 GB DDR5",
    categoria: "ram",
    Marca: "Kingston",
    price: 349.9,
    potencia:90,
    detalhes: {
      capacidade: "16 GB",
      frequencia: "5600 MHz",
    },  },
  {
    id: "ssd-nvme-1tb",
    nome: "SSD NVMe 1 TB",
    categoria: "storage",
    Marca: "Kingston",
    price: 429.9,
    potencia:80,
    detalhes: {
      capacidade: "1 TB",
      leitura: "3500 MB/s",
    },
  },
  {
    id: "fonte-650w",
    nome: "Fonte 650 W 80 Plus Bronze",
    categoria: "psu",
    Marca: "Corsair",
    price: 399.9,
    potencia:60,
    detalhes: {
      potencia: "650 W",
      certificacao: "80 Plus Bronze",
    },
  },
  {
    id: "b650m",
    nome: "Placa-mae B650M",
    categoria: "motherboard",
    Marca: "Gigabyte",
    price: 899.9,
    potencia:70,
    detalhes: {
      socket: "AM5",
      memoria: "DDR5",
    },
  },
];