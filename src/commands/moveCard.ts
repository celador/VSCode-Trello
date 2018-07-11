import * as ide from '../lib/ide';
import State from '../lib/state';

export default (state: State) => () => {
  if (!state.trello.currentCID) {
    ide.ShowError('You need to get a card before you try to move one.');
  } else {
    //ask user for a listName to move card || show user possible lists
    //if no current card, show user a error box and ask them to "Trello: Get A Card"
    ide
      .ShowLists(state.trello.lists, state.trello.listsIDs)
      .then(selectedList => {
        //moveCard to the specified List...
        //get new List ID then
        state.trello.moveCurrentCardToList(selectedList);
        ide.displayCardOnBottom(state.trello.currentCard);
      }, console.error);
  }
};
