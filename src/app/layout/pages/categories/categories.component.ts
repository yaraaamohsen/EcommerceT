import { Categories } from './../../../shared/models/categories';
import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private _CategoriesService:CategoriesService){}

  categories !: Categories[] 
  ngOnInit(): void{
    if(typeof localStorage != 'undefined'){
      localStorage.setItem('currentPage', '/categories');
    }

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {console.log(res);
        this.categories = res.data
      }
    })
  }

  catDetails(cId :string){
    this._CategoriesService.getSpecificCategory(cId).subscribe({
      next: (res)=>{console.log(res.data);
      }
    })
  }
}
