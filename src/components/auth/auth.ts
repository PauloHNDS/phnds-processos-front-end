import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProcessoService } from '../../service/processo-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../../model/auth';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {

  private http = inject(ProcessoService);
  private router = inject(Router);

  public email : string = "";
  public senha : string = "";

  public error : string | null = null;

  public Login() : void {

    var request = this.http.login({ email : this.email ,senha : this.senha });

    request.subscribe({
      next: (value) => this.LoginSucess(value),
      error: (erro) =>  this.LoginError(erro)
    });

  }

  private LoginSucess(res: AuthResponse) {
    
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken",res.refreshToken);
    localStorage.setItem("usuarioCode",res.usuarioCode);
    localStorage.setItem("usuarioNome",res.usuarioNome);
    localStorage.setItem("usuarioTipo",res.usuarioTipo);
    localStorage.setItem("expiration", res.expiration);

    console.log(this.router);
    this.router.navigate(['/']);

  }

  private LoginError(erro : HttpErrorResponse){
    console.log(erro);
  }

}
