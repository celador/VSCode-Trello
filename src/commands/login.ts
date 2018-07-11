import open = require('open');
import * as ide from '../lib/ide';
import TrelloClient from '../lib/trello';
import State from '../lib/state';

export default (state: State) => () => {
  open(
    `https://trello.com/1/authorize?key=${ide.getApiKey()}&expiration=never&response_type=token&scope=read,write,account`
  );
  createClient(state);
};

function createClient(state: State) {
  ide.PromptUserToken().then(userToken => {
    if (userToken) {
      ide.setUserToken(userToken);
      state.trello = new TrelloClient(ide.getApiKey(), userToken);
      displayLoggedIn('Trello logged in');
    } else {
      ide.ShowError('No User Token')
    }
  });
}

function displayLoggedIn(loggedIn: string) {
  ide.AddToBar(loggedIn, '', '', '', '$(person)');
}
