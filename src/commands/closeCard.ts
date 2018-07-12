import Client from '../app/client';

export default (client: Client) =>
  function() {
    if (!client || !client.currentCID) {
      client.code.ShowError('You need to get a card to work on.');
    } else {
      client.closeCard();
      client.code.AddToBar('Select a Card', '$(terminal)');
    }
  };
