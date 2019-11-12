"use strict";
import {
  waitForElementIsVisible,
  clickOn,
  getElements,
  isDisplayed
} from "../helpers/custom";

export const transactionsTable = "#transactionsTable";
const amountTableHeader = "#amount";
const amountValue = ".text-right.bolder.nowrap";

export function waitForTransactionsTable() {
  return waitForElementIsVisible(transactionsTable);
}

export function isTransactionsTableDisplayed() {
  return isDisplayed(transactionsTable);
}

export function clickOnAmountTableHeader() {
  return clickOn(amountTableHeader);
}

export function getAllAmmountsValue() {
  const amounts = getElements(amountValue);
  let amountsValue: number[] = [];
  amounts.forEach(amount => {
    let amountText = amount.getText();
    // replace and convert to number
    amountsValue.push(
      Number(
        amountText
          .replace(" ", "")
          .replace("USD", "")
          .replace(",", "")
      )
    );
  });
  return amountsValue;
}

export function getAllAmmountsAscSort() {
  const amounts = getElements(amountValue);
  let amountsValue: number[] = [];
  amounts.forEach(amount => {
    let amountText = amount.getText();
    // replace and convert to number
    amountsValue.push(
      Number(
        amountText
          .replace(" ", "")
          .replace("USD", "")
          .replace(",", "")
      )
    );
  });
  // ascending sort
  return amountsValue.sort((a, b) => a - b);
}
