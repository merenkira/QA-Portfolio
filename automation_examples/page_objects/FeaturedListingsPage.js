export default class FeaturedListingsPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByLabel("Search");
    this.bedroomsField = page.getByLabel("Bedrooms");
    this.cityField = page.getByLabel("City");
    this.bedroomsLabel = page.getByRole("button", { name: "Bedrooms" });
    this.cityLabel = page.getByLabel("City");
    this.searchButton = page.getByRole("button", { name: "Start Search" });
    this.firstListing = page.locator(".MuiGrid-root.MuiGrid-grid-md-4").first();
    this.allListings = page.locator(".MuiGrid-root.MuiGrid-grid-md-4");
    this.darkMode = page.getByRole("checkbox");
    this.bedroomRows = page
      .locator(".MuiCardContent-root .MuiGrid-item")
      .filter({ hasText: "Bedrooms:" });
    this.cityRows = page
      .locator(".MuiCardContent-root .MuiGrid-item")
      .filter({ hasText: "City:" });
    this.minPrice = page.locator('span[data-index="0"] input[type="range"]');
    this.maxPrice = page.locator('span[data-index="1"] input[type="range"]');
    this.priceSlider = page.locator(".MuiSlider-track");
    this.minPrice = page.locator('span[data-index="0"] input[type="range"]');
    this.maxPrice = page.locator('span[data-index="1"] input[type="range"]');
    this.whiteHeartIcon = page.locator('.MuiBox-root.iconify--akar-icons').first();
    this.redHeartIcon = page.locator('.MuiBox-root.iconify--ant-design').first();
  }

  async open() {
    await this.page.goto("/featured-listings");
  }

  async getListingsByBedroom() {
    const bedroomsText = await this.bedroomRows.allTextContents();
    return bedroomsText.map((text) =>
      Number(text.replace("Bedrooms:", "").trim()),
    );
  }

  async getListingsByCity() {
    const cityText = await this.cityRows.allTextContents();
    return cityText.map((text) => text.replace("City:", "").trim());
  }

  async getAllListings() {
    return await this.allListings.all();
  }

  getListingByTitle(title) {
    return this.allListings.filter({ hasText: title }).first();
  }

  async getListingData(listing = this.firstListing) {
    const rows = listing.locator(".MuiCardContent-root .MuiGrid-item");
    await rows.first().waitFor({ state: "visible", timeout: 10000 });
    return rows.allTextContents();
  }

  getMoreInfoButton(listing = this.firstListing) {
    return listing.getByRole("link", { name: "More Info" });
  }

  async getPriceOfRandomListing() {
    const totalQuantity = await this.allListings.count();
    const randomIndex = Math.floor(Math.random() * totalQuantity);
    const randomListing = this.allListings.nth(randomIndex);

    const priceText = await randomListing
      .getByText(/^\$\s?[\d,]+/)
      .first()
      .textContent();
    return Number(priceText.replace(/[^0-9]/g, ""));
  }

  async searchByTitle(title) {
    await this.searchField.fill(title);
    await this.searchButton.click();
  }

  async searchByBedroom(value) {
    await this.bedroomsLabel.click();
    await this.page
      .getByRole("option", { name: `${value}+`, exact: true })
      .click();
    await this.searchButton.click();
  }

  async searchByCity(city) {
    await this.cityLabel.fill(city);
    (this.searchButton.click(),
      this.page.waitForURL(/city=/),
      await this.page
        .getByText(`City: ${city}`, { exact: false })
        .first()
        .waitFor({
          state: "visible",
          timeout: 10000,
        }));
  }

  async searchByPriceRange(min, max) {
    await this.priceSlider.focus();
    await this.minPrice.fill(min);
    await this.maxPrice.fill(max);
    await this.searchButton.click();

    await this.page.waitForURL(/price=/);
    await this.page.waitForTimeout(1000);
  }

  async getListingDataToCompare(listing) {
    const cardData = await this.getListingData(listing);
    const valuesToCompare = [];

    for (const row of cardData) {
      if (row.includes("City:")) continue;
      if (row.includes("Zip/Code:")) continue;
      if (row.includes("State:")) continue;

      let fieldValue;

      if (row.includes(":")) {
        const parts = row.split(":");
        fieldValue = parts[1].trim();
      } else {
        fieldValue = row.trim();
      }

      if (fieldValue) {
        valuesToCompare.push(fieldValue);
      }
    }

    return valuesToCompare;
  }

  async addListingToFavorites() {
    await this.whiteHeartIcon.first().click();
  }
}
