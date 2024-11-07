import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MentorService {


  display_Material: any;
  http: any;
  message: string | undefined;

uploadAttachment(file: FormData) {
  this.http.post('https://localhost:5000/api/Course/uploadMaterial', file).subscribe(
    (resp: any) => {
      this.display_Material = resp.materialName;
    },
    (    err: any) => {
      console.error('Error uploading material', err);
    }
  );
   
}

uploadAssignment(file: FormData): Observable<any> {
  return this.http.post('https://localhost:5000/api/Course/uploadAssignment', file);
}




}
