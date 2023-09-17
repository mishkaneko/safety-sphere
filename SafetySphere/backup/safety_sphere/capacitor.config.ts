import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.SafetySphere.app',
  appName: 'safety_sphere',
  webDir: 'dist/safety_sphere',
  server: {
    androidScheme: 'https'
  }
};

export default config;
