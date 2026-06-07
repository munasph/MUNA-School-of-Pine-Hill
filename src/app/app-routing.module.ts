import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }     from './components/about/about.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { AdmissionPolicyComponent } from './components/admission/admission-policy.component';
import { ContactComponent }   from './components/contact/contact.component';
import { GalleryComponent }   from './components/gallery/gallery.component';
import { FaqComponent }       from './components/faq/faq.component';
import { TuitionComponent }   from './components/tuition/tuition.component';
import { PrivacyComponent }   from './components/privacy/privacy.component';
import { TermsComponent }     from './components/terms/terms.component';
import { LoginComponent }     from './components/login/login.component';
import { NotFoundComponent }  from './components/not-found/not-found.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminAdmissionsComponent } from './components/admin/admin-admissions/admin-admissions.component';
import { AdminAdmissionDetailComponent } from './components/admin/admin-admission-detail/admin-admission-detail.component';
import { AdminAnnouncementsComponent } from './components/admin/admin-announcements/admin-announcements.component';
import { AdminAnnouncementFormComponent } from './components/admin/admin-announcement-form/admin-announcement-form.component';
import { AdminAnnouncementDetailComponent } from './components/admin/admin-announcement-detail/admin-announcement-detail.component';
import { AdminInquiriesComponent } from './components/admin/admin-inquiries/admin-inquiries.component';
import { AdminInquiryDetailComponent } from './components/admin/admin-inquiry-detail/admin-inquiry-detail.component';
import { AdminSettingsComponent } from './components/admin/admin-settings/admin-settings.component';
import { AdminHubComponent } from './components/admin/admin-hub/admin-hub.component';
import { AdminCmsResourceComponent } from './components/admin/admin-cms-resource/admin-cms-resource.component';
import { PortalLayoutComponent } from './components/portal/portal-layout/portal-layout.component';
import { PortalLoginComponent } from './components/portal/portal-login/portal-login.component';
import { PortalSignupComponent } from './components/portal/portal-signup/portal-signup.component';
import { PortalDashboardComponent } from './components/portal/portal-dashboard/portal-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { portalAuthGuard } from './guards/portal-auth.guard';

const routes: Routes = [
  { path: '',          component: HomeComponent,      pathMatch: 'full' },
  { path: 'about',     component: AboutComponent     },
  { path: 'academic',  redirectTo: '/admission', pathMatch: 'full' },
  { path: 'admission',         component: AdmissionComponent       },
  { path: 'admission/policy',  component: AdmissionPolicyComponent },
  { path: 'tuition',           component: TuitionComponent       },
  { path: 'contact',   component: ContactComponent   },
  { path: 'gallery',   redirectTo: '/', pathMatch: 'full' },
  { path: 'faq',       component: FaqComponent       },
  { path: 'login',     component: LoginComponent     },
  { path: 'signup',    redirectTo: 'portal/signup', pathMatch: 'full' },
  { path: 'portal/login',  component: PortalLoginComponent },
  { path: 'portal/signup', component: PortalSignupComponent },
  {
    path: 'portal',
    component: PortalLayoutComponent,
    canActivate: [portalAuthGuard],
    children: [
      { path: '', component: PortalDashboardComponent },
    ],
  },
  { path: 'privacy',   component: PrivacyComponent   },
  { path: 'terms',     component: TermsComponent     },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'admissions', pathMatch: 'full' },
      { path: 'admissions', component: AdminAdmissionsComponent },
      { path: 'admissions/:id', component: AdminAdmissionDetailComponent },
      { path: 'announcements', component: AdminAnnouncementsComponent },
      { path: 'announcements/new', component: AdminAnnouncementFormComponent },
      { path: 'announcements/:id', component: AdminAnnouncementDetailComponent },
      { path: 'inquiries', component: AdminInquiriesComponent },
      { path: 'inquiries/:id', component: AdminInquiryDetailComponent },
      { path: 'settings', component: AdminSettingsComponent },
      { path: 'hub', component: AdminHubComponent },
      { path: 'modules/:resource', component: AdminCmsResourceComponent },
      { path: 'cms/:resource', redirectTo: 'modules/:resource', pathMatch: 'full' },
    ],
  },
  { path: '**',        component: NotFoundComponent  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling:           'enabled',
      scrollPositionRestoration: 'enabled',
      scrollOffset:              [0, 80],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
