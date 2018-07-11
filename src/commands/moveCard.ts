import * as ide from '../lib/ide';
import State from '../lib/state';

export default ({ trello }: State) =>
  function() {
    if (trello && trello.currentCID) {
      //ask user for a listName to move card || show user possible lists
      //if no current card, show user a error box and ask them to "Trello: Get A Card"
      ide.ShowLists(trello.lists, trello.listsIDs).then(selectedList => {
        //moveCard to the specified List...
        //get new List ID then
        trello.moveCurrentCardToList(selectedList);
        ide.displayCardOnBottom(trello.currentCard);
      }, console.error);
    } else {
      ide.ShowError('You need to get a card before you try to move one.');
    }
  };
