import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from '../model/file-handler.model';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  isNewProduct = true;
  product: Product={
      productId: null,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: []

    }
  constructor(private productService: ProductService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.product = this.route.snapshot.data['product'];
   if(this.product && this.product.productId){
      this.isNewProduct = false;
   }
  }

  addProduct(productForm: NgForm){
   this.productService.addProduct(this.prepareFormData(this.product)).subscribe(
    (response) => {
      productForm.reset();
      this.product.productImages = []
    },
    (error) => {
      console.log("From add product: ",error);
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
      const fileHandle: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file))
      }

      this.product.productImages.push(fileHandle);

    }
  }
    removeImage(i: number){
      this.product.productImages.splice(i, 1);
    }

    fileDropped(fileHandle: FileHandler){
      this.product.productImages.push(fileHandle)
    }

}
