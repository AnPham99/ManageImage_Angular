
import { HttpServerService } from '../services/http-server.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  imageId! : number;
  image : any;
  decodeUser : any;
  isLike : any;
  
  constructor(private serverHttp : HttpServerService,
              private route: ActivatedRoute,
              private router : Router,
              private authService : AuthService,          
              )
              {} 


  ngOnInit(): void {
    this.decodeUser = this.authService.getUserDecode();

    this.GetImageIdParams();
    
    this.GetImageById();

    // setTimeout(() => { this.ngOnInit() }, 0.1);
  }

  GetImageIdParams(){
    this.route.params.subscribe(params => {
      this.imageId = +params['imageId'];
    });
  }

  GetImageById(){
    if(this.imageId > 0) {
      this.serverHttp.getImageById(this.imageId).subscribe((data) => {
        this.image = data;
        console.log(this.image);
      });
    }
  }

  changeLikeCount(){
    // if(this.image.isLike === false)
    // {
    //   this.image.likeCount +=1;
    //   this.image.isLike = true;
    // }
    // else
    // {
    //   this.image.likeCount -=1;
    //   this.image.isLike = false;
    // }
    this.serverHttp.isLikeImage(this.imageId, this.image).subscribe((data) => {
      this.GetImageById();
    })
    
    
  }
     
  
}
