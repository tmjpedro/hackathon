import { HUGE_SLEEP, MEDIUM_SLEEP, LONG_SLEEP, SHORT_SLEEP } from "./constants";
import { Element } from "@wdio/sync";

/**
 * @summary wait until an element is with the given locator appears in DOM
 * @param {string} locator - locator to wait for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {boolean}
 */
export const waitFor = (locator: string, timeout = HUGE_SLEEP): boolean => {
  return $(locator).waitForExist(timeout);
};

/**
 * @summary given an locator returns the an element
 * @param {string} locator - locator to look for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {Element}
 */
export const getElement = (
  locator: string,
  timeout = LONG_SLEEP,
  waitForExist = true
): Element => {
  if (waitForExist) waitFor(locator, timeout);
  return $(locator);
};

/**
 * @summary given an locator returns the an element
 * @param {string} locator - locator to look for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {Element[]}
 */
export const getElements = (
  locator: string,
  timeout = HUGE_SLEEP
): Element[] => {
  waitFor(locator, timeout);
  return $$(locator);
};

/**
 * @summary wait until an element is with the given locator appears in DOM and count all elements
 * @param {string} locator - locator to count for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {number}
 */
export const countElements = (
  locator: string,
  timeout = HUGE_SLEEP
): number => {
  try {
    const elems = getElements(locator, timeout);
    return elems.length;
  } catch (e) {
    return 0;
  }
};

/**
 * @summary check if locator is present in dom
 * @param {string} locator - locator to look for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {boolean}
 */
export const isPresent = (locator: string, timeout = LONG_SLEEP): boolean => {
  const nElements = countElements(locator, timeout);
  return nElements !== 0;
};

/**
 * @summary check if locator is displayed
 * @param {string} locator - locator to look for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {boolean}
 */
export const isDisplayed = (
  locator: string,
  timeout = MEDIUM_SLEEP
): boolean => {
  if (isPresent(locator, timeout)) {
    const elem = getElement(locator);
    return elem.isDisplayed();
  }
  return false;
};

/**
 * @summary given an locator returns the textContent attribute of the element
 * @param {string} locator - locator to look for
 * @return {string}
 */
export const getText = (locator: string, timeout = LONG_SLEEP): string => {
  const elem = getElement(locator, timeout);
  return elem.getAttribute("textContent");
};

/**
 * @summary wait until an element is with the given locator is visible
 * @param {string} locator - locator to wait for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {Element}
 */
export const waitForElementIsVisible = (
  locator: string,
  timeout = LONG_SLEEP
): Element => {
  const elem = getElement(locator, timeout);
  elem.waitForDisplayed(timeout);
  return elem;
};
/**
 * @summary wait until url contains
 * @param {string} url - url to wait for
 * @param {number} timeout - Number max of time in ms that function are looking for locator
 * @return {boolean}
 */
export const waitForUrlContains = (
  url: string,
  timeout = HUGE_SLEEP
): boolean => {
  return browser.waitUntil(
    (): boolean => {
      const currentUrl = browser.getUrl();
      return currentUrl.includes(url);
    },
    timeout,
    "waitForUrlContains: " + url,
    SHORT_SLEEP
  );
};

/**
 * @summary Click in desired locator
 * @param {string} locator - locator to look for
 * @return {void}
 */
export const clickOn = (locator: string): void => {
  const elem = waitForElementIsVisible(locator);
  return elem.click();
};
