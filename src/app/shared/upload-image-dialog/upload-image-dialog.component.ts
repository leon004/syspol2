import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements AfterViewInit, OnDestroy {
  files: File[] = [];
  previews: string[] = [];
  cameraOpen = false;
  stream: MediaStream | null = null;
  currentCamera = 'environment';
  showCameraPreview = false;

  @ViewChild('cameraPreview') cameraPreview!: ElementRef<HTMLVideoElement>;
  @ViewChild('photoCanvas') photoCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(public dialogRef: MatDialogRef<UploadImageDialogComponent>) {}

  ngAfterViewInit() {
    this.dialogRef.afterClosed().subscribe(() => {
      this.closeCamera();
    });
  }

  ngOnDestroy() {
    this.closeCamera();
  }

  onFileSelected(event: any): void {
    const selectedFiles = Array.from(event.target.files) as File[];
    if (this.files.length + selectedFiles.length > 6) {
      alert('No puedes seleccionar más de 6 imágenes.');
      return;
    }

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
          if (this.files.length < 6) {
            this.files.push(file);
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.previews.push(e.target.result);
            };
            reader.readAsDataURL(file);
          } else {
            alert('No puedes seleccionar más de 6 imágenes.');
          }
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

  onAccept(): void {
    this.dialogRef.close(this.files);
  }
}
