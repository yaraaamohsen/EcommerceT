import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart.service';
import { Data,Router, RouterLink } from '@angular/router';
import { Cart } from '../../../shared/models/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  myCart!: Cart;
  cartData!: Data;
  errorMessage !: string;
  emptyCart !: string; 
  cartId !: string;
  constructor(private _Router:Router ,private _CartService:CartService, private _ToastrService:ToastrService){}

  ngOnInit(): void{
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem('currentPage' , '/cart');
    }

    this._CartService.getCartApi().subscribe({
      next: (res)=>{
        this.myCart = res;
        this.cartData= this.myCart.data;
        this.cartId = res.data._id;
        this._CartService.noOfCartItems.next(res.numOfCartItems);
      }
    })
  }

  updatedCount(currentCount: number, pId: string){
    if(currentCount <= 0){
      this.removeItem(pId)  
    }
    else{
      this._CartService.updateQuantity(currentCount.toString(), pId).subscribe({
        next: (res)=>{
          this._ToastrService.success("item count updated successfully");
          this.myCart = res;
          this.cartData= res.data;
        }
      })
    }
  }
 
  removeItem(pId : string){
    this._CartService.deleteItem(pId).subscribe((res)=>{
      this._ToastrService.warning('item cleared');
      this.myCart = res;
      this.cartData= res.data;
      this._CartService.noOfCartItems.next(res.numOfCartItems)
    })
  }

  deleteCart(cartId: string){
    this._CartService.clearCart(cartId).subscribe({
      next: (res)=> {console.log(res);
        this._ToastrService.success('cart deleted successfully');
        this.myCart = res;
        this._Router.navigate(['/home']);
        this._CartService.noOfCartItems.next(0);
        if(typeof localStorage !== 'undefined'){
          localStorage.setItem('noOfCartItems' , '0');
        }
      }
    })
  }
}
