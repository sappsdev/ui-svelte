import type { CapacitorConfig } from '@capacitor/cli';

const isAndroid = process.env.CAP_PLATFORM === 'android';

const config: CapacitorConfig = {
  server: {
    url: isAndroid ? "http://10.0.2.2:5173" : "http://localhost:5173",
    cleartext: true,
  },
  appId: 'com.uisvelte.mobile',
  appName: 'UiSvelteMobile',
  webDir: 'dist'
};

export default config;
