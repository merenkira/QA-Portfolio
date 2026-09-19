import { test, expect } from "../fixtures/fixtures";
import FeaturedListingsPage from "../../page_objects/FeaturedListingsPage";
import LoginPage from "../../page_objects/LoginPage";
import DashBoardPage from "../../page_objects/DashboardPage";

test.describe("Verify add to favorites functionality", () => {
  let createdListing;
  let listingData;

  test.beforeEach(async ({ page, createNewListingByRealtor }) => {
    createdListing = createNewListingByRealtor;
    listingData = createdListing.requestData;
  });

  test("User should be able to add a listing to Favorites Page", async ({ browser }, testInfo ) => {
    const listingTitle = listingData.title;
    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();

    const userLogin = new LoginPage(newPage);
    const userFeatured = new FeaturedListingsPage(newPage);
    const userDashBoard = new DashBoardPage(newPage);

    await userLogin.loginApi(testInfo.project.use.env.userEmail, testInfo.project.use.env.userPassword);
    await userFeatured.open();
    await userFeatured.searchByTitle(listingTitle);

    await expect(userFeatured.searchField).toHaveValue(listingTitle);
    await expect(userFeatured.firstListing).toContainText(listingTitle);

    await userFeatured.addListingToFavorites();

    await expect(userFeatured.redHeartIcon).toBeVisible();

    await userDashBoard.open();

    await expect(userDashBoard.favoriteListing).toContainText(listingTitle);
    await expect(userDashBoard.redHeartIcon).toBeVisible();
  });
});
