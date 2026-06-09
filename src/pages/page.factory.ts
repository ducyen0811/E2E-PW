import { Page } from '@playwright/test';
import { LoginDesktopPage } from './login/login.desktop';
import { LoginMobilePage } from './login/login.mobile';
import { LoginPage } from './login/login.page';
import { RegisterMobilePage } from './register/register.mobile';
import { RegisterDesktopPage } from './register/register.desktop';
import { RegisterPage } from './register/register.page';
import { BooksPage } from './bookstore/books.page';
import { BooksDesktopPage } from './bookstore/books.desktop';
import { BooksMobilePage } from './bookstore/books.mobile';
import { BookDetailPage } from './bookstore/book.detail.page';
import { ProfilePage } from './bookstore/profile.page';
import { PracticeFormPage } from './forms/practice-form.page';
import { BrowserWindowsPage } from './browser-windows/browser-windows.page';
import { BrowserWindowsDesktopPage } from './browser-windows/browser-windows.desktop';
import { BrowserWindowsMobilePage } from './browser-windows/browser-windows.mobile';

export class PageFactory {
  static login(page: Page): LoginPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new LoginMobilePage(page)
      : new LoginDesktopPage(page);
  }
  static register(page: Page) : RegisterPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new RegisterMobilePage(page)
      : new RegisterDesktopPage(page);
  }

static books(page: Page): BooksPage {
  const width = page.viewportSize()?.width ?? 0;
  return width < 768 
  ? new BooksMobilePage(page) 
  : new BooksDesktopPage(page);
}

static bookDetail(page: Page): BookDetailPage {
  return new BookDetailPage(page);
}

static profile(page: Page): ProfilePage {
  return new ProfilePage(page);
}

static practiceForm(page: Page): PracticeFormPage {
  return new PracticeFormPage(page);
}

static browserWindows(page: Page): BrowserWindowsPage {
  const width = page.viewportSize()?.width ?? 0;
  return width < 768
    ? new BrowserWindowsMobilePage(page)
    : new BrowserWindowsDesktopPage(page);
}
}
