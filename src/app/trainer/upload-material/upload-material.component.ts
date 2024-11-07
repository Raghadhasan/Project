import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-material',
  templateUrl: './upload-material.component.html',
  styleUrls: ['./upload-material.component.css']
})
export class UploadMaterialComponent {
  display_Material: any;
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadMaterial(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.http.post('https://localhost:7276/api/Material/uploadMaterial', formData).subscribe(
        (response: any) => {
          this.display_Material = response.materialName;
          alert('Material uploaded successfully!');
          console.log(response);
        },
        (error) => {
          alert('Failed to upload material.');
          console.error(error);
        }
      );
    } else {
      alert('Please select a file before uploading.');
    }
  }
}
