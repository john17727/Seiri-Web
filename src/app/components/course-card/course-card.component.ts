import { Course } from './../../models/course.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input()
  course!: Course;

  days = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];

  // courseDays = '';

  constructor() { }

  ngOnInit(): void {
    // this.course.days.forEach(day => this.courseDays += this.days[day] + ',');
  }

  setFontColor(): string {
    const r = parseInt(this.course.color.substring(1, 3), 16);
    const g = parseInt(this.course.color.substring(3, 5), 16);
    const b = parseInt(this.course.color.substring(5), 16);

    return ((r*0.299 + g*0.587 + b*0.114) > 186) ? '#393e46' : '#eeeeee';
  }

  getCourseDays(): string {
    var courseDays = this.days[this.course.days[0]];

    for (var i = 1; i < this.course.days.length; i++) {
      courseDays += ', ' +  this.days[this.course.days[i]];
    }

    return courseDays;
  }

}
