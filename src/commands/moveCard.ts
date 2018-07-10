import * as vsInterface from '../lib/vscodeInteractions';

export default function moveCurCardTL(state) {
  return () => {
    if (!state.client.currentCID) {
      vsInterface.ShowError(
        'You need to get a card before you try to move one.'
      );
    } else {
      //ask user for a listName to move card || show user possible lists
      //if no current card, show user a error box and ask them to "Trello: Get A Card"
      vsInterface
        .ShowLists(state.client.lists, state.client.listsIDs)
        .then(selectedList => {
          //moveCard to the specified List...
          //get new List ID then
          state.client._moveCurrentCardToList(selectedList);
          vsInterface.displayCardOnBottom(state.client.currentCard);
        }, console.error);
    }
  };
}
