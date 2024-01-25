import { test, expect } from '@playwright/test';
import { UploadPage } from '../src/pages/upload';

test.describe('Upload', () => {

    let uploadPage;

    test.beforeEach(async ({ page }) => {
        uploadPage = new UploadPage(page);
        await uploadPage.goToUploadPage();
    })

    test('File should be uploaded', async ({ page }) => {

        const fileInput = page.locator('#file-upload');

        await fileInput.setInputFiles('./src/testData/files/something.json'); 
        await page.locator('#file-submit').click();

        expect(await page.locator('//h3').textContent()).toContain('File Uploaded!');
        expect(await page.locator(`#uploaded-files`).textContent()).toContain('something.json');
    });

})