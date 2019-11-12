"use strict";
import {
  waitForElementIsVisible,
  clickOn,
  isDisplayed
} from "../helpers/custom";

const toolbar = ".top-bar";
const compareExpenses = "#showExpensesChart";

export function waitForToolbar() {
  return waitForElementIsVisible(toolbar);
}

export function clickOnCompareExpensesLink() {
  waitForToolbar();
  return clickOn(compareExpenses);
}

export function isToolbarDisplayed() {
  return isDisplayed(toolbar);
}
