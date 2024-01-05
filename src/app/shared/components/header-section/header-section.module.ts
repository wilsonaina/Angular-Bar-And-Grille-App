import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSectionRoutingModule } from './header-section-routing.module';
import { HeaderSectionComponent } from "./components/header-section.component";


@NgModule({
  declarations: [ HeaderSectionComponent ],
  imports: [
    CommonModule,
    HeaderSectionRoutingModule
  ],
  exports: [ HeaderSectionComponent ]
})
export class HeaderSectionModule { }
