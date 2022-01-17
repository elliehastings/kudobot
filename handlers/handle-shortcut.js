import modalView from '../payloads/modal-view.js';

export default async function handleShortcut({
  shortcut,
  ack,
  client,
  logger,
  command,
}) {
  try {
    await ack();

    const incomingAction = shortcut ? shortcut : command;
    const result = await client.views.open({
      trigger_id: incomingAction.trigger_id,
      view: modalView,
    });

    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
}
