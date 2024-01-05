import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootShellComponent } from "./components/root-shell.component";

const routes: Routes = [
  {
    path: '**',
    component: RootShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RootShellRoutingModule { }
