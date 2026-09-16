import { faker } from "@faker-js/faker";

export default class RealtorApi {
  constructor(request, accessToken) {
    this.request = request;
    this.accessToken = accessToken;
  }

  getAuthHeader() {
    return this.accessToken.startsWith("Bearer ")
      ? this.accessToken
      : `Bearer ${this.accessToken}`;
  }

  async createRealtor() {
    const data = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password:  "DontTestMe",
        user_surname: "Test",
        user_role: JSON.stringify([
            {
                "id": 3,
                "description": "Realtor",
                "type": "realtor"
            }
        ]),
        avatarUrl: "/static/media/1.44b525e135229f361e09.jpeg",
        isRealtor: "true",
        isPublic: "false",
    };

    const response = await this.request.post("/api/users", {
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

  async deleteRealtor(id) {
    const response = await this.request.delete(`/api/users/${id}`, {
      headers: {
        Authorization: this.getAuthHeader(),
      },
    });
  }
}