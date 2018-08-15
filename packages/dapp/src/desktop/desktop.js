import 'html5-device-mockups/dist/device-mockups.min.css';
import './desktop.css';

console.log(
  'To prevent the redirect, add "desktop-redirect-disabled"="true" to localStorage'
);
console.log(`Loading ${process.env.REACT_APP_START_URL}`);

const appIframe = document.getElementById('app');
appIframe.src = process.env.REACT_APP_START_URL;
