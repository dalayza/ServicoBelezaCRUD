import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ServicoService } from '../../servico.service';


@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent implements OnInit {
  modalRef : BsModalRef;
  servico : Servico = new Servico();
  servicos : any;
  editServico : any;
  errorMsg : ErrorMsg = new ErrorMsg();
  id = { 'id' : '' };
  constructor(private modalService: BsModalService, private servicoService: ServicoService) { }

  ngOnInit() {
    this.getServico();
  }

  getServico() {
    this.servicoService.get().subscribe(res => {
      this.servicos = res;
      console.log(this.servicos);
    }, error => {
      console.log(error);
    });
  }

  onSave() {
    this.errorMsg.nome = this.errorMsg.descricao = this.errorMsg.preco = '';
    !this.servico.nome ? this.errorMsg.nome = 'Nome required' : '';
    !this.servico.descricao ? this.errorMsg.descricao = 'Descrião required' : '';
    !this.servico.preco ? this.errorMsg.preco = 'Preco required' : '';
    if(!this.servico.nome || !this.servico.descricao|| !this.servico.preco) {
      return;
    }

    this.servicoService.post(this.servico).subscribe(res => {
      this.getServico();
      this.modalRef.hide();
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  onUpdate() {
    this.servicoService.update(this.editServico).subscribe(res => {
      this.getServico();
      this.modalRef.hide();
    }, error => {
      console.log(error);
    });
  }

  deleteServico() {
    this.servicoService.delete(this.id).subscribe(res => {
      this.getServico();
      this.modalRef.hide();
    }, error => {
      console.log(error);
    });
  }

  openModalDelete(template: TemplateRef<any>, id) {
    this.id.id = id;
    this.modalRef = this.modalService.show(template);
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalEdit(template: TemplateRef<any>, servico) {
    this.modalRef = this.modalService.show(template);
    this.editServico = servico;
  }
}

class Servico {
  nome: String;
  descricao: String;
  preco: String;
}

class ErrorMsg {
  nome: String;
  descricao: String;
  preco: String;
}