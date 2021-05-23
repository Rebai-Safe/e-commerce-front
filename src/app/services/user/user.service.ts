import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Profile } from 'src/app/models/profile';
import { ServerResponse } from 'src/app/models/server-response';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../auth/token-storage-service';


const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders(
      {'Content-Type': 'application/json'}
  )
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private profileUrl = environment.baseUrl+'profile';
  private updateProfileUrl = environment.baseUrl+'updateProfile';
  private userUrl = environment.baseUrl+'current-user';
  private userDataURL = environment.baseUrl+'user-main-data';
  private registerURl =environment.baseUrl+'register';
 
  public cart: Cart;
  public profile: Profile;
  public currentUser: User;
  public username: string;

  private errorsHandler = new ErrorHandler();

  constructor( private http: HttpClient, private tokenStorage:TokenStorageService,
    private router:Router) { }

  
  public updateProfile(userProfile){
    return this.http.post<ServerResponse>(this.updateProfileUrl,userProfile);
  }


  public registerUser(userInfo){
    return this.http.post<ServerResponse>(this.registerURl,userInfo);

  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  prepareUserData() {
    if (this.isLoggedIn()) {
      this.getCurrentUser().subscribe(resUser => {
        this.currentUser = resUser;
      });
      this.pUserData().subscribe(uData => {
        this.profile = uData.profile;
        this.username = `${uData.profile.firstName}
        ${uData.profile.lastName}`;
      });
    }
  }


  getUserProfile(): Observable<ServerResponse> {
    try {
      return this.http.get<ServerResponse>(this.profileUrl,httpOptions);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  pUserData(): Observable<UserData> {
    try {
      return this.http.get<UserData>(this.userDataURL);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }
  getCurrentUser(): Observable<User> {
    try {
      return this.http.get<User>(`${this.userUrl}`);
    } catch (err) {
      this.errorsHandler.handleError(err);
    }
  }

  public isLoggedIn() {

    return !!this.tokenStorage.getToken();
  }

  userLogout() {
    this.router.navigate(["/auth/login"]);
    return this.tokenStorage.signOut();
  }
}
