import { Component } from '@angular/core';
import { FormControl, FormGroup, MaxValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../shared/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
@Component({
  selector: 'app-req-ord',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './req-ord.component.html',
  styleUrl: './req-ord.component.scss'
})
export class ReqOrdComponent {

  cartId !: string;

  constructor(private _OrdersService: OrdersService, private _ActivatedRoute: ActivatedRoute ,private _CartService:CartService , private _Router:Router ){
    this.getCartId()

  }
  ngOnInit(): void{
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', `/reqOrd/${this.cartId}`);
    }
  }

  getCartId(){
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this.cartId = p.get('cartId')!
    })
  }

  reqOrdForm : FormGroup = new FormGroup({
    details : new FormControl(null, [Validators.required]),
    phone : new FormControl(null, [Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}$/)]),
    city : new FormControl(null, [Validators.required]),
  })

  checkout(){
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this._OrdersService.sendOrder( this.cartId , this.reqOrdForm.value).subscribe((res)=>{
        window.open(res.session.url, '_self');
        this._CartService.clearCart(this.cartId).subscribe({
          next: (res)=>{console.log(res)}
        })
      })  
    })
  }
}
