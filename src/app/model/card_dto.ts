export class CartDto {
  message!: string
  result!: boolean
  data!: Cart[]
}

export class Cart {
    CartId!: number
    CustId!: number
    ProductId!: number
    Quantity!: number
    AddedDate!: string
  }
  