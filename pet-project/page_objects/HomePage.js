export default class HomePage {
  constructor(page) {
    this.page = page;
    this.login = page.getByRole("link", { name: "Login" });
    this.register = page.getByRole("link", { name: "Register" });
    this.searchLabel = page.getByLabel("Search");
    this.bedroomsLabel = page.getByRole("button", { name: "Bedrooms" });
    this.cityLabel = page.getByLabel("City");
    this.searchButton = page.getByRole("button", { name: "Start Search" });
    this.priceSlider = page.locator(".MuiSlider-track");
    this.minPrice = page.locator('span[data-index="0"] input[type="range"]');
    this.maxPrice = page.locator('span[data-index="1"] input[type="range"]');
    this.darkMode = page.getByRole("checkbox");
  }

  async open() {
    await this.page.goto("/");
  }

  async navigateToLogin() {
    await this.login.click();
  }

  async navigateToRegister() {
    await this.register.click();
  }

  async searchByTitle(title) {
    await this.searchLabel.fill(title);
    await this.searchButton.click();
  }

  async searchByBedroom(value) {
    await this.bedroomsLabel.click();
    await this.page.getByRole("option", { name: `${value}+`, exact: true }).click();
    await this.searchButton.click();
  }

  async searchByCity(city) {
    await this.cityLabel.fill(city);
    await this.searchButton.click();
  }

  async searchByPriceRange(min, max) {
    await this.priceSlider.focus();
    await this.minPrice.fill(min);
    await this.maxPrice.fill(max);
    await this.searchButton.click();
  }
}
