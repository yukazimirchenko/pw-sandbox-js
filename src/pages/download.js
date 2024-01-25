import { commonData } from "../testData/commonData";

export class DownloadPage {

    constructor(page) {
        this.page = page;
        this.downloadLink = this.page.locator(`[href="download/some-file.txt"]`);
    }

    async goToDownloadPage() {
        await this.page.goto(commonData.baseURL + commonData.download)
    }

    async downloadFile() {
        const downloadPromise = this.page.waitForEvent('download');
        this.downloadLink.click(); 
        const download = await downloadPromise;
        await download.saveAs('./src/testData/downloads/' + download.suggestedFilename());
    }

}