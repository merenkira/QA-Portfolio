import { test, expect } from "../fixtures/fixtures";
import FeaturedListingsPage from "../../page_objects/FeaturedListingsPage";
import ListingDetailsPage from "../../page_objects/ListingDetailsPage";
import RealtorApi from "../../api/realtor.api";
import ListingApi from "../../api/listing.api";
import UserApi from "../../api/user.api";

test.describe("Search functionality on the Home Page", () => {
  let featured;
  let createdListing;
  let createdRealtor;
  let listingData;
  let listingApi;
  let realtorApi;
  let userApi;

  test.beforeEach(
    async ({ page, createNewListingByRealtor, createRealtor }) => {
      featured = new FeaturedListingsPage(page);
      listingApi = new ListingApi(createNewListingByRealtor);
      realtorApi = new RealtorApi(createRealtor);
      createdListing = createNewListingByRealtor;
      createdRealtor = createRealtor;
      listingData = createdListing.requestData;

      await featured.open();
      await featured.darkMode.check();
    },
  );

  test.afterEach(async ({ request }, testInfo) => {
    userApi = new UserApi(request);
    const accessToken = await userApi.getAccessToken(
      testInfo.project.use.env.adminEmail,
      testInfo.project.use.env.adminPassword,
    );

    listingApi = new ListingApi(request, accessToken);
    realtorApi = new RealtorApi(request, accessToken);

    await listingApi.deleteListing(createdListing.responseData.id);
    await realtorApi.deleteRealtor(createdRealtor.responseData.id);
    await expect(featured.darkMode).toBeChecked();
  });

  test("User should be able to search by title", async ({ page }) => {
    const title = listingData.title;

    await featured.searchByTitle(title);

    await expect(featured.searchField).toHaveValue(title);
    await expect(featured.firstListing).toContainText(title);
  });

  test("User should be able to search by bedrooms", async ({ page }) => {
    const bedrooms = listingData.bedrooms;

    await featured.searchByBedroom(bedrooms);

    await expect(featured.bedroomsField).toContainText(bedrooms);

    const bedroomNumbers = await featured.getListingsByBedroom();

    for (const bedroomNumber of bedroomNumbers) {
      expect(bedroomNumber).toBeGreaterThanOrEqual(Number(bedrooms));
    }
  });

  test("User should be able to search by city", async ({ page }) => {
    const details = new ListingDetailsPage(page);
    const value = listingData.city;

    await featured.searchByCity(value);

    await expect(featured.cityField).toHaveValue(value);

    const listingCard = featured.getListingByTitle(listingData.title);

    await expect(listingCard).toContainText(value);
    await expect(listingCard).toContainText(listingData.title);

    const valuesToCompare = await featured.getListingDataToCompare(listingCard);

    await featured.getMoreInfoButton(listingCard).click();
    await details.waitForLoaded();

    const missingFields = await details.getMissingFields(valuesToCompare);

    expect(missingFields).toEqual([]);
  });

  test("User should be able to search by price ", async ({ page }) => {
    const min = `500000`;
    const max = `1000000`;

    await featured.searchByPriceRange(min, max);

    await expect(page).toHaveURL(/featured-listings/);
    await expect(featured.minPrice).toHaveValue(min);
    await expect(featured.maxPrice).toHaveValue(max);

    const randomPrice = await featured.getPriceOfRandomListing();

    await expect(randomPrice).toBeGreaterThanOrEqual(Number(min));
    await expect(randomPrice).toBeLessThanOrEqual(Number(max));
  });
});
