export type Product = {
  id: string;
  nome: string;
  categoria: "cpu" | "gpu" | "ram" | "motherboard" | "storage" | "psu" | "case";
  marca: string;
  preço: number;
  imagem: string;
  especificações: {
    [key: string]: string | number;
  };
};