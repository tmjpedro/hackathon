"use strict";
import {
  waitForElementIsVisible,
  clickOn,
  isDisplayed
} from "../helpers/custom";

export const showDataForNextYear = "#addDataset";
export const chart = "#canvas";

export function waitForChart() {
  return waitForElementIsVisible(chart);
}

export function clickOnShowDataForNextYear() {
  return clickOn(showDataForNextYear);
}

export function isChartDisplayed() {
  return isDisplayed(chart);
}
