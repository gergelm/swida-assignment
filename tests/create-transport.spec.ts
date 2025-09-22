import { test, expect } from '@playwright/test';
import { login, formatDate } from '../utils/helpers';
import * as pages from '../utils/pages'

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const TEST_URL = process.env.TEST_URL || 'empty env';
const TEST_EMAIL = process.env.TEST_EMAIL || 'empty env';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'empty env';

const earliestDate = formatDate(new Date(Date.now() + 1 * 24 * 60 * 60 * 1000));
const latestDate = formatDate(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000));
const pickupCity = "Bratislava";
const deliveryCity = "Košice";
const country = "Slovakia";

test.beforeEach(async ({ page }) => {
    await page.goto(TEST_URL);
    login(page, TEST_EMAIL, TEST_PASSWORD);

    await page.click(pages.BUTTON_NEW_REQUEST);
});

test.afterEach(async ({ page }) => {
    if (page.url().match(/request\/view\/.*/)) {
        await page.click(pages.BUTTON_DROPDOWN_MENU);
        await page.click(pages.DROPDOWN_ITEM_DELETE);
        if ((await page.isVisible(pages.DIALOG_OVERLAY)).valueOf()) {
            await page.click(pages.BUTTON_DELETE);
        }
    }
});

test.describe('Transport request creation', () => {

    test('Happy path: create a valid transport request', async ({ page }) => {
        //Waypoints
        await page.fill(pages.INPUT_EARLIEST_PICKUP_TIME, earliestDate).finally(() => page.keyboard.press("Tab"));
        await page.fill(pages.INPUT_LATEST_PICKUP_TIME, latestDate).finally(() => page.keyboard.press("Tab"));
        await page.locator(pages.INPUT_CITY).nth(0).fill(pickupCity);
        await page.locator(pages.INPUT_COUNTRY).nth(0).fill(country).finally(() => page.keyboard.press("Enter"));
        await page.locator(pages.CHECKBOX_SAVE_ADDRESS).nth(0).uncheck();

        await page.fill(pages.INPUT_EARLIEST_DELIVERY_TIME, earliestDate).finally(() => page.keyboard.press("Tab"));
        await page.fill(pages.INPUT_LATEST_DELIVERY_TIME, latestDate).finally(() => page.keyboard.press("Tab"));
        await page.locator(pages.INPUT_CITY).nth(1).fill(deliveryCity);
        await page.locator(pages.INPUT_COUNTRY).nth(1).fill(country).finally(() => page.keyboard.press("Enter"));
        await page.locator(pages.CHECKBOX_SAVE_ADDRESS).nth(1).uncheck();

        await page.click(pages.BUTTON_CONTINUE);

        //Cargo info
        await page.click(pages.BUTTON_CONTINUE);

        //Carriers
        await page.check(pages.CHECKBOX_DEMO_CARRIER);
        await page.click(pages.BUTTON_CONTINUE);

        //Review
        await page.click(pages.BUTTON_SEND_REQUEST);

        //Request
        await expect(page.url()).toMatch(/request\/view\/.*/);
        await expect(page.locator('text=Bidding active')).toBeVisible();

        await expect(page.locator(`text=${earliestDate}`)).toHaveCount(2);
        await expect(page.locator(`text=${latestDate}`)).toHaveCount(2);
        await expect(page.locator(`text=${pickupCity}`)).toBeVisible();
        await expect(page.locator(`text=${deliveryCity}`)).toBeVisible();
        await expect(page.locator('text=SK')).toHaveCount(2);
    });

    test('Negative: required date fields validation', async ({ page }) => {
        //Waypoints
        await page.locator(pages.INPUT_CITY).nth(0).fill(pickupCity);
        await page.locator(pages.INPUT_COUNTRY).nth(0).fill(country).finally(() => page.keyboard.press("Enter"));
        await page.locator(pages.CHECKBOX_SAVE_ADDRESS).nth(0).uncheck();

        await page.locator(pages.INPUT_CITY).nth(1).fill(deliveryCity);
        await page.locator(pages.INPUT_COUNTRY).nth(1).fill(country).finally(() => page.keyboard.press("Enter"));
        await page.locator(pages.CHECKBOX_SAVE_ADDRESS).nth(1).uncheck();

        await page.click(pages.BUTTON_CONTINUE);

        //Cargo info
        await page.click(pages.BUTTON_CONTINUE);

        //Carriers
        await page.click(pages.BUTTON_CONTINUE);

        //Review
        await expect(page.locator('[class*=text-danger]')).toHaveCount(2);
        await expect(page.locator('text=Date and time missing')).toHaveCount(2);
        await expect(page.locator(pages.BUTTON_SEND_REQUEST)).toBeDisabled();
    });

    test('Resilience/usability: error message revalidation and data consistency', async ({ page }) => {
        //Waypoints
        await page.click(pages.BUTTON_CONTINUE); //validation, cannot proceed

        await expect(page.locator('[class*=bg-danger]')).toBeVisible();
        await expect(page.locator('text=This field is required.')).toHaveCount(4);

        await page.locator(pages.INPUT_CITY).nth(0).fill(pickupCity);
        await page.locator(pages.INPUT_COUNTRY).nth(0).fill(country).finally(() => page.keyboard.press("Enter"));
        await page.locator(pages.CHECKBOX_SAVE_ADDRESS).nth(0).uncheck();

        await page.locator(pages.INPUT_CITY).nth(1).fill(deliveryCity);
        await page.locator(pages.INPUT_COUNTRY).nth(1).fill(country).finally(() => page.keyboard.press("Enter"));
        await page.locator(pages.CHECKBOX_SAVE_ADDRESS).nth(1).uncheck();

        await page.click(pages.BUTTON_CONTINUE); //validation, can proceed

        //Cargo info
        await expect(page.locator('[class*=bg-danger]')).not.toBeVisible();
        await page.click(pages.BUTTON_GO_BACK);

        //Waypoints
        await expect(page.locator('text=This field is required.')).toHaveCount(0);

        await expect(page.locator(pages.INPUT_CITY).nth(0)).toHaveValue(pickupCity);
        await expect(page.locator(pages.INPUT_COUNTRY).nth(0)).toHaveValue(country);
        await expect(page.locator(pages.INPUT_CITY).nth(1)).toHaveValue(deliveryCity);
        await expect(page.locator(pages.INPUT_COUNTRY).nth(1)).toHaveValue(country);
    });
});
