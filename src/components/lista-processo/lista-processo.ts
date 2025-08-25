import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessoService } from '../../service/processo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessoResponse } from '../../model/processo';
import { CommonModule } from '@angular/common';
import { catchError, Observable, of, Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-lista-processo',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TooltipModule, PaginationModule],
  templateUrl: './lista-processo.html',
  styleUrl: './lista-processo.css'
})
export class ListaProcesso implements OnInit{

  private http = inject(ProcessoService);
  private router = inject(Router);
  
  public processos = this.http.processos;
  public totalItems = this.http.totalItems;
  public pageNumber = this.http.pageNumber;
  public pageSize = this.http.pageSize;
  public totalPages = this.http.totalPages;
  public filter = "";

  ngOnInit(): void {
    this.http.listarProcesso();
  }

  public toNovoProcesso(): void {
    this.router.navigate(['/novo']);
  }

  public visualizarProcesso(code : string) {
    this.router.navigate([`/vizualizar/${code}`]);
  }

  public handledeleteProcesso(code: string): void {
    
    const request = this.http.deleteProcesso(code);

    request.subscribe({
      next(value) {
        alert("Apagado com sucesso !!!")
      },
      error(err) {
        alert("Erro ao apagar processo !!!")
      },
    })

  }

  public changePageSize(e : Event) : void {
    const select = e.target as HTMLSelectElement;
    this.pageSize.set(Number(select.value));
    this.pageNumber.set(1);
    this.http.listarProcesso(this.pageSize(), this.pageNumber(), this.filter);
  }

  public clickPageInicio() : void {
    this.pageNumber.set(1);
    this.http.listarProcesso(this.pageSize(), this.pageNumber(), this.filter);
  }

  public clickSubtratcPage() : void {
    const page =  this.pageNumber() - 1;
    
    if(page <= 0) return;

    this.pageNumber.set(page);
    this.http.listarProcesso(this.pageSize(), this.pageNumber(), this.filter);
  }

  public clickAddPage() : void {
    
    const newValue = this.pageNumber() + 1;

    if(this.totalPages() >= newValue) {
      this.pageNumber.set( newValue);
    } 

    this.http.listarProcesso(this.pageSize(), this.pageNumber(), this.filter);
    
  }

  public clickUltimaPage() : void {

    this.pageNumber.set(this.totalPages());

    this.http.listarProcesso(this.pageSize(),this.pageNumber(), this.filter);
  }

  public changeFilter() : void {
    
    this.pageNumber.set(1);

    this.http.listarProcesso(this.pageSize(), this.pageNumber(), this.filter);

  } 
}
