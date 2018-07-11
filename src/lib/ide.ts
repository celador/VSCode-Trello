import * as vscode from 'vscode';

export var currentBID: string;
export var currentLID: string;
export var currentCID: string;

export var currentCard: string;
export var currentList: string;
export var currentBoard: string;
export var statusBarItem: vscode.StatusBarItem;

const apiKeyErrorMessage =
  'You need to add your API Key from Trello so we can verify your identity';

export const getApiKey: () => Thenable<string> = () => {
  const apiKey: string | undefined = vscode.workspace
    .getConfiguration('TrelloCode')
    .get('apiKey');

  if (apiKey) {
    return Promise.resolve(apiKey);
  } else {
    return PromptApiKey();
  }
};

export async function PromptApiKey() {
  const apiKey = await vscode.window.showInputBox({
    placeHolder:
      'Please paste in your Trello API Key from https://trello.com/app-key',
    ignoreFocusOut: true
  });
  if (apiKey) {
    return apiKey;
  } else {
    throw new Error(apiKeyErrorMessage);
  }
}

export const getUserToken: () => string | undefined = () =>
  vscode.workspace.getConfiguration('TrelloCode').get('userToken');

export const setUserToken: (token: string) => Thenable<void> = token =>
  vscode.workspace.getConfiguration('TrelloCode').update('userToken', token);

export function displayCardOnBottom(displayString: string) {
  AddToBar('', '', '', displayString, '$(file-text)');
}

export function ShowBoards(
  boards: string[],
  boardsID: string[]
): Thenable<string> {
  return vscode.window.showQuickPick(boards).then(
    x => {
      if (x) {
      }
      console.log('ShowBoards: ' + x);
      currentBoard = x || '';
      //go through name list and get corresponding selected ID
      for (var j = 0; j < boards.length; j++) {
        if (boards[j] === x) {
          currentBID = boardsID[j];
        }
      }
      console.log('ShowBoards - current: ' + currentBID);
      return currentBID;
    },
    err => console.log(err)
  );
}

export function ShowLists(
  lists: string[],
  listsID: string[]
): Thenable<string> {
  return vscode.window.showQuickPick(lists).then(
    x => {
      currentList = x || '';
      //find ID for selected list
      for (var j = 0; j < lists.length; j++) {
        if (lists[j] === x) {
          currentLID = listsID[j];
        }
      }
      return currentLID;
    },
    err => {}
  );
}

export function ShowCards(cards: string[], cardsID: string[]) {
  return vscode.window.showQuickPick(cards).then(
    x => {
      console.log('console display:' + x);
      currentCard = x || '';
      //find ID for selected list
      for (var j = 0; j < cards.length; j++) {
        if (cards[j] === x) {
          currentCID = cardsID[j];
        }
      }
      console.log(currentCID);
      return x;
    },
    err => {}
  );
}

export function AddToBar(
  message?: string,
  boardName?: string,
  listName?: string,
  cardName?: string,
  iconName?: string
): void {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
  }
  statusBarItem.text = cardName
    ? iconName +
      ' ' +
      message +
      ' ' +
      currentBoard +
      ' $(chevron-right)' +
      currentList +
      ' $(chevron-right)' +
      cardName
    : iconName + ' ' + message;
  statusBarItem.show();
}

export function AddStatusIcon(iconName: string) {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
  }
}

const showTokenError = () =>
  vscode.window.showErrorMessage(
    'You need to add the token provided by Trello'
  );

export function PromptUserToken() {
  return vscode.window
    .showInputBox({
      placeHolder: 'Please paste in the User Token provided by Trello',
      ignoreFocusOut: true
    })
    .then(
      userToken => (!userToken ? showTokenError() : userToken),
      console.error
    );
}

export function ShowError(errMessage: string) {
  vscode.window.showErrorMessage(errMessage);
}

export function ShowMessage(infoMessage: string) {
  vscode.window.showInformationMessage(infoMessage);
}
