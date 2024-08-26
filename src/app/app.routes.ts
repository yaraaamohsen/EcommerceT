import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { ResetPasswordComponent } from './layout/additions/reset-password/reset-password.component';
import { EmailVerifyComponent } from './layout/additions/email-verify/email-verify.component';
import { CodeVerifyComponent } from './layout/additions/code-verify/code-verify.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { authGuard } from './shared/guard/auth.guard';
import { ReqOrdComponent } from './layout/additions/req-ord/req-ord.component';
import { AllordersComponent } from './layout/additions/allorders/allorders.component';


export const routes: Routes = [
 {path: '',redirectTo: 'login', pathMatch: "full"},
 {path: 'login', component: LoginComponent},
 {path: 'register', component: RegisterComponent},
 {path: 'emailVerify', component: EmailVerifyComponent},
 {path: 'codeVerify', component: CodeVerifyComponent},
 {path: 'resetpassword', component: ResetPasswordComponent},
 {path: 'reqOrd/:cartId', component: ReqOrdComponent , canActivate : [authGuard]},
 {path: 'home', component: HomeComponent, canActivate : [authGuard]},
 {path: 'productDetails/:pId', component: ProductDetailsComponent , canActivate : [authGuard]},
 {path: 'cart', component: CartComponent, canActivate : [authGuard]},
 {path: 'products', component: ProductsComponent, canActivate : [authGuard]},
 {path: 'brands', component: BrandsComponent, canActivate : [authGuard]},
 {path: 'categories', component: CategoriesComponent, canActivate : [authGuard]},
 {path: 'allorders', component: AllordersComponent, canActivate : [authGuard]},
 {path: '**', component: NotFoundComponent},
];
