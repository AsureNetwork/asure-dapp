import React from 'react';
import { Card } from 'antd-mobile';
import { Constants } from './Constants';

export class Footer extends React.Component {
  render() {
    return (
      <Card
        full
        style={{ minHeight: '30px', height: '30px' }}
        className="footer"
      >
        <Card.Footer
          content={Constants.COPYRIGHT}
          style={{ paddingTop: '10px' }}
          extra={<div>{Constants.WEBSITE}</div>}
        />
      </Card>
    );
  }
}
