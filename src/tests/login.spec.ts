    import { test, expect } from '@playwright/test';
    import { LoginPage } from '../pages/login-page';
    import { ProductsPage } from '../pages/products-page';
    import { Users, ErrorMessages } from '../utils/test-data';

    test.describe('Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateTo();
    });

    test('Login with valid credentials', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await loginPage.login(Users.standard.username, Users.standard.password);
        
        await expect(page).toHaveURL(/inventory.html/);
        await expect(await productsPage.getProductTitle()).toContain('Products');
    });

    test('Login with locked out user', async ({ page }) => {
        await loginPage.login(Users.locked.username, Users.locked.password);
        await loginPage.verifyErrorMessage(ErrorMessages.lockedUser);
    });

    test('Login with invalid credentials', async ({ page }) => {
        await loginPage.login('invalid_user', 'invalid_password');
        await loginPage.verifyErrorMessage(ErrorMessages.invalidCredentials);
    });

    test('Login with missing username', async ({ page }) => {
        await loginPage.login('', Users.standard.password);
        await loginPage.verifyErrorMessage(ErrorMessages.missingUsername);
    });

    test('Login with missing password', async ({ page }) => {
        await loginPage.login(Users.standard.username, '');
        await loginPage.verifyErrorMessage(ErrorMessages.missingPassword);
    });
    });