import { Page } from '@playwright/test';
import { LoginDesktopPage } from './book-store-application/login/login.desktop';
import { LoginMobilePage } from './book-store-application/login/login.mobile';
import { LoginPage } from './book-store-application/login/login.page';
import { RegisterMobilePage } from './book-store-application/register/register.mobile';
import { RegisterDesktopPage } from './book-store-application/register/register.desktop';
import { RegisterPage } from './book-store-application/register/register.page';
import { BooksPage } from './book-store-application/bookstore/books.page';
import { BooksDesktopPage } from './book-store-application/bookstore/books.desktop';
import { BooksMobilePage } from './book-store-application/bookstore/books.mobile';
import { BookDetailPage } from './book-store-application/bookstore/book.detail.page';
import { ProfilePage } from './book-store-application/profile/profile.page';
import { PracticeFormPage } from './forms/practice-form.page';
import { PracticeFormDesktopPage } from './forms/practice-form.desktop';
import { PracticeFormMobilePage } from './forms/practice-form.mobile';
import { BrowserWindowsPage } from './alerts-frame-windows/browser-windows/browser-windows.page';
import { BrowserWindowsDesktopPage } from './alerts-frame-windows/browser-windows/browser-windows.desktop';
import { BrowserWindowsMobilePage } from './alerts-frame-windows/browser-windows/browser-windows.mobile';
import { AlertsPage } from './alerts-frame-windows/alerts/alerts.page';
import { AlertsDesktopPage } from './alerts-frame-windows/alerts/alerts.desktop';
import { AlertsMobilePage } from './alerts-frame-windows/alerts/alerts.mobile';
import { FramesPage } from './alerts-frame-windows/frames/frames.page';
import { FramesDesktopPage } from './alerts-frame-windows/frames/frames.desktop';
import { FramesMobilePage } from './alerts-frame-windows/frames/frames.mobile';
import { NestedFramesPage } from './alerts-frame-windows/nested-frames/nested-frames.page';
import { NestedFramesDesktopPage } from './alerts-frame-windows/nested-frames/nested-frames.desktop';
import { NestedFramesMobilePage } from './alerts-frame-windows/nested-frames/nested-frames.mobile';
import { ModalDialogsPage } from './alerts-frame-windows/modal-dialogs/modal-dialogs.page';
import { ModalDialogsDesktopPage } from './alerts-frame-windows/modal-dialogs/modal-dialogs.desktop';
import { ModalDialogsMobilePage } from './alerts-frame-windows/modal-dialogs/modal-dialogs.mobile';
import { TextBoxPage } from './elements/text-box/text-box.page';
import { TextBoxDesktopPage } from './elements/text-box/text-box.desktop';
import { TextBoxMobilePage } from './elements/text-box/text-box.mobile';
import { CheckBoxPage } from './elements/check-box/check-box.page';
import { CheckBoxDesktopPage } from './elements/check-box/check-box.desktop';
import { CheckBoxMobilePage } from './elements/check-box/check-box.mobile';
import { RadioButtonPage } from './elements/radio-button/radio-button.page';
import { RadioButtonDesktopPage } from './elements/radio-button/radio-button.desktop';
import { RadioButtonMobilePage } from './elements/radio-button/radio-button.mobile';
import { WebTablesPage } from './elements/web-tables/web-tables.page';
import { WebTablesDesktopPage } from './elements/web-tables/web-tables.desktop';
import { WebTablesMobilePage } from './elements/web-tables/web-tables.mobile';
import { ButtonsPage } from './elements/buttons/buttons.page';
import { ButtonsDesktopPage } from './elements/buttons/buttons.desktop';
import { ButtonsMobilePage } from './elements/buttons/buttons.mobile';
import { LinksPage } from './elements/links/links.page';
import { LinksDesktopPage } from './elements/links/links.desktop';
import { LinksMobilePage } from './elements/links/links.mobile';
import { BrokenLinksImagesPage } from './elements/broken-links-images/broken-links-images.page';
import { BrokenLinksImagesDesktopPage } from './elements/broken-links-images/broken-links-images.desktop';
import { BrokenLinksImagesMobilePage } from './elements/broken-links-images/broken-links-images.mobile';
import { UploadDownloadPage } from './elements/upload-download/upload-download.page';
import { UploadDownloadDesktopPage } from './elements/upload-download/upload-download.desktop';
import { UploadDownloadMobilePage } from './elements/upload-download/upload-download.mobile';
import { DynamicPropertiesPage } from './elements/dynamic-properties/dynamic-properties.page';
import { DynamicPropertiesDesktopPage } from './elements/dynamic-properties/dynamic-properties.desktop';
import { DynamicPropertiesMobilePage } from './elements/dynamic-properties/dynamic-properties.mobile';
import { AccordianPage } from './widgets/accordian/accordian.page';
import { AccordianDesktopPage } from './widgets/accordian/accordian.desktop';
import { AccordianMobilePage } from './widgets/accordian/accordian.mobile';
import { AutoCompletePage } from './widgets/auto-complete/auto-complete.page';
import { AutoCompleteDesktopPage } from './widgets/auto-complete/auto-complete.desktop';
import { AutoCompleteMobilePage } from './widgets/auto-complete/auto-complete.mobile';
import { DatePickerPage } from './widgets/date-picker/date-picker.page';
import { DatePickerDesktopPage } from './widgets/date-picker/date-picker.desktop';
import { DatePickerMobilePage } from './widgets/date-picker/date-picker.mobile';
import { SliderPage } from './widgets/slider/slider.page';
import { SliderDesktopPage } from './widgets/slider/slider.desktop';
import { SliderMobilePage } from './widgets/slider/slider.mobile';
import { ProgressBarPage } from './widgets/progress-bar/progress-bar.page';
import { ProgressBarDesktopPage } from './widgets/progress-bar/progress-bar.desktop';
import { ProgressBarMobilePage } from './widgets/progress-bar/progress-bar.mobile';
import { TabsPage } from './widgets/tabs/tabs.page';
import { TabsDesktopPage } from './widgets/tabs/tabs.desktop';
import { TabsMobilePage } from './widgets/tabs/tabs.mobile';
import { ToolTipsPage } from './widgets/tool-tips/tool-tips.page';
import { ToolTipsDesktopPage } from './widgets/tool-tips/tool-tips.desktop';
import { ToolTipsMobilePage } from './widgets/tool-tips/tool-tips.mobile';
import { MenuPage } from './widgets/menu/menu.page';
import { MenuDesktopPage } from './widgets/menu/menu.desktop';
import { MenuMobilePage } from './widgets/menu/menu.mobile';
import { SelectMenuPage } from './widgets/select-menu/select-menu.page';
import { SelectMenuDesktopPage } from './widgets/select-menu/select-menu.desktop';
import { SelectMenuMobilePage } from './widgets/select-menu/select-menu.mobile';

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

  static alerts(page: Page): AlertsPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new AlertsMobilePage(page)
      : new AlertsDesktopPage(page);
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
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new TextBoxMobilePage(page)
      : new TextBoxDesktopPage(page);
  }

  static checkBox(page: Page): CheckBoxPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new CheckBoxMobilePage(page)
      : new CheckBoxDesktopPage(page);
  }

  static radioButton(page: Page): RadioButtonPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new RadioButtonMobilePage(page)
      : new RadioButtonDesktopPage(page);
  }

  static webTables(page: Page): WebTablesPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new WebTablesMobilePage(page)
      : new WebTablesDesktopPage(page);
  }

  static buttons(page: Page): ButtonsPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new ButtonsMobilePage(page)
      : new ButtonsDesktopPage(page);
  }

  static links(page: Page): LinksPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new LinksMobilePage(page)
      : new LinksDesktopPage(page);
  }

  static brokenLinksImages(page: Page): BrokenLinksImagesPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new BrokenLinksImagesMobilePage(page)
      : new BrokenLinksImagesDesktopPage(page);
  }

  static uploadDownload(page: Page): UploadDownloadPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new UploadDownloadMobilePage(page)
      : new UploadDownloadDesktopPage(page);
  }

  static dynamicProperties(page: Page): DynamicPropertiesPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new DynamicPropertiesMobilePage(page)
      : new DynamicPropertiesDesktopPage(page);
  }

  static accordian(page: Page): AccordianPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new AccordianMobilePage(page)
      : new AccordianDesktopPage(page);
  }

  static autoComplete(page: Page): AutoCompletePage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new AutoCompleteMobilePage(page)
      : new AutoCompleteDesktopPage(page);
  }

  static datePicker(page: Page): DatePickerPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new DatePickerMobilePage(page)
      : new DatePickerDesktopPage(page);
  }

  static slider(page: Page): SliderPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new SliderMobilePage(page)
      : new SliderDesktopPage(page);
  }

  static progressBar(page: Page): ProgressBarPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new ProgressBarMobilePage(page)
      : new ProgressBarDesktopPage(page);
  }

  static tabs(page: Page): TabsPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new TabsMobilePage(page)
      : new TabsDesktopPage(page);
  }

  static toolTips(page: Page): ToolTipsPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new ToolTipsMobilePage(page)
      : new ToolTipsDesktopPage(page);
  }

  static menu(page: Page): MenuPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new MenuMobilePage(page)
      : new MenuDesktopPage(page);
  }

  static selectMenu(page: Page): SelectMenuPage {
    const width = page.viewportSize()?.width ?? 0;
    return width < 768
      ? new SelectMenuMobilePage(page)
      : new SelectMenuDesktopPage(page);
  }
}
