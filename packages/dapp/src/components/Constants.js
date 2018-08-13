import { version } from '../../package.json';

export class Constants {
  static COPYRIGHT = '© 2018 ASURE';
  static WEBSITE = 'www.asure.io';
  static NAME = 'ASURE dApp';
  static VERSION = version;
  static VERSIONDATE = '2018-08-01';

  //static VERSIONDATE = '0.1';
  static DATE = Date.now().toLocaleString();

  static styleBadgeGreen = {
    marginLeft: 12,
    padding: '0 5px',
    backgroundColor: '#1dd494'
    //borderRadius: 2
  };

  static styleBadgeRed = {
    marginLeft: 12,
    padding: '0 5px',
    backgroundColor: '#d4382b'
    //borderRadius: 2
  };

  static styleBadgeYellow = {
    marginLeft: 12,
    padding: '0 5px',
    backgroundColor: '#d49c16'
    //borderRadius: 2
  };

  static styleBadgeBlue = {
    marginLeft: 12,
    padding: '0 5px',
    backgroundColor: '#1193d4'

    //borderRadius: 2
  };
}
