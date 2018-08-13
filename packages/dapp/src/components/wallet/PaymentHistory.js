import React from 'react';
import { Button, Card, List } from 'antd-mobile';
import { Constants } from '../Constants';
import { Privacy as PrivacyThumb, Wallet } from '../../thumbs';

export class PaymentHistory extends React.Component {
  render() {
    return (
      <Card full>
        <Card.Header
          title="Send"
          thumb={PrivacyThumb}
          extra={<span>10.11.2018</span>}
        />
        <Card.Body>
          <div>
            <List>
              <List.Item thumb={Wallet} extra={''} onClick={() => {}}>
                Address
              </List.Item>
              <List.Item thumb={Wallet} extra={''} onClick={() => {}}>
                Contact
              </List.Item>
              <List.Item thumb={Wallet} extra={''} onClick={() => {}}>
                QR
              </List.Item>
              <List.Item thumb={Wallet} extra={''} onClick={() => {}}>
                Pensionplan
              </List.Item>
              <List.Item
                extra={
                  <Button type="primary" size="small" inline>
                    Send
                  </Button>
                }
                multipleLine
              >
                Send
                <List.Item.Brief>Set fee.</List.Item.Brief>
              </List.Item>
            </List>

            <Button type="primary">Send</Button>
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
