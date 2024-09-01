import { CartService } from './../../../shared/services/cart.service';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { FlowbiteService } from '../../../shared/plugins/flowbite.service';
import { MyTranslateService } from '../../../shared/services/my-translate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private _CartService: CartService, private _flowbiteService: FlowbiteService, private _AuthService:AuthService, private _Router:Router, private _MyTranslateService: MyTranslateService) {}
  
  noOfCartItems: any = 0;
  isLogin !: boolean;

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite(flowbite => {
    });

    this._AuthService.userDecode.subscribe(()=>{
      if(this._AuthService.userDecode.getValue() == null){
        this.isLogin = false;
      }
      else{
        this.isLogin = true;
      }
    })

    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem('userToken') !== null){
        this.noOfCartItems = localStorage.getItem('noOfCartItems');
      }
    }

    this._CartService.noOfCartItems.subscribe(count => {
      if (count !== null) {
        this.noOfCartItems = count;
      }
    })
  }

  afterRender(){
    if(typeof localStorage !== 'undefined'){
      console.log( localStorage.getItem('noOfCartItems'));
    }
    this._CartService.noOfCartItems.subscribe( (res)=>{this.noOfCartItems = res;})
  }

  logout(){
    localStorage.removeItem('userToken');
    this._AuthService.userDecode.next(null);
    this._Router.navigate(['/login'])
  }

  changeLang(lang: string){
    this._MyTranslateService.changeLang(lang)
  }
}
