import {OrderQuantity} from './order-quantity.model';

export interface Order{
    fullName: string;
    fullAddress: string;
    contactNumber: string;
    altContactNumber: string;
    orderProductQuantityList: OrderQuantity[];
}
