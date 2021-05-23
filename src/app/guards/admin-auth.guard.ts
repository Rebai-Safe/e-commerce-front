import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  
  constructor(private userService:UserService,private router:Router){}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.userService.isLoggedIn && this.userService.currentUser && this.userService.currentUser.isAdmin){
        return true;
      }
       else{
         this.router.navigate(['/auth/login'])
       } 
      return false;
    }
  }
  

