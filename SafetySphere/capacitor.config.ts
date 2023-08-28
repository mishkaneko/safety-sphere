import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.SafetySphere.app',
  appName: 'SafetySphere',
  webDir: 'dist/safety-sphere',
  server: {
    androidScheme: 'https'
  }
};

export default config;
