export default {
  type: 'modal',
  callback_id: 'kudos_modal',
  title: {
    type: 'plain_text',
    text: 'Give kudos! :clap:',
  },
  close: {
    type: 'plain_text',
    text: 'Cancel',
  },
  submit: {
    type: 'plain_text',
    text: 'Post :rocket:',
  },
  blocks: [
    {
      type: 'section',
      block_id: 'header',
      text: {
        type: 'mrkdwn',
        text: 'When you hit Post, your kudos will be posted to the values channel!',
      },
    },
    {
      type: 'input',
      block_id: 'users',
      label: {
        type: 'plain_text',
        text: 'I want to give kudos to...',
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
        text: 'In a few words:',
      },
      element: {
        type: 'plain_text_input',
        action_id: 'summary_input_text',
        placeholder: {
          type: 'plain_text',
          text: 'Thank you / props for...',
        },
      },
    },
    {
      type: 'input',
      block_id: 'core_values',
      label: {
        type: 'plain_text',
        text: 'Values they demonstrated',
      },
      element: {
        type: 'multi_static_select',
        action_id: 'core_values_selections',
        placeholder: {
          type: 'plain_text',
          text: 'Select from our company values!',
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
          text: 'Give us more details on what they did and how awesome it was (you can include emoji here with the :emoji: syntax too!)',
        },
        multiline: true,
      },
    },
  ],
};
