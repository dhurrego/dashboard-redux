import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      correo: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required]
    });
  }

  loginUsuario(): void {
    if(this.loginForm.invalid) { return };

    const { correo, password } = this.loginForm.value;

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.loginUsuario(correo, password)
      .then( credenciales => {
        Swal.close();
        this.router.navigate(['/']);   
      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      } );

  }

  getFormControl(nombreControl: string): AbstractControl {
    return this.loginForm.get(nombreControl)!;
  }

}
