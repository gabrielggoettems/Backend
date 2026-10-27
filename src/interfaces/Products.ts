export interface ProdutoInterface {
    id: string;
    nome: string;
    categoria: string;
    Marca?: string;
    marca?: string;
    price: number;
    estoque?: number;
    imagem?: string;
    img?: string;
    detalhes: {
        [key: string]: string | number;
    };
}
