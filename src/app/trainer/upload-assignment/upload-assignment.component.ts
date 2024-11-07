import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-assignment',
  templateUrl: './upload-assignment.component.html',
  styleUrls: ['./upload-assignment.component.css']
})
export class UploadAssignmentComponent {

    uploadForm: FormGroup;
selectedFile: any;
  http: any;
  baseUrl: any;
  
    constructor(private formBuilder: FormBuilder) {
      this.uploadForm = this.formBuilder.group({
        assignmentFile: [null]
      });
    }
  
    onFileSelect(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        this.uploadForm.patchValue({
          assignmentFile: fileInput.files[0]
        });
      }
    }
  
    onSubmit() {
      if (this.uploadForm.valid) {
        const fileData = this.uploadForm.get('assignmentFile')?.value;
        console.log('File uploaded:', fileData);
       
      }
    }
    uploadAssignment(): void {
      if (!this.selectedFile) {
        console.error('No file selected');
        return;
      }
    
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.uploadMaterial(formData);
    }
    

    uploadMaterial(formData: FormData): Observable<any> {
      return this.http.post(`${this.baseUrl}`, formData);
    }
    
  }


