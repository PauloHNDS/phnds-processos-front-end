import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl:'./app.html' ,
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('phnds-processos');

  private router = inject(Router)

  public isLogado() : boolean {
    return localStorage.getItem("accessToken") !== null &&  localStorage.getItem("accessToken") !== undefined;
  }

  public navigateToProcesso() : void {
    this.router.navigate(['']);
  }

  public navigateToAdvogado() : void {
    this.router.navigate(['advogado']);
  }

  public navigateToParte() : void {
    this.router.navigate(['parte']);
  }

}
