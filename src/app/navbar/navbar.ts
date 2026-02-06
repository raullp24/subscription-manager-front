import { Component, inject } from '@angular/core';
import { Store } from '../store/store';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private store: Store = inject(Store);
  private authService = inject(AuthService);
  

  get user(){
    return this.store.state.user;
  }

  handleLogout(){
    this.authService.logout();
  }
}
