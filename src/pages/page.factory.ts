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
import { ModalDialogsPage } from './modal-dialogs/modal-dialogs.page';
import { ModalDialogsDesktopPage } from './modal-dialogs/modal-dialogs.desktop';
import { ModalDialogsMobilePage } from './modal-dialogs/modal-dialogs.mobile';
import { TextBoxPage } from './elements/text-box.page';
import { CheckBoxPage } from './elements/check-box.page';
import { RadioButtonPage } from './elements/radio-button.page';
import { WebTablesPage } from './elements/web-tables.page';
import { ButtonsPage } from './elements/buttons.page';
import { LinksPage } from './elements/links.page';
import { BrokenLinksImagesPage } from './elements/broken-links-images.page';
import { UploadDownloadPage } from './elements/upload-download.page';
import { DynamicPropertiesPage } from './elements/dynamic-properties.page';

export class PageFactory {
  static login(page: Page): LoginPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new LoginMobilePage(page)
      : new LoginDesktopPage(page);
  }

  static register(page: Page): RegisterPage {
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

  static modalDialogs(page: Page): ModalDialogsPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new ModalDialogsMobilePage(page)
      : new ModalDialogsDesktopPage(page);
  }

  static textBox(page: Page): TextBoxPage {
    return new TextBoxPage(page);
  }

  static checkBox(page: Page): CheckBoxPage {
    return new CheckBoxPage(page);
  }

  static radioButton(page: Page): RadioButtonPage {
    return new RadioButtonPage(page);
  }

  static webTables(page: Page): WebTablesPage {
    return new WebTablesPage(page);
  }

  static buttons(page: Page): ButtonsPage {
    return new ButtonsPage(page);
  }

  static links(page: Page): LinksPage {
    return new LinksPage(page);
  }

  static brokenLinksImages(page: Page): BrokenLinksImagesPage {
    return new BrokenLinksImagesPage(page);
  }

  static uploadDownload(page: Page): UploadDownloadPage {
    return new UploadDownloadPage(page);
  }

  static dynamicProperties(page: Page): DynamicPropertiesPage {
    return new DynamicPropertiesPage(page);
  }
}
