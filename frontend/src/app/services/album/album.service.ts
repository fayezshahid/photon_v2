import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Album {
  id: number;
  name: string;
  date: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albums: Album[] = [];
  private albumsSubject = new BehaviorSubject<Album[]>([]);
  private nextId = 1;

  constructor() {
    // Initialize with some sample data if needed
    this.loadSampleData();
  }

  private loadSampleData(): void {
    const sampleAlbums: Album[] = [
      {
        id: 1,
        name: 'Vacation 2024',
        date: new Date().toISOString(),
        size: 25600000 // 25.6 MB
      },
      {
        id: 2,
        name: 'Family Photos',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        size: 45300000 // 45.3 MB
      }
    ];
    
    this.albums = sampleAlbums;
    this.nextId = 3;
    this.albumsSubject.next([...this.albums]);
  }

  getAlbums(): Observable<Album[]> {
    return this.albumsSubject.asObservable();
  }

  addAlbum(albumData: Omit<Album, 'id'>): void {
    const newAlbum: Album = {
      ...albumData,
      id: this.nextId++
    };
    
    this.albums.push(newAlbum);
    this.albumsSubject.next([...this.albums]);
  }

  updateAlbum(id: number, albumData: Partial<Album>): void {
    const index = this.albums.findIndex(album => album.id === id);
    if (index !== -1) {
      this.albums[index] = { ...this.albums[index], ...albumData };
      this.albumsSubject.next([...this.albums]);
    }
  }

  deleteAlbum(id: number): void {
    this.albums = this.albums.filter(album => album.id !== id);
    this.albumsSubject.next([...this.albums]);
  }

  getAlbumById(id: number): Album | undefined {
    return this.albums.find(album => album.id === id);
  }

  sortAlbums(albums: Album[], sortBy: string, order: string): Album[] {
    const sorted = [...albums].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy.toLowerCase()) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        default:
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      
      return order === 'asc' ? comparison : -comparison;
    });
    
    return sorted;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}