import { Component } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands.service';
import { Brand } from '../../../shared/models/cart';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private _BrandsService:BrandsService){}

  brandsArr !: Brand[]
  ngOnInit(): void{
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage', '/brands');
    }

    this._BrandsService.getAllBrands().subscribe((res)=>{
      console.log(res.data);
      this.brandsArr = res.data
    })
  }
}
