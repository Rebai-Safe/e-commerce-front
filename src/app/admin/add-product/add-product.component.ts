import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandler } from '../../model/file-handler.model';
import { Product } from '../../model/product.model';
import { ProductService } from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  isNewProduct = true;
  productForm: FormGroup;
  constructor(private productService: ProductService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId: [''],
      productName: [''],
      productDescription: [''],
      productActualPrice: [''],
      productDiscountedPrice: [''],
      productImages: ['']
    })

   let product = this.route.snapshot.data['product'];
    if(product && product.productId){
      this.isNewProduct = false;
      this.productForm.patchValue(product);
      console.log("form value from add product: ",this.productForm.value)
   }
  }

  addProduct(){
   this.productService.addProduct(this.prepareFormData(this.productForm.value)).subscribe(
    (response) => {
      this.productForm.reset();
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

    for(let i=0; i<product.productImages.length;i++){
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
      const fileHandler: FileHandler = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file))
      }
      this.productForm.get('productImages').setValue([...this.productForm.get('productImages').value, fileHandler]);
    }
  }
    removeImage(i: number){
      this.productForm.get('productImages').value.splice(i, 1);
    }

    fileDropped(fileHandler: FileHandler){
      this.productForm.get('productImages').setValue([...this.productForm.get('productImages').value, fileHandler]);
    }

}
