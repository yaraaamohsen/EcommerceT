import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../shared/services/products.service';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { CategoriesService } from '../../../shared/services/categories.service';
import { CartService } from '../../../shared/services/cart.service';
import { Product } from '../../../shared/models/products';
import { Categories } from '../../../shared/models/categories';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, SearchPipe, FormsModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private _ProductsService: ProductsService, private _CategoriesService: CategoriesService, private _ToastrService: ToastrService, private _CartService: CartService) { }

  productsArr !: Product[];
  errorMessage !: string;
  categoriesArr!: Categories[];
  searchVal: string = '';

  ngOnInit(): void {
    if (typeof localStorage != 'undefined') {
      localStorage.setItem('currentPage', '/home');
    }

    this._ProductsService.getAllProduct().subscribe({
      next: (res) => {this.productsArr = res.data;}
    })

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => { this.categoriesArr = res.data },
    })

    this._CartService.getCartApi().subscribe( (res)=>{
      this._CartService.noOfCartItems.next(res.numOfCartItems)
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
      },
    },
    nav: true
  }

  customOptionsCat: OwlOptions = {
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
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }

  addToCart(pId: string) {
    this._CartService.addProduct(pId).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.noOfCartItems.next(res.numOfCartItems);
      }
    })
  }
}