'use strict';

const program = require('commander');
const moment = require('moment');
const Web3 = require('web3');
const GpCommand = require('./utils/GpCommand');

class RegisterUserCommand extends GpCommand {
  static register() {
    program
      .command('register-user')
      .alias('reguser')
      .description('registers a new user')
      .option('-a, --address <address>', 'ethereum address of the user')
      .option('-b, --birth-date <birthDate>', 'birth date of the user')
      .option('-p, --pension-date <pensionDate>', 'pension date of the user')
      .option('-s, --salary <salary>', 'salary of the user')
      .action(async options => {
        const command = new RegisterUserCommand(
          options.parent.profile,
          options.parent.url,
          options.parent.mgmtMnemonic
        );
        await command.init();

        const success = await command.exec({
          address: options.address,
          birthDate: moment(options.birthDate),
          pensionDate: moment(options.pensionDate),
          salary: options.salary
        });

        process.exit(success ? 0 : 1);
      });
  }

  async exec(options) {
    try {
      console.log(`Registering user ...`);
      await this._pensionUsers.methods
        .registerUser(
          options.address,
          options.birthDate.unix(),
          options.pensionDate.unix()
        )
        .send();

      const pensionAmountByPercent = 18.6;
      const montlyRate = (options.salary * pensionAmountByPercent) / 100;
      const yearlyRate = montlyRate * 12;

      // For now we assume that the person starts to pay into the pension
      // system with his first job at an age of 20.
      const yearOfFirstPayment = options.birthDate.add(20, 'years').year();
      const yearOfPensionEntry = options.pensionDate.year();
      const yearOfToday = moment().year();
      const yearOfLastPayment =
        yearOfPensionEntry < yearOfToday ? yearOfPensionEntry : yearOfToday;

      const totalRate =
        yearlyRate * (yearOfLastPayment - yearOfFirstPayment + 1) + 10; // TODO: +10 to be safe ...
      const totalRateInWei = Web3.utils.toWei(totalRate.toString(), 'ether');

      await this._pensionEuroToken.methods
        .mint(this._mgmtAccount, totalRateInWei)
        .send();
      await this._pensionEuroToken.methods
        .approve(this._pensionWallet.options.address, totalRateInWei)
        .send();

      for (let year = yearOfFirstPayment; year <= yearOfLastPayment; year++) {
        console.log(`Depositing year ${year} ...`);

        let months = Array.from(Array(12).keys());
        // only pay the the second past months of the current year
        if (year === yearOfLastPayment && year === yearOfToday) {
          const monthOfToday = moment().month();
          if (monthOfToday < 2) {
            break;
          }

          months = Array.from(Array(monthOfToday - 1).keys());
        }

        await this._pensionWallet.methods
          .depositMany(
            months.map(() => options.address),
            months.map(() => year),
            months.map(month => month),
            months.map(() => Web3.utils.toWei(montlyRate.toString(), 'ether'))
          )
          .send();
      }

      // Deposit all month of the current year
      console.log(`Depositing year ${yearOfLastPayment} ...`);

      console.log('Registering user was successful.');
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = RegisterUserCommand;
