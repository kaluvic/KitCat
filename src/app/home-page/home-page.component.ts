import { Component, OnInit } from '@angular/core';

import { FirebaseService } from "../firebase.service";
import { Catmem } from "../catmem";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

Cats: Catmem[];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
  this.firebaseService.getCatmem().subscribe(val => {
      this.Cats = val
      })
  }

}