export const produtosMock = [
  { codigo: 1, nome: "Mouse", valor: 150 },
  { codigo: 2, nome: "Teclado", valor: 400 },
  { codigo: 3, nome: "Monitor", valor: 900 },
  { codigo: 4, nome: "Placa de video", valor: 2500 },
  { codigo: 5, nome: "placa mãe", valor: 1000 },
  { codigo: 6, nome: "Processador", valor: 1299 },
  { codigo: 7, nome: "Ram", valor: 800 },
  { codigo: 8, nome: "Ssd", valor: 600 },
  { codigo: 9, nome: "Gabinete", valor: 400 }
];




export const products: Product[] = [
  {
    id: "rtx-4060",
    name: "NVIDIA GeForce RTX 4060",
    category: "gpu",
    brand: "NVIDIA",
    price: 2199.9,
    image: image("GPU", "#2563eb"),
    specs: {
      memoria: "8 GB GDDR6",
      interface: "PCIe 4.0",
    },
  },
  {
    id: "ryzen-5-7600",
    name: "AMD Ryzen 5 7600",
    category: "cpu",
    brand: "AMD",
    price: 1299.9,
    image: image("CPU", "#dc2626"),
    specs: {
      nucleos: 6,
      threads: 12,
      socket: "AM5",
    },
  },
  {
    id: "kingston-fury-16",
    name: "Kingston Fury 16 GB DDR5",
    category: "ram",
    brand: "Kingston",
    price: 349.9,
    image: image("RAM", "#16a34a"),
    specs: {
      capacidade: "16 GB",
      frequencia: "5600 MHz",
    },  },
  {
    id: "ssd-nvme-1tb",
    name: "SSD NVMe 1 TB",
    category: "storage",
    brand: "Kingston",
    price: 429.9,
    image: image("SSD", "#0891b2"),
    specs: {
      capacidade: "1 TB",
      leitura: "3500 MB/s",
    },
  },
  {
    id: "fonte-650w",
    name: "Fonte 650 W 80 Plus Bronze",
    category: "psu",
    brand: "Corsair",
    price: 399.9,
    image: image("PSU", "#ca8a04"),
    specs: {
      potencia: "650 W",
      certificacao: "80 Plus Bronze",
    },
  },
  {
    id: "b650m",
    name: "Placa-mae B650M",
    category: "motherboard",
    brand: "Gigabyte",
    price: 899.9,
    image: image("MB", "#7c3aed"),
    specs: {
      socket: "AM5",
      memoria: "DDR5",
    },
  },
];