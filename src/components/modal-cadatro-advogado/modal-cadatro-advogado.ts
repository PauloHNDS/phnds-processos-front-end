import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AdvogadoRequest } from '../../model/advogado';
import { AdvogadoService } from '../../service/advogado-service';

@Component({
  selector: 'app-modal-cadatro-advogado',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './modal-cadatro-advogado.html',
  styleUrl: './modal-cadatro-advogado.css'
})
export class ModalCadatroAdvogado {

  form : FormGroup;
  private advogadoService = inject(AdvogadoService);

  constructor(public bsModalRef: BsModalRef) {
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      oab: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      celular: new FormControl('')
    })
  }

  salvar(): void {
    if (this.form.valid) {
      const advogado: AdvogadoRequest = this.form.value;
      this.advogadoService.cadastrarAdvogado(advogado);
      this.bsModalRef.hide();
      alert("cadastrado advogado com sucesso !!!")
    }
  }

  fechar(): void {
    this.bsModalRef.hide();
  }

}
