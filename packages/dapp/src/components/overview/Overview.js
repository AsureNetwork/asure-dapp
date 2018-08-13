import React, { Component } from 'react';
import { Accident, Bank, Health, House, Pension, Plane } from '../../thumbs';
import { Badge, Grid, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class Overview extends Component {
  categories = [
    { icon: Pension, subTitel: 'Pension', path: 'pension' },
    { icon: Health, subTitel: 'Healthcare', path: 'notyet' },
    { icon: Accident, subTitel: 'Accident', path: 'notyet' },
    { icon: Bank, subTitel: 'Finance', path: 'notyet' },
    { icon: House, subTitel: 'Property', path: 'notyet' },
    { icon: Plane, subTitel: 'Holiday', path: 'notyet' }
  ];

  navigateTo = category => {
    if (category.path != 'notyet') {
      this.props.history.push(`${this.props.match.url}/${category.path}`);
    } else {
      Toast.info('just for demonstration purposes', 1);
    }
  };

  render() {
    return (
      <Grid
        data={this.categories}
        columnNum={2}
        renderItem={category => (
          <div
            style={{ padding: '12.5px' }}
            onClick={() => this.navigateTo(category)}
          >
            <Badge dot={category.path !== 'notyet'}>
              <img
                src={category.icon}
                style={{ width: '75px', height: '75px' }}
                alt=""
              />
            </Badge>
            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
              <span className="sub-title">{category.subTitel}</span>
            </div>
          </div>
        )}
      />
    );
  }
}

Overview = withRouter(Overview);

export { Overview };
