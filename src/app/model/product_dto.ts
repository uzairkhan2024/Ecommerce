export class productDto {
    message!: string
    result!: boolean
    data!: productDataDto[]
  }
  
  export class productDataDto {
    productId!: number
    productSku!: string
    productName!: string
    productPrice!: number
    productShortName!: string
    productDescription!: string
    createdDate!: string
    deliveryTimeSpan!: string
    categoryId!: number
    productImageUrl!: string
    categoryName!: string
  }
  