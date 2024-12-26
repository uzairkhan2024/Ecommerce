import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { register, RegisterDto } from '../../model/Register_dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

registrationForm:RegisterDto = new RegisterDto()

  constructor( private RegisterSer:AuthService,
    private route:Router
  ){}
 

  Register(){
   this.RegisterSer.RegisterCustomer(this.registrationForm).subscribe((Res:register) =>{
      if(Res.result){
        this.RegisterSer.setLoggedInState(true);
       alert("Register Successfully")
     }
     })
    
     localStorage.setItem('Customer' , JSON.stringify(this.registrationForm.Name + this.registrationForm.MobileNo))
     this.route.navigate(['/products'])
    console.log("registration",this.registrationForm)
  }

}
