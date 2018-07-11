import * as ide from '../lib/ide';
import State from '../lib/state';

export default (state: State) => () => {
  if (!state.trello || !state.trello.currentCID) {
    ide.ShowError('You need to get a card to work on.');
  } else {
    state.trello.closeCard();
    ide.AddToBar('Select a Card', '', '', '', '$(terminal)');
  }
};
