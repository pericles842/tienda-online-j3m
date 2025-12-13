import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Validator para que un formulario tenga o bien una imagen o una url de imagen
 *
 * En el caso de crear un grupo, es obligatorio subir una imagen.
 * En el caso de editar un grupo, se permite subir una imagen o una url de imagen.
 *
 * @returns {null} si el formulario es válido o un objeto con la clave "fileOrUrlRequired" si no es válido
 */
export function fileOrUrlValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const image = control.get('image')?.value;
    const url_img = control.get('url_img')?.value;

    // Crear: debe haber image
    // Editar: puede haber image o url_img
    if (!image && !url_img) {
      return { fileOrUrlRequired: true };
    }

    return null;
  };
}
