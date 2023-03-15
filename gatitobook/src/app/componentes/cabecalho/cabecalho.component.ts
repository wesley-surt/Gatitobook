import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {
  /** O retorno deste método .retornaUruario() é em forma de observable. Uma forma de capturar apenas o
   * conteúdo que me interessa e guardar em uma variável, no template, é usando o "pipe async" 
   * ( user$ | async as user ). Dessa forma eu consigo usar em qualquer lugar do meu template em que a 
   * tag onde ela está cubra. É importante que o nome dos atributos do back estejam de a cordo com os
   * atributos das interfaces que monto.
   */
  user$ = this.usuarioService.retornaUsuario();

  constructor( private usuarioService: UsuarioService, private router: Router ) {}

  logout() {
    this.usuarioService.logout();
    this.router.navigate(['']);
  }
}
