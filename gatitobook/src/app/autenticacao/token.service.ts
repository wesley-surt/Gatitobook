// Comando para instalar o pacute para auciliar no serviço de token: npm i jwt-decode.
import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  retornaToken() {
    return localStorage.getItem(KEY) ?? '';
  }

  salvaToken( token: string ) {
    localStorage.setItem(KEY, token);
  }

  excluiToken() {
    localStorage.removeItem(KEY);
  }

  possuiToken() {
    /** As duas exclamações (!!) transforma a execução seguinte num valor boolean. Se retornar um valor
    * normalmente, vai converter em true. Senão, retornará false.
    */
    return !! this.retornaToken();
  }
}
