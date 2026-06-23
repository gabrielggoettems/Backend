export interface ProdutoInterface {
    id: string;
    nome: string;
    categoria: string;
    Marca: string;
    price: number;
    potencia: number;
    detalhes: {
        [key: string]: string | number;
    };
}