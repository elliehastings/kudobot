import handleShortcut from '../../handlers/handle-shortcut.js';
import modalView from '../../payloads/modal-view.js';
import sinon from 'sinon';

test('happy path - acknowledges, opens modal on client, and logs information', async () => {
  // shortcut : an object with a #trigger_id method that returns a long string like '2875959438160.2830055761090.7355c2b2bef4764a636ed1cefa98ae4a'
  const shortcut = {
    trigger_id: '111.111.11a11b1',
  };

  // ack() : async function that resovles, we don't care about the results
  const ack = sinon.fake.resolves(true);

  // client -> views -> open accepts a view object and returns a result object ( simplified to { ok: true } )
  const fakeResult = { ok: true };
  const client = { views: { open: sinon.fake.resolves(fakeResult) } };
  const viewPayload = {
    trigger_id: shortcut.trigger_id,
    view: modalView,
  };

  // logger: object with info() and error() methods; we don't care what they do
  const logger = { info: sinon.fake(), error: sinon.fake() };

  const middlewareMock = {
    shortcut,
    ack,
    client,
    logger,
  };

  await handleShortcut(middlewareMock);

  sinon.assert.calledOnce(ack);
  sinon.assert.calledOnce(client.views.open);
  sinon.assert.calledWith(client.views.open, viewPayload);

  sinon.assert.calledOnce(logger.info);
});

test('ack() error - logs the error', async () => {
  const shortcut = {
    trigger_id: '111.111.11a11b1',
  };

  const ackError = new Error('Error in ack');
  const ack = sinon.fake.rejects(ackError);

  const fakeResult = { ok: true };
  const client = { views: { open: sinon.fake.resolves(fakeResult) } };

  const logger = { info: sinon.fake(), error: sinon.fake() };

  const middlewareMock = {
    shortcut,
    ack,
    client,
    logger,
  };

  await handleShortcut(middlewareMock);

  sinon.assert.calledOnce(ack);

  sinon.assert.notCalled(client.views.open);
  sinon.assert.notCalled(logger.info);

  sinon.assert.calledOnce(logger.error);
  sinon.assert.calledWith(logger.error, ackError);
});

test('client.views.open() error - logs the error', async () => {
  const shortcut = {
    trigger_id: '111.111.11a11b1',
  };

  const ack = sinon.fake.resolves(true);

  const clientError = new Error('Error in client.views.open');
  const client = { views: { open: sinon.fake.rejects(clientError) } };

  const logger = { info: sinon.fake(), error: sinon.fake() };

  const middlewareMock = {
    shortcut,
    ack,
    client,
    logger,
  };

  await handleShortcut(middlewareMock);

  sinon.assert.calledOnce(ack);
  sinon.assert.calledOnce(client.views.open);

  sinon.assert.notCalled(logger.info);

  sinon.assert.calledOnce(logger.error);
  sinon.assert.calledWith(logger.error, clientError);
});
