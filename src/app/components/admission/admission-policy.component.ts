import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ADMISSION_POLICY_COPY } from './admission-policy.data';

@Component({
  selector: 'app-admission-policy-page',
  templateUrl: './admission-policy.component.html',
  styleUrls: ['./admission-policy.component.css'],
})
export class AdmissionPolicyComponent implements OnInit {
  readonly t = ADMISSION_POLICY_COPY;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title:       'Admission Policy',
      description: 'Admission policy, criteria, and registration information for MUNA School of Pine Hill.',
      path:        '/admission/policy',
    });
  }
}
