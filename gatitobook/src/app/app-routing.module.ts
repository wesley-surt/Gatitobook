import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Aqui, o tutor separa as rotas por questão de praticidade. O modulo home possui sua própria rota.
 * Quando esta rota aponta para o módulo home, as rotas funcionarão no contexto da mesma.
 */
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  /** Esta função javascrip vai fazer o import dinamicamente do modulo home e retornar uma promesa.
   * Quando essa promesa chega, o que está dentro dela, que é o módulo, é acessado para ser executado.
   */
  { path: 'home', loadChildren: () => import('./home/home.module').then(module => module.HomeModule) },
  { path: 'animais', loadChildren: () => import('./animais/animais.module').then((module) => module.AnimaisModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
