import { test, expect } from '@playwright/test';
import { DownloadPage } from '../src/pages/download'


test.describe('Download', () => {

    let downloadPage;

    test.beforeEach(async ({ page }) => {
        downloadPage = new DownloadPage(page);
        await downloadPage.goToDownloadPage();
    })

    test('File should be downloaded', async ({ page }) => {
        const fileName = 'some-file.txt'
        const download = await downloadPage.downloadFile(fileName)
        
        // const actualResult = await downloadPage.isTheSameName(fileName, download)
        // expect(actualResult).toBe(true);
    })
})