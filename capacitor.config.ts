import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.prueba',
  appName: 'prueba',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 1
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
  },
};

export default config;
