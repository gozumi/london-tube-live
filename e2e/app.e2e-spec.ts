import { LondonTubeLivePage } from './app.po';

describe('london-tube-live App', function() {
  let page: LondonTubeLivePage;

  beforeEach(() => {
    page = new LondonTubeLivePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
