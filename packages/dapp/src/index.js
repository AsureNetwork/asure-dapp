import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import store, { persistor } from './store';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd-mobile';
import MobileDetect from 'mobile-detect';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

const md = new MobileDetect(window.navigator.userAgent);
const isDesktop = !md.phone() && !md.tablet();
const isProduction = process.env.NODE_ENV === 'production';
const isInIFrame = window !== window.top;
const isDesktopRedirectDisabled = !!localStorage.getItem(
  'desktop-redirect-disabled'
);

if (!isDesktopRedirectDisabled && isProduction && isDesktop && !isInIFrame) {
  console.log(
    'The Asure dApp is optimized for mobile clients only. Redirecting to desktop wrapper.'
  );
  console.log(
    'To prevent this redirect, add "desktop-redirect-disabled"="true" to localStorage'
  );

  /*
   * The Asure dApp is optimized for mobile only for now.
   * We provide a little iphone mockup page that loads the
   * Asure dApp within an iframe which.
   */
  let startUrl = process.env.REACT_APP_START_URL;
  if (!startUrl.endsWith('/')) {
    startUrl += '/';
  }
  window.location.pathname = startUrl + 'desktop.html';
} else {
  ReactDOM.render(
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </LocaleProvider>,
    document.getElementById('root')
  );
  registerServiceWorker();
}
