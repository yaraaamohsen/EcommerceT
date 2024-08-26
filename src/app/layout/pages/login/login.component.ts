import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import e from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor( private _AuthService:AuthService, private _Router:Router, private _ToastrService:ToastrService){}

  errorMessage !: string;

  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]),
  })


  sendData(){
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      this._ToastrService.error('invalid');
    }
    else{
      this._AuthService.sendLogin(this.loginForm.value).subscribe({
        next: (res)=>{
          console.log(res)
          console.log('hello');
          this._Router.navigate(['/home']);
          localStorage.setItem('userToken', res.token);
          this._AuthService.decodeUserData()
        }      
      })
    }  
  }
}