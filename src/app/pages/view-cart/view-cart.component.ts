import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Data } from '../../model/Login_dto';
import { CartCustId } from '../../model/CartProByCustId';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelCartProDto } from '../../model/DelCartPro_dto';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-view-cart',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css'
})
export class ViewCartComponent implements OnInit{

  loggedObj: Data = new Data();
  cartItems: CartCustId[] = [];

  constructor(private produvtSer:ProductService){
    const localData = localStorage.getItem('Customer');
    if (localData != null) {
      const praseObj = JSON.parse(localData);
      this.loggedObj = praseObj;
      this.ViewCart(this.loggedObj.custId);
    }
  }

  ngOnInit(): void {
    
  }

  ViewCart(id: number) {
    this.produvtSer.getAddToCardByCust(id).subscribe((res) => {
      this.cartItems = res.data;
    });
  }

  DeleteProduct(cartId: number) {
    this.produvtSer.DelProCartById(cartId).subscribe((res: DelCartProDto) => {
      if (res.result) {
        alert('Product Delete Successfully');
        this.ViewCart(this.loggedObj.custId);
      } else {
        alert(res.message);
      }
    });
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
  }

  getPriceSummary() {
    const priceSummary = {
      price: 0,
      discount: 0,
      tax: 0,
      delivery: 100, // Fixed delivery charge
      total: 0,
    };
  
    // Calculate subtotal
    priceSummary.price = this.cartItems.reduce(
      (total, item) => total + (item.productPrice * item.quantity),
      0
    );
  
    // Calculate discount (10% of price)
    priceSummary.discount = Math.round(priceSummary.price * 0.1);
  
    // Calculate tax (10% of price)
    priceSummary.tax = Math.round( priceSummary.price * 0.1);
  
    // Calculate total
    priceSummary.total =
      priceSummary.price + priceSummary.tax + priceSummary.delivery - priceSummary.discount;
  
    return priceSummary;
  }
  

}
