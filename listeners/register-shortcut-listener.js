import modalView from '../payloads/modal-view.js';

export default function registerShortcutListener(app) {
  app.shortcut('post_kudos', async ({ shortcut, ack, client, logger }) => {
    try {
      console.log('=============[Code - ack/client]=============');

      // Acknowledge shortcut request
      await ack();

      const result = await client.views.open({
        trigger_id: shortcut.trigger_id,
        view: modalView,
      });

      console.log(result);

      console.log('=============[Code - Logger]=============');
      console.log(logger);
      console.log(logger.info);

      logger.info(result);

      console.log('done calling logger.info');
    } catch (error) {
      logger.error(error);
    }
  });
}
