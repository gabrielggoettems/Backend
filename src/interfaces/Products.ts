export interface ProdutoInterface {
    img?: string;
    id: string;
    nome: string;
    categoria: string;
    Marca: string;
    price: number;
    img?: string;
    detalhes: {
        [key: string]: string | number;
    };
}