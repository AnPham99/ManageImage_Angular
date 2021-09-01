import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})
export class AllImagesComponent implements OnInit {
  a = false;
  images : any;

  constructor(private serverHttp : HttpServerService, private route : ActivatedRoute, private router : Router) { } 

  ngOnInit(): void {
    this.serverHttp.getImageHasApproval().subscribe((data) => {
        this.images = data;
        console.log(this.images);
      });
    }
  getImageById(Id : number) {
    this.router.navigate(["/image-detail", Id]);
  }

}
