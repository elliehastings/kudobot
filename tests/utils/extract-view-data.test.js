import extractViewData from '../../utils/extract-view-data.js';

test('it extracts all the relevant data from the view', () => {
  const summaryText = 'For finishing the Kudobot!';
  const descriptionText =
    'You really persevered to find the @slack/bolt + Heroku bug and for that I applaud you';

  const view = {
    state: {
      values: {
        users: {
          multi_users_selections: {
            selected_users: ['ABC123'],
          },
        },
        summary: {
          summary_input_text: {
            value: summaryText,
          },
        },
        core_values: {
          core_values_selections: {
            selected_options: [
              { text: { text: ':rocket: Radness' } },
              { text: { text: ':snowman: Extreme coolness' } },
            ],
          },
        },
        description: {
          description_input: {
            value: descriptionText,
          },
        },
      },
    },
  };

  const expectedSelectedUsersText = '<@ABC123>';
  const expectedCoreValuesText =
    ':rocket: Radness | :snowman: Extreme coolness';

  const extractedData = extractViewData(view);

  expect(extractedData.selectedUsersText).toBe(expectedSelectedUsersText);
  expect(extractedData.summaryText).toBe(summaryText);
  expect(extractedData.descriptionText).toBe(descriptionText);
  expect(extractedData.coreValuesText).toBe(expectedCoreValuesText);
});

test('it errors with a bad news view', () => {
  expect(() => {
    extractViewData({ malformed: 'Malfoy' });
  }).toThrow('Malformed view data');
});
