import React, { Fragment } from 'react';
import { Badge, List, Result, Toast } from 'antd-mobile';
import {
  AirTransport,
  Car,
  Health,
  Insurance,
  Luggage,
  Pension,
  Pensioner
} from '../../thumbs';
import { OverlayButton } from '../extensions/OverlayButton';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { animating: false };
  }

  products = [
    {
      title: 'Statutory Pension',
      brief: 'Germany',
      thumb: Pension,
      route: '/home/pension'
    },
    { title: 'Healthcare', brief: 'Allianz', thumb: Health, disabled: true },
    {
      title: 'Life',
      brief: 'MetLife Insurance',
      thumb: Insurance,
      disabled: true
    },
    {
      title: 'Flight Delay Insurance',
      brief: 'Etherisc',
      thumb: AirTransport,
      disabled: true
    },
    {
      title: 'Luggage Crowdsurance',
      brief: 'REGA',
      thumb: Luggage,
      disabled: true
    },
    {
      title: 'Vehicle Insurance',
      brief: 'State Farm Insurance',
      thumb: Car,
      disabled: true
    }
  ];

  renderProduct = (product, idx) => {
    return (
      <List.Item
        key={idx}
        arrow={product.disabled ? 'empty' : 'horizontal'}
        multipleLine
        thumb={product.thumb}
        onClick={() => {
          if (product.route) {
            this.props.history.push(product.route);
          } else {
            Toast.info('just for demonstration purposes', 1);
          }
        }}
      >
        {product.title}
        <Badge dot={!product.disabled} style={{ top: '-10px' }} />
        <List.Item.Brief>{product.brief}</List.Item.Brief>
      </List.Item>
    );
  };

  render() {
    return (
      <Fragment>
        <Result
          className="result-pic-large"
          img={<img src={Pensioner} alt="pensioner" />}
          title={`${this.products.length} products available`}
        />
        <List className="my-list">{this.products.map(this.renderProduct)}</List>
        <OverlayButton href="/home/store" />
      </Fragment>
    );
  }
}

Home = withRouter(Home);

export { Home };
