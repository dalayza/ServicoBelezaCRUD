import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicoRoutingModule } from './servicos-routing.module';
import { ServicoListComponent } from './servico-list/servico-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ServicoListComponent],
  imports: [
    CommonModule,
    ServicoRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class ServicosModule { }
