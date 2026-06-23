export interface Produto {
    id: string;
    nome: string;
    categoria: string;
    Marca: string;
    valor: number;
    detalhes: {
        [key: string]: string | number;
    };
}