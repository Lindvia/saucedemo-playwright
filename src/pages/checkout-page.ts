import { Page, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: string;
  readonly lastNameInput: string;
  readonly postalCodeInput: string;
  readonly continueButton: string;
  readonly finishButton: string;
  readonly cancelButton: string;
  readonly summaryInfo: string;
  readonly completeHeader: string;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = '#first-name';
    this.lastNameInput = '#last-name';
    this.postalCodeInput = '#postal-code';
    this.continueButton = '#continue';
    this.finishButton = '#finish';
    this.cancelButton = '#cancel';
    this.summaryInfo = '.summary_info';
    this.completeHeader = '.complete-header';
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
  }

  async continueToOverview() {
    await this.page.click(this.continueButton);
  }

  async completeCheckout() {
    await this.page.click(this.finishButton);
  }

  async cancelCheckout() {
    await this.page.click(this.cancelButton);
  }

  async isCheckoutComplete() {
    return await this.page.isVisible(this.completeHeader);
  }

  async getCompleteMessage() {
    return await this.page.textContent(this.completeHeader);
  }
}