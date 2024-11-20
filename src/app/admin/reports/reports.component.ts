// reports.component.ts
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { IReport, ReportsService } from 'src/app/services/report.service';
import { Chart, ChartData, ChartOptions, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  reports: IReport[] = [];
  isLoading = true;

  @ViewChild('barChart', { static: false }) barChartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart<'bar', number[], string>;

  constructor(
    private reportsService: ReportsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.reportsService.getCourseDetails().subscribe({
      next: (data) => {
        this.reports = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // Force view update
        this.createBarChart();
      },
      error: (err) => {
        console.error('Error fetching course details:', err);
        this.isLoading = false;
      },
    });
  }

  createBarChart() {
    if (!this.reports.length) {
      return;
    }

    // Prepare labels
    const labels = this.reports.map(
      (report) => `${report.courseName} (Section No: ${report.tsid})`
    );

    // Prepare data for successful and unsuccessful students
    const successfulStudentsData = this.reports.map(
      (report) => report.successfuL_STUDENTS ?? 0
    );
    const unsuccessfulStudentsData = this.reports.map(
      (report) => report.unsuccessfuL_STUDENTS ?? 0
    );

    const data: ChartData<'bar', number[], string> = {
      labels: labels,
      datasets: [
        {
          label: 'Successful Students',
          data: successfulStudentsData,
          backgroundColor: 'blue',
        },
        {
          label: 'Unsuccessful Students',
          data: unsuccessfulStudentsData,
          backgroundColor: 'red',
        },
      ],
    };

    const options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Course Name (Section No)',
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Students',
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          enabled: true,
        },
      },
    };

    const ctx = this.barChartRef.nativeElement.getContext('2d');

    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart<'bar', number[], string>(ctx, {
        type: 'bar',
        data: data,
        options: options,
      });
    } else {
      console.error('Could not get canvas context.');
    }
  }
  
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
