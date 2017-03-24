import { Angular2MeanPage } from './app.po';

describe('angular2-mean App', () => {
  let page: Angular2MeanPage;

  beforeEach(() => {
    page = new Angular2MeanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
