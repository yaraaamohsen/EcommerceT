import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { AllProductsService } from '../../../shared/services/all-products.service';
import { Product } from '../../../shared/models/products';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe, RouterLink, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(private _CartService:CartService, private _AllProductsService:AllProductsService, private _ToastrService:ToastrService){}

  allProducts !: Product[];
  searchVal: string = '';

  ngOnInit(): void{
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage', '/products');
    }

  
    this._AllProductsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res);
        this.allProducts = res.data;

      }
    })
    
  }

  addToCart(pId: string) {
    this._CartService.addProduct(pId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      }
    })
  }
}
