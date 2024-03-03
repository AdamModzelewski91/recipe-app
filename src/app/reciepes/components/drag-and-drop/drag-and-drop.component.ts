import { Component, input, model, signal } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-drag-and-drop',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss'
})
export class DragAndDropComponent {

  images = model<HTMLImageElement[]>([]);

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event?.dataTransfer?.files) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  private uploadFiles(img: FileList) {
    for (let i = 0; i < img.length; i++) {
      const file = img[i];
      let reader = new FileReader();
      reader.addEventListener('load', (obj) => {
        let image = new Image();
        image.title = file?.name;
        image.src = obj.target?.result as string;
        this.images.set(this.images().concat(image))
      });

      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {    
    this.images().splice(index, 1);
    this.images.set([...this.images()]);
  }

}
