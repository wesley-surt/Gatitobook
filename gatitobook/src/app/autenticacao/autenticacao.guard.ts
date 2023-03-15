import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoGuard implements CanLoad {

  /** Toda essa construção da classe já vem pronta após criar este "guard". A única alteração feita por mim
   * foi o "if () {}". Esta classe é um guarda de rota. Ele vai verificar se o usuário já está logado.
   *  Se não estiver, vai redirecionar para a página de login novamente, caso tente acessar a página de
   * animais sem antes fazer login. Este guard vai guardar a rota animais.
   * Só terá acesso se por acaso já estiver logado. Caso contrário, terá que entrar com usuário e senha.
   * Para saber mais da estrutura que é preciso para que funcione no "path", é só acessar o arquivo
   * app-routing.module.ts. Este guard tem uma especificação que é "canLoad", pelos fatos dos carregamentos
   * dos dos conteúdos serem feitos via Lazze Load.
   */

  constructor( private usuarioService: UsuarioService, private router: Router ) {}

  canLoad( route: Route, segments: UrlSegment[] ):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree {
    if (!this.usuarioService.estaLogado()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
