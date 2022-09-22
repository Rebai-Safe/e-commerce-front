import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: Product={
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0
    
  }
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }
  
  addProduct(productForm: NgForm){
   this.productService.addProduct(this.product).subscribe(
    (response) => {
      productForm.reset();
    },
    (error) => {
      console.log("From add product",error);
    }
   )
  }
}
