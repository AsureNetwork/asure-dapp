import React from 'react';
import { ActivityIndicator, Card, Modal } from 'antd-mobile';
import { Constants } from '../Constants';
import { QrScan } from '../../thumbs';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import QrReader from 'react-qr-reader';

const prompt = Modal.prompt;

class Scan extends React.Component {
  static contextTypes = {
    drizzle: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      delay: 300,
      result: 'No result'
      //result: '0xD34dF93618B8b33Ab4A871d45C7D0aA0c9Db9b34'
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
      if (data.startsWith('0x')) {
        prompt(
          'Account Name',
          this.state.result,
          [
            { text: 'Cancel' },
            {
              text: 'Submit',
              onPress: value => {
                console.log(`Saved:${value}`);

                this.props.history.push(
                  '/wallet/send?name=' + value + '&address=' + this.state.result
                );
              }
            }
          ],
          'default',
          'AccountName'
        );
      }
    }
  }

  handleError(err) {
    console.error(err);
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  showToast = () => {
    this.setState({ animating: !this.state.animating });
    this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    }, 1000);
  };

  render() {
    return (
      <div>
        <Card full>
          <Card.Header
            title="Scan"
            thumb={QrScan}
            extra={<span>10.11.2018</span>}
          />
          <Card.Body>
            <div>
              <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }}
              />
              <p>{this.state.result}</p>
            </div>

            <div>
              {/*
              <Button
                onClick={() =>
                  prompt(
                    'Account Name',
                    this.state.result,
                    [
                      {text: 'Cancel'},
                      {
                        text: 'Submit',
                        onPress: value => console.log(`Saved:${value}`)
                      }
                    ],
                    'default',
                    'AccountName'
                  )
                }
                type="primary"
                size="small"
                disabled={this.state.result == 'No result'}
              >
                Ok
              </Button>
{/*
              <Button
                onClick={() => this.handleScan("0x123123123123")}
                type="primary"
                size="small"
              >
                Test
              </Button>
*/}
            </div>
          </Card.Body>
          <Card.Footer
            content={Constants.COPYRIGHT}
            extra={<div>{Constants.WEBSITE}</div>}
          />
        </Card>
        <ActivityIndicator
          toast
          text="Loading..."
          animating={this.state.animating}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    accounts: state.accounts
  };
};

Scan = drizzleConnect(Scan, mapStateToProps);

export { Scan };
