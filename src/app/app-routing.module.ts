import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.module';
import { LoggedGuard } from './guard/logged.guard';

const routes: Routes = [
  { path: 'course-list', component: CourseListComponent, canActivate: [LoggedGuard] },
  //
//  { path: "", pathMatch: "full", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
