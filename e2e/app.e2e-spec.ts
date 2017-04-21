import { VKgramPage } from './app.po';

describe('vkgram App', () => {
  let page: VKgramPage;

  beforeEach(() => {
    page = new VKgramPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
