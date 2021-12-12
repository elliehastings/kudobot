// Require dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Require the Bolt package (github.com/slackapi/bolt)
const { App } = require("@slack/bolt");

// Create a Bolt app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// All the room in the world for your code

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log(`⚡️ Bolt app is running on port ${process.env.PORT || 3000}`);
})();
