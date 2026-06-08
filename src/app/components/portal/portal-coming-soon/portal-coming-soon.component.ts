import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { SCHOOL_INFO } from '../../footer/site.data';

@Component({
  selector: 'app-portal-coming-soon',
  templateUrl: './portal-coming-soon.component.html',
  styleUrls: ['./portal-coming-soon.component.css'],
})
export class PortalComingSoonComponent implements OnInit {
  readonly schoolInfo = SCHOOL_INFO;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Family Portal',
      description: 'The MUNA School family and student portal is coming soon.',
      path:        '/portal',
    });
  }
}
