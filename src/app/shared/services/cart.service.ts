import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/base';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  noOfCartItems : BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }

  addProduct(pId: string) : Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart`, {productId :pId})
  }

  updateQuantity( count: string, pId: string) : Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${pId}`, {'count' : count})
  }

  deleteItem(pId: string) : Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${pId}`)
  }

  getCartApi() : Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`)
  }

  clearCart(pId: string) : Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`)
  }

   hamada(){
     this.getCartApi().subscribe((res)=>{
       this.noOfCartItems.next(res.numOfCartItems);
       console.log(this.noOfCartItems.getValue());
       this.noOfCartItems.getValue();
   })
 }
}
