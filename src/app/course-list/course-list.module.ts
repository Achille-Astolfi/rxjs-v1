import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';



@NgModule({
  declarations: [CourseListComponent, CourseListItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CourseListComponent
  ]
})
export class CourseListModule { }
export { CourseListComponent };
