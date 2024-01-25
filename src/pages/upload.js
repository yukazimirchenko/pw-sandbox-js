import { commonData } from "../testData/commonData";
import path from 'path';

export class UploadPage {

    constructor(page) {
        this.page = page;
        this.uploadedLink = this.page.locator(`#file-upload`);
        this.uploadSubmit = this.page.locator(`#file-submit`);
        this.uploadedChip = this.page.locator(`#uploaded-files`);
    }

    async goToUploadPage() {
        await this.page.goto(commonData.baseURL + commonData.upload)
    }

    // async uploadFile() {
    //     const fileChooserPromise = this.page.waitForEvent('filechooser');
    //     await this.uploadedLink.click();
    //     const fileChooser = await fileChooserPromise;
    //     await fileChooser.setFiles(path.join('../testData/files/', 'something.json'));
    // }

    async uploadSubmit() {
        await this.uploadSubmit.click();
    }

    async uploadChip() {
        return this.uploadChip.textContent(); 
    }
}