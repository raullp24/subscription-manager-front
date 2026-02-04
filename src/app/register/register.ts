import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private authService: AuthService = inject(AuthService);

  registerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),  
  })

  onSubmit() {
    if(this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
        }
      });
    }
  }
}
