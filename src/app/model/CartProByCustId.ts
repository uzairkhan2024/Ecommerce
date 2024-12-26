export class CartCustIdDto {
    message!: string
    result!: boolean
    data!: CartCustId[]
  }
  
  export class CartCustId {
    cartId!: number
    custId!: number
    productId!: number
    quantity!: number
    productShortName!: string
    addedDate!: string
    productName!: string
    categoryName!: string
    productImageUrl!: string
    productPrice!: number
  }