import { switchMap, take } from 'rxjs/operators';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { AnimaisService } from './../animais.service';
import { Animais } from './../animais';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {
  constructor(
    private animaisService: AnimaisService,
    private usuarioService: UsuarioService,
  ) {}
  /** Este arquivo com ".resolver.ts" trata de executar suas instruções ao mesmo tempo que uma rota
   * encaminha o usuario para um conteudo de tela. Por esse motivo que este arquivo é invocado numa rota
   * path. No momento que a rota carrega, o path entra aqui e executa. Assim o carregamento de uma grande
   * quantidade de informações é feita de maneira rápida e eficiente. Este arquivo vai retornar um
   * Observable de Animais e vai guardar na variável do path. Em outro arquivo, essa variável vai ser
   * pêga com o ActivatedRoute e tratada para ser usada no html como lista. */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Animais> {
    return this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      }),
      /** A requisição se autocompleta, autofinaliza. O problema é que o "subject" do "retornaUsuario()" continua
      * aberto. Para resolver isso foi usado o "take(1)" para dizer à operaçao, que é para realizar apenas uma
      * vez e fechar o "subject" */
      take(1)
    );
  }
}
