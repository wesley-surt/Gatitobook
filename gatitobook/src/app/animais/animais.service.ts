import { environment } from './../../environments/environment';
import { TokenService } from './../autenticacao/token.service';
import { Animais, Animal } from './animais';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { mapTo } from 'rxjs/internal/operators/mapTo';

const API = environment.apiURL;
const NOT_MODIFIED = '304';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {
  constructor( private httpClient: HttpClient, private tokenService: TokenService ) {}
/** Esta requisição do tipo GET, para poder conseguir pegar os conteúdos referente ao usuário, o back end
 * exige o token do mesmo enviado através de um cabeçalho. O método "new HttpHeaders()" cria um objeto do
 * tipo cabeçalho. o "append()" vai adicionar dentro desse objeto criado, o nome do atributo no primeiro
 * parâmetro; no segundo parâmetro, o conteúdo do atributo, que neste caso, é o token.
 */
  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.httpClient.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscaPorId( id: number ): Observable<Animal> {
    return this.httpClient.get<Animal>(`${API}/photos/${id}`)
  }

  excluir( id: number ): Observable<Animal> {
    return this.httpClient.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir( id: number ): Observable<boolean> {
    /** "Curtir()" vai entrar no back pelo final "/likes" e faz uma requisição. Quando a requisição
     * chega ao servidor, eu não sei como acontece o processo de registrar o like, mas registra. Ao
     * registrar, a requisição vai enviar um "Observable" que pode conter um status de sucesso ou de erro.
     * Se retornar com êxito, o "mapTo()" vai retornar um Observable com o conteúdo que eu colocar em seu
     * parâmetro, que nesse caso é true. Se retornar com error o "catchError(() => {})" vai capturar esse
     * erro em seu parâmetro e executar as instruções seguintes. Essas instruções são de retornar o
     * resultado do operador ternário. O ternário verifica se o status da requisição/error é igual a 302. Se
     * for, vai retornar um Observable com o valor false ("of(false)"), se for qualquer outro tipo de erro
     * vai executar um throwError passando a mensagem do erro, que é "error".
     */
    return this.httpClient
      .post(`${API}/photos/${id}/likes`, {}, { observe: 'response' })
      .pipe(
        mapTo(true),
        catchError((error) => {
          return error.status === NOT_MODIFIED ? of(false) : throwError(error);
        })
      )
  }
/** Aqui o upload está pegando as informações inseridas pelo usuário, colocando tudo em um "new FormData",
 * que é um dos meio para subir uma imagem para o servidor, usando o POST para gravar no back. Depois do
 * corpo (formData) tem um objeto onde que, o "observe: events", vai observar cada evento realizado, ou
 * seja, os estados do upload da imagem, para manter o usuário informado do processo.
 * O "reportProgress: true" vai se encarregar de liberar o caminho para que os events observados sejam
 * visíveis (ou enviados) ao método que o implementar, chamar.
 */
  upload( descricao: string, permiteComentario: boolean, arquivo: File ) {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComment', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.httpClient.post(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    })
  }
}
