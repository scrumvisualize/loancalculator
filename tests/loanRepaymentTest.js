import { Builder } from 'selenium-webdriver';
import * as chai from 'chai';  // Correct chai import
const expect = chai.expect;
import PersonalLoanPage from '../pageObjects/personalLoanPage.js';  
import supertest from 'supertest';

const freqArr = ["Yearly", "Quarterly", "Monthly", "Fortnightly", "Weekly"]; // The array to compare with

describe('Loan Calulation Page Tests', function () {

    this.timeout(30000); // Extend timeout in case of slow load times
    let driver;
    let loanPage;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        loanPage = new PersonalLoanPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('Verify the header text', async function () {
        await loanPage.navigateTo('https://moneysmart.gov.au/loans/personal-loan-calculator#repayments');
        const headText = await loanPage.getPersonalLoanHeaderText();
        expect(headText).to.equal('Personal loan details'); 

    });

    it('Type Amount Borrow text box', async function () {
        await loanPage.navigateTo('https://moneysmart.gov.au/loans/personal-loan-calculator#repayments');
        await loanPage.getAmountBorrowTextBox("550000");
        await loanPage.getInterestRateBox("6.5");
        await loanPage.tabOut("repay-rate1");
        const amount = await loanPage.getCalculatedAmountDisplay();
        expect(amount).to.equal('$10,771'); 
    });

    it('Check repayment frequency options', async function () {
        await loanPage.navigateTo('https://moneysmart.gov.au/loans/personal-loan-calculator#repayments');
        await loanPage.getRepayFreqBox();
        const optionTexts = await loanPage.getRepayFreqOptions(); // Get the options text
        for (let i = 0; i < freqArr.length; i++) {
            expect(optionTexts[i]).to.equal(freqArr[i], `Expected option text at index ${i} to be "${freqArr[i]}" but found "${optionTexts[i]}"`);
        } 
    });

});
