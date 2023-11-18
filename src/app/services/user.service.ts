import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserAuthService} from './user-auth.service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class UserService {

    api_url = environment.api_url;

    requestHeader = new HttpHeaders({"NO-Auth": "True"})

    constructor(private httpClient : HttpClient, private userAuthService : UserAuthService) {}

    public login(loginData) {
        return this.httpClient.post(this.api_url + "/authenticate", loginData, {headers: this.requestHeader});
    }

    public forUser() {
        return this.httpClient.get(this.api_url + '/forUser', {responseType: 'text'})
    }

    public forAdmin() {
      return this.httpClient.get(this.api_url + '/forAdmin',{responseType: 'text'})
  }

    public roleMatch(allowedRoles): boolean {
        let isMatch = false;
        const userRoles: any = this.userAuthService.getRoles();

        if (userRoles != null && userRoles)
            for (let i = 0; i < userRoles.length; i++) {
                for (let j = 0; j < allowedRoles.length; j++) {
                    if (userRoles[i].roleName === allowedRoles[j]) {
                        isMatch = true;
                        return isMatch
                    } else {
                        return isMatch
                    }
                }
            }


    }
}
