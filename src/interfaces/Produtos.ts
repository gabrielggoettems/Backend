export interface ProdutoInterface {
    id: string;
    nome: string;
    categoria: string;
    Marca: string;
    price: number;
    detalhes: {
        [key: string]: string | number;
    };
}