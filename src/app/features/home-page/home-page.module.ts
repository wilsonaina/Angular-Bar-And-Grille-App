import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from "./components/home-page.component";


@NgModule({
  declarations: [ HomePageComponent ],
  imports: [
    CommonModule,
    HomePageRoutingModule
  ],
  exports: [ HomePageComponent ]
})
export class HomePageModule { }
