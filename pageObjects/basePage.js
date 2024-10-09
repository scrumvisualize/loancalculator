import { Builder, By, until, Key} from 'selenium-webdriver';

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigateTo(url) {
        await this.driver.get(url);
    }

    async click(elementBy) {
        await this.driver.wait(until.elementLocated(elementBy), 5000);
        await this.driver.findElement(elementBy).click();
    }

    async findElement(elementBy) {
        await this.driver.wait(until.elementLocated(elementBy), 5000);
        return this.driver.findElement(elementBy);
    }

    async getText(elementBy) {
        await this.driver.wait(until.elementLocated(elementBy), 5000);
        return this.driver.findElement(elementBy).getText();
    }

    async tabOut(elementId) {
        const webElement = await this.driver.wait(until.elementLocated(By.id(elementId)), 5000);
        return webElement.sendKeys(Key.TAB);
    }
}

export default BasePage;
