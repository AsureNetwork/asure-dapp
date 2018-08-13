import React from 'react';
import { Card } from 'antd-mobile';
import { Constants } from '../Constants';
import { Tou } from '../../thumbs';

export class TermOfUse extends React.Component {
  render() {
    return (
      <Card full>
        <Card.Header
          title="Term of Use"
          thumb={Tou}
          extra={<span>10.11.2018</span>}
        />
        <Card.Body>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
          </div>
        </Card.Body>
        <Card.Footer
          content={Constants.COPYRIGHT}
          extra={<div>{Constants.WEBSITE}</div>}
        />
      </Card>
    );
  }
}
