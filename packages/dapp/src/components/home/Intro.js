import React from 'react';
import { Carousel, Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import Button from 'antd-mobile/es/button';
import {
  Faucet,
  History,
  Home,
  introHistory,
  introMenu,
  introMyProducts,
  introOverview,
  introPaymentPlan,
  introPensionInsurance,
  introSettings,
  introSimulation,
  introStatistics,
  introThankYou,
  introWallet,
  introWelcome,
  Overview,
  Settings,
  WalletIco
} from '../../thumbs';
import { Footer } from '../Footer';
import { connect } from 'react-redux';
import { disableIntro, showIntro, skipIntro } from '../../actions/intro';

const mapDispatchToProps = dispatch => {
  return {
    disableIntro: () => dispatch(disableIntro()),
    skipIntro: () => dispatch(skipIntro()),
    showIntro: () => dispatch(showIntro())
  };
};

class Intro extends React.Component {
  /* Scrollbar of the tab component or the overlaying HTML element (eve <html> itself)
   * causes in desktop view that the beginning of the next slide is rendered into
   * the first slide.
   * "overflow: hidden;" or clicking on the carousel / slide helps. re-rendering also
   * Workaround: this.setState({{}}) 2 times in componentDidMount()
   */

  state = {
    skipped: false
  };

  onSkip = () => {
    this.props.skipIntro();
  };

  onSkipForever = () => {
    this.props.disableIntro();
  };

  render() {
    return (
      <Flex direction="column" align="stretch" style={{ height: '100%' }}>
        <Flex.Item style={{ display: 'flex' }}>
          <Carousel
            className="carousel-scrollable"
            autoplay={false}
            slideWidth={1}
            infinite={true}
          >
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introWelcome} alt="Login screen" />
                  <h2>Welcome to Asure</h2>
                  <p>
                    The Asure dApp demonstrates the German pension system built
                    up on blockchain within the upcoming Asure platform. On the
                    following pages you will get an introduction on how to
                    interact with the Asure platform.
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div className="carousel-overview">
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introMenu} alt="Navigation" />
                  <h2>Menu</h2>
                  <Flex>
                    <p>
                      <img style={{ width: '32px' }} src={Home} alt="Home" />
                    </p>
                    <p className="image-description">
                      <b>My Products</b>
                      <br />Have an overview of all available products.
                    </p>
                  </Flex>
                  <Flex>
                    <p>
                      <img
                        style={{ width: '32px' }}
                        src={Overview}
                        alt="Overview"
                      />
                    </p>
                    <p className="image-description">
                      <b>Overview</b>
                      <br />The overview of your life statistics regarding to
                      products in your use.
                    </p>
                  </Flex>
                  <Flex>
                    <p>
                      <img
                        style={{ width: '32px' }}
                        src={WalletIco}
                        alt="Wallet"
                      />
                    </p>
                    <p className="image-description">
                      <b>Wallet</b>
                      <br />View your wallet, payment history and send or
                      receive several currencies.
                    </p>
                  </Flex>
                  <Flex>
                    <p>
                      <img
                        style={{ width: '32px' }}
                        src={History}
                        alt="History"
                      />
                    </p>
                    <p className="image-description">
                      <b>History</b>
                      <br />View the pay-ins and payouts regarding your
                      insurance account.
                    </p>
                  </Flex>
                  <Flex>
                    <p>
                      <img
                        style={{ width: '32px' }}
                        src={Settings}
                        alt="Settings"
                      />
                    </p>
                    <p className="image-description">
                      <b>Settings</b>
                      <br />Do configurations regarding your profile, app
                      functionalities and security.
                    </p>
                  </Flex>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introOverview} alt="Asure Overview" />
                  <h2>Overview</h2>
                  <p>
                    Within the overview you get a quick summary of the most
                    important information regarding your products. From here you
                    have the possibility to move directly the action menu of
                    your product.{' '}
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introMyProducts} alt="Asure Products" />
                  <h2>My Products</h2>
                  <p>
                    By selecting a product, you have the availability to make
                    actions within this product.<br />
                    <br />
                    The first product which is integrated in the Asure dApp is
                    the <b>German Statutory Pension</b>.<br />
                    <br />
                    As a pensioner you have the possibility to start your
                    pension payouts here and have an overview of the paid out
                    pension amounts and the next payout day.
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img
                    src={introPensionInsurance}
                    alt="Asure Pension Insurance"
                  />
                  <h2>Pension Insurance</h2>
                  <p>
                    You can view your actual <b>pension status</b> and change
                    your pension access age.<br />
                    <br /> Also you have the possibility to make a statement on
                    your salary and will see how much your{' '}
                    <b>monthly pension expenses</b> will be and you can
                    calculate your expected pension amount.
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introPaymentPlan} alt="Asure Payment Plan" />
                  <h2>Payment Plan</h2>
                  <p>
                    Within the payment plan you have an overview on your recent
                    pay-ins and your actual <b>amount of pension points</b>.<br />
                  </p>
                  <p>
                    Regarding to the german pay-as-you-go pension system, your
                    paid out pension amount, as soon you are retired, will be
                    calculated based on your pension points.
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introSimulation} alt="Asure Simulation" />
                  <h2>Simulation</h2>
                  <p>
                    You are able to use our advanced pension simulation to
                    calculate your expected pension payouts regarding to your
                    average salary and your pension access age.<br />
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introStatistics} alt="Asure Statistics" />
                  <h2>Statistics</h2>
                  <p>
                    Statistics will serve you with various information on the
                    pension product. To make insurance and especially social
                    security <b>more transparent</b> you will be able to get all
                    important information regarding the whole pension system in{' '}
                    <b>real time</b>!
                    {/*<RadialBarChart*/}
                    {/*width={300}*/}
                    {/*height={200}*/}
                    {/*cx={150}*/}
                    {/*cy={100}*/}
                    {/*innerRadius={10}*/}
                    {/*outerRadius={100}*/}
                    {/*barSize={10}*/}
                    {/*data={data}*/}
                    {/*>*/}
                    {/*<RadialBar*/}
                    {/*minAngle={15}*/}
                    {/*label={{ position: 'insideStart', fill: '#444' }}*/}
                    {/*background*/}
                    {/*clockWise={true}*/}
                    {/*dataKey="uv"*/}
                    {/*/>*/}
                    {/*</RadialBarChart>*/}
                  </p>
                  <p>
                    Besides many more you will be able to view the following
                    data:
                  </p>
                  <ul>
                    <li>Number of pensioners</li>
                    <li>Number of insureds</li>
                    <li>Monthly pay-ins</li>
                    <li>Monthly payouts</li>
                    <li>Reserves</li>
                    <li>Actual value of the system</li>
                  </ul>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introWallet} alt="Asure Wallet" />
                  <h2>Wallet</h2>

                  <p>
                    Besides your wallet balances, within the wallet you have the
                    opportunities to send and receive Euro Tokens or virtual
                    currencies. You also will have an overview of your payments.<br />
                    <br />
                    <br />
                    <br />
                  </p>
                  <Flex>
                    <p style={{ marginRight: '20px' }}>
                      <img
                        src={Faucet}
                        style={{ width: '32px' }}
                        alt="Facuet"
                      />
                    </p>
                    <p>
                      <b>Faucet</b>
                      <br />
                      To get Euro Tokens which you can use within the Asure dApp
                      you have to navigate to <b>Faucet</b> and select the
                      amount of tokens you need.
                    </p>
                  </Flex>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img
                    className="carousel-img-border"
                    src={introHistory}
                    alt="Asure History"
                  />
                  <h2>History</h2>
                  <p>
                    The history gives you an overview of the specific amounts
                    you sent to and received from insurance products and the
                    transactions which took place. You see the currency in which
                    the specific payment has taken place. You will get further
                    details on the transactions by selecting an entry.<br />
                    <br />
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introSettings} alt="Asure Settings" />
                  <h2>Settings</h2>
                  <p>
                    Settings allows you to configure the Asure dApp regarding{' '}
                    <b>your needs</b>. You have the possibility to change
                    personal information like your name and your job.<br />
                    <br />
                  </p>
                  <p>
                    <b>Developers</b> have the possibility to change the network
                    address here to operate on a testnet when implementing new
                    functions.<br />
                  </p>
                  <p>
                    In the security settings you are able to set a passcode to
                    secure the dApp. You're also enabled to do various
                    configuration regarding <b>your privacy</b>.
                  </p>
                </div>
              </WingBlank>
            }
            {
              <WingBlank>
                <div>
                  <WhiteSpace />
                  <WhiteSpace />
                  <img src={introThankYou} alt="Thank you!" />
                  <h2>Thank you</h2>
                  <p>
                    We appreciate your support and are always open to any ideas
                    or suggestions that you may like to make regarding the
                    promotion of our project.
                  </p>
                </div>
              </WingBlank>
            }
          </Carousel>
        </Flex.Item>
        <WingBlank style={{ flex: '0 0' }}>
          <WhiteSpace size="xl" />
          <Flex justify="between">
            <Button
              type="ghost"
              size="small"
              style={{ width: '130px' }}
              onClick={this.onSkipForever}
            >
              Skip forever
            </Button>

            <Button
              type="primary"
              size="small"
              style={{ width: '130px' }}
              onClick={this.onSkip}
            >
              Skip
            </Button>
          </Flex>
          <WhiteSpace size="xl" />
        </WingBlank>

        <Flex.Item style={{ flex: '0 0' }}>
          <Footer />
        </Flex.Item>
      </Flex>
    );
  }
}

Intro = connect(
  null,
  mapDispatchToProps
)(withRouter(Intro));

export { Intro };
