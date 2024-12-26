import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { Login, LoginDto } from '../../../model/Login_dto';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,FormsModule , RouterLink  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  LoginObj:Login = new Login()
  

  

  constructor( private LoginSer:AuthService , private router:Router){

  }


  ngOnInit() {
  
  }

  Login(){
  this.LoginSer.LoginCustomer(this.LoginObj).subscribe((Res:LoginDto)=>{
  if(Res.result){
    console.log("Login Detail",Res.data)
    localStorage.setItem('Customer' ,JSON.stringify(Res.data))
    this.router.navigate(['/products'])
    this.LoginSer.setLoggedInState(true);

  }
  else{
    alert (Res.message)
  }
  })
  }
}
