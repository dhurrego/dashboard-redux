import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => console.log(fuser) );
  }

  crearUsuario( nombre: string, email: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({ user }) => {

        const newUsuario = new Usuario(user!.uid, nombre, user!.email as string);

        return this.firestore.doc(`${user!.uid}/usuario`).set({...newUsuario});
      });
  }
  
  loginUsuario( email: string, password: string ) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  cerrarSesionUsuario() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState
      .pipe(
        map( fuser => fuser != null )
      );
  }
}
