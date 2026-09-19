import { faker } from "@faker-js/faker";

export default class ListingApi {
  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  getAuthHeader() {
    return this.accessToken.startsWith(`Bearer `)
      ? this.accessToken
      : `Bearer ${this.accessToken}`;
  }

  async createListing() {
    const data = {
      images: "/static/media/1.44b525e135229f361e09.jpeg",
      lotSize: "2",
      sqft: `${faker.number.int({min: 500, max: 4000})}`,
      garage: `${faker.number.int({min: 0, max: 2})}`,
      bathrooms: `${faker.number.int({min: 1, max: 8})}`,
      bedrooms: `${faker.number.int({min: 1, max: 8})}`,
      price: `${faker.number.int({min: 500000, max: 1000000})}`,
      zipCode: `${faker.location.zipCode()}`,
      state: `${faker.location.state({ abbreviated: true })}`,
      city: `${faker.location.city()}`,
      address: "4527 w 142nd st",
      description:
        "Sunny and spacious 4 bed, 1 bath home in the very desirable Galewood. Well maintained home with low taxes. Close to shopping, bars, restaurants, and entertainment. Borders Oak Park. Come see it oneday :)",
      title: `Test House ${faker.number.int({ min: 1000, max: 10000 })}`,
      isPublished: "true",
    };

    const response = await this.request.post("/api/estate-objects", {
      multipart: data,
      headers: {
        Authorization: this.getAuthHeader()
      },
    });

    const responseText = await response.text();

    const responseData = JSON.parse(responseText);

    return {
      requestData: data,
      responseData,
    };
  }

  async deleteListing(id) {
    const response = await this.request.delete(`/api/estate-objects/${id}`, {
      headers: {
        Authorization: this.getAuthHeader(),
      },
    });
  }
}