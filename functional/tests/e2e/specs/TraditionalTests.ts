import * as login from "../../../page-objects/login";
import * as toolbar from "../../../page-objects/toolbar";
import * as transactions from "../../../page-objects/transactions";
import * as chart from "../../../page-objects/chart";
import * as images from "../../../page-objects/images";
import { DASHBOARD_URL, COMPARE_EXPENSES } from "../../../helpers/constants";

describe("Traditional Tests", () => {
  beforeEach(() => {
    login.navigateToLogin();
  });
  describe("1 - Login Page UI Elements Test", () => {
    it("should check ui elements", () => {
      // Logo
      expect(login.isLogoDisplayed()).toBeTruthy();

      // Header
      expect(login.getLoginHeaderText()).toContain("Login Form");

      // Placeholder
      expect(login.getUsernamePlaceholder()).toBe("Enter your username");
      expect(login.getPasswordPlaceholder()).toBe("Enter your password");

      // Labels
      const labels = login.getLabels();
      expect(labels[0].getText()).toBe("Username");
      expect(labels[1].getText()).toBe("Password");
      expect(labels[2].getText()).toBe("Remember Me");

      // Icons
      expect(login.isUsernameIconDisplayed()).toBeTruthy();
      expect(login.isPasswordIconDisplayed()).toBeTruthy();

      // Button
      expect(login.getLoginButtonText()).toBe("Log In");

      // Remember Me Checkbox
      expect(login.isRememberMeCheckboxtDisplayed()).toBeTruthy();

      // SocialIcons
      const socialIcons = login.getSocialIcons();
      expect(socialIcons.length).toBe(3);

      expect(socialIcons[0].getAttribute("src")).toContain("twitter");
      expect(socialIcons[1].getAttribute("src")).toContain("facebook");
      expect(socialIcons[2].getAttribute("src")).toContain("linkedin");
    });
  });

  describe("2 - Data-Driven Test", () => {
    it("should throw an error if try login without fill any authentication field", () => {
      login.clickOnLoginButton();
      // check error message
      expect(login.isWarningAlertDisplayed()).toBeTruthy();
      expect(login.getWarningText()).toBe(
        "Both Username and Password must be present"
      );
    });
    it("should throw an error if try login with only enter the username", () => {
      login.setUsername("only_username");
      login.clickOnLoginButton();
      // check error message
      expect(login.isWarningAlertDisplayed()).toBeTruthy();
      expect(login.getWarningText()).toBe("Password must be present");
    });
    it("should throw an error if try login with only enter the password", () => {
      login.setPassword("only_password");
      login.clickOnLoginButton();
      // check error message
      expect(login.isWarningAlertDisplayed()).toBeTruthy();
      expect(login.getWarningText()).toBe("Username must be present");
    });

    it("should log you in if you fill authentication fields", () => {
      login.login();
      expect(browser.getUrl()).toContain(DASHBOARD_URL);
      // wait for
      toolbar.waitForToolbar();
      transactions.waitForTransactionsTable();
      // check they are visible
      expect(toolbar.isToolbarDisplayed()).toBeTruthy();
      expect(transactions.isTransactionsTableDisplayed()).toBeTruthy();
    });
  });

  describe("3 - Table Sort Test", () => {
    it("should be able to sort data in the table", () => {
      login.login();
      // click to sort asc
      transactions.clickOnAmountTableHeader();
      const amountsTextAsc = transactions.getAllAmmountsValue();
      const amountsAscSort = transactions.getAllAmmountsAscSort();

      expect(amountsTextAsc).toEqual(amountsAscSort);
    });
  });

  describe("4 - Canvas Chart Test", () => {
    it("should be able to displayed a bar chart", () => {
      login.login();
      toolbar.clickOnCompareExpensesLink();
      chart.waitForChart();
      expect(browser.getUrl()).toContain(COMPARE_EXPENSES);
      expect(chart.isChartDisplayed()).toBeTruthy();
      chart.clickOnShowDataForNextYear();
      // can't do validations :(
      // should still visible
      expect(chart.isChartDisplayed()).toBeTruthy();
    });
  });

  describe("5 - Dynamic Content Test", () => {
    it("should be able to displayed two promotional images", () => {
      // set show ad to true
      login.navigateToLogin(true);
      login.login();
      expect(images.isFlashSaleGif1Displayed()).toBeTruthy();
      expect(images.isFlashSaleGif2Displayed()).toBeTruthy();
    });
  });
});
