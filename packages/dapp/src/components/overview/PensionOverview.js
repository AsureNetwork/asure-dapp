import React, { Component } from 'react';
import { List, Result } from 'antd-mobile';
import { Pension } from '../../thumbs';

const Item = List.Item;
const Brief = Item.Brief;

class PensionOverview extends Component {
  render() {
    return (
      <div>
        <Result
          img={<img src={Pension} alt="pension" className="spe" />}
          title={'Pension'}
          message=""
        />

        <List renderHeader={() => 'Statutory pension plans'}>
          <Item
            extra="1500€"
            arrow="horizontal"
            onClick={() => {
              this.props.history.push('/home/pension');
            }}
          >
            Germany <Brief>monthly</Brief>
          </Item>
        </List>

        <List renderHeader={() => 'Employer-funded pension plans'}>
          <Item extra="1500€" arrow="horizontal" onClick={() => {}}>
            Title <Brief>subtitle</Brief>
          </Item>
        </List>

        <List renderHeader={() => 'Private pension plans'}>
          <Item extra="1500€" arrow="horizontal" onClick={() => {}}>
            Title <Brief>subtitle</Brief>
          </Item>
        </List>
      </div>
    );
  }
}

export { PensionOverview };
