import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { FunSelectComponent } from './fun-select/fun-select.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
              path: ':id',
              component: FunSelectComponent,
              pathMatch: 'full'
            }
          ]
         
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})
export class MainRoutingModule { }