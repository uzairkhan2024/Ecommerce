export class CategoryId {
    message!: string
    result!: boolean
    data!: CategoryIdData[]
  }
  
  export class CategoryIdData {
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
  