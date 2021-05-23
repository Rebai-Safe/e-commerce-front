import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/auth/token-storage-service';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  
  constructor(private userService:UserService,private router:Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
    if(this.userService.isLoggedIn && this.userService.currentUser){
      return true;
    }
     else{
       this.router.navigate(['/auth/login'])
     } 
    return false;
  }
  
}
