import open = require('open');
import * as ide from '../lib/ide';
import TrelloClient from '../lib/trello';
import State from '../lib/state';

export default (state: State) =>
  function() {
    ide.getApiKey().then(
      apiKey => {
        const userToken = ide.getUserToken();
        if (apiKey) {
          if (!userToken) {
            open(
              `https://trello.com/1/authorize?key=${apiKey}&expiration=never&response_type=token&scope=read,write,account`
            );
            ide.PromptUserToken().then(token => {
              if (token) {
                state.trello = createClient(apiKey, token);
              } else {
                throw new Error('Missing User Token');
              }
            });
          } else {
            state.trello = createClient(apiKey, userToken);
          }
        } else {
          throw new Error('Missing API Key');
        }
      },
      error => ide.ShowError(error.message)
    );
  };

function createClient(apiKey: string, userToken: string) {
  if (apiKey && userToken) {
    ide.AddToBar('Trello logged in', '', '', '', '$(person)');
    return new TrelloClient(apiKey, userToken);
  } else {
    throw new Error('Missing API Key or User Token');
  }
}
