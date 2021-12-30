import registerShortcutListener from '../../listeners/register-shortcut-listener.js';
import sinon from 'sinon';

test('calls app.shortcut for a kudos event', () => {
  const appMock = {
    shortcut(callbackId, callbackFn) {
      expect(callbackId).toBe('post_kudos');
      callbackFn();
    },
  };
  const callbackFake = sinon.fake();

  registerShortcutListener(appMock, callbackFake);

  sinon.assert.calledOnce(callbackFake);

  // TODO - add afterEach and sinon restore to prevent leaks (or after async logic?)
  // sinon.restore();
});
