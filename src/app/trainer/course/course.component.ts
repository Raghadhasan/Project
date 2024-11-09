import { Component, OnInit } from '@angular/core';
import { CourseService, Course, UserCourses, UserCoursesResponse } from '../services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
  userCourses: UserCourses[] = [];
  selectedCourse: UserCourses | null = null;
  functionName: any;
  router: any;
  showContent: boolean = false;
  courseTitle: string = 'My Courses';

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllUserCourses().subscribe(
      (data) => {
        this.userCourses = data['courses'];
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
  openContent(course: UserCourses) {
    this.selectedCourse = course; 
    this.showContent = true;
    this.courseTitle = `My Courses / ${course.coursename}`;
  }

  backToCourses(): void {
    this.showContent = false;
    this.courseTitle = 'My Courses';
  }
}