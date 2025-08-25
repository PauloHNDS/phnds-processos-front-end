import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AndamentoRequest, AndamentoResponse } from '../model/andamento';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AndamentoService {

  private readonly baseUrl : string = "https://localhost:7084/";
  private readonly http : HttpClient = inject(HttpClient);
  public andamentos = signal<AndamentoResponse[]>([]);

  public listaAndamentoPorProcesso(code: string): void {
    this.http.get<AndamentoResponse[]>(this.baseUrl.concat(`api/andamento/${code}`)).subscribe({
      next: (value) => this.andamentos.set(value) 
    });
  }
  public cadastrarAndamento(body: Partial<AndamentoRequest>): void {
    this.http.post<void>(this.baseUrl.concat("api/andamento"), body).subscribe({
      next: () => {
        this.listaAndamentoPorProcesso(body.processoCode ?? "");
      }
    });
  }
  public apagarAndamento(code : string, processoCode : string) : void {
    this.http.delete<void>(this.baseUrl.concat(`api/andamento/${code}`)).subscribe({
      next: () => {
        this.listaAndamentoPorProcesso(processoCode ?? "");
      }
    });
  }

}
