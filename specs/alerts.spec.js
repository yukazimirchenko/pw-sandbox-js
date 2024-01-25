import { test, expect } from '@playwright/test';
import { AlertsPage } from '../src/pages/alerts';

test.describe(`Heroku Alerts Suite`, () => {

    let alertsPage;

    test.beforeEach(async ({ page }) => {
        alertsPage = new AlertsPage(page);
        await alertsPage.gotoAlerts();
    })

    test('should open Alert Dialog and resolve successfully', async ({ page }) => {
        await alertsPage.alertDialog();

        page.once('dialog', dialog => {
            console.log(`Alert message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    })

    test('should confirm appear', async ({ page }) => {
        await alertsPage.confirmDialog();
        let mess = '';
        page.once('dialog', dialog => {
            mess = dialog.message(); 
            dialog.dismiss().catch(() => { });
        });
    })

    test('should prompt appear', async ({ page }) => {
        await alertsPage.promptDialog();
        page.once('dialog', dialog => {
            console.log(`Prompt message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
    })

})