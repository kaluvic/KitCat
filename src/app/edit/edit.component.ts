import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";


import { Catmem } from "../catmem";
import { FormControl, FormGroup } from "@angular/forms";
import { FirebaseService } from "../firebase.service";
import { ActivatedRoute, Router } from "@angular/router"

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
 form_edit_cat = new FormGroup({
    new_age: new FormControl(""),
    new_breed: new FormControl(""),
    new_price: new FormControl(""),
    new_detail: new FormControl("")
  });
  constructor(
    private firebaseService: FirebaseService,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {}

   Cats: Catmem;
  currRoute: string;

  ngOnInit() {
    this.activateRoute.params.subscribe(routeParam => {
      this.currRoute = routeParam.id;
      this.firebaseService.getCatmemID(routeParam.id).subscribe(c => {
        this.Cats = c;
        this.form_edit_cat.patchValue({ 
          new_age: c.Age,
          new_breed: c.Breed,
          new_price: c.Price,
          new_detail: c.Detail
           });
      });
    });
  }

  edit(id: string) {
    this.firebaseService
      .updateCat(
        this.currRoute,
        this.form_edit_cat.value.new_age,
        this.form_edit_cat.value.new_breed,
        this.form_edit_cat.value.new_price,
        this.form_edit_cat.value.new_detail
      )
      .then(() => {
        this.route.navigate(["/"]);
      });
  }
}