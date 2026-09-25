export interface IUser {
  id_usuario: number;
  tx_nome: string;
  tx_email: string;
  tx_senha: string;
  dt_datanascimento: Date | string | null;
  tx_telefone: string;
  cd_tipousuario: number | null;
  genero?: string | null;
}