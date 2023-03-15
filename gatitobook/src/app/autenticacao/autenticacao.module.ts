import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';



@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  providers: [
    {
      /** O "provide: HTTP_INTERCEPTORS," trata de esclarecer o tipo do registro. A "useClass:
       * AutenticacaoInterceptor," diz respeito a classe do interceptor, para localizá-la para uso. E o
       * "multi: true" é relacionado ao tanto de interceptações que deseja fazer, eu acho. */
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true,
    }
  ],
})
export class AutenticacaoModule { }
