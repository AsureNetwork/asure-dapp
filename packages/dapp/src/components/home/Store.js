import React, { Component } from 'react';
import {
  Accident,
  Bank,
  Health,
  House,
  Pension,
  Plane,
  productAllianzLogo,
  productAsureLogo,
  productChinaLifeLogo,
  productErgoLogo,
  productEtheriscLogo,
  productUnitedHealthCareLogo,
  productZurichLogo
} from '../../thumbs';
import { Card, SearchBar, Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class Store extends Component {
  categories = [
    { icon: Pension, subTitel: 'Pension', path: 'account' },
    { icon: Health, subTitel: 'Healthcare', path: 'notyet' },
    { icon: Accident, subTitel: 'Accident', path: 'notyet' },
    { icon: Bank, subTitel: 'Finance', path: 'notyet' },
    { icon: House, subTitel: 'Property', path: 'notyet' },
    { icon: Plane, subTitel: 'Holiday', path: 'notyet' }
  ];

  navigateTo = category => {
    this.props.history.push(`${this.props.match.url}/${category.path}`);
  };

  info = () => {
    Toast.info('just for demonstration purposes', 1);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#efeff4' }}>
        <SearchBar placeholder="Search" maxLength={8} />

        <WingBlank size="md">
          <Card onClick={() => this.info()}>
            <Card.Header
              title=""
              thumb={productAllianzLogo}
              extra={<span>Allianz AG</span>}
            />
            <Card.Footer content="&copy; 2018" />
          </Card>
        </WingBlank>

        <WhiteSpace />

        <WingBlank size="md">
          <Card onClick={() => this.info()}>
            <Card.Header
              title=""
              thumb={productAsureLogo}
              extra={<span>Asure Foundation</span>}
            />
            <Card.Footer content="&copy; 2018" />
          </Card>
        </WingBlank>

        <WhiteSpace />

        <WingBlank size="md">
          <Card onClick={() => this.info()}>
            <Card.Header
              title=""
              thumb={productChinaLifeLogo}
              extra={<span>ChinaLife Ltd.</span>}
            />
            <Card.Footer content="&copy; 2018" />
          </Card>
        </WingBlank>

        <WhiteSpace />

        <WingBlank size="md">
          <Card onClick={() => this.info()}>
            <Card.Header
              title=""
              thumb={productEtheriscLogo}
              extra={<span>Etherisc AG</span>}
            />
            <Card.Footer content="&copy; 2018" />
          </Card>
        </WingBlank>

        <WhiteSpace />

        <WingBlank size="md">
          <Card onClick={() => this.info()}>
            <Card.Header
              title=""
              thumb={productErgoLogo}
              extra={<span>ERGO Group AG</span>}
            />
            <Card.Footer content="&copy; 2018" />
          </Card>
        </WingBlank>

        <WhiteSpace />

        <WingBlank size="md">
          <Card onClick={() => this.info()}>
            <Card.Header
              title=""
              thumb={productUnitedHealthCareLogo}
              extra={<span>United Healthcare</span>}
            />
            <Card.Footer content="&copy; 2018" />
          </Card>
        </WingBlank>

        <WhiteSpace />

        <WingBlank size="md">
          <Card onClick={() => this.info()}>
            <Card.Header
              title=""
              thumb={productZurichLogo}
              extra={<span>Zurich Group AG</span>}
            />
            <Card.Footer content="&copy; 2018" />
          </Card>
        </WingBlank>

        <WhiteSpace />
      </div>
    );
  }
}

Store = withRouter(Store);

export { Store };
