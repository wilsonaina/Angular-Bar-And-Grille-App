import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootShellRoutingModule } from './root-shell-routing.module';
import { RootShellComponent } from "./components/root-shell.component";
import { HeaderSectionModule } from "../../shared/components/header-section/header-section.module";
import { FooterSectionModule } from "../../shared/components/footer-section/footer-section.module";
import { HomePageModule } from "../home-page/home-page.module";


@NgModule({
  declarations: [ RootShellComponent ],
  imports: [
    CommonModule,
    RootShellRoutingModule,
    HeaderSectionModule,
    FooterSectionModule,
    HomePageModule
  ],
  exports: [ RootShellComponent ]
})
export class RootShellModule { }
