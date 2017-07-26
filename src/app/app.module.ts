import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//
import { HttpModule } from '@angular/http';

import { FormsModule }   from '@angular/forms';

/* import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule,
    MdDialogModule
  } from '@angular/material'; */

import { ApiService } from './api.service';

import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListComponent } from './list/list.component';
import { AddItemComponent } from './add-item/add-item.component';
 const appRoutes: Routes = [
  {
    path: 'home',
    component: WelcomeComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'add-item',
    component: AddItemComponent
  },
  {
    path: 'add-item/:id',
    component: AddItemComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]; 
//

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    WelcomeComponent,
    AddItemComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserModule,

    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule,
    HttpModule,
    /* BrowserAnimationsModule,
    MdButtonModule, 
    MdCardModule, 
    MdMenuModule, 
    MdToolbarModule, 
    MdIconModule,
    MdDialogModule */

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
