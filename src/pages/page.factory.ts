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
import { PracticeFormDesktopPage } from './forms/practice-form.desktop';
import { PracticeFormMobilePage } from './forms/practice-form.mobile';
import { BrowserWindowsPage } from './browser-windows/browser-windows.page';
import { BrowserWindowsDesktopPage } from './browser-windows/browser-windows.desktop';
import { BrowserWindowsMobilePage } from './browser-windows/browser-windows.mobile';
import { FramesPage } from './frames/frames.page';
import { FramesDesktopPage } from './frames/frames.desktop';
import { FramesMobilePage } from './frames/frames.mobile';
import { NestedFramesPage } from './nested-frames/nested-frames.page';
import { NestedFramesDesktopPage } from './nested-frames/nested-frames.desktop';
import { NestedFramesMobilePage } from './nested-frames/nested-frames.mobile';

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
  const width = page.viewportSize()?.width ?? 0;
  return width < 768
    ? new PracticeFormMobilePage(page)
    : new PracticeFormDesktopPage(page);
}

static browserWindows(page: Page): BrowserWindowsPage {
  const width = page.viewportSize()?.width ?? 0;
  return width < 768
    ? new BrowserWindowsMobilePage(page)
    : new BrowserWindowsDesktopPage(page);
}

static frames(page: Page): FramesPage {
  const width = page.viewportSize()?.width ?? 0;
  return width < 768
    ? new FramesMobilePage(page)
    : new FramesDesktopPage(page);
}

static nestedFrames(page: Page): NestedFramesPage {
  const width = page.viewportSize()?.width ?? 0;
  return width < 768
    ? new NestedFramesMobilePage(page)
    : new NestedFramesDesktopPage(page);
}
}
