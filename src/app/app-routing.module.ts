import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './pages/home/home.component';
import { AboutComponent }     from './pages/about/about.component';
import { AcademicComponent }  from './pages/academic/academic.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { ContactComponent }   from './pages/contact/contact.component';
import { GalleryComponent }   from './pages/gallery/gallery.component';
import { PrivacyComponent }   from './pages/privacy/privacy.component';
import { TermsComponent }     from './pages/terms/terms.component';
import { NotFoundComponent }  from './pages/not-found/not-found.component';

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
