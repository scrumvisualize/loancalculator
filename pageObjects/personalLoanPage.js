import { By, until } from 'selenium-webdriver';
import BasePage from './basePage.js';  // Update to use ES module import



class PersonalLoanPage extends BasePage {

    constructor(driver) {
        super(driver);
        this.personalLoanDiv = By.id('repayments');
        this.amountBorrowBox = By.id('repay-amount1');
        this.interestRateBox = By.id('repay-rate1');
        this.interestRateBox = By.id('repay-rate1');
        this.resultContainer = By.className('inline-result col100 highlight-container');
        this.repaymentFreq = By.id('repay-feefreq1');
    }

    async getPersonalLoanHeaderText() {
        const divElement = await this.findElement(this.personalLoanDiv);
        const h3Element = await divElement.findElement(By.tagName('h3'));
        const h3Text = await h3Element.getText();
        return h3Text;
    }

    async getAmountBorrowTextBox($text) {
        const amountBorrowBox = await this.findElement(this.amountBorrowBox);
        await amountBorrowBox.clear();
        return await amountBorrowBox.sendKeys($text);
    }

    async getInterestRateBox($text) {
        const interestRateBox = await this.findElement(this.interestRateBox);
        await interestRateBox.clear();
        return await interestRateBox.sendKeys($text);
    }


    async getCalculatedAmountDisplay() {

        const resultDiv = await this.driver.wait(until.elementLocated(this.resultContainer), 10000);
        await this.driver.wait(until.elementIsVisible(resultDiv), 10000); // Wait until it's visible
        const element = await this.driver.wait(until.elementLocated(By.xpath(".//div[contains(@class, 'result col100')]//p[contains(@class, 'highlight-container')]")), 10000);
        const amountSpanElement = await element.findElement(By.css('.enlarge-text'));
        const amountText = await amountSpanElement.getText();
        console.log("What is the text value::" + amountText);
        return amountText;
    }

    async getRepayFreqBox() {
        const repayfreq = await this.driver.wait(until.elementIsVisible(this.driver.findElement(this.repaymentFreq)), 5000);
        return await repayfreq.click();
    }

    // Method to get all options' text in the select box
    async getRepayFreqOptions() {
        const selectElement = await this.driver.findElement(this.repaymentFreq);
        const options = await selectElement.findElements(By.tagName('option'));
        return await Promise.all(options.map(async option => await option.getText()));
    }

}

export default PersonalLoanPage;  // Use ES module export

