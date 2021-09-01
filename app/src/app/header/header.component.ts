import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cates : any;
  user : any;

  constructor(private authService: AuthService, private router : Router, private serverHttp : HttpServerService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserDecode();
    this.serverHttp.getCategories().subscribe((data) => {
      this.cates = data;
      console.log(this.cates);
    });
  }

  getProfile(){
    this.router.navigate(['/manage-image', this.user.userId]);
  }
  
}
