import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {environment} from '../../environments/environment';
import {ApiResponse} from '../model/api-response';

@Injectable({providedIn: 'root'})
export class UserService {

    api_url = environment.api_url;

    requestHeader = new HttpHeaders({"No-Auth": "True"})

    constructor(private httpClient : HttpClient, private userAuthService : UserAuthService) {}

    public login(loginData) {
        return this.httpClient.post<ApiResponse>(this.api_url + "/authenticate", loginData, {headers: this.requestHeader});
    }

    public register(registerData){
      return this.httpClient.post<ApiResponse>(`${this.api_url}/registerUser`, registerData, {headers: this.requestHeader});
    }
    public forUser() {
        return this.httpClient.get(this.api_url + '/forUser', {responseType: 'text'})
    }

    public forAdmin() {
      return this.httpClient.get(this.api_url + '/forAdmin',{responseType: 'text'})
  }

    public roleMatch(allowedRoles): boolean {
        const userRoles: any = this.userAuthService.getRoles();
        const userRolesSet = new Set(userRoles.map(role => role.roleName));
        return allowedRoles.some(role => userRolesSet.has(role));
    }

}
