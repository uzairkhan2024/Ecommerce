import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { productDataDto, productDto } from '../../model/product_dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  products: productDataDto[] = [];

  // Top Sales 
  uniqueCategoryProducts: productDataDto[] = [];

  // Hot Sales
  displayedProduct: productDataDto[] = [];
  currentIndex : number = 0;
  itemsPerPage : number = 4;

  constructor(private productSer: ProductService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productSer.getAllProducts().subscribe((Res: productDto) => {
      this.products = Res.data;
      this.filterFirstProductByCategory();
      this.showProducts();
    });
  }


  showProducts(){
   this.updateDisplayedProducts()

   setInterval(()=>{
    this.currentIndex += this.itemsPerPage

    if(this.currentIndex >= this.products.length){
      this.currentIndex = 0;
    } 
     this.updateDisplayedProducts()
   }, 5000);
  }

  updateDisplayedProducts(){
    this.displayedProduct = this.products.slice(this.currentIndex , this.currentIndex + this.itemsPerPage)
  }

  // Filter For First Products
  filterFirstProductByCategory() {
    const categoryMap = new Map<string, productDataDto>();

    this.products.forEach(product => {
      if (!categoryMap.has(product.categoryName)) {
        categoryMap.set(product.categoryName, product);
     }
    })
    this.uniqueCategoryProducts = Array.from(categoryMap.values());
  }


 // Filter For Second Products
//  filterSecondProductByCategory() {
//   const categoryCountMap = new Map<string, number>();
//   const secondProducts: productDataDto[] = [];

//   this.products.forEach(product => {
//     const category = product.categoryName;
//     const count = categoryCountMap.get(category) || 0;

//     categoryCountMap.set(category, count + 1);

//     if (count === 1) {
//       secondProducts.push(product);
//     }
//   });

//   this.uniqueCategoryProducts = secondProducts;
// }
}
