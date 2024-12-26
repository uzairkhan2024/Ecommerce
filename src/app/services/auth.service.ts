import { Injectable, signal } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { register, RegisterDto } from '../model/Register_dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, LoginDto } from '../model/Login_dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl


  constructor(private http:HttpClient) { }

   private isLoggedIn$ = new BehaviorSubject<boolean>(!!localStorage.getItem('Customer')); 

   setLoggedInState(state: boolean): void {
      this.isLoggedIn$.next(state); 
     }
    
    getLoggedInState() { 
     return this.isLoggedIn$.asObservable();
    }

  RegisterCustomer(Customer:RegisterDto) : Observable<register>{
  return this.http.post<register>(`${this.baseUrl}RegisterCustomer`,Customer)
  }

  LoginCustomer(User:Login) :Observable<LoginDto>{
    return this.http.post<LoginDto>(`${this.baseUrl}Login`, User)
  }
}
