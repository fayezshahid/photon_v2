import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-photocard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './photocard.component.html',
  styleUrl: './photocard.component.css'
})
export class PhotoCardComponent {
  @Input() photo: any;
  imageUrl: string | ArrayBuffer | null = null;

  ngOnInit() {
    // console.log(this.photo);
    this.imageUrl = this.photo.url;
  }

  edit() {
    const form = document.getElementById('form' + this.photo.id) as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const image = formData.get('image') as File;

    this.photo.name = name;
    this.photo.url = image.name;
    this.photo.size = image.size;

    // console.log(this.photo);
  }

  showImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      // this.image = input.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target && e.target.result) {
          this.imageUrl = e.target.result;
          // console.log(this.imageUrl);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeImage() {
    this.imageUrl = null;
  }

  addToTrash() {
    this.photo.isDeleted = true;
  }

  addToArchive() {
    this.photo.isArchived = true;
  }

  toggleFavourites() {
    this.photo.isFavourite = !this.photo.isFavourite;
  }
}
