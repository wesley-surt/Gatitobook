import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';
import { RodapeModule } from './componentes/rodape/rodape.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
/** Aqui vai ficar todos os módulos em comum entre várias páginas, para então, serem importados nas mesmas
 * uma única vez, com o "SharedModule".
 */
@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AppRoutingModule, HttpClientModule, CabecalhoModule, RodapeModule,
    AutenticacaoModule],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
