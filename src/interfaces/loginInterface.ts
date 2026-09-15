export interface LoginInterface {
    user: string;
    senha: string;
   
}

export interface RetornoInterface extends LoginInterface {
    sucesso: boolean;
    mensagem: string;
    token?: string;
}