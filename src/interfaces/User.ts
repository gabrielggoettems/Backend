import {IEntidade} from '../repository/RepositoryBase';

export interface IUser extends IEntidade {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: Date;
  Telefone: string;
}