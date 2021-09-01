import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServerService } from '../services/http-server.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {
  imageId! : number;
  userId: any;
  cates : any;
  cate = "";
  status : any;
  
  imageForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    imageStatus : new FormControl(''),
    desciption: new FormControl(''),
    categoryId: new FormControl(''),
  });
  
  constructor(private serverHttp : HttpServerService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {

    this.serverHttp.getCategories().subscribe( data => {
      this.cates = data;  
    })

    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    
    this.route.params.subscribe(params => {
      this.imageId = +params['imageId'];
    });

    
    if(this.imageId > 0){
      this.loadData();
    }
  }

  private loadData() : any {
    this.serverHttp.GetImageByIdForUser(this.userId, this.imageId).subscribe(data => {
      console.log('image:', data);
      for (const controlName in this.imageForm.controls) {
        if (controlName) {
          this.imageForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }



  onSubmit(): void {
    console.log(this.imageForm.value);
    this.serverHttp.updateImageByUser(this.userId,this.imageId,this.imageForm.value).subscribe((data) => {
      // this.router.navigate(['manage-image', this.userId]);
    });
  }

  updateOk(){
    this.router.navigate(['manage-image', this.userId]);
  }
  
  selectCate(event:any){
    this.cate = event.target.value;
  }


  publicStatus(event:any){
    this.status = event.target.value;
  }

  privateStatus(event:any){
    this.status = event.target.value;
  }

}
