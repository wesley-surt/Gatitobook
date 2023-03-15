import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculo.validator';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguais } from './usuarioSenhaIguais.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit{
  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExisteService: UsuarioExisteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.min(4)]],
      /** Para mais informações sobre essa function importada e usada no array de erros do userName
       * acesse a function que está sendo exportada do arquivo "minusculo.validator.ts, dentro desta mesma
       * pasta "novo-usuario".
       */
      userName: ['', [minusculoValidator], [this.usuarioExisteService.usuarioJaExiste()]],
      password: ['']
    },
    /** Este segundo objeto passado como parâmetro para o formBuilder.group() tem um motivo. Ele serve para
     * quando eu precisar usar o valor de inputs diferentes. Por isso, a função que está sendo passado para
     * "validators:", dentro deste objeto, no ser arquivo, onde está sendo exportado, eu sinalizo que o
     * parâmetro que esta função deve receber é o próprio formBuilder. E lá mesmo eu capturo os valores 
     * atuais dos inputs de usuário e senha, certifico que os campos tenham algum valor com o "if()", se não
     * tiver eu instruo o else a retornar null, comparo os valores com um ternario. Para saber mais é só
     * conferir no arquivo "usuarioSenhaIguais.validator.ts."
     */
    {
      validators: [usuarioSenhaIguais],
    }
    )
  }

  cadastrar() {
    /** O ".getRawValue()", como a tradução já diz, ele pega o valor bruto do furmulário. Ou seja, ele
     * pega as informações do furmulário.
     */
    if ( this.novoUsuarioForm.valid ) {
      const novoUsuario = this.novoUsuarioForm.getRawValue();
      this.novoUsuarioService.cadastrarNovoUsuario(novoUsuario).subscribe(
        () => this.router.navigate(['']), 
        error => console.log(error)
      );
    }
  }
}
