import Client from '../app/client';

export default (client: Client) =>
  function() {
    const { code } = client;
    if (client && client.currentCID) {
      //ask user for a listName to move card || show user possible lists
      //if no current card, show user a error box and ask them to "Trello: Get A Card"
      code.ShowLists(client.lists, client.listsIDs).then(selectedList => {
        //moveCard to the specified List...
        //get new List ID then
        client.moveCurrentCardToList(selectedList);
        code.displayCardOnBottom(client.currentCard);
      }, console.error);
    } else {
      code.ShowError('You need to get a card before you try to move one.');
    }
  };
