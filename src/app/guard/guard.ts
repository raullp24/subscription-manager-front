import { inject, Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "../store/store";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    private store: Store = inject(Store);
    private router: Router = inject(Router);

  canActivate(): boolean {
    const isLogged = this.store.state.isAuthenticated;

    if (!isLogged) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }
}
