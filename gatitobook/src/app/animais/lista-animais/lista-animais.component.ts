import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Animais } from '../animais';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {
  animais!: Animais;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }
/** O ngOnInit vai inicializar já recebendo as informações vindas do back carregadas pela ativação da
 * rota onde foi posto. Assim o carregamento de muita informação é muito mais agilizado.
 */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.animais = this.activatedRoute.snapshot.data['animais'];
    })
  }

}
/** sub
scribe((usuario) => {
      const userName = usuario.name ?? '';
      this.animaisService.listaDoUsuario(userName).subscribe((animais) => {
        this.animais = animais; */
