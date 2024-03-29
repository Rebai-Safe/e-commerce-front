import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/* responsible for communicating with local storage */
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): []{
    return JSON.parse(localStorage.getItem("roles"));
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken(): string{
    return localStorage.getItem("jwtToken");
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getRoles() && this.getToken();
    }

  public isAdmin(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'ADMIN';
  }

  public isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'USER';
  }
}
