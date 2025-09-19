import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from '../pages/cart-page';
import { Users } from '../utils/test-data';

test.describe('Cart Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    
    await loginPage.navigateTo();
    await loginPage.login(Users.standard.username, Users.standard.password);
  });

  test('Add item to cart and verify badge', async ({ page }) => {
    await productsPage.addItemToCart(0);
    const badgeCount = await productsPage.getCartBadgeCount();
    
    expect(badgeCount).toBe(1);
  });

  test('Remove item from cart', async ({ page }) => {
    // Add item first
    await productsPage.addItemToCart(0);
    let badgeCount = await productsPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);

    // Remove item
    await productsPage.removeItemFromCart(0);
    badgeCount = await productsPage.getCartBadgeCount();
    
    expect(badgeCount).toBe(0);
  });

  test('Add multiple items to cart', async ({ page }) => {
    await productsPage.addItemToCart(0);
    await productsPage.addItemToCart(1);
    const badgeCount = await productsPage.getCartBadgeCount();
    
    expect(badgeCount).toBe(2);
  });

  test('Remove item from cart page', async ({ page }) => {
    // Add item and go to cart
    await productsPage.addItemToCart(0);
    await productsPage.goToCart();
    
    // Verify item is in cart
    let itemsCount = await cartPage.getCartItemsCount();
    expect(itemsCount).toBe(1);
    
    // Remove item from cart
    await cartPage.removeItem(0);
    itemsCount = await cartPage.getCartItemsCount();
    
    expect(itemsCount).toBe(0);
  });
});