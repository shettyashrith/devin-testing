import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Participant {
  id: number;
  name: string;
  assetGeneration: string;
  status: 'Yet-to-start' | 'In-progress' | 'Done' | 'Failed';
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  participants: Participant[] = [
    { id: 1, name: 'Alice Johnson', assetGeneration: 'Logo Design', status: 'Done' },
    { id: 2, name: 'Bob Smith', assetGeneration: 'Banner Ads', status: 'In-progress' },
    { id: 3, name: 'Charlie Brown', assetGeneration: 'Social Media Kit', status: 'Yet-to-start' },
    { id: 4, name: 'Diana Prince', assetGeneration: 'Product Photos', status: 'Failed' },
    { id: 5, name: 'Edward Norton', assetGeneration: 'Video Intro', status: 'In-progress' },
    { id: 6, name: 'Fiona Apple', assetGeneration: 'Podcast Cover', status: 'Done' },
    { id: 7, name: 'George Lucas', assetGeneration: 'Infographic', status: 'Yet-to-start' },
    { id: 8, name: 'Hannah Montana', assetGeneration: 'Email Template', status: 'Failed' },
    { id: 9, name: 'Ivan Drago', assetGeneration: 'Presentation Deck', status: 'Done' },
    { id: 10, name: 'Julia Roberts', assetGeneration: 'Brochure Layout', status: 'In-progress' },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Yet-to-start': return 'status-yet-to-start';
      case 'In-progress': return 'status-in-progress';
      case 'Done': return 'status-done';
      case 'Failed': return 'status-failed';
      default: return '';
    }
  }
}
