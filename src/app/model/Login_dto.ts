export class Login {
    UserName!: string
    UserPassword!: string
  }


  export class LoginDto {
    message!: string
    result!: boolean
    data!: Data
  }
  
  export class Data {
    custId!: number
    name!: string
    mobileNo!: string
    password!: string
  }