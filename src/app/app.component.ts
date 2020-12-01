import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UmanaRestService } from './service/umana-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message?: string;

  constructor(
    private umanaRestService: UmanaRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  roles(): string[] {
    return this.umanaRestService.roles;
  }

  loginUser(event: Event) {
    let response = this.umanaRestService.login("user", "password");
    response.subscribe((answer) => this.loginOk(answer), (error) => this.loginKo(error));
  }
  loginAdmin(event: Event) {
    let response = this.umanaRestService.login("admin", "password");
    response.subscribe((answer) => this.loginOk(answer), (error) => this.loginKo(error));
  }
  private loginOk(answer: string): void {
    this.message = answer;
  }
  private loginKo(error: HttpErrorResponse): void {
    console.error(error);
  }

  onLogout(event: Event): void {
    this.umanaRestService.logout()
    // se la funzione di callback è composta da un'unica istruzione, allora
    // io posso usare l'unica istruzione come lato destro dell'arrow function
      .subscribe((answer) => this.onLogoutOk(answer), (error) => this.onLogoutKo(error));
  }
  private onLogoutOk(answer: string): void {
    this.message = answer;
    this.router.navigateByUrl("/");
  }
  private onLogoutKo(error: HttpErrorResponse) {
    console.error(error);
  }

  displayLogout(): boolean {
    return this.umanaRestService.isLogged();
  }

}
