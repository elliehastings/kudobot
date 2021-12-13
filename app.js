// Require dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require('@slack/bolt');

// Create a Bolt app
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
            text: {
              type: 'mrkdwn',
              text: 'When you hit Post, your kudos will be posted to the #kudos channel!',
            },
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Kudos to...',
            },
            element: {
              type: 'multi_users_select',
              placeholder: {
                type: 'plain_text',
                text: 'Tag your teammates here!',
              },
            },
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Summary',
            },
            element: {
              type: 'plain_text_input',
              placeholder: {
                type: 'plain_text',
                text: 'A quick summary of why you are giving them a shout-out!',
              },
            },
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: 'Wheel values they demonstrated',
            },
            element: {
              type: 'multi_static_select',
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
            label: {
              type: 'plain_text',
              text: 'Description',
            },
            element: {
              type: 'plain_text_input',
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

    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log(`⚡️ Bolt app is running on port ${process.env.PORT || 3000}`);
})();
