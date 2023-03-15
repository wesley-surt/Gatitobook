import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
    ) {}
/** É bem estranho, mas neste método "autenticacao", o tutor usa o método "POST" para fazer uma requisição,
 * em que ela verifica se o objeto enviado está ou não no back-end; sendo que, o "POST", até onde eu sei,
 * é usado para postar, escrever e/ou salvar uma informação no back-end; e não para verificar. Ao que
 * me parece, o post sendo usado dessa forma, ele envia o objeto com nome de usuario e senha, e confere se
 * o mesmo está no banco de dados. Caso esteja, ou não, retorna um valor em boolean.
 */
  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    /** Por padrão a requisição busca apenas o corpo (body). Se queiser o cabeçalho da também, preciso
     * informar a requisição disso. O primeiro passo é trocar a tipagem do retorno do método autenticar
     * ": Observable<any>" por ": Observable<HttpResponse<any>>", para indicar que a resposta que espero
     * deve conter a requisição toda, e não a penas o corpo. Depois, adiciono o terceiro parâmetro,
     * conhecido como "Options". Ele é um objeto também e contém em seu interior um atributo "observe:"
     * com o seu valor em string, cujo nome expecifica o tipo de resposta que espero que venha dentro do
     * Objesvable, que, neste caso, é a requisição por completo, a response. Feito tudo isso uso o ".pipe"
     * para manipular o Observable. Em casos que não quero trocar o fluxo dos Observables, só quero
     * executar uma função, uso o ".tap(() => {})". Ele vai receber a "response" como parâmetro da
     * aeroFunction, e executá-la dentro das chaves. É nesse momento que guardo o retorno de ".headers"
     * acessando um campo do cabeçalho, que é o token codificado; para só então, chamar a função que
     * salva e decodifica o token.
     */
    return this.httpClient.post('http://localhost:3000/user/login', {
      userName: usuario,
      password: senha
    }, { observe: 'response'}).pipe(
      tap((res) => {
        const authToken = res.headers.get('x-access-token') ?? '';
        this.usuarioService.salvaToken(authToken);
        console.log('autenticado');
        console.log(authToken);
        console.log(this.usuarioService.retornaUsuario());
      })
    );
  }
}
