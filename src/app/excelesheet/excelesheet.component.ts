import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excelesheet',
  templateUrl: './excelesheet.component.html',
  styleUrls: ['./excelesheet.component.css']
})
export class ExcelesheetComponent {
  data: unknown[] | undefined;



  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });


      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];


        this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        console.log(this.data);
    };

    reader.readAsBinaryString(file);
  }

}
