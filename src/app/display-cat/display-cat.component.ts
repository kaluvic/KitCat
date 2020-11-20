import { Component, OnInit } from '@angular/core';

import { Input } from "@angular/core";
import { Catmem } from "../catmem";
import { FirebaseService } from "../firebase.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-display-cat',
  templateUrl: './display-cat.component.html',
  styleUrls: ['./display-cat.component.css']
})
export class DisplayCatComponent implements OnInit {

  constructor(
    private firebaseService: FirebaseService,
    private route: Router
    ) {}

  @Input() Catmember: Catmem;

  ngOnInit() {
  }

  edit(id) {
    this.route.navigate([`/edit/${id}`]);
  }
  delete() {
    if (window.confirm("r u sure? it's no way to get this back")) {
      this.firebaseService
        .deleteCat(this.Catmember.id)
        .then(() => {
          alert("now it's gone (T^T)");
        })
        .catch(err => {
          alert("Delete Failuer");
        });
    }
  }

}