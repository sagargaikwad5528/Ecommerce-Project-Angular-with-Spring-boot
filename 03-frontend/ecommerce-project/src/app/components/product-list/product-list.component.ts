import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product:Product[];
  currentCategoryId:number;
  constructor(private productService:ProductService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
    this.listProduct();
  });
}
  listProduct(){

    // check if id parameter is availble or not

    const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the id param string.Convert the string into a number using '+' symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else{
      //not category id available.the assign default it to 1
     this.currentCategoryId=1;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data=>{
        this.product=data;
      }
    )
  }

}
