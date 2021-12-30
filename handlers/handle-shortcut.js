import modalView from '../payloads/modal-view.js';

export default async function handleShortcut({
  shortcut,
  ack,
  client,
  logger,
}) {
  try {
    await ack();

    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: modalView,
    });

    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
}
