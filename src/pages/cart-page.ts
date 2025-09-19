import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  readonly cartItem: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly removeButton: string; 

  constructor(page: Page) {
    super(page);
    this.cartItem = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.removeButton = 'button:has-text("Remove")';
  }

  async getCartItemsCount() {
    return await this.cartItem.count();
  }

  async removeItem(itemIndex: number = 0) {
    await this.cartItem
      .nth(itemIndex)
      .locator(this.removeButton)
      .click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
