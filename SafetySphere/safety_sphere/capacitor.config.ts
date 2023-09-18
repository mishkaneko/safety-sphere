import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.safety.sphere.app',
  appName: 'safety_sphere',
  webDir: 'dist/safety_sphere',
  server: {
    androidScheme: 'https'
  }
};

export default config;
