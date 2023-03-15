import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {
/** Esta classe é criada para interceptar pontos de alguma execução. Antes mesmo dessa execução iniciar,
 * esta classe intercepta, parando o processo, fazendo o que tem que fazer no método "intercept()", e
 * terminado, retorna a execução daquilo que ela parou para o ponto de onde estava. Neste contexto, estou
 * interceptando uma requisição http request para alterar o cabeçalho do mesmo. Antes que saia da aplicação
 * ára o servidor, o cabeçalho é alterado. O parâmetro "request" é a requisição que está para ser enviada
 * ao servidor. O "next" serve para dar continuidade depois que as alterações no intercept() terminar.
 * O parâmetro "request" não pode ser alterado, por isso, para acrescentar um objeto em seu cabeçalho, é
 * usado o método ".clone". Assim, savalmos dentro dele um clone alterado. O "return next.handle(request);"
 * dá continuidade no processo de enviar para o servidor a requisição. Sendo assim, toda requisição que
 * for feita ao servidor, será capturada e alterada. Assim evita ter que montar um cabeçalho toda vez.
 */
  constructor( private tokenService: TokenService ) {}

  intercept(
    request: HttpRequest<unknown>, next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
    if ( this.tokenService.possuiToken() ) {
      const token = this.tokenService.retornaToken();
      const headers = new HttpHeaders().append('x-access-token', token);
      request = request.clone({ headers });
    }
    return next.handle(request);
  }
}
/** Tudo pronto! Agora basta adicionar no módulo do autenticacao, mais precisamente, no "providers: []",
 * um objeto registrando meu interceptor. Para saber como ele deve ficar acesse o arquivo
 * autenticacao.module.ts. Depois, importar com o "imports: []" do "@ngModule() {}", na raiz do projeto;
 * ou seja, no app.module.ts o módulo de autenticacao. Isso, se o interesse for interceptar as requisições
 * de qualquer parte do projeto. Caso não seja esse o caso, terá que ser avaliado a situação por, e tratar
 * por rotas (ou módulos, não sei ao certo), as interceptações. */
