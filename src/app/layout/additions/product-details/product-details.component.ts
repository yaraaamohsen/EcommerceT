import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../shared/services/products.service';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/models/products';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService, private _CartService:CartService, private _ToastrService:ToastrService){}

  pId: string | null = '';
  productObj !: Product;
  images!: string[];

  ngOnInit(): void{
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this.pId = p.get('pId');
      this._ProductsService.getSpecificProduct(this.pId).subscribe({
        next: (res)=>{
          this.productObj = res.data;
          this.images = res.data.images;
        }
      })
    })
  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  addToCart(pId : string){
    this._CartService.addProduct(pId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
      }
    })
  }
}
