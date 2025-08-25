import { Component, inject, input, OnInit, ViewChild } from '@angular/core';
import { ProcessoService } from '../../service/processo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProcessoRequest, ProcessoResponse } from '../../model/processo';
import { HttpErrorResponse } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AdvogadoRequest, advogadoResponse } from '../../model/advogado';
import { debounceTime, distinctUntilChanged, Observable, Observer, of, switchMap } from 'rxjs';
import { TypeaheadDirective, TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ParteReponse, ParteResquest, ParteTipoEnum } from '../../model/parte';
import { AndamentoRequest, AndamentoResponse } from '../../model/andamento';
import { AndamentoService } from '../../service/andamento-service';
import { ParteService } from '../../service/parte-service';
import { AdvogadoService } from '../../service/advogado-service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ModalCadatroAdvogado } from '../modal-cadatro-advogado/modal-cadatro-advogado';

@Component({
  selector: 'app-novo-processo',
  imports: [ReactiveFormsModule, FormsModule, TabsModule, TypeaheadModule,ModalModule],
  templateUrl: './novo-processo.html',
  styleUrl: './novo-processo.css',
  providers:[BsModalService]
})

export class NovoProcesso implements OnInit {

  public title = "Novo Processo";

  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);
  private modalService = inject(BsModalService);

  private processoService = inject(ProcessoService);
  private andamentoService = inject(AndamentoService);
  private parteService = inject(ParteService);
  private advogadoService = inject(AdvogadoService);

  public form: FormGroup;
  public code: string | null = null;

  public parte: ParteResquest;
  public partes = this.parteService.partes;

  public andamento: AndamentoRequest;
  public andamentos = this.andamentoService.andamentos;

  public advogado: AdvogadoRequest;
  public advogados = this.advogadoService.advogados;

  bsModalRef?: BsModalRef;
  isUpdate:boolean = false;

  constructor() {

    this.form = new FormGroup({
      numeroProcesso: new FormControl('', Validators.required),
      classe: new FormControl('', Validators.required),
      assunto: new FormControl('', Validators.required),
      juiz: new FormControl(''),
      vara: new FormControl(''),
      inicioProcesso: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    });

    this.activeRoute.paramMap.subscribe(params => {
      this.code = params.get('code');
    });

    this.parte = {
      code: null,
      nome: "",
      processoCode: "",
      advogadoCode: "",
      tipo: 1
    }

    this.andamento = {
      descricao: '',
      processoCode: this.code ?? "",
      code: null
    }

    this.advogado = {
      celular: "",
      code: "",
      email: "",
      nome: "",
      oab: ""
    }

  }
  ngOnInit(): void {

    this.andamentos.set([]);
    this.partes.set([]);
    this.advogados.set([]);

    if (this.code === null || this.code === "") {
      this.isUpdate = false;
      return;
    } 

    this.isUpdate = true;

    this.andamento.processoCode = this.code;
    this.parte.processoCode = this.code;

    this.processoService.buscarProcessoPeloCode(this.code).subscribe({
      next: (values) => this.setValuesInForm(values),
      error(err) {
        alert('erro ao buscar processo');
        console.error(err);
      },
    })

    this.andamentoService.listaAndamentoPorProcesso(this.code);
    this.parteService.listaPartes(this.code);
    this.advogadoService.listarAdvogados();

  }

  public onSubmit(): void {

    let processo: ProcessoRequest = this.form.value;

    this.processoService.cadastrarProcesso(processo).subscribe({
      next: (value) => this.handleSucess(value),
      error: (erro) => this.handleError(erro)
    });

  }

  public onUpdate(): void {
    
    let processo: ProcessoRequest = this.form.value;
    
    this.processoService.atualizarProcesso(processo, this.code ?? "");

  }

  public cancelarCadastro(): void {
    this.router.navigate(['/']);
  }

  private handleSucess(processo: ProcessoResponse): void {

    alert("cadastrado com sucesso !!!");

    this.router.navigate([`/vizualizar/${processo.code}`]);

  }

  private handleError(erro: HttpErrorResponse): void {
    alert("erro ao cadastrar valores");
  }

  private setValuesInForm(values: ProcessoResponse): void {
    this.form.setValue({
      numeroProcesso: values.numeroProcesso,
      classe: values.classe,
      assunto: values.assunto,
      juiz: values.juiz,
      vara: values.vara,
      inicioProcesso: this.normalizeDate(values.inicioProcesso),
      estado: values.estado
    })
  }

  public adicionarParte(): void {
    this.parteService.cadastrarParte(this.parte);
  }

  public cadastrarAndamento(): void {
    this.andamentoService.cadastrarAndamento(this.andamento);
    this.andamento.descricao = "";
  }

  private normalizeDate(date: string | null | undefined): string {

    if (date) {
      return date.substring(0, 10);
    }

    return "";

  }

  public unormalizeDate(date: string | null | undefined): string {

    if (date) { //2025-08-24T21:14:47.19
      const dia = date.substring(8, 10);
      const mes = date.substring(5, 7);
      const ano = date.substring(0, 4);
      return `${dia}/${mes}/${ano}`;
    }

    return "--/--/----";
  }

  get tipos() {
    return Object.keys(ParteTipoEnum)
      .filter(key => isNaN(Number(key))) // só nomes
      .map(key => ({
        key,
        value: ParteTipoEnum[key as keyof typeof ParteTipoEnum]
      }));
  }

  abrirCadastroAdvogado(): void {
    this.bsModalRef = this.modalService.show(ModalCadatroAdvogado, {
      class: 'modal-lg'
    });
  }

  public handleAndamento(code : string) : void  {
    this.andamentoService.apagarAndamento(code,this.code ?? "");
  }
  public handleParte(code : string) : void {
    this.parteService.apagarParte(code, this.code ?? "");
  }

}