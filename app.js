import {} from 'dotenv/config';
import pkg from '@slack/bolt';
import registerShortcutListener from './listeners/register-shortcut-listener.js';
import registerModalSubmitListener from './listeners/register-modal-submit-listener.js';
import handleShortcut from '../handlers/handle-shortcut.js';

// Create a Bolt app
const { App } = pkg;
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Register event listeners for shortcut creation and modal submissions
registerShortcutListener(app, handleShortcut);
registerModalSubmitListener(app);

// Start the app
(async () => {
  await app.start(process.env.PORT || 3000);

  console.log(`⚡️ Bolt app is running on port ${process.env.PORT || 3000}`);
})();
