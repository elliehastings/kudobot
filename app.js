import {} from 'dotenv/config';
import pkg from '@slack/bolt';

// Create a Bolt app
const { App } = pkg;
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Open the modal form when the kudos shortcut is triggered
app.shortcut('post_kudos', async ({ shortcut, ack, client, logger }) => {
  try {
    // Acknowledge shortcut request
    await ack();

    // Call views.open using one of the built-in WebClients to open the kudos modal
    const result = await client.views.open({
      trigger_id: shortcut.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'kudos_modal',
        title: {
          type: 'plain_text',
          text: 'Post Kudos',
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
        },
        submit: {
          type: 'plain_text',
          text: 'Post',
        },
        blocks: [
          {
            type: 'section',
            block_id: 'header',
            text: {
              type: 'mrkdwn',
              text: 'When you hit Post, your kudos will be posted to the #kudos channel!',
            },
          },
          {
            type: 'input',
            block_id: 'users',
            label: {
              type: 'plain_text',
              text: 'Kudos to...',
            },
            element: {
              type: 'multi_users_select',
              action_id: 'multi_users_selections',
              placeholder: {
                type: 'plain_text',
                text: 'Tag your teammates here!',
              },
            },
          },
          {
            type: 'input',
            block_id: 'summary',
            label: {
              type: 'plain_text',
              text: 'Summary',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'summary_input_text',
              placeholder: {
                type: 'plain_text',
                text: 'A quick summary of why you are giving them a shout-out!',
              },
            },
          },
          {
            type: 'input',
            block_id: 'values',
            label: {
              type: 'plain_text',
              text: 'Wheel values they demonstrated',
            },
            element: {
              type: 'multi_static_select',
              action_id: 'values_selections',
              placeholder: {
                type: 'plain_text',
                text: 'Pick one or more Wheel values!',
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: ':heart: Empathy, everyday',
                  },
                  value: 'empathy',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':handshake: Be trusted',
                  },
                  value: 'trusted',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':muscle: Grit to grow',
                  },
                  value: 'grit',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':busts_in_silhouette: Further together',
                  },
                  value: 'together',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: ':bullettrain_front: High velocity',
                  },
                  value: 'velocity',
                },
              ],
            },
          },
          {
            type: 'input',
            block_id: 'description',
            label: {
              type: 'plain_text',
              text: 'Description',
            },
            element: {
              type: 'plain_text_input',
              action_id: 'description_input',
              placeholder: {
                type: 'plain_text',
                text: 'Give us more details on what happened and how awesome it was!',
              },
              multiline: true,
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: 'Kudobot designed by Ellie',
              },
            ],
          },
        ],
      },
    });

    // logger.info('Shortcut result:');
    // logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

// Find conversation ID using the conversations.list method
async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await app.client.conversations.list({
      token: process.env.SLACK_BOT_TOKEN,
    });

    let conversationId;
    for (const channel of result.channels) {
      if (channel.name === name) {
        conversationId = channel.id;
        break;
      }
    }

    return conversationId;
  } catch (error) {
    console.error(error);
  }
}

app.view('kudos_modal', async ({ ack, body, view, client, logger }) => {
  // Acknowledge the view_submission request
  await ack();

  logger.info('kudos_modal view submission received! view:');
  logger.info(view);
  logger.info('view -> state:');
  logger.info(view['state']);
  logger.info('view -> state -> values:');
  logger.info(view['state']['values']);
  // {
  //   users: { YA995: { type: 'multi_users_select', selected_users: [Array] } },
  //   summary: { clWa: { type: 'plain_text_input', value: 'test' } },
  //   values: {
  //     '1pwP': { type: 'multi_static_select', selected_options: [Array] }
  //   },
  //   description: { fhiD: { type: 'plain_text_input', value: 'desc' } }
  // }

  // logger.info('body:');
  // logger.info(body);
  const user = body['user']['id'];
  // logger.info(user);
  // U02Q7ATE230

  const kudosChannel = await findConversation('kudos');
  // logger.info('kudosChannel');
  // logger.info(kudosChannel);

  // Build message

  // Post message
  try {
    // Used as fallback or for assistive technology
    let messageText =
      view['state']['values']['summary']['summary_input_text']['value'];
    logger.info('messageText');
    logger.info(
      view['state']['values']['summary']['summary_input_text']['value']
    ); // this has an ID key

    await client.chat.postMessage({
      channel: kudosChannel,
      text: messageText,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: view['state']['values']['summary']['summary_input_text'][
              'value'
            ],
          },
        },
      ],
    });
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log(`⚡️ Bolt app is running on port ${process.env.PORT || 3000}`);
})();
