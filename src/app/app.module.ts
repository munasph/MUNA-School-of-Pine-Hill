import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule } from 'lucide-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }     from './components/about/about.component';
import { AcademicComponent }  from './components/academic/academic.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { ContactComponent }   from './components/contact/contact.component';
import { GalleryComponent }   from './components/gallery/gallery.component';
import { PrivacyComponent }   from './components/privacy/privacy.component';
import { TermsComponent }     from './components/terms/terms.component';
import { NotFoundComponent }  from './components/not-found/not-found.component';

import { NavbarComponent }            from './components/navbar/navbar.component';
import { FooterComponent }            from './components/footer/footer.component';

import { SectionLabelComponent }      from './components/ui/section-label/section-label.component';
import { GlassButtonComponent }       from './components/ui/glass-button/glass-button.component';
import { GlassCardComponent }         from './components/ui/glass-card/glass-card.component';
import { GlassInputComponent }        from './components/ui/glass-input/glass-input.component';
import { GlassSelectComponent }       from './components/ui/glass-select/glass-select.component';
import { GradientBackgroundComponent } from './components/ui/gradient-background/gradient-background.component';
import { BackToTopComponent }         from './components/ui/back-to-top/back-to-top.component';
import { ScrollToTopComponent }       from './components/ui/scroll-to-top/scroll-to-top.component';
import { ThemeToggleComponent }       from './components/ui/theme-toggle/theme-toggle.component';
import { LightboxComponent }          from './components/ui/lightbox/lightbox.component';

import { RevealOnScrollDirective }    from './directives/reveal-on-scroll.directive';
import { CountUpDirective }           from './directives/count-up.directive';
import { ParallaxScrollDirective }    from './directives/parallax-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    AboutComponent,
    AcademicComponent,
    AdmissionComponent,
    ContactComponent,
    GalleryComponent,
    PrivacyComponent,
    TermsComponent,
    NotFoundComponent,

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
    ParallaxScrollDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LucideAngularModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
