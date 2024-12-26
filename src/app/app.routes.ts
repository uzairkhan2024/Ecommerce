import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RegisterComponent } from './Auth/register/register.component';
import { ErrorComponent } from './Auth/register/error/error.component';
import { LoginComponent } from './Auth/register/login/login.component';
import { ViewCartComponent } from './pages/view-cart/view-cart.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { TermsAndConditinComponent } from './pages/terms-and-conditin/terms-and-conditin.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'Checkout',
    component: CheckoutComponent,
  },
  {
    path: 'ViewCart',
    component: ViewCartComponent,
  },
  {
     path:'ContactUs',
     component: ContactUsComponent
  },
  {
    path: 'TermsAndCondition',
    component: TermsAndConditinComponent
  },
  {
    path:'About-Us',
    component:AboutUsComponent
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];
