export default class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.userFullName = page.locator('h6');
    this.userRole = page.getByLabel('scrollable content').getByRole('paragraph');
    this.dashboardMenu = page.locator("header").locator("button.MuiButtonBase-root");
    this.logOutButton = page.getByText("Logout");
    this.whiteHeartIcon = page.locator('.MuiBox-root.iconify--akar-icons').first();
    this.redHeartIcon = page.locator('.MuiBox-root.iconify--ant-design').first();
    this.favoriteListing = page.locator('.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6').first();
  }

  async open() {
    await this.page.goto("/dashboard/");
  }
}
