# SauceDemo Playwright Automation

This project contains automated tests for the SauceDemo website using Playwright with TypeScript and the Page Object Model pattern.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`

## Running Tests

- Run all tests: `npm test`
- Run tests in headed mode: `npm run test:headed`
- Run tests in parallel: `npm run test:parallel`
- Run tests with HTML report: `npm run test:report`
- Run tests with Allure report: `npm run test:allure`

## Test Structure

- `src/pages/` - Page Object Model classes
- `src/tests/` - Test specifications
- `src/utils/` - Test data and helper functions
- `src/models/` - TypeScript interfaces and models

## Test Cases Covered

1. Login with valid and invalid credentials
2. Add items to cart and verify badge count
3. Remove items from cart
4. Complete checkout flow
5. Logout functionality

## Reports

- HTML reports are generated in the `reports/html-report/` directory
- JSON reports are generated in the `reports/json-report/` directory
- Allure reports are generated in the `allure-results/` and `allure-report/` directories

## CI/CD Integration

The project includes a GitHub Actions workflow that runs tests on push and pull requests to the main branch.

## Bonus Features Implemented

- ✅ Data-driven tests
- ✅ Screenshots on failure
- ✅ HTML/JSON test report generation
- ✅ Allure reporting
- ✅ Parallel test execution
- ✅ GitHub Actions CI integration