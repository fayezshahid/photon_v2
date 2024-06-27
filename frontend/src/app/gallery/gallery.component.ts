import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoCardComponent } from '../photocard/photocard.component';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, PhotoCardComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  photoCards = [
    { id: 1, name: 'Photo 1', url: 'favicon.webp', date: '6/9/2024, 4:48:51 PM', size: 10300, isFavourite: false, isArchived: false, isDeleted: false },
    { id: 2, name: 'Photo 2', url: 'favicon.webp', date: '6/9/2024, 4:48:52 PM', size: 11111, isFavourite: false, isArchived: false, isDeleted: false },
    { id: 3, name: 'Photo 3', url: 'favicon.webp', date: '6/9/2024, 4:48:53 PM', size: 20000, isFavourite: false, isArchived: false, isDeleted: false }
    // Add more photo objects as needed
  ];

  imageUrl: string | ArrayBuffer | null = null;

  arrange: string = 'date';
  order: string = 'desc';

  constructor() {
    this.arrangeBy(this.arrange, this.order)
  }

  upload() {
    const form = document.getElementById('form') as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const image = formData.get('image') as File;
    console.log(image)

    const newPhoto = {
      id: this.photoCards.length + 1,
      name: name,
      url: image.name,
      date: new Date().toLocaleString(),
      size: image.size,
      isFavourite: false,
      isArchived: false,
      isDeleted: false
    };
    this.photoCards.push(newPhoto);
  }

  arrangeBy(arrange: string, order: string) {
    console.log(order);
    this.arrange = arrange;
    this.order = order;
    if (arrange === 'name') {
      this.photoCards.sort((a, b) => {
        if (order == 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    } else if (arrange === 'date') {
      this.photoCards.sort((a, b) => {
        if (order == 'asc') {
          return a.date.localeCompare(b.date);
        } else {
          return b.date.localeCompare(a.date);
        }
      });
    }
  }

  showImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      // this.image = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target && e.target.result) {
          this.imageUrl = e.target.result;
          // event.target.value = '';
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
    // input.value = '';
  }

  removeImage() {
    (document.getElementById('image') as HTMLInputElement).value = '';
    this.imageUrl = null;
  }

}
