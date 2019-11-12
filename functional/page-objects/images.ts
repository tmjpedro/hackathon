"use strict";
import { isDisplayed } from "../helpers/custom";

const flashSaleGif1 = "#flashSale img";
const flashSaleGif2 = "#flashSale2 img";

export function isFlashSaleGif1Displayed() {
  return isDisplayed(flashSaleGif1);
}

export function isFlashSaleGif2Displayed() {
  return isDisplayed(flashSaleGif2);
}
