import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandler } from '../model/file-handler.model';

@Component({
  selector: 'app-show-product-image-dialog',
  templateUrl: './show-product-image-dialog.component.html',
  styleUrls: ['./show-product-image-dialog.component.scss']
})
export class ShowProductImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
