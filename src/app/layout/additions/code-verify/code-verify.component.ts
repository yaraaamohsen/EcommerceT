import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-code-verify',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './code-verify.component.html',
  styleUrl: './code-verify.component.scss'
})
export class CodeVerifyComponent {
  constructor(private _AuthService : AuthService, private _Router: Router){}

  errorMessage!: boolean;

  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  })

  codeSubmit(){
    this._AuthService.sendCode(this.codeForm.value).subscribe({
      next: (res) => {
        console.log(this.codeForm.value);        
        this._Router.navigate(['/resetpassword']);
      },
    })
  }
}
