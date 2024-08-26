import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-email-verify',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './email-verify.component.html',
  styleUrl: './email-verify.component.scss'
})
export class EmailVerifyComponent {
  constructor(private _AuthService : AuthService, private _Router: Router){}

  codeFormFlage: boolean = false
  
  sendEmailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  emailSubmit(){
    this._AuthService.sendEmailVerify(this.sendEmailForm.value).subscribe({
      next: (res) => {
        console.log('hello');
        this._Router.navigate(['/codeVerify']);
      }
    })

  }
}
