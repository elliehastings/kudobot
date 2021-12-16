export default async function findConversation(app, name) {
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
