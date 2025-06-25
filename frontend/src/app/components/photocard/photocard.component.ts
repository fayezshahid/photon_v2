import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PhotoService } from '../../services/photo/photo.service';

interface Friend {
  id: number;
  email: string;
}

interface Album {
  id: number;
  name: string;
}

@Component({
  selector: 'app-photocard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './photocard.component.html',
  styleUrl: './photocard.component.css',
})

export class PhotoCardComponent {
  @Input() photo: any;
  @Output() imageEditted = new EventEmitter<void>();
  @Output() permanentlyDeletePhoto = new EventEmitter<void>();

  imageUrl: string | ArrayBuffer | null = null;

  // Sample data for friends and albums
  friends: Friend[] = [
    { id: 1, email: 'friend1@example.com' },
    { id: 2, email: 'friend2@example.com' },
    { id: 3, email: 'friend3@example.com' }
  ];

  albums: Album[] = [
    { id: 1, name: 'Vacation 2024' },
    { id: 2, name: 'Family Photos' },
    { id: 3, name: 'Nature Collection' }
  ];

  // Search and filter properties
  shareSearchValue: string = '';
  albumSearchValue: string = '';
  filteredShareFriends: Friend[] = [];
  filteredAlbums: Album[] = [];

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    this.imageUrl = this.photo.url;
    this.filteredShareFriends = [...this.friends];
    this.filteredAlbums = [...this.albums];
  }

  isInAlbumRoute(): boolean {
    return this.router.url.includes('/album');
  }

  editImage() {
    // console.log(this.imageUrl);
    const form = document.getElementById('form' + this.photo.id) as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const image = formData.get('image') as File;

    this.photo.name = name;
    // console.log(image);
    if (image) {
      this.photo.url = image.name;
      this.photo.size = image.size;
    }

    this.imageEditted.emit();
  }

  showImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeImage() {
    this.imageUrl = null;
  }

  toggleDelete() {
    this.photoService.toggleDelete(this.photo.id);
    this.imageEditted.emit();
  }

  toggleArchive() {
    this.photoService.toggleArchive(this.photo.id);
    this.imageEditted.emit(); // <== Trigger reload
  }

  toggleFavourites() {
    this.photoService.toggleFavourite(this.photo.id);
    this.imageEditted.emit(); // <== Trigger reload
  }

  removeFromAlbum() {
    this.photoService.removePhotoFromAlbum(this.photo.id);
    this.imageEditted.emit(); // <== Trigger reload
  }

  addToAlbum() {
    // this.photoService.addToAlbum(this.photo.id);
    // this.imageEditted.emit(); // <== Trigger reload
  } 

  // Search functions
  searchFriends(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredShareFriends = this.friends.filter(friend => 
      friend.email.toLowerCase().includes(value)
    );
  }

  searchAlbums(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredAlbums = this.albums.filter(album => 
      album.name.toLowerCase().includes(value)
    );
  }

  // Share functionality
  shareWithFriend(friendId: number): void {
    const friend = this.friends.find(f => f.id === friendId);
    if (friend) {
      console.log(`Sharing photo "${this.photo.name}" with ${friend.email}`);
      // Add your share logic here
      // You might want to emit an event or call a service
      this.showMessage(`Photo shared with ${friend.email}`, 'success');
    }
  }

  // Album functionality
  toggleAlbum(albumId: number): void {
    if (this.photo.albumId === albumId) {
      // Remove from album
      this.photo.albumId = null;
      const album = this.albums.find(a => a.id === albumId);
      this.showMessage(`Photo removed from ${album?.name}`, 'success');
    } else {
      // Add to album
      this.photo.albumId = albumId;
      const album = this.albums.find(a => a.id === albumId);
      this.showMessage(`Photo added to ${album?.name}`, 'success');
    }
  }

  isInAlbum(): boolean {
    return this.photo.albumId !== null;
  }

  // Helper method for showing messages
  private showMessage(message: string, type: string): void {
    console.log(`${type.toUpperCase()}: ${message}`);
    // You can replace this with actual toast notification
  }

}
