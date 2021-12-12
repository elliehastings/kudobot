# Kudobot - Powered by Bolt

## Bolt

[Bolt](https://slack.dev/bolt) is a Slack framework that lets you build JavaScript-based Slack apps in a flash.

This project is a kudobot app that generates kudo messages based on user input.

Read [Getting Started with Bolt](https://api.slack.com/start/building/bolt) guide for a more in-depth tutorial on Bolt.

Read the [Bolt documentation](https://slack.dev/bolt) for full documentation.

## About the app

- `app.js` contains the primary Bolt app. It imports the Bolt package (`@slack/bolt`) and starts the Bolt app's server. It's where we add app listeners.
- `.env` is where we put your Slack app's authorization token and signing secret. As usual, **do not check sensitive secrets in to version control!** This app requires the following environment variables to be set in `.env` or its equivalent:
  * `SLACK_BOT_TOKEN`
  * `SLACK_SIGNING_SECRET`

## Running the app locally

- Configure your `.env` file or run the app with the above environment variables associated to your Slack app
- Set up an [ngrok server](https://ngrok.com/) to proxy requests to your localhost
- Run `npm start` or `npm run watch` (using `nodemon` if installed) to run your app locally
- Add your local ngrok server URL to your slack app's Event Request URL in the format `http://xyz.ngrok.io/slack/events`

## Tests

Coming soon!

-------------------

\ ゜o゜)ノ
