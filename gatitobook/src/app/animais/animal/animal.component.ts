import { environment } from './../../../environments/environment';
import { Component, Input } from '@angular/core';

const API = environment.apiURL;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent {
  private urlOriginal = '';
// descricao vai receber seu valor de fora, inputado.
  @Input() descricao = '';
/** url() vai receber seu valor de fora, porém, deve ser atribuido por meio de um acessor set, porque há
 * uma verificação da url que está pra chegar que não pode deixar de ser feita. Qualquer outro método
 * criado, nesta classe ou em outra, não poderá executar qualquer modificação à este acessor. sobrescritas
 * ou polimorfismos não serão aceitos. Essa verificação que é feita não pode deixar de ser feita nem sofrer
 * alterações. Na parte onde tem "url.startsWith('valor')", verifica se "url" começa com o valor "data".
 * Se começar com esse valor, quer dizer que a url é interna e pode sser feita a requisição tranquilamente.
 * Caso contrário, sua composição precisará sofrer as alterações (this.urlOriginal = `${API}/img/${url}`;)
 * para que a busca ao servidor seja feita com sucesso.
 */
  @Input() set url(url: string) {
    if (url.startsWith('data')) {
      this.urlOriginal = url;
    } else {
      this.urlOriginal = `${API}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urlOriginal;
  }
}
