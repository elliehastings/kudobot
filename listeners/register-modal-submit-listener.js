import findConversation from '../client-api/find-conversation.js';

export default function registerModalSubmitListener(app) {
  app.view('kudos_modal', async ({ ack, body, view, client, logger }) => {
    // Acknowledge the view_submission request
    await ack();

    // Build and post message
    try {
      const user = body['user'];
      const targetChannel = await findConversation(
        app,
        process.env.CHANNEL_NAME
      );

      const selectedUserIds =
        view['state']['values']['users']['multi_users_selections'][
          'selected_users'
        ];
      const selectedUsersText = selectedUserIds
        .map((userId) => `<@${userId}>`)
        .join(', ');
      const summaryText =
        view['state']['values']['summary']['summary_input_text']['value'];
      const coreValuesText = view['state']['values']['core_values'][
        'core_values_selections'
      ]['selected_options']
        .map((element) => element['text']['text'])
        .join(' | ');
      const descriptionText =
        view['state']['values']['description']['description_input']['value'];
      const submittedByText = `_Submitted by <@${user['username']}>_`;

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
