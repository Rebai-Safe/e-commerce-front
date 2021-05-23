import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { ServerResponse } from '../models/server-response';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<ServerResponse>{

  constructor(private userService:UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ServerResponse | Observable< ServerResponse> | Promise< ServerResponse> {
    return this.userService.getUserProfile();
  }
}
