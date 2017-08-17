import { browser, by, element } from 'protractor';

export class WebPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ai-root h1')).getText();
  }
}
