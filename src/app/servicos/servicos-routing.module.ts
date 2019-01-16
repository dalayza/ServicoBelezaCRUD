import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicoListComponent } from '../servicos/servico-list/servico-list.component';

const routes: Routes = [
    {
        path: '',
        component: ServicoListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ServicoRoutingModule {}