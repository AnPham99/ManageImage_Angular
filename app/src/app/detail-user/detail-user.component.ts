import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  imageId! : number;
  image : any;
  user : any;
  
  constructor(private serverHttp : HttpServerService,
              private route: ActivatedRoute,
              private router : Router,
              private authService : AuthService
              ){ } 


  ngOnInit(): void {
    this.user = this.authService.getUserDecode();

    this.GetImageIdParams();
    
    this.GetImageById();

    // this.delete();
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

  goToUpdateImage(){
    this.router.navigate(["/update-image",this.image.userId,this.imageId]);
  }

  deleteImg(){
    this.serverHttp.deleteImage(this.image.userId, this.imageId).subscribe(data => {
      this.router.navigate(['/manage-image', this.user.userId]);
      // this.router.navigate(['/home']);

    })
  }

  reloadPage(): void {
    window.location.reload();
  }
}


// images : any;
//   userId : any;
//   user : any;
//   notImage! : boolean;
//   constructor(private httpServer : HttpServerService,
//               private route : ActivatedRoute,
//               private router : Router,
//               private authService : AuthService)
//   {}

//   ngOnInit(): void {   
//     this.route.params.subscribe(params => {
//       this.userId = params['userId'];

//     this.getImageByUser();

//     this.getUserByToken();
//     });

//     // this.logOut();
//   }

//   getUserByToken(){
//     this.user = this.authService.getUserDecode();
//   }

//   getImageByUser(){
//     this.httpServer.GetAllImageByUser(this.userId).subscribe(data =>{
//       this.images = data;    
//     })
//   }
//   getImageDetailByUser(userId : string, imageId : number){
//     this.router.navigate(["/image-detail-by-user/", userId, imageId]);
//   }

//   goToUpdateImage(userId : any, imageId : number){
//     this.router.navigate(["/update-image",userId,imageId]);
//   }

//   deleteImage(userId : string, imageId : number){
//     this.httpServer.daleteImage(userId, imageId).subscribe(data => {
//       // this.router.navigate(["/"]);
//       this.reloadPage();

//     })
//   }

//   // logOut(): void {
//   //   this.authService.signOut();
//   //   this.router.navigate(['/login']);
//   // }

//   reloadPage(): void {
//     window.location.reload();
//   }