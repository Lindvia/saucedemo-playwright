// src/tests/data-driven.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { Users } from '../utils/test-data';

// Test data for data-driven testing
const testUsers = [
  { username: Users.standard.username, password: Users.standard.password, shouldLogin: true },
  { username: Users.locked.username, password: Users.locked.password, shouldLogin: false },
  { username: 'invalid_user', password: 'invalid_password', shouldLogin: false },
];

test.describe('Data-Driven Login Tests', () => {
  for (const user of testUsers) {
    test(`Login with ${user.username} should ${user.shouldLogin ? 'succeed' : 'fail'}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const productsPage = new ProductsPage(page);
      
      await loginPage.navigateTo();
      await loginPage.login(user.username, user.password);
      
      if (user.shouldLogin) {
        await expect(page).toHaveURL(/inventory.html/);
        await expect(await productsPage.getProductTitle()).toContain('Products');
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
      }
    });
  }
});