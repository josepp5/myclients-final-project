import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AuthGuardService } from './app/services/auth-guard.service';


import { ServiceWorkerModule } from '@angular/service-worker';

if (environment.production) {
  enableProdMode();
}

// Declarations of different modules and providers that this app needs
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AngularFireAuthModule),
    importProvidersFrom(AuthGuardService),
    importProvidersFrom(AngularFirestoreModule.enablePersistence()),
    // PWA module providers
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      })),
    provideRouter(routes),
    // Firebase Module providers
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    ),
  ],}
  );

  defineCustomElements(window);

  