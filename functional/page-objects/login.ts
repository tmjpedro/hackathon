"use strict";
import { LOGIN_URL, DASHBOARD_URL } from "../helpers/constants";
import {
  waitForElementIsVisible,
  getElement,
  clickOn,
  waitForUrlContains,
  isDisplayed,
  getElements
} from "../helpers/custom";

export const rootSelector = ".auth-box-w";
const logo = ".logo-w img";
const usernameInput = "#username";
const passwordInput = "#password";
const loginButton = "#log-in";
const loginHeader = "h4.auth-header";
const usernameIcon = ".os-icon-user-male-circle";
const passwordIcon = ".os-icon-fingerprint";
const label = "label";
const socialIcons = ".buttons-w img";
const warningAlert = ".alert-warning";
const rememberMeCheckbox = 'input[type="checkbox"]';

export function setUsername(user: string) {
  return getElement(usernameInput).setValue(user);
}

export function setPassword(pass: string) {
  return getElement(passwordInput).setValue(pass);
}

export function getLoginHeaderText() {
  return getElement(loginHeader).getText();
}

export function getLoginButtonText() {
  return getElement(loginButton).getText();
}

export function getUsernamePlaceholder() {
  return getElement(usernameInput).getAttribute("placeholder");
}

export function getPasswordPlaceholder() {
  return getElement(passwordInput).getAttribute("placeholder");
}

export function getLabels() {
  return getElements(label);
}

export function isLogoDisplayed() {
  return isDisplayed(logo);
}

export function isUsernameIconDisplayed() {
  return isDisplayed(usernameIcon);
}

export function isPasswordIconDisplayed() {
  return isDisplayed(passwordIcon);
}

export function getSocialIcons() {
  return getElements(socialIcons);
}

export function navigateToLogin(showAd = false) {
  browser.url(showAd === false ? LOGIN_URL : LOGIN_URL + "?showAd=true");
  waitForElementIsVisible(rootSelector);
}

export function clickOnLoginButton() {
  return clickOn(loginButton);
}

export function isWarningAlertDisplayed() {
  return isDisplayed(warningAlert);
}

export function getWarningText() {
  return getElement(warningAlert).getText();
}

export function isRememberMeCheckboxtDisplayed() {
  return isDisplayed(rememberMeCheckbox);
}

export function login() {
  setUsername(process.env.USERNAME!);
  setPassword(process.env.PASSWORD!);
  clickOnLoginButton();
  waitForUrlContains(DASHBOARD_URL);
}
