import React, { Children, Component } from 'react';
import 'html5-device-mockups/dist/device-mockups.min.css';
import MobileDetect from 'mobile-detect';

export class DeviceWrapper extends Component {
  constructor(props) {
    super(props);
    this.md = new MobileDetect(window.navigator.userAgent);
  }

  render() {
    const phone = this.md.phone();
    const tablet = this.md.tablet();

    const isDesktop = !phone && !tablet;

    if (isDesktop) {
      return (
        <div
          className="device-wrapper"
          style={{ margin: '50px auto', maxWidth: '411px' }}
        >
          <div
            className="device"
            data-device="iPhone7"
            data-orientation="portrait"
            data-color="gold"
          >
            <div className="screen" style={{ pointerEvents: 'auto' }}>
              {this.props.children}
            </div>
            <div className="button" />
          </div>
        </div>
      );
    } else {
      return Children.only(this.props.children);
    }
  }
}
