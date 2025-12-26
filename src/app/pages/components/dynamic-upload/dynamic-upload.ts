import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-dynamic-upload',
  imports: [CommonModule, Message],
  templateUrl: './dynamic-upload.html',
  styleUrl: './dynamic-upload.scss'
})
export class DynamicUpload {
  @Input() widthFull: boolean = false;
  @Input() label: string = 'Subir imagen';
  
  @Input() validator: boolean = false;
  @Input() previewUrl: string | ArrayBuffer | null = null;
  @Output() fileSelected = new EventEmitter<File>();
  fileName: string = '';

  /**
   *Valida si existe url o un file
   *
   * @readonly
   * @type {boolean}
   * @memberof DynamicUpload
   */
  get condition_validator(): boolean {
    return this.validator;
  }

  get dateToday() {
    return new Date().getMinutes();
  }

  /**
   *Emite el archivo seleccionado
   *
   * @param {Event} event
   * @memberof DynamicUpload
   */
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.fileName = file.name;

      //*emitimos el archivo
      this.fileSelected.emit(file);

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }
}
