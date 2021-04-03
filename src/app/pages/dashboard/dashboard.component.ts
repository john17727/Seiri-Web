import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  today: Date = new Date();

  upcomingTitle = 'Upcoming';

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  upcomingCourses: Array<Course> = [];

  constructor(private studentService: StudentService) {
    studentService.getAllCourses().subscribe(changes => {
      changes.forEach(element => console.log(element));
    });
    studentService.getUpcomingCourses().subscribe(upcomingCoursesData => {
      this.upcomingTitle = this.days[upcomingCoursesData.day];
      this.upcomingCourses = upcomingCoursesData.courses;
    });
  }

  ngOnInit(): void {

  }

}
