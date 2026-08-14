import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ACADEMIC_COPY } from './academic.data';

@Component({
  selector: 'app-academic-page',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css'],
})
export class AcademicComponent implements OnInit {
  readonly t = ACADEMIC_COPY;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Academics',
      description: 'Core subjects and curriculum frameworks at MUNA School of Pine Hill, guided by Pennsylvania Department of Education and Common Core standards.',
      path:        '/academic',
    });
  }
}
