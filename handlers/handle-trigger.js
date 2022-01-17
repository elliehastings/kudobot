import modalView from '../payloads/modal-view.js';

export default async function handleTrigger({
  shortcut,
  ack,
  client,
  logger,
  command,
}) {
  try {
    await ack();

    const trigger = shortcut ? shortcut : command;
    const result = await client.views.open({
      trigger_id: trigger.trigger_id,
      view: modalView,
    });

    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
}
