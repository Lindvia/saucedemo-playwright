import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { Users } from '../utils/test-data';

test.describe('Logout Tests', () => {
  test('Logout from products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    // Login first
    await loginPage.navigateTo();
    await loginPage.login(Users.standard.username, Users.standard.password);
    
    // Verify we're on products page
    await expect(page).toHaveURL(/inventory.html/);
    
    // Logout
    await productsPage.logout();
    
    // Verify we're back on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});