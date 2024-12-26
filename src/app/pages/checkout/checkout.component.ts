import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';

import { CartCustId } from '../../model/CartProByCustId';
import { Data } from '../../model/Login_dto';
import { CheckOut } from '../../model/Checkout_dto';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  loggedObj: Data = new Data();
  cartItems: CartCustId[] = [];
  checkoutObj:CheckOut = new CheckOut();

  constructor(private productSer: ProductService) {
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

  ngOnInit(): void {}

  getcartData(id: number) {
    this.productSer.getAddToCardByCust(id).subscribe((res) => {
      this.cartItems = res.data;
      this.getcartData(this.loggedObj.custId);
    });
  }
  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
    
  }
  
  placeOrder() {
    this.checkoutObj.CustId = this.loggedObj.custId
    this.productSer.PlaceOrder(this.checkoutObj).subscribe( (res) =>{
      if(res.result) { 
        this.productSer.cartUpdate.next(true);
        alert("Order Has Been Succefully Placed")
      } else {
        alert(res.message)
      }
    })
  }
}
