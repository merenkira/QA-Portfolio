export default class ListingDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async waitForLoaded() {
    await this.page
      .getByText("Bedrooms:")
      .waitFor({ state: "visible", timeout: 10000 });
  }

  async isHasText(value) {
    const count = await this.page.getByText(value, { exact: false }).count();
    return count > 0;
  }

  async getMissingFields(valuesToCompare) {
    const missingFields = [];

    for (const value of valuesToCompare) {
      const found = await this.isHasText(value);

      if (!found) {
        missingFields.push(value);
      }
    }

    return missingFields;
  }
}
