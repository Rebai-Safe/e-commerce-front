import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { UserData } from 'src/app/models/user-data';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../auth/token-storage-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private profileUrl = environment.baseUrl+'profile';
  private userUrl = environment.baseUrl+'current-user';
  private userDataURL = environment.baseUrl+'user-main-data';

  public profile: Profile;
  public currentUser: User;
  public username: string;

  private errorsHandler = new ErrorHandler();

  constructor( private http: HttpClient, private tokenStorage:TokenStorageService) { }


  prepareUserData() {
    if (this.tokenStorage.isLoggedIn()) {
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


  getUserProfile(): Observable<Profile> {
    try {
      return this.http.get<Profile>(this.profileUrl);
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
}
