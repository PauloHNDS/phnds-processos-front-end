import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest, AuthResponse } from '../model/auth';
import { ProcessoRequest, ProcessoResponse } from '../model/processo';
import { advogadoResponse } from '../model/advogado';
import { AndamentoRequest, AndamentoResponse } from '../model/andamento';
import { Router } from '@angular/router';
import { ResponsePage } from './response-page';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  private readonly baseUrl : string = "https://localhost:7084/";
  private readonly http : HttpClient = inject(HttpClient);

  public processos = signal<ProcessoResponse[]>([]);
  public totalItems = signal<number>(0);
  public pageNumber = signal<number>(0);
  public pageSize = signal<number>(0);
  public totalPages = signal<number>(0);

  private router = inject(Router);

  public login(auth : AuthRequest ) : Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.baseUrl.concat("api/auth/login"), auth);
  }

  public listarProcesso(size:number = 5,page:number = 1,filter:string = "") : void {
    this.http.get<ResponsePage<ProcessoResponse>>(this.baseUrl.concat("api/processo/filter"), { params : { size,page,filter }}).subscribe({
      next: (value) => {        
        this.processos.set(value.items);
        this.totalItems.set(value.totalItems);
        this.pageNumber.set(value.pageNumber);
        this.pageSize.set(value.pageSize);
        this.totalPages.set(value.totalPages);
      },
      error: (err:HttpErrorResponse) => {
        if(err.status === 401) {
          localStorage.clear();
          this.router.navigate(['login']);
        }
      }
    })
  }

  public buscarProcessoPeloCode(code : string) : Observable<ProcessoResponse> {
    return this.http.get<ProcessoResponse>(this.baseUrl.concat("api/processo/").concat(code))
  }
  public cadastrarProcesso(processo : ProcessoRequest) : Observable<ProcessoResponse> {
    return this.http.post<ProcessoResponse>(this.baseUrl.concat("api/processo"), processo)
  }
  public atualizarProcesso(processo : ProcessoRequest, code:string) : void {
    this.http.put<void>(this.baseUrl.concat(`api/processo/${code}`),processo).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err : HttpErrorResponse) => {
         if(err.status === 401) {
          localStorage.clear();
          this.router.navigate(['login']);
        }
      }
    })
  }

  public deleteProcesso(code : string)  : Observable<void> {
    return this.http.delete<void>(this.baseUrl.concat("api/processo/".concat(code)));
  }


}
