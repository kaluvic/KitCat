import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase/app";
import { Catmem } from "./catmem";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}
getCatmem() {
    let DocRef = this.firestore.collection<Catmem>("Catmember", e =>
      e.orderBy("date", "desc")
    );
    return DocRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Catmem;
          const id = a.payload.doc.id;
          return { id, ...data } as Catmem;
        });
      })
    );
  }

getCatmemID(id: string) {
    let DocRef = this.firestore.collection<Catmem>("Catmember").doc(id);

    return DocRef.get().pipe(map(action => action.data()));
  }

  addCat(a: number, b: string, p: number, d: string, url: string) {
    let Catmember = {
      Age: a,
      Breed: b,
      Price: p,
      Detail: d,
      date: firebase.default.firestore.Timestamp.now(),
      pic: url
    };

    const ref = this.firestore.collection("Catmember").add(Catmember);

    ref.then(newRef => {
      const upDateID = {
        id: newRef.id
      };
      newRef.update(upDateID);
    });
    return ref;
  }

  deleteCat(id: string) {
    return this.firestore
      .collection("Catmember")
      .doc(id)
      .delete();
  }

  updateCat(id: string, a: number, b: string, p: number, d: string) {
    let newCatmember = {
      Age: a,
      Breed: b,
      Price: p,
      Detail: d
    };

    return this.firestore
      .collection("Catmember")
      .doc(id)
      .update(newCatmember);
  }
}