import registerShortcutListener from '../../listeners/register-shortcut-listener.js';
import modalView from '../../payloads/modal-view.js';
import sinon from 'sinon';

/*

registerShortcutListener(app)
- Synchronous function
- Calls app.shortcut(callbackId: string, async callback: (options: optionsObject) => void))

callback
- Asynchronous function
- Accepts an optionsObject: { shortcut, ack, client, logger }
- Calls asynchronous code - ack(), client.views.open()
- Calls synchronous code - logger.info()

test - appMock
- Object
- Has a synchronous shortcut() function
- shortcut(callbackId, callback) calls the callback with an optionsObject
  with the test dependencies
- When the test runs, it calls app.shortcut() on the appMock, which then passes
  an async callback function defined in registerShortcutListener() in to appMock to
  be called synchronously

  const appMock = {
    shortcut(callbackId, callback) {
      callback({ shortcut, ack, client, logger });
    },
  };

Seems like maybe we need to await the call to callback in appMock.shortcut(), but how?
*/

test('works', async () => {
  // These comments can be removed when I convert to TypeScript!
  // shortcut : an object with a #trigger_id method that returns a long string like '2875959438160.2830055761090.7355c2b2bef4764a636ed1cefa98ae4a'
  const shortcut = {
    trigger_id: '111.111.11a11b1',
  };
  // ack() : async function that resovles, we don't care about the results
  const ack = sinon.fake.resolves(true);

  // client -> views -> open accepts a big view object and returns a result object ( simplified to { ok: true } )
  const fakeResult = { ok: true };
  const client = { views: { open: sinon.fake.resolves(fakeResult) } };

  // logger: object with info() and error() methods; we don't care what they do
  const logger = { info: sinon.fake(), error: sinon.fake() };

  const appMock = {
    shortcut(callbackId, callback) {
      callback({ shortcut, ack, client, logger });
    },
  };

  const viewPayload = {
    trigger_id: shortcut.trigger_id,
    view: modalView,
  };

  await registerShortcutListener(appMock);

  console.log('=============[Test]=============');
  console.log(logger.info);
  sinon.assert.calledOnce(ack);
  sinon.assert.calledOnce(client.views.open);
  sinon.assert.calledWith(client.views.open, viewPayload);
  console.log('done ack/client assertions, about to assert logger assertions');
  sinon.assert.calledOnce(logger.info);
  console.log('done asserting');

  // TODO - add afterEach and sinon restore to prevent leaks (or after async logic?)
  // sinon.restore();
});
