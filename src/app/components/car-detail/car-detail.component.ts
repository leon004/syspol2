import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfractionService } from '../../services/infraction.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  infractionDetails: any = {};
  images: string[] = [];
  selectedImageIndex: number = 0;

  constructor(private route: ActivatedRoute, private infractionService: InfractionService) {}

  ngOnInit() {
    const infractionId = this.route.snapshot.paramMap.get('id');
    this.getInfractionDetails(infractionId);
  }

  getInfractionDetails(id: string | null) {
    if (id) {
      this.infractionService.getInfractionById(parseInt(id)).subscribe(
        (response: any) => {
          this.infractionDetails = response;
          this.images = response.imagenes ? response.imagenes.split(',') : [];
        },
        (error: any) => {
          console.error('Error fetching infraction details:', error);
        }
      );
    }
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }
}
