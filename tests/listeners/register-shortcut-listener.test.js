import registerShortcutListener from '../../listeners/register-shortcut-listener.js';
import sinon from 'sinon';

test('calls shortcut() with a post_kudos event ID and the specified callback', () => {
  const appMock = {
    shortcut(callbackId, callbackFn) {
      expect(callbackId).toBe('post_kudos');

      callbackFn();
    },
  };
  const callbackFake = sinon.fake();

  registerShortcutListener(appMock, callbackFake);

  sinon.assert.calledOnce(callbackFake);
});
