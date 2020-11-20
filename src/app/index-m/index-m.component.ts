import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from 
"@angular/router";
import { FirebaseService } from "../firebase.service";
import { Catmem } from "../catmem";

@Component({
  selector: 'app-index-m',
  templateUrl: './index-m.component.html',
  styleUrls: ['./index-m.component.css']
})
export class IndexMComponent implements OnInit {

Cats: Catmem[];

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.firebaseService.getCatmem().subscribe(val => {
      this.Cats = val
      })
  }
  go() {
    this.route.navigate(["homepage"])
  }
  add() {
    this.route.navigate(["add"]);
  }
}