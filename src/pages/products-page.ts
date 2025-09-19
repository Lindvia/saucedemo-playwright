import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductsPage extends BasePage {
  readonly productTitle: Locator;
  readonly inventoryItem: Locator;
  readonly addToCartButton: string;
  readonly removeFromCartButton: string;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('.title');
    this.inventoryItem = page.locator('.inventory_item');
    this.addToCartButton = 'button:has-text("Add to cart")';
    this.removeFromCartButton = 'button:has-text("Remove")';
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async getProductTitle() {
    return await this.productTitle.textContent();
  }

  async addItemToCart(itemIndex: number = 0) {
    await this.inventoryItem
      .nth(itemIndex)
      .locator(this.addToCartButton)
      .click();
  }

  async removeItemFromCart(itemIndex: number = 0) {
    await this.inventoryItem
      .nth(itemIndex)
      .locator(this.removeFromCartButton)
      .click();
  }

  async getCartBadgeCount() {
    if (await this.shoppingCartBadge.count()) {
      const text = await this.shoppingCartBadge.textContent();
      return parseInt(text || '0');
    }
    return 0;
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }
}
