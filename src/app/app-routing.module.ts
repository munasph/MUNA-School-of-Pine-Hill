import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './components/home/home.component';
import { AboutComponent }     from './components/about/about.component';
import { AcademicComponent }  from './components/academic/academic.component';
import { AdmissionComponent } from './components/admission/admission.component';
import { ContactComponent }   from './components/contact/contact.component';
import { GalleryComponent }   from './components/gallery/gallery.component';
import { PrivacyComponent }   from './components/privacy/privacy.component';
import { TermsComponent }     from './components/terms/terms.component';
import { NotFoundComponent }  from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '',          component: HomeComponent,      pathMatch: 'full' },
  { path: 'about',     component: AboutComponent     },
  { path: 'academic',  component: AcademicComponent  },
  { path: 'admission', component: AdmissionComponent },
  { path: 'contact',   component: ContactComponent   },
  { path: 'gallery',   component: GalleryComponent   },
  { path: 'privacy',   component: PrivacyComponent   },
  { path: 'terms',     component: TermsComponent     },
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
