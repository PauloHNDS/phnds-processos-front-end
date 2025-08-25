import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ParteReponse, ParteResquest } from '../model/parte';

@Injectable({
  providedIn: 'root'
})
export class ParteService {
  
  private readonly baseUrl : string = "https://localhost:7084/";
  private readonly http : HttpClient = inject(HttpClient);
  public partes = signal<ParteReponse[]>([]);

  public listaPartes(code : string) : void {
    this.http.get<ParteReponse[]>(this.baseUrl.concat(`api/parte/${code}`)).subscribe({
      next: (value) => this.partes.set(value)
    });
  }

  public cadastrarParte(parte : Partial<ParteResquest>) : void {
    this.http.post<void>(this.baseUrl.concat("api/parte"),parte).subscribe({
      next: () => this.listaPartes(parte.processoCode ?? "")
    })
  }

}
