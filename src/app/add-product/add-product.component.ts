import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../model/file-handle.model';
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
    productActualPrice: 0,
    productImages: []
    
  }
  constructor(private productService: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  
  addProduct(productForm: NgForm){
   this.productService.addProduct(this.prepareFormData(this.product)).subscribe(
    (response) => {
      productForm.reset();
    },
    (error) => {
      console.log("From add product",error);
    }
   )
  }
 
  prepareFormData(product: Product): FormData{
    const formData= new  FormData ();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], {type:'application/json'})
    );

    for(var i=0; i<product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      )
    }

    return formData;
  }

  onFileSelected(event: any) {
    if(event.target.files){
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file))
      }

      this.product.productImages.push(fileHandle);
    }
     
    
    }
}
