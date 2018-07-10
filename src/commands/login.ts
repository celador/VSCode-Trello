import open = require('open');
import * as vsInterface from '../lib/vscodeInteractions';
import TrelloClient from '../lib/trello';

export default function loginTrello(state) {
  //need to authenticate user
  // Display a message box to the user
  //vscode.window.showInformationMessage('Trying To Login');
  return () => {
    let authUrl =
      'https://trello.com/1/authorize?key=' +
      state.appKey +
      '&expiration=never&response_type=token&scope=read,write,account';
    open(authUrl);
    createClient(state);
  };
}

function createClient(state) {
  vsInterface.InsertUserToken().then(userToken => {
    console.log(userToken);
    state.userToken = userToken || '';
    state.client = new TrelloClient(state.appKey, userToken);
    displayLoggedIn('Trello logged in');
  });
}

function displayLoggedIn(loggedIn: string) {
  vsInterface.AddToBar(loggedIn, '', '', '', '$(person)');
}
