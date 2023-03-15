import { LoginGuard } from './autenticacao/login.guard';
import { AutenticacaoGuard } from './autenticacao/autenticacao.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    /** Se alguém acessar a página inicial, logo depois de ter carregado o módulo, caso haja um login na
     * máquina, o este "canLoad" vai redirecionar automaticamente a página para a tela de animais na conta
     * de login do usuário, com todas as fotos de seus pets, se tiver. Isso porque o "[loginGuard]" vai
     * fazer a validação definida em seu arquivo antes. Se passar, aí sim. Para saber mais acesse o arquivo
     * "login.guard.ts" e "autenticacao.guard.ts"
     */
    canLoad: [LoginGuard],
  },
  {
    path: 'animais',
    loadChildren: () => import('./animais/animais.module').then((m) => m.AnimaisModule),
    /** Quando alguém tenta acessar o conteúdo de "animais" sem efetuar o login, caso não esteja logado,
     * o "canLoad: [autenticacaoGuard]" não vai permitir; exeto se já estiver logado. Para saber mais do
     * "canLoad", acesse o arquivo "autenticacao.guard.ts" e "login.guard.ts".
     */
    canLoad: [AutenticacaoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
