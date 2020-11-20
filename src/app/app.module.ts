
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

//firebase
import { AngularFireModule } from "@angular/fire";
import { environment } from "./environment";
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { IndexMComponent } from "./index-m/index-m.component";
import { HomeComponent } from "./home/home.component";
import { AddCatComponent } from "./add-cat/add-cat.component";
import { FirebaseService } from "./firebase.service";
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { DisplayCatComponent } from './display-cat/display-cat.component';
import { HomePageComponent } from './home-page/home-page.component';


//import { AddDetailComponent } from './add-detail/add-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: IndexMComponent },
      { path: "home", component: HomeComponent },
      { path: "homepage", component: HomePageComponent},
      { path: "add", component: DetailComponent },
      { path: "detail", component: DetailComponent },
      { path: "edit/:id", component: EditComponent }
    ]),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    IndexMComponent,
    HomeComponent,
    AddCatComponent,
    DetailComponent,
    EditComponent,
    DisplayCatComponent,
    HomePageComponent,
 
  ],
  bootstrap: [AppComponent],
  providers: [FirebaseService]
})
export class AppModule {}
