import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimaisRoutingModule } from './animais-routing.module';
import { AnimalComponent } from './animal/animal.component';


@NgModule({
  declarations: [
    AnimalComponent,
  ],
  imports: [
    CommonModule,
    AnimaisRoutingModule
  ]
})
export class AnimaisModule { }
