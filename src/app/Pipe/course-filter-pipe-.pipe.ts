import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'courseFilter'
})

export class CourseFilterPipe implements PipeTransform {

  transform(courses: any[], searchTerm: string, sortBy: string, sortOrder: 'asc' | 'desc'): any[] {
    // const filteredCourses = courses.filter(course =>
    //   course.coursename.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredCourses = courses.filter(course => {
      const nameMatches = course.coursename.toLowerCase().includes(searchTerm.toLowerCase());

      const idMatches = course.courseid.toString().toLowerCase().includes(searchTerm.toLowerCase());

      return nameMatches || idMatches;
    });
    filteredCourses.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (a[sortBy] > b[sortBy]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filteredCourses;
  }
}
