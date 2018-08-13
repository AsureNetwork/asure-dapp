import React from 'react';

export class PensionFormula extends React.Component {
  // static propTypes = {
  //   ep: PropTypes.number.required,
  //   zf: PropTypes.number.required,
  //   raf: PropTypes.number.required,
  //   arw: PropTypes.number.required
  // };

  render() {
    let ep = 0;
    let zf = 0;
    let raf = 0;
    let arw = 0;
    let result = 0;
    try {
      ep = (this.props.ep || 1.0).toFixed(1);
      zf = (this.props.zf || 1.0).toFixed(1);
      raf = (this.props.raf || 1.0).toFixed(1);
      arw = (this.props.arw || 1.0).toFixed(2);
      result = this.props.expectedPension;

      result = result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    } catch (e) {}
    return (
      <div className="flex-pension-formula-container">
        <div>
          <p>
            <strong>EP x ZF x RaF x aRW = Pension</strong>
          </p>
          <p>
            {ep} x {zf} x {raf} x {arw}= {result} €
          </p>
        </div>
      </div>
    );
  }
}
