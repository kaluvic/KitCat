import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FirebaseService } from "../firebase.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  img_url: Observable<string | null>;
  add_cat = new FormGroup({
    add_age: new FormControl(""),
    add_breed: new FormControl(""),
    add_price: new FormControl(""),
    add_detail: new FormControl("")
  });
  constructor(
    private firebaseservice: FirebaseService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

  add() {
    this.firebaseservice.addCat(
      this.add_cat.value.add_age,
      this.add_cat.value.add_breed,
      this.add_cat.value.add_price,
      this.add_cat.value.add_detail,
      this.fb
    );

    this.router.navigate([""]);
  }

  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `Images/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Images/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.img_url = fileRef.getDownloadURL();
          this.img_url.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}