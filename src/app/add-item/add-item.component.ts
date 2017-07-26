import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';

//
export class ModelTest {
  constructor(
    public _id: string,
    public name: string,
    public lastName: string
  ) {  }
}
//

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  model: ModelTest;

  submitted: boolean = false;
  debugData: boolean = true;
  id:string;
  execMethod:string = 'add';

  constructor(private api: ApiService, private route: ActivatedRoute) 
  { 
    this.model =  new ModelTest('', '', '');
  }

  ngOnInit() 
  {
    this.route.params
    .subscribe( (params) => {
      this.id = params.id;
      console.log(params)

      if (this.id)
      {
        this.api.get_by_id(this.id).subscribe(
          data => {
            if(data.status == true)
            {
              console.log(data);
              this.model = data.data

              this.execMethod = 'modify'
            }
          },
          err => {
            console.error('Error!');
          },
          () => {
            ////console.log('done');
          }
        );
      }
    });

  }

  onSubmit() 
  { 
    this.submitted = true;
  
      this.api[this.execMethod](this.model).subscribe(
        data => {
          if(data.status == true)
          {
            console.log('Add OK!');
          }
        },
        err => {
          console.error('Error!');
        },
        () => {
          ////console.log('done');
        }
      );
    
  }

}
