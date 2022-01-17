import registerSlashCommandListener from '../../listeners/register-slash-command-listener.js';
import sinon from 'sinon';

test('calls command() with a /kudos slash command string and the specified callback', () => {
  const appMock = {
    command(commandName, callbackFn) {
      expect(commandName).toBe('/kudos');

      callbackFn();
    },
  };
  const callbackFake = sinon.fake();

  registerSlashCommandListener(appMock, callbackFake);

  sinon.assert.calledOnce(callbackFake);
});
