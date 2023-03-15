import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { NovoAnimalComponent } from './novo-animal/novo-animal.component';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimaisComponent,
    resolve: {
      /** "animais:" é um atributo que vai receber o Observable<Animais> do arquivo ".resolver.ts", e usado
       * em um outro arquivo que trata de exibir a lista de animais na tela antes mesmo que a tela termine
       * a renderização.
       */
      animais: ListaAnimaisResolver,
    }
  },
  {
    path: 'novo',
    component: NovoAnimalComponent,
  },
  {
    /** Graças à um path variável contido no arquivo animais-routing.modele.ts; que, em suma,
   * passa para o arquivo a ideia de que, "qualquer informação que vier nesta posição, pode redirecionar
   * para o component: DetalhaAnimal". A rota deixa isso claro para o arquivo através dos dois pontos
   * que ficam antes da declaração do path.
   */
    path: ':animalId',
    component: DetalheAnimalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimaisRoutingModule {}
