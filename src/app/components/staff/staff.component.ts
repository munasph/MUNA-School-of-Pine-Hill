import { Component, HostListener, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { STAFF_COPY, type StaffTeacher } from './staff.data';

@Component({
  selector: 'app-staff-page',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  readonly t = STAFF_COPY;
  flyerViewerOpen = false;
  activeFlyer: StaffTeacher | null = null;

  constructor(private readonly seo: SeoService) {}

  ngOnInit(): void {
    this.seo.update({
      title: 'Staff',
      description:
        'Meet Pre-K and Kindergarten teachers at MUNA School of Pine Hill, including Arabic, Qur’an, Islamic Studies, and Kindergarten classroom educators.',
      path: '/staff',
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.flyerViewerOpen) {
      this.closeFlyerViewer();
    }
  }

  openFlyerViewer(teacher: StaffTeacher): void {
    this.activeFlyer = teacher;
    this.flyerViewerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeFlyerViewer(): void {
    this.flyerViewerOpen = false;
    this.activeFlyer = null;
    document.body.style.overflow = '';
  }
}
