import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RestablecerPageRoutingModule } from './restablecer-routing.module';

import { RestablecerPage } from './restablecer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestablecerPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RestablecerPage]
})
export class RestablecerPageModule {}
