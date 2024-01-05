import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterSectionRoutingModule } from './footer-section-routing.module';
import { FooterSectionComponent } from "./components/footer-section.component";


@NgModule({
  declarations: [ FooterSectionComponent ],
  imports: [
    CommonModule,
    FooterSectionRoutingModule
  ],
  exports: [ FooterSectionComponent ]
})
export class FooterSectionModule { }
