# MyClients

A cross-platform client & invoicing management app built with **Ionic + Angular**, deployable as a native **Android/iOS** app (via Capacitor) or as a **Progressive Web App**. Built as my final project for the Higher Diploma in Multiplatform App Development (DAM).

## Features

- **Authentication** — email/password sign-up and login (Firebase Authentication), with route guards protecting private pages
- **Client management** — create, view, update and organize clients, with photo capture/upload per client (device camera via Capacitor)
- **Client groups** — categorize clients into groups for easier organization
- **Invoices** — track invoices associated with each client
- **Push notifications** — native push notifications via Capacitor
- **Offline-friendly PWA** — installable as a Progressive Web App with a service worker
- **Native builds** — packaged for Android and iOS through Capacitor, alongside the web/PWA build

## Tech stack

- **Framework:** Angular 15, Ionic 7 (tabs-based navigation)
- **Native runtime:** Capacitor 4 (Camera, Filesystem, Push Notifications, Haptics, Status Bar, Keyboard)
- **Backend/data:** Firebase 9 (Authentication, Firestore, Storage) via `@angular/fire`
- **Other:** RxJS, Cordova plugins (email composer), Angular Service Worker (PWA)

## Project structure highlights

- `src/app/pages` — feature pages: `login`, `signup`, `home`, `account`, `groups`, `detail`, `update-customer`
- `src/app/services` — `authentication`, `auth-guard`, `customers`, `groups`, `facturas-count` (invoices), `image`, `current-user`
- `src/app/models` — `Customer`, `Factura`, `Group`, `User`
- `android/` / `ios/` — native Capacitor projects for building on-device apps

## Running locally

```bash
npm install
ionic serve        # run as a web app / PWA
```

To build and run the native apps:

```bash
ionic build
npx cap sync
npx cap open android   # or: npx cap open ios
```

This project needs a Firebase project of your own (Authentication + Firestore + Storage enabled) with its config added to `src/environments/`.

## Note

This was originally a coursework/capstone project, so the commit history reflects an iterative, deadline-driven build rather than a production workflow. It's included here to show experience beyond backend development — full-stack mobile app delivery with Angular, Ionic, Capacitor and Firebase, including native device APIs and a PWA build target.

