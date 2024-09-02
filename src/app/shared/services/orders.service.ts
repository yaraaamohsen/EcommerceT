import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/base';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) { }

  sendOrder(cartId: string, data: any): Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${cartId}?url=https://ecommerce-t-yaraaamohsens-projects.vercel.app/`, 
      {shippingAddress: data}
    )
  }
}
