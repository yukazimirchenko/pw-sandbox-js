import { commonData } from "../testData/commonData";

export class AlertsPage {

    constructor(page) {
        this.page = page; 
        this.alert = this.page.locator('[onclick="jsAlert()"]')
        this.confirm = this.page.locator('[onclick="jsConfirm()"]')
        this.propmt = this.page.locator('[onclick="jsPrompt()"]');
    }

    async gotoAlerts() {
        await this.page.goto(commonData.baseURL + commonData.alerts); 
    }

    async alertDialog() {
        await this.alert.click();
    }
    async confirmDialog() {
        await this.confirm.click();
    }
    async promptDialog() {
        await this.propmt.click();
    }
}