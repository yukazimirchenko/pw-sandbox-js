import { commonData } from "../testData/commonData";

export class LoginPage {

    constructor(page) {
        this.page = page; 
        this.username = this.page.getByLabel('Username'); 
        this.password = this.page.getByLabel('Password'); 
        this.submit = this.page.locator('[type="submit"]'); 
        this.flashMessage = this.page.locator('#flash'); 
    }

    async gotoLogin() {
        await this.page.goto(commonData.baseURL + commonData.login); 
    }

    async loginToPage(user, pwd) {
        await this.username.fill(user);
        await this.password.fill(pwd);
        await this.submit.click();
    }
}