import { test as base, expect } from "@playwright/test";
import UserApi from "../../api/user.api";
import ListingApi from "../../api/listing.api";
import RealtorApi from "../../api/realtor.api";

export const test = base.extend({
  authenticatedPage: async ({ context, request, page }, use, testInfo) => {
    const userApi = new UserApi(request);
    const accessToken = await userApi.getAccessToken(
      testInfo.project.use.env.adminEmail,
      testInfo.project.use.env.adminPassword,
    );

    await context.addInitScript((token) => {
      window.localStorage.setItem("accessToken", token);
    }, accessToken);

    await use(page);
  },

  createNewListing: async ({ request }, use, testInfo) => {
    const userApi = new UserApi(request);
    const accessToken = await userApi.getAccessToken(
      testInfo.project.use.env.adminEmail,
      testInfo.project.use.env.adminPassword,
    );
    const listingApi = new ListingApi(request, accessToken);
    const createdListing = await listingApi.createListing();
    await use(createdListing);
    await listingApi.deleteListing(createdListing.responseData.id);
  },

  createRealtor: async ({ request }, use, testInfo) => {
    const userApi = new UserApi(request);
    const accessToken = await userApi.getAccessToken(
      testInfo.project.use.env.adminEmail,
      testInfo.project.use.env.adminPassword,
    );
    const realtorApi = new RealtorApi(request, accessToken);
    const createdRealtor = await realtorApi.createRealtor();
    await use(createdRealtor);
  },

  createNewListingByRealtor: async ({ request, createRealtor }, use) => {
    const userApi = new UserApi(request);

    const accessToken = await userApi.getAccessToken(
      createRealtor.requestData.email,
      createRealtor.requestData.password,
    );
    const listingApi = new ListingApi(request, accessToken);
    const createdListing = await listingApi.createListing();
    await use(createdListing);
  },
});

export { expect };
