import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AdvogadoRequest, advogadoResponse } from '../model/advogado';

@Injectable({
  providedIn: 'root'
})
export class AdvogadoService {
  
  private readonly baseUrl : string = "https://localhost:7084/";
  private readonly http : HttpClient = inject(HttpClient);
  public advogados = signal<advogadoResponse[]>([]);

  public listarAdvogados() : void {
    this.http.get<advogadoResponse[]>(this.baseUrl.concat("api/advogado")).subscribe({
      next: (value) => this.advogados.set(value)
    });
  }

  public cadastrarAdvogado(body : AdvogadoRequest) : void {
    this.http.post<void>(this.baseUrl.concat("api/advogado"),body).subscribe({
      next: () => this.listarAdvogados()
    })
  }

}
