
import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  items;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) 
  { }

  ngOnInit() 
  {
     this.api.get_all().subscribe(
      data => {
        this.items = data.data;
        console.log('data', data);
      },
      err => {
        console.error('Error!');
        this.items = [];
      },
      () => {
        ////console.log('done');
      }
    ); 
  }

  add(item?)
  {
    console.log('Add item');

    //this.router.navigateByUrl('/add-item');
    /* this.router.navigateByUrl('/add-item',
         {queryParams: {item: item}}); */
         this.router.navigate(['/add-item'], { relativeTo: this.route });
  }

  delete(index:number, id:string)
  {
    console.log('id', id);

    var to_delete = confirm("Delete selected item?");

    if (to_delete == true) {
      this.api.delete_by_id(id).subscribe(
        data => {
          if(data.status == true)
          {
            this.items.splice(index, 1);
          }
        },
        err => {
          console.error('Error!');
          this.items = [];
        },
        () => {
          ////console.log('done');
        }
      );
    }
  }

}
