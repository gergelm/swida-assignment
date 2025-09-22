import { Page } from '@playwright/test';
import * as pages from '../utils/pages'

export async function login(page: Page, email: string, password: string) {
    await page.goto('/login');

    await page.fill(pages.INPUT_EMAIL, email);
    await page.fill(pages.INPUT_PASSWORD, password);

    await page.click(pages.BUTTON_LOGIN);
};

export function formatDate(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // months are 0-based
    const year = date.getFullYear();

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};