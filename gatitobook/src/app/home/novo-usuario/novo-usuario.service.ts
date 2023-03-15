import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/** Esta classe vai servir de conecção com o back-end */
@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(private http: HttpClient) { }

  cadastrarNovoUsuario(novoUsuario: NovoUsuario) {
    return this.http.post('http://localhost:3000/user/signup', novoUsuario);
  }
/** A logica para verificar se o usuário já existe está em um arquivo separado para não misturar o service
 * que faz a conexão com o back com o service com a lógica da regra de negócio. Ele está no arquivo
 * usuario-existe.service.ts, dentro da pasta "novo-usuario".
*/
  verificaUsuarioExistente(nomeUsuario: string) {
    return this.http.get(`http://localhost:3000/user/exists/${nomeUsuario}`);
  }
}
