import { Component, OnInit } from '@angular/core';
import { AssignmentService, AssignmentSolution } from '../services/assignment.service';


@Component({
  selector: 'app-assignment-review',
  templateUrl: './assignment-review.component.html',
  styleUrls: ['./assignment-review.component.css']
})
export class AssignmentReviewComponent implements OnInit {
  solutions: AssignmentSolution[] = [];

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.loadAssignmentSolutions();
  }


  loadAssignmentSolutions(): void {
    this.assignmentService.getAssignmentSolutions().subscribe(
      (data) => {
        this.solutions = data;
      },
      (error) => {
        console.error('Error fetching assignment solutions:', error);
      }
    );
  }

  // تحديث العلامة
  updateMark(solutionId: number, mark: number): void {
    this.assignmentService.updateMark(solutionId, mark).subscribe(
      () => {
        alert('Mark updated successfully!');
        this.loadAssignmentSolutions();
      },
      (error) => {
        console.error('Error updating mark:', error);
      }
    );
  }
}
