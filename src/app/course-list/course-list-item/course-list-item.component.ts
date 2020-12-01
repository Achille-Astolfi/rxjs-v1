import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/resource/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  @Input() course!: Course;
  @Output() onAction = new EventEmitter<Course>();

  constructor() { }

  ngOnInit(): void {
  }

  doAction(event: Event): void {
    this.onAction.emit(this.course);
  }

}
