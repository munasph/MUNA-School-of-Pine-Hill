import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }     from './components/about/about.component';
import { AcademicComponent }  from './components/academic/academic.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { ContactComponent }   from './components/contact/contact.component';
import { GalleryComponent }   from './components/gallery/gallery.component';
import { FaqComponent }       from './components/faq/faq.component';
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

import { NavbarComponent }            from './components/navbar/navbar.component';
import { FooterComponent }            from './components/footer/footer.component';

import { SectionLabelComponent }       from './components/section-label/section-label.component';
import { GlassButtonComponent }        from './components/glass-button/glass-button.component';
import { GlassCardComponent }          from './components/glass-card/glass-card.component';
import { GlassInputComponent }         from './components/glass-input/glass-input.component';
import { GlassSelectComponent }        from './components/glass-select/glass-select.component';
import { GradientBackgroundComponent } from './components/gradient-background/gradient-background.component';
import { BackToTopComponent }          from './components/back-to-top/back-to-top.component';
import { ScrollToTopComponent }        from './components/scroll-to-top/scroll-to-top.component';
import { ThemeToggleComponent }        from './components/theme-toggle/theme-toggle.component';
import { LightboxComponent }           from './components/lightbox/lightbox.component';

import { RevealOnScrollDirective } from './directives/reveal-on-scroll.directive';
import { CountUpDirective }        from './directives/count-up.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    AboutComponent,
    AcademicComponent,
    AdmissionComponent,
    ContactComponent,
    GalleryComponent,
    FaqComponent,
    PrivacyComponent,
    TermsComponent,
    LoginComponent,
    NotFoundComponent,
    AdminLayoutComponent,
    AdminAdmissionsComponent,
    AdminAdmissionDetailComponent,
    AdminAnnouncementsComponent,
    AdminAnnouncementFormComponent,
    AdminAnnouncementDetailComponent,
    AdminInquiriesComponent,
    AdminInquiryDetailComponent,
    AdminSettingsComponent,
    AdminHubComponent,
    AdminCmsResourceComponent,
    PortalLayoutComponent,
    PortalLoginComponent,
    PortalSignupComponent,
    PortalDashboardComponent,

    NavbarComponent,
    FooterComponent,

    SectionLabelComponent,
    GlassButtonComponent,
    GlassCardComponent,
    GlassInputComponent,
    GlassSelectComponent,
    GradientBackgroundComponent,
    BackToTopComponent,
    ScrollToTopComponent,
    ThemeToggleComponent,
    LightboxComponent,

    RevealOnScrollDirective,
    CountUpDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LucideAngularModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
