import { Component, model, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { FormatArrayStringsPipe } from '../../../shared/pipes/format-array-strings.pipe';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgClass, FormatArrayStringsPipe],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss',
})
export class DragAndDropComponent {
  sizeErrorMessage = signal<string[]>([]);

  uploading = signal(false);

  preview = model<any[]>([]);

  images = model<File[]>([]);

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event?.dataTransfer?.files) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.uploading.set(true);
  }

  private uploadFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 204800) {
        this.sizeErrorMessage.update((x) => x.concat(file.name));

        const timer = setTimeout(() => {
          this.sizeErrorMessage.set([]);
          clearTimeout(timer);
        }, 6000);

        continue;
      }
      this.images().push(files[i]);

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.addEventListener('load', (img) => {
        this.preview().push({ img: img.target?.result });
      });
    }

    this.uploading.set(false);
  }

  removeImage(index: number): void {
    this.images().splice(index, 1);
    this.preview().splice(index, 1);
  }
}
