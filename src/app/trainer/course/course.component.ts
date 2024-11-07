import { Component, OnInit } from '@angular/core';
import { CourseService, Course } from '../services/course.service'; // Adjust the import path if necessary
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: Course[] = []; // Initialized with an empty array

  mockCourses: Course[] = [
    {
      coursename: 'Introduction to Computer Science',
      coursestartdate: new Date('2022-01-01'),
      courseenddate: new Date('2022-06-30'),
      courseimage: 'https://example.com/images/computer-science.jpg',
    },
    {
      coursename: 'Calculus II',
      coursestartdate: new Date('2022-07-01'),
      courseenddate: new Date('2022-12-31'),
      courseimage: 'https://example.com/images/calculus.jpg',
    },
    {
      coursename: 'English Literature',
      coursestartdate: new Date('2022-01-01'),
      courseenddate: new Date('2022-06-30'),
      courseimage: 'https://example.com/images/english-literature.jpg',
    },
    {
      coursename: 'World History',
      coursestartdate: new Date('2022-07-01'),
      courseenddate: new Date('2022-12-31'),
      courseimage: 'https://example.com/images/world-history.jpg',
    },
    {
      coursename: 'Biology',
      coursestartdate: new Date('2022-01-01'),
      courseenddate: new Date('2022-06-30'),
      courseimage: 'https://example.com/images/biology.jpg',
    },
    {
      coursename: 'Art Appreciation',
      coursestartdate: new Date('2022-07-01'),
      courseenddate: new Date('2022-12-31'),
      courseimage: 'https://example.com/images/art-appreciation.jpg',
    },
    {
      coursename: 'Music Theory',
      coursestartdate: new Date('2022-01-01'),
      courseenddate: new Date('2022-06-30'),
      courseimage: 'https://example.com/images/music-theory.jpg',
    },
    {
      coursename: 'Philosophy',
      coursestartdate: new Date('2022-07-01'),
      courseenddate: new Date('2022-12-31'),
      courseimage: 'https://example.com/images/philosophy.jpg',
    },
    {
      coursename: 'Chemistry',
      coursestartdate: new Date('2022-01-01'),
      courseenddate: new Date('2022-06-30'),
      courseimage: 'https://example.com/images/chemistry.jpg',
    },
    {
      coursename: 'Psychology',
      coursestartdate: new Date('2022-07-01'),
      courseenddate: new Date('2022-12-31'),
      courseimage: 'https://example.com/images/psychology.jpg',
    },
  ];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
