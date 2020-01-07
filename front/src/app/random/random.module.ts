import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RandomRoutingModule} from './random-routing.module';
import {RandomNumberComponent} from './containers/random-number/random-number.component';

@NgModule({
  declarations: [
    RandomNumberComponent
  ],
  imports: [
    CommonModule,
    RandomRoutingModule
  ]
})
export class RandomModule {
}
