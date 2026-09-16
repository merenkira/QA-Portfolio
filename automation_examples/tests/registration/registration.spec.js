import { test, expect } from "@playwright/test";
import HomePage from "../../page_objects/HomePage";
import RegisterPage from "../../page_objects/RegisterPage";
import DashBoardPage from "../../page_objects/DashboardPage";

test.describe("Register", () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);

    await page.goto("/");
    await home.navigateToRegister();
  });

  test("User should be able to create a new account", async ({ page }) => {
    const register = new RegisterPage(page);
    const dashboard = new DashBoardPage(page);
    
    await register.register("User", `Test${Date.now()}`, `test${Date.now()}@example.com`, "Password123!");

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboard.userFullName).toContainText("User Test");
    await expect(dashboard.userRole).toContainText('role: user');

  });

  test("User should not be able to create a new account with a registered email", async ({
    page,
  }, testInfo) => {
    const register = new RegisterPage(page);

    await register.register("User", `Test${Date.now()}`, testInfo.project.use.env.adminEmail, testInfo.project.use.env.adminPassword);

    await expect(register.validationFailedMessage).toBeVisible();
  });

  test("User should not be able to create a new account without filling in the required fields", async ({
    page,
  }) => {
    const register = new RegisterPage(page);
    
    await register.registerButton.click();

    await expect(register.firstNameRequired).toBeVisible();
    await expect(register.lastNameRequired).toBeVisible();
    await expect(register.emailRequired).toBeVisible();
    await expect(register.passwordRequired).toBeVisible();
  });
});
