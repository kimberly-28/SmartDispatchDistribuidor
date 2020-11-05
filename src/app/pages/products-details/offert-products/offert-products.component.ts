import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-offert-products',
  templateUrl: './offert-products.component.html',
  styleUrls: ['./offert-products.component.css']
})
export class OffertProductsComponent implements OnInit {

  siteId;

  constructor(private activatedRoute: ActivatedRoute,
              private router:Router,
              private dialogProductDetail: MatDialog) { }

  ngOnInit(): void {

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log("this is de id navigate ON offers product")
    console.log(id);
    this.siteId = id;

  }

  navigateToCategory(category){
    console.log("entro en el console log ")
    console.log(category)
    this.router.navigate(['/productsdetails/', this.siteId,category]);
  }

  openProductDetailDialog(idProduct){
    const dialogRef = this.dialogProductDetail.open(ProductDetailDialogComponent);

    dialogRef.afterClosed().subscribe(()=>{

      //return this.getAllEmployeeRegister();
      console.log("close dialog product detail");
      });
  }

}

