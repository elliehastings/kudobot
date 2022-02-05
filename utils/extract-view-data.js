export default function extractModalData(view) {
  try {
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

    return {
      selectedUsersText,
      summaryText,
      coreValuesText,
      descriptionText,
    };
  } catch {
    throw new Error('Malformed view data');
  }
}
