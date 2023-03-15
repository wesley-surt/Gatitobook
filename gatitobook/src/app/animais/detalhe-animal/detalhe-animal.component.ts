import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  /** O usuário clicando em um dos cards, será redirecionado para o conteúdo de html deste component,
   * detalha-animal; graças à um path variável contido no arquivo animais-routing.modele.ts; que, em suma,
   * passa para o arquivo a ideia de que, "qualquer informação que vier nesta posição, pode redirecionar
   * para o component: DetalhaAnimal". A rota deixa isso claro para o arquivo através dos dois pontos
   * que ficam antes da declaração do path. E através do "activatedRoute.snapshot.params.animalId", é
   * possível pegar a última informação da rota, depois de ter sido redirecionada, pelo clique no card.
   * Após o usuário ter clicado em um dos cards, vai conseguir o id do pet que foi clicado, para realizar
   * uma nova requisição ao servidor, com as informações apenas do pet clicado. Isso graças ao
   * [routerLink]="['./animais', animal.id]"; mais especificamete, ao "animal.id"; que é concatenado com
   * "./animais", ficando da seguinte forma: ./animais/animal.id; onde animal.id é o valor guardadp dentro
   * desta referência.
   */
  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalId;
    this.animal$ = this.animaisService.buscaPorId(this.animalId);
  }

  curtir() {
    /** A requisição feita pelo "curtir()" retorna true, false ou o erro. Este teste lógico com if está
     * sendo feito pelo fato de que, creio eu, o back-end, caso receba pela primeira vez uma requisição
     * do "curtir()", ele registra normalmente. Se por ventura for feita mais de uma tentativa de curtir,
     * o back retornar um Observable como mal sucedida, ocasionando no pipe retornar para esta chamada
     * um observable com false. Se por algum motivo ocorrer um erro que não se encaixa no esperado, ele
     * retorna com um Observable como mal sucedido; o método curtir() do arquivo animais.service vai
     * verificar se o erro é o esperado, se não for, vai enviar para cá um Observable com a mensagem de erro.
     */
    this.animaisService.curtir(this.animalId).subscribe((curtida) => {
      if ( curtida ) {
        this.animal$ = this.animaisService.buscaPorId(this.animalId);
      }
    }, (error) => console.log(error))
  }

  excluir() {
    this.animaisService.excluir(this.animalId).subscribe(() => {
      this.router.navigate(['/animais/'])
      }, (error) => console.log(error)
    );
  }
}
