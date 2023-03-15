import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { NovoUsuarioService } from './novo-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioExisteService {
  constructor( private novoUsuarioService: NovoUsuarioService ) { }

  /** No final, este método vai retornar um objeto com uma prop que recebe true, ou null; que é a regra
   * do angular para fazer uso da validação customizada. Quem vai receber o parâmetro do tipo 
   * AbstractControl vai ser a aeroFunction retornada porque um método não o pode receber. 
   * O ".valueChanges" vai retornar um "Observable". Sendo assim, para tratá-lo, vai ser preciso fazer
   * uso dos "operators de Observable". O ".pipe", permite usar esses operators que são funções.
   * O switchMap((valorDoObservable) => { retorna o processo final da verificação, podendo ser um boolean,
   * number, string, ou qualque outro tipo }) vai pegar o valor dentro do Observable
   * e vai colocar como parâmetro da aeroFunction ("(valorDoObservable) =>"), que está dentro dele. 
   * Depois vai fazer a verificação que
   * eu definir; e, como estou usando o retorno do método "this.verificaUsuarioExistente" (que retorna
   * um valor boolean), vou estar 
   * retornando para fora, true ou false. Logo em seguida, o map vai capturar este retorno que é true ou
   * false e fazer a sua própria validação. E no final, vai estar retornando um objeto com valor true
   *  ou apenas um null. No final não posso esquecer de fechar cada processamento com a função first() para
   * encerrar cada processamento e obter o resultado a cada digitação. Falando nisso, as validações são
   * executadas a cada "inputada" do usuário.
   */
  usuarioJaExiste() {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap((nomeUsuario) =>
          this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)),
          map((usuarioExistente) =>
            usuarioExistente ? { usuarioExiste: true } : null),
            first()
      )
    }
  }
}
