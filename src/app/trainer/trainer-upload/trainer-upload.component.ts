import { Component } from '@angular/core';

@Component({
  selector: 'app-trainer-upload',
  templateUrl: './trainer-upload.component.html',
  styleUrls: ['./trainer-upload.component.css']
})
export class TrainerUploadComponent {

  selectedFiles: File[] = [];
  uploadMessage: string = '';

  onFileSelect(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  onUpload() {
    if (this.selectedFiles.length > 0) {
      this.uploadMessage = `${this.selectedFiles.length} files uploaded successfully!`;
    }
  }
}
