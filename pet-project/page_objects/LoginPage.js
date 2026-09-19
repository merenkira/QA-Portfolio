import UserApi from "../api/user.api";

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.signInMessage = page.getByText("Sign in to Delek Homes");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginApi(email, password) {
    const userApi = new UserApi(this.page.request);

    const accessToken = await userApi.getAccessToken(email, password);

    await this.page.goto("/");
    await this.page.evaluate((token) => {
      localStorage.setItem("accessToken", token);
    }, accessToken);
    await this.page.goto("/dashboard/user/profile");

    return accessToken;
  }
}
