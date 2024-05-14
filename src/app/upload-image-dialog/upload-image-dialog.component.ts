import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseStorageService } from '../firebase-storage.service';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements AfterViewInit {
  files: File[] = [];
  previews: string[] = [];
  cameraOpen = false;
  stream: MediaStream | null = null;
  currentCamera = 'environment';
  showCameraPreview = false;

  @ViewChild('cameraPreview') cameraPreview!: ElementRef<HTMLVideoElement>;
  @ViewChild('photoCanvas') photoCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    private storageService: FirebaseStorageService
  ) {}

  ngAfterViewInit() {}

  onFileSelected(event: any): void {
    const selectedFiles = Array.from(event.target.files) as File[];

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

  toggleCameraPreview() {
    this.showCameraPreview = !this.showCameraPreview;
    if (this.showCameraPreview) {
      this.openCamera();
    } else {
      this.closeCamera();
    }
  }

  async openCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: this.currentCamera } });
      this.cameraPreview.nativeElement.srcObject = this.stream;
    } catch (error) {
      console.error('Error accessing the camera', error);
    }
  }

  switchCamera() {
    this.currentCamera = this.currentCamera === 'environment' ? 'user' : 'environment';
    this.closeCamera();
    this.openCamera();
  }

  capturePhoto() {
    if (this.stream) {
      const video = this.cameraPreview.nativeElement;
      const canvas = this.photoCanvas.nativeElement;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d')!;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
          this.files.push(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }, 'image/jpeg');
    }
  }

  closeCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.showCameraPreview = false;
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
