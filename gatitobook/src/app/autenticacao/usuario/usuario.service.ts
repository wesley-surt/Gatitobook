/** Tanto esse arquivo quanto o de token.service.ts são usados para manipular o token de tal maneira a
 * ponto de salvar, decodificar entre outras funcionalidades.
*/

import { Injectable } from '@angular/core';
import { TokenService } from '../token.service';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  /** O BehaviorSubject funciona como um Observable, porém, este, eu consigo alterar seu conteúdo e usar
   * muitas outras funcionalidades. Como, transmitir para todos os que chamam um subscribe a partir deste
   * um novo valor. Se altero em um lugar, altero em todos.
   */
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor( private tokenService: TokenService ) {
    if ( this.tokenService.possuiToken() ) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT(): void {
    const token = this.tokenService.retornaToken();
    const usuario = jwt_decode(token) as Usuario;
    this.usuarioSubject.next(usuario);
  }

  retornaUsuario() {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string): void {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout(): void {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }
}
