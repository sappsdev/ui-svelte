import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  server: {
    url: "http://localhost:5173",
    cleartext: true,
  },
  appId: 'com.uisvelte.mobile',
  appName: 'UiSvelteMobile',
  webDir: 'dist'
};

export default config;
