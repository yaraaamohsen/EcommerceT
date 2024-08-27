import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor( private _AuthService:AuthService, private _ToastrService: ToastrService, private _Router:Router){}

  errorMessage !: string;

  registerForm : FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email : new FormControl(null, [Validators.required, Validators.email]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}$/)]),
    password : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)]),
    rePassword : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)])
  }, this.confirmPassword)


  sendData(){
    if(this.registerForm.invalid){
      this._ToastrService.error('invalid');
    }
    else{
      console.log(this.registerForm.value);
      this._AuthService.sendRegister(this.registerForm.value).subscribe({
        next: (res)=>{
          console.log(res)
          this._ToastrService.success('Register Done Successfully');
          this._Router.navigate(['/login'])
        }      
      }) 
    }  
  }

  confirmPassword(form: any){
    if(form.get('password').value === form.get('rePassword').value){
      return null
    }
    else{
      return {'passwordMatched' : true}
    } 
  }
}
