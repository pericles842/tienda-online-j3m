import { Component } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-dynamic-upload',
  imports: [],
  templateUrl: './dynamic-upload.html',
  styleUrl: './dynamic-upload.scss'
})
export class DynamicUpload {
  previewUrl: string | ArrayBuffer | null = null;
  fileName: string = '';

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.fileName = file.name;

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }
}
