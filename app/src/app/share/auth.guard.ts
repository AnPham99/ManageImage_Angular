import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';
// import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
 
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const expectedRole = route.data.expectedRole;
    // const user = this.authService.getUserDecode();
    const token = this.authService.getToken();
    if (token === null) {
      window.alert("Đăng nhập để được truy cập vào trang này!");
      this.router.navigate(['login']);
      return false;
    }
    // if(user.roles !== expectedRole)
    // {
    //   alert("Không có quyền truy cập vào trang này");
    //     this.router.navigate(['login']);
    //     return false;
    // }
    return true;
  }
  
}

