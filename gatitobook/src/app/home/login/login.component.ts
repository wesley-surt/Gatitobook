import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = '';
  senha = '';
  // Criei essa variável para validar o erro retornado da requisição, que significa que o login não existe
  // no banco de dados ou usuario e senha está errado. É basicamente uma variável de validação.
  loginInvalido = false;

  constructor( private autService: AutenticacaoService, private router: Router ) {}

  login() {
    this.autService.autenticar(this.usuario, this.senha)
    .subscribe(() => {
      this.router.navigate(['animal']);
    },
    ((error) => {
      this.loginInvalido = true;
      console.log(error);
    }));
  }
}
