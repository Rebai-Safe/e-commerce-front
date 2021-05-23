import { Country } from '@angular-material-extensions/select-country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { UserService } from 'src/app/services/user/user.service';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  profile: Profile;
  userCountry: Country= 
    {
      name: 'T',
      alpha2Code: '',
      alpha3Code: '',
      numericCode: '',
      callingCode: ''
    }
  
  /**
   * 
   * @param userService 
   * @param fb 
   * @param modalService 
   * @param router  will handle the information returned by the resolver.
   */
  constructor(private userService:UserService,private fb:FormBuilder,
    private router:ActivatedRoute,private dialog:MatDialog) {
      //will handle the data got by the resolver
      if(this.router.snapshot.data.profile){
        this.profile = this.router.snapshot.data.profile.object;
       }
     }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
    })
    this.initData();
  }

  /**
   * allows to set from fields with data got from the resolver
   */
  initData(){
   this.profileForm.get('firstName').setValue(this.profile.firstName);
   this.profileForm.get('lastName').setValue(this.profile.lastName);
   this.profileForm.get('email').setValue(this.profile.email);
   this.userCountry.alpha2Code=this.profile.country;
  // this.profileForm.get('country').setValue(this.userCountry);
  }

  /**
   * call userservice update profile method to update profile
   */
  updateProfile(){
    this.profileForm.get('country').setValue(this.profileForm.get('country').value.alpha2Code);
    this.userService.updateProfile(this.profileForm.value).subscribe(ok=>{
      const dialogRef = this.dialog.open(AlertDialogComponent,{
        data:{
          message: 'Votre profile a été modifié avec succes',
          buttonText: {
            cancel: 'Ok'
          }
        },
      });
    },
      error => {
        console.log(error);
      })
    }
    
    
  }

