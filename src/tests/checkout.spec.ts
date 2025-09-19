import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { Users, CustomerInfo } from '../utils/test-data';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.navigateTo();
    await loginPage.login(Users.standard.username, Users.standard.password);
    
    // Add item and go to cart
    await productsPage.addItemToCart(0);
    await productsPage.goToCart();
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
  });

  test('Complete checkout flow', async ({ page }) => {
    // Fill checkout information
    await checkoutPage.fillCheckoutInfo(
      CustomerInfo.standard.firstName,
      CustomerInfo.standard.lastName,
      CustomerInfo.standard.postalCode
    );
    
    // Continue to overview
    await checkoutPage.continueToOverview();
    
    // Complete checkout
    await checkoutPage.completeCheckout();
    
    // Verify completion
    const isComplete = await checkoutPage.isCheckoutComplete();
    const completeMessage = await checkoutPage.getCompleteMessage();
    
    expect(isComplete).toBeTruthy();
    expect(completeMessage).toContain('Thank you for your order');
  });

  test('Cancel checkout from information page', async ({ page }) => {
    // Cancel checkout and verify we're back to cart
    await checkoutPage.cancelCheckout();
    
    await expect(page).toHaveURL(/cart.html/);
  });

  test('Cancel checkout from overview page', async ({ page }) => {
    // Fill information and continue
    await checkoutPage.fillCheckoutInfo(
      CustomerInfo.standard.firstName,
      CustomerInfo.standard.lastName,
      CustomerInfo.standard.postalCode
    );
    await checkoutPage.continueToOverview();
    
    // Cancel from overview
    await checkoutPage.cancelCheckout();
    
    // Should be back to products page
    await expect(page).toHaveURL(/inventory.html/);
  });
});