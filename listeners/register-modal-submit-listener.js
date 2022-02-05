import findConversation from '../client-api/find-conversation.js';
import extractViewData from '../utils/extract-view-data.js';

export default function registerModalSubmitListener(app) {
  app.view('kudos_modal', async ({ ack, body, view, client, logger }) => {
    // Acknowledge the view_submission request
    await ack();

    // Build and post message
    try {
      const targetChannel = await findConversation(
        app,
        process.env.CHANNEL_NAME
      );

      const {
        selectedUsersText,
        summaryText,
        coreValuesText,
        descriptionText,
      } = extractViewData(view);

      const submittedByText = `_Submitted by <@${body['user']['username']}>_`;

      // Used as fallback or for assistive technology
      const fullMessageText = `Kudos! | To ${selectedUsersText} | ${summaryText} | Values: ${coreValuesText} | More detail: ${descriptionText} | Submitted by: ${submittedByText}`;

      await client.chat.postMessage({
        channel: targetChannel,
        text: fullMessageText,
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: summaryText,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: selectedUsersText,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*${coreValuesText}*`,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: descriptionText,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: submittedByText,
            },
          },
        ],
      });
    } catch (error) {
      logger.error(error);
    }
  });
}
