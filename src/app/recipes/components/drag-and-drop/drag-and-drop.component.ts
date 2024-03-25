import { Component, model, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from '@angular/common';
import { FormatArrayStringsPipe } from '../../../shared/pipes/format-array-strings.pipe';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgClass, FormatArrayStringsPipe],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss'
})
export class DragAndDropComponent {

  toBigFiles = signal<string[]>([])

  uploading = signal(false);

  images = model<HTMLImageElement[]>([]);

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

  private uploadFiles(img: FileList) {
    for (let i = 0; i < img.length; i++) {
      const file = img[i];
      if (file.size > 204800) {
        this.toBigFiles.update(x => x.concat(file.name));

        const timer = setTimeout(() => {
          this.toBigFiles.set([]);
          clearTimeout(timer);
        }, 6000);
        
        continue;
      };
      let reader = new FileReader();
      reader.addEventListener('load', (img) => {
        let image = new Image();
        image.title = file?.name;
        image.src = img.target?.result as string;
        this.images.set(this.images().concat(image));
      });

      reader.readAsDataURL(file);
    }
    this.uploading.set(false);
  }

  removeImage(index: number) {    
    this.images().splice(index, 1);
    this.images.set([...this.images()]);
  }

}
