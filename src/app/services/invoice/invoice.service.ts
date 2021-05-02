import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
 private invoiceUrl=environment.baseUrl+'invoices';
 private errorHandler = new ErrorHandler();

  constructor(private http:HttpClient) { }

  getUserInvoice(id: number):Observable<Invoice>{
    try{
      return this.http.get<Invoice>(this.invoiceUrl+'/'+id);
    }
    catch(error){
      this.errorHandler.handleError(error);
    }
}
