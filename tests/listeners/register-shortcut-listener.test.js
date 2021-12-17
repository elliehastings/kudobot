import registerShortcutListener from '../../listeners/register-shortcut-listener.js';
import sinon from 'sinon';

// TESTING NOTES
// app = injected dependency with a #shortcut(callback_id, callback) method
// app.shortcut(callback_id, callback)

// ** We inject app into this extracted function, so app can be whatever we want!

// const appMock = {
//   shortcut(callbackId, callback) { callback({ shortcut, ack, client, logger }) }
// }

// registerShortcutListener(appMock)
//    -> appMock.shortcut(callbackId, callback) -> runs the callback

test('works', async () => {
  // shortcut is an object with a #trigger_id method that returns a long string like '2875959438160.2830055761090.7355c2b2bef4764a636ed1cefa98ae4a'
  const shortcut = {
    trigger_id: '111.111.1111',
  };
  // ack is an async function that resovles, we don't care about the results
  const ack = sinon.fake.resolves(true);

  //client
  // views -> open accepts a big view object and returns a result object a la:
  // {
  //   ok: true,
  //   view: {
  //     id: 'V02R27TTJEP', ... <more>
  //   },
  //   response_metadata: {
  //     scopes: [ 'chat:write', 'commands', 'channels:read', 'chat:write.public' ]
  //   }
  // }

  const fakeResult = { ok: true };
  const views = { async open() {} };
  const viewsStub = sinon.stub(views, 'open').resolves(fakeResult);
  const client = { views };

  // logger - TODO
  const logger = { info() {}, error() {} };
  const loggerInfoStub = sinon.stub(logger, 'info');
  const loggerErrorStub = sinon.stub(logger, 'error');

  const appMock = {
    shortcut(callbackId, callback) {
      callback({ shortcut, ack, client, logger });
    },
  };

  registerShortcutListener(appMock);

  expect(true).toBe(true);

  // TODO - ASSERT
  // sinon.assert.calledWith(spy, message);

  // TODO - add afterEach and sinon restore to prevent leaks
  // sinon.restore();
});
