import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import config from './config';
import type { ReportCallback } from 'web-vitals';

const firebaseApp = initializeApp(config);

const analytics = getAnalytics(firebaseApp);
// web-vital用のハンドラを作成
export const sendToGoogleAnalytics: ReportCallback = ({ name, delta, id }) => {
  logEvent(analytics, 'web_vitals', {
    eventCategory: 'Web Vitals',
    eventAction: name,
    eventLabel: id,
    eventValue: Math.round(name === 'CLS' ? delta * 1000 : delta),
    nonInteraction: true,
    transport: 'beacon',
  });
};
