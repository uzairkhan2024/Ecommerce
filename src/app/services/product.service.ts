import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { productDto } from '../model/product_dto';
import { Category } from '../model/Category_dto';
import { CategoryId } from '../model/CategoryId_dto';
import { Cart, CartDto } from '../model/card_dto';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { CartCustIdDto } from '../model/CartProByCustId';
import { DelCartProDto } from '../model/DelCartPro_dto';
import { CheckOut, CheckOutDto } from '../model/Checkout_dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  cartUpdate : Subject<boolean> = new Subject<boolean>();

  constructor( private http:HttpClient) { }


  getAllProducts(): Observable<productDto>{
    return this.http.get<productDto>(`${this.baseUrl}GetAllProducts`)
  }

  getAllCategory(): Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}GetAllCategory`)
  }

  getCategoryById(id:number){
    return this.http.get<CategoryId>(`${this.baseUrl}GetAllProductsByCategoryId?id=`+id)
  }

  AddToCard(Item:Cart): Observable<CartDto>{
    return this.http.post<CartDto>(`${this.baseUrl}AddToCart`, Item)
  }

  getAddToCardByCust(id:number) :Observable<CartCustIdDto>{
    return this.http.get<CartCustIdDto>(`${this.baseUrl}GetCartProductsByCustomerId?id=`+id)
  }

  DelProCartById(id:number) :Observable<DelCartProDto>{
    return this.http.get<DelCartProDto>(`${this.baseUrl}DeleteProductFromCartById?id=`+id)
  }

  PlaceOrder(place:CheckOut) :Observable<CheckOutDto>{
   return this.http.post<CheckOutDto>(`${this.baseUrl}PlaceOrder`,place)
  }
}
