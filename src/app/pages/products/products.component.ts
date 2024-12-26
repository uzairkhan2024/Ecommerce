import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productDataDto, productDto } from '../../model/product_dto';
import { Category, CategoryData } from '../../model/Category_dto';
import { CategoryId } from '../../model/CategoryId_dto';
import { Cart, CartDto } from '../../model/card_dto';
import { Data } from '../../model/Login_dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: productDataDto[] = [];
  Category: CategoryData[] = [];
  selectedCategory: number = 0;
  loggedObj : Data = new Data()
  cartProduct : Cart = new Cart()
 

  // filteredProducts: productDataDto[] = []; 
  filteredProducts = [...this.products];
  minPrice!: number
  maxPrice!: number 

  // Pagiantion 
  currentPage: number = 1;
  itemsPerPage: number = 5;
  displayedProducts: productDataDto[] = [];


  constructor(private ProductSer: ProductService ,
    private CategorySer:ProductService,
    private CategoryId:ProductService
  ){
    const localData = localStorage.getItem('Customer')
    if(localData != null){
      const praseObj = JSON.parse(localData);
      this.loggedObj = praseObj ;
    }
  }

  ngOnInit(): void {
    this.getProduct();
    this.getCategory(); 
  }

  getProduct(){
    this.ProductSer.getAllProducts().subscribe((Res:productDto) => {
     this.products = Res.data;
     this.updateDisplayedProducts();
    })
  }

  getCategory(){
    this.CategorySer.getAllCategory().subscribe((Res:Category) =>{
      this.Category = Res.data.slice(0, 10); 
    })
}

  getCategoryById(categoryId:number){
   
    this.CategoryId.getCategoryById(categoryId).subscribe((Res:CategoryId) =>{
    this.products = Res.data
    this.currentPage = 1;
    this.updateDisplayedProducts();
    })
  }

  getProductsByCategory(categoryId: number): void {
    this.ProductSer.getCategoryById(categoryId).subscribe((res: CategoryId) => {
      this.products = res.data;
      this.filteredProducts = [...this.products];
     
    });
  }


  addToCart(productId: number) {
    
    const cartProduct: Cart = {
      CartId: 0, 
      CustId: this.loggedObj.custId, 
      ProductId: productId,
      Quantity: 1, 
      AddedDate: new Date().toISOString(), 
    };
  
    // Make API call
    this.ProductSer.AddToCard(cartProduct).subscribe({
      next: (res: CartDto) => {
        if (res.result) {
          alert('Product added to cart successfully!');
          this.ProductSer.cartUpdate.next(true);
        } 
      },

    });
  }
  


  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const categoryId = parseInt(selectElement.value); // Get the selected value as a number
    console.log('Category',categoryId)
  
    // Update the selected category
  //  this.selectedCategory = categoryId;
  
    // Fetch products based on the selected category
    if (categoryId === 0) {
      this.getProduct(); // Fetch all products if 'All Categories' is selected
    } else {
      this.getCategoryById(categoryId);
    }
  }
  
  filterByPrice() {
    // if (this.minPrice > this.maxPrice) {
    //   alert('Min Price cannot be greater than Max Price!');
    //   return;
    // }
    // if (!this.minPrice && !this.maxPrice) {
    //   this.filteredProducts = [...this.products];
    //   return;
    // }
    this.filteredProducts = this.products.filter((product) => {
      return product.productPrice >= this.minPrice && product.productPrice <= this.maxPrice;
    });
    this.products = this.filteredProducts
    this.currentPage = 1;
    this.updateDisplayedProducts();
  }

 

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.products.length) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }
}

