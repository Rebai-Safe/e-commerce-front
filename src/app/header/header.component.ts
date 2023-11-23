import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('sideMenu') sideMenu: ElementRef;
  constructor(private userAuthService: UserAuthService,
              private renderer: Renderer2,
              private router: Router) { }


  ngOnInit(): void {

  }

  public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/'])
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

  closeSideMenu() {
    this.renderer.setStyle(this.sideMenu.nativeElement, 'right', '-200px');
  }

  openSideMenu() {
    this.renderer.setStyle(this.sideMenu.nativeElement, 'right', '0');
  }
}
