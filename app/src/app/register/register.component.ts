import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  role ="User";
  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email : new FormControl(''),
    phoneNumber : new FormControl(),
    userName: new FormControl(''),
    passWord: new FormControl(''),
    roles : new FormControl([this.role])
  });
  
  constructor(private router: Router,private authService: AuthService) { }


  ngOnInit(): void {
    
  }
  
  register(){
    this.authService.register(this.registerForm.value).subscribe(data => {
      console.log(this.registerForm.value);   
    });
  }

  ok(){
    this.router.navigate(['/login'])
  }

}
