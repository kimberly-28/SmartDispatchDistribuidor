import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {

    category;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('category'));
    console.log("this is the category")
    console.log(id);
    this.category = id;


  }

}
