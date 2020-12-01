import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/resource/candidate';
import { Course } from 'src/app/resource/course';
import { UmanaRestService } from 'src/app/service/umana-rest.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courseList = [] as Course[]; // alternativo a new Array<Course>();

  constructor(
    private umanaRestService: UmanaRestService
  ) { }

  ngOnInit(): void {
    this.umanaRestService.getCourses()
      .subscribe((answer) => this.getCoursesOk(answer), (error) => this.getCoursesKo(error));
  }

  private getCoursesOk(answer: Course[]): void {
    this.courseList = answer;
  }
  private getCoursesKo(error: HttpErrorResponse): void {
    console.error(error);
  }

  action(event: Course): void {
    //    this.courseList = [event];
    this.umanaRestService.getCourseById(event.id)
      .subscribe((answer) => this.actionOk(answer), (error) => this.actionKo(error));
  }
  private actionKo(error: HttpErrorResponse): void {
    console.error(error);
  }
  private actionOk(answer: Course): void {
    if (answer.subscriptions === undefined) {
      return;
    }
    let candidates = new Array<Candidate>();
    for (let x of answer.subscriptions) {
      candidates.push(x.candidate);
    }
    console.log(candidates);
  }
}
