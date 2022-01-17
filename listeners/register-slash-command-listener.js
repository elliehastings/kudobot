export default function registerSlashCommandListener(app, callback) {
  app.command('/kudos', callback);
}
