import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseStorageService } from '../firebase-storage.service';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent {
  files: File[] = [];
  previews: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    private storageService: FirebaseStorageService
  ) {}

  onFileSelected(event: any): void {
    const selectedFiles = Array.from(event.target.files) as File[];
    this.files = [];
    this.previews = [];

    for (const file of selectedFiles) {
      if (file.type.startsWith('image/')) {
        this.files.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number): void {
    this.files.splice(index, 1);
    this.previews.splice(index, 1);
  }

  async onUpload() {
    const links = [];
    for (const file of this.files) {
      const link = await this.storageService.uploadFile(file);
      links.push(link);
    }
    this.dialogRef.close(links.join(','));
  }
}
