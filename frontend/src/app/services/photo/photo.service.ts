import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Photo {
  id: number;
  name: string;
  url: string;
  date: string;
  size: number;
  isFavourite: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  albumId: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photosSubject = new BehaviorSubject<Photo[]>([
    {
      id: 1,
      name: 'Photo 1',
      url: 'favicon.webp',
      date: '6/9/2024, 4:48:51 PM',
      size: 10300,
      isFavourite: false,
      isArchived: false,
      isDeleted: false,
      albumId: 1, 
    },
    {
      id: 2,
      name: 'Photo 2',
      url: 'favicon.webp',
      date: '6/9/2024, 4:48:52 PM',
      size: 11111,
      isFavourite: false,
      isArchived: false,
      isDeleted: false,
      albumId: 1, 
    },
    {
      id: 3,
      name: 'Photo 3',
      url: 'favicon.webp',
      date: '6/9/2024, 4:48:53 PM',
      size: 20000,
      isFavourite: false,
      isArchived: false,
      isDeleted: false,
      albumId: 2,
    },
    {
      id: 4,
      name: 'Photo 4',
      url: 'favicon.webp',
      date: '6/9/2024, 4:48:54 PM',
      size: 15000,
      isFavourite: false,
      isArchived: false,
      isDeleted: false,
      albumId: null, 
    },
    // Add more sample data
  ]);

  public photos$ = this.photosSubject.asObservable();

  constructor() { }

  // Get all photos
  getAllPhotos(): Observable<Photo[]> {
    return this.photos$;
  }

  // Get photos for specific views
  getActivePhotos(): Observable<Photo[]> {
    return new Observable(observer => {
      this.photos$.subscribe(photos => {
        observer.next(photos.filter(photo => !photo.isDeleted && !photo.isArchived));
      });
    });
  }

  getFavouritePhotos(): Observable<Photo[]> {
    return new Observable(observer => {
      this.photos$.subscribe(photos => {
        observer.next(photos.filter(photo => photo.isFavourite && !photo.isDeleted));
      });
    });
  }

  getArchivedPhotos(): Observable<Photo[]> {
    return new Observable(observer => {
      this.photos$.subscribe(photos => {
        observer.next(photos.filter(photo => photo.isArchived && !photo.isDeleted));
      });
    });
  }

  getDeletedPhotos(): Observable<Photo[]> {
    return new Observable(observer => {
      this.photos$.subscribe(photos => {
        observer.next(photos.filter(photo => photo.isDeleted));
      });
    });
  }

  getPhotosByAlbumId(albumId: number): Observable<Photo[]> {
    return new Observable(observer => {
      this.photos$.subscribe(photos => {
        observer.next(photos.filter(photo => photo.albumId === albumId && !photo.isDeleted));
      });
    });
  }

  // Add new photo
  addPhoto(photo: Omit<Photo, 'id'>): void {
    const currentPhotos = this.photosSubject.value;
    const newPhoto: Photo = {
      ...photo,
      id: Math.max(...currentPhotos.map(p => p.id), 0) + 1
    };
    this.photosSubject.next([...currentPhotos, newPhoto]);
  }

  // Update photo
  updatePhoto(id: number, updates: Partial<Photo>): void {
    const currentPhotos = this.photosSubject.value;
    const updatedPhotos = currentPhotos.map(photo => 
      photo.id === id ? { ...photo, ...updates } : photo
    );
    this.photosSubject.next(updatedPhotos);
  }

  // Toggle favourite
  toggleFavourite(id: number): void {
    const currentPhotos = this.photosSubject.value;
    const photo = currentPhotos.find(p => p.id === id);
    if (photo) {
      this.updatePhoto(id, { isFavourite: !photo.isFavourite });
    }
  }

  //Toggle archive
  toggleArchive(id: number): void {
    const currentPhotos = this.photosSubject.value;
    const photo = currentPhotos.find(p => p.id === id);
    if (photo) {
      this.updatePhoto(id, { isArchived: !photo.isArchived });
    }
  }

  // Delete photo (move to trash)
  toggleDelete(id: number): void {
    const currentPhotos = this.photosSubject.value;
    const photo = currentPhotos.find(p => p.id === id);
    if (photo) {
      this.updatePhoto(id, { isDeleted: !photo.isDeleted });
    }
  }

  // Restore photo
  restorePhoto(id: number): void {
    this.updatePhoto(id, { isDeleted: false, isArchived: false });
  }

  // Permanently delete photo
  permanentlyDeletePhoto(id: number): void {
    const currentPhotos = this.photosSubject.value;
    const filteredPhotos = currentPhotos.filter(photo => photo.id !== id);
    this.photosSubject.next(filteredPhotos);
  }

  // Sort photos
  sortPhotos(photos: Photo[], arrange: string, order: string): Photo[] {
    return [...photos].sort((a, b) => {
      let comparison = 0;
      
      if (arrange === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (arrange === 'date') {
        comparison = a.date.localeCompare(b.date);
      } else if (arrange === 'size') {
        comparison = a.size - b.size;
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
  }

  removePhotoFromAlbum(photoId: number): void {
    const currentPhotos = this.photosSubject.value;
    const updatedPhotos = currentPhotos.map(photo =>
      photo.id === photoId ? { ...photo, albumId: null } : photo
    );
    this.photosSubject.next(updatedPhotos);
  }
}