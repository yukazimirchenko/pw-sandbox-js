import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login';
import { commonData } from '../src/testData/commonData';

test.describe(`Heroku Login Suite` , () => {

    let loginPage; 

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page); 
        await loginPage.gotoLogin(); 
    })
    test('should login successfully', async ({ page }) => {
        await loginPage.loginToPage(commonData.userName, commonData.password); 
        expect(await page.locator('#flash').textContent()).toContain('You logged into a secure area!');
        expect(await page.locator('[href="/logout"]').textContent()).toContain('Logout');
    })

    test(`should throw an error when username is not valid`, async ({page}) => {
        await loginPage.loginToPage('34234', commonData.password); 
        expect(await page.locator('#flash').textContent()).toContain('Your username is invalid!');
    })

    test(`should logout successfully`, async ({page}) => {

    })
    
})
