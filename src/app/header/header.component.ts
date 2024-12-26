import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Data } from '../model/Login_dto';
import { CartCustId, CartCustIdDto } from '../model/CartProByCustId';
import { DelCartProDto } from '../model/DelCartPro_dto';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: any;
  loggedObj: Data = new Data();
  cartItems: CartCustId[] = [];
  

  constructor(
    private authService: AuthService,
    private productSer: ProductService
  ) {
    const localData = localStorage.getItem('Customer');
    if (localData != null) {
      const praseObj = JSON.parse(localData);
      this.loggedObj = praseObj;
      this.getcartData(this.loggedObj.custId);
    }
    this.productSer.cartUpdate.subscribe((res) => {
      if (res) {
        this.getcartData(this.loggedObj.custId);
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getLoggedInState();
    // Ensure initial state is checked
    this.authService.setLoggedInState(!!localStorage.getItem('Customer'));
  }

  logout() {
    localStorage.removeItem('Customer');
    this.authService.setLoggedInState(false);
  }

  removeItem() {
    localStorage.clear();
    this.authService.setLoggedInState(false);
  }

  getcartData(id: number) {
    this.productSer.getAddToCardByCust(id).subscribe((res) => {
      this.cartItems = res.data;
    });
  }

  DeleteProduct(cartId: number) {
    this.productSer.DelProCartById(cartId).subscribe((res: DelCartProDto) => {
      if (res.result) {
        alert('Product Delete Successfully');
        this.getcartData(this.loggedObj.custId);
      } else {
        alert(res.message);
      }
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
    
  }
 
}
