import { Component } from '@angular/core';
import { LayoutGrid, LucideIconData } from 'lucide-angular';

import { CMS_ADMIN_MODULES } from '../../../config/cms-admin.config';
import type { CmsAdminModuleConfig } from '../../../config/cms-admin.config';

@Component({
  selector: 'app-admin-hub',
  templateUrl: './admin-hub.component.html',
  styleUrls: ['../admin-shared.css', './admin-hub.component.css'],
})
export class AdminHubComponent {
  readonly gridIcon: LucideIconData = LayoutGrid;
  readonly modules: CmsAdminModuleConfig[] = CMS_ADMIN_MODULES;

  coreLinks = [
    { path: '/admin/admissions', label: 'Admissions' },
    { path: '/admin/announcements', label: 'Announcements' },
    { path: '/admin/inquiries', label: 'Inquiries' },
    { path: '/admin/settings', label: 'Site settings' },
  ];
}
