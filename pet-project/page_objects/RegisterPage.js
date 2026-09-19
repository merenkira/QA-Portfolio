export default class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByLabel("First Name");
    this.lastNameInput = page.getByLabel("Last Name");
    this.emailInput = page.getByLabel("Email address");
    this.passwordInput = page.getByLabel("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
    this.validationFailedMessage = page.getByText("Input data validation failed");
    this.firstNameRequired = page.getByText("First name required");
    this.lastNameRequired = page.getByText("Last name required");
    this.emailRequired = page.getByText("Email is required");
    this.passwordRequired = page.getByText("Password is required");
  }

  async register(firstName, lastName, email, password) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }
}
