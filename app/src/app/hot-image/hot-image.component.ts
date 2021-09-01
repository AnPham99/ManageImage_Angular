import { Component, OnInit } from '@angular/core';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-hot-image',
  templateUrl: './hot-image.component.html',
  styleUrls: ['./hot-image.component.css']
})
export class HotImageComponent implements OnInit {

  images : any;
  image : any;
  max = 0;
  img : any;
  constructor(private httpSever : HttpServerService) { }

  ngOnInit(): void {
    this.images = this.httpSever.getAllImages();
    // this.getTopLike();
  }

  // 
  // findTopLike(){
  //   for(this.image of this.images)
  //   {
  //     if(this.image.likeCount > this.max)
  //       return this.image;
  //   }
  // }

  // getTopLike(){
  //   this.img = this.findTopLike();
  // }

}
