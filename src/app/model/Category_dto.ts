export class Category {
    message!: string
    result!: boolean
    data!:  CategoryData[]
  }
  
  export class CategoryData {
    categoryId!: number
    categoryName!: string
    parentCategoryId!: number
  }
  