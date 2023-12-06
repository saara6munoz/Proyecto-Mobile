import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestcontPage } from './restcont.page';

const routes: Routes = [
  {
    path: '',
    component: RestcontPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestcontPageRoutingModule {}
