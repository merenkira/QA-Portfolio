import { test, expect } from "../fixtures/fixtures";
import HomePage from "../../page_objects/HomePage";
import LoginPage from "../../page_objects/LoginPage";
import DashBoardPage from "../../page_objects/DashboardPage";

test.describe("Login & Logout", () => {
  let home;
  let login;
  let dashboard;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    login = new LoginPage(page);
    dashboard = new DashBoardPage(page);

    await page.goto("/");
    await home.navigateToLogin();
  });

  test("User should be able to log in with existing credentionals", async ({page}, testInfo) => {
    await login.login(
      testInfo.project.use.env.adminEmail,
      testInfo.project.use.env.adminPassword,
    );

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboard.userFullName).toContainText(testInfo.project.use.env.adminFullName);
    await expect(dashboard.userRole).toContainText(testInfo.project.use.env.adminRole);
  });

  test("User should be able to log out", async ({
    page,
    authenticatedPage,
  }) => {
    await authenticatedPage.goto("/dashboard/user/profile");

    await dashboard.dashboardMenu.click();
    await dashboard.logOutButton.click();

    await expect(page).toHaveURL(/login/);
    await expect(login.signInMessage).toBeVisible();
  });
});
