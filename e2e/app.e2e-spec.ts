import { SessionHandlerPage } from './app.po';

describe('session-handler App', () => {
  let page: SessionHandlerPage;

  beforeEach(() => {
    page = new SessionHandlerPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
