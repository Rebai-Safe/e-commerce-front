import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from 'src/environments/environment'
import { TokenInterceptorService } from './token-interceptor.service';
import { TokenStorageService } from './token-storage-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public AUTH_API=environment.baseUrl+'authenticate';

  constructor(private router:Router,private tokenStorage: TokenStorageService, private httpClient:HttpClient) { 

  }

  authenticate(username,password){
    return this.httpClient.post(this.AUTH_API, {username,password},httpOptions)
     }

  logout(){
   this.tokenStorage.signOut();
   this.router.navigate(['/login'])
  }
  }

