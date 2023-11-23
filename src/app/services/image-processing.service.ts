import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {FileHandler} from '../model/file-handler.model';
import {Product} from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product){
    const productImages: any[] = product.productImages;
    const productImagesToFileHandler: FileHandler[] = [];

    for (let i = 0 ;i<productImages.length; i++){
      const imageFileData = productImages[i];
      const imageBlob = this.dataURItoBlob(imageFileData.picbyte, imageFileData.type)
      //const imageBlob = "";
      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type})
      const finalFileHandle: FileHandler = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
        //This line of code is using Angular's DomSanitizer service to safely bypass security
        // checks for a URL and create a trusted URL for a File object
      }

      productImagesToFileHandler.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandler;
    return product;
   }


   public dataURItoBlob(picBytes, imageType){
     // decode Base64-encoded back to a byte[]
     const byteString = window.atob(picBytes);
     const arrayBuffer = new ArrayBuffer(byteString.length);
     const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i<byteString.length; i++){
      int8Array[i]  = byteString.charCodeAt(i)
    }
    return new Blob([int8Array], {type: imageType});
   }
}
