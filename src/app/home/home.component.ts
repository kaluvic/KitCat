import { Component, OnInit } from '@angular/core';

import { Input } from "@angular/core";
import { Catmem } from "../catmem";
import { FirebaseService } from "../firebase.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor() { }


  ngOnInit() {}
}