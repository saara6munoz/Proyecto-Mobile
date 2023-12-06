import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestcontPageRoutingModule } from './restcont-routing.module';

import { RestcontPage } from './restcont.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestcontPageRoutingModule
  ],
  declarations: [RestcontPage]
})
export class RestcontPageModule {}
