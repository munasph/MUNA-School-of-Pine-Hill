import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { SCHOOL_INFO } from '../footer/site.data';
import { TUITION_COPY } from './tuition.data';

@Component({
  selector: 'app-tuition-page',
  templateUrl: './tuition.component.html',
  styleUrls: ['./tuition.component.css'],
})
export class TuitionComponent implements OnInit {
  readonly t = TUITION_COPY;
  readonly schoolInfo = SCHOOL_INFO;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Tuition',
      description: `Tuition and financial assistance at ${SCHOOL_INFO.name}. Learn how we make Islamic education accessible to our community.`,
      path:        '/tuition',
    });
  }
}
