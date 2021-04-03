import { Course } from './../models/course.model';
import { User } from './../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  currentUser: User;

  constructor(private fireStore: AngularFirestore) {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const fsUsers = fireStore.collection('users');
  }

  getTodaysCourses() {

  }

  getUpcomingCourses(): Observable<NextCourses> {
    const today = new Date().getDay();
    console.log(today);
    return this.getAllCourses().pipe(
      map(courses  => {
        return this.filterUpcomingCourses(today, courses)
      })
    );
  }

  getAllCourses(): Observable<Array<Course>> {
    return this.fireStore.collection('users').doc(this.currentUser.uid).collection('courses').valueChanges().pipe(
      map(courses => {
        return courses as Array<Course>;
      })
    );
  }

  private filterUpcomingCourses(today: number, courses: Array<Course>): NextCourses {
    const upcomingCourses: Array<Course> = [];
    var pointer = 0;
    for (var i = 1; i < 7; i++) {
      pointer = (i + today) % 7;
      console.log('Pointer: ' + pointer);
      courses.forEach(course => {
        if (course.days.includes(pointer)) {
          console.log('Selected Pointer: ' + pointer);
          upcomingCourses.push(course);
        }
      });

      if (upcomingCourses.length != 0) {
        break;
      }
    }

    if (upcomingCourses.length == 0) {
      pointer = today;
    }

    return new NextCourses(pointer, upcomingCourses);
  }
}

class NextCourses {
  day: number;
  courses: Array<Course>;

  constructor(day: number, courses: Array<Course>) {
    this.day = day;
    this.courses = courses;
  }
}
