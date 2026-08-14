import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { HOME_COPY } from '../home/home.data';

@Component({
  selector: 'app-open-house-page',
  templateUrl: './open-house.component.html',
  styleUrls: ['./open-house.component.css'],
})
export class OpenHouseComponent implements OnInit {
  readonly t = HOME_COPY.campaign;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Open House — Pre-K & Kindergarten',
      description: 'Join MUNA School of Pine Hill for our Pre-K & Kindergarten open house. Limited spots available.',
      path:        '/open-house',
    });
  }
}
