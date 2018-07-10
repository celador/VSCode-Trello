# TrelloForce

Extension for Trello and VSCode
[![Build Status](https://travis-ci.org/celador/vscode-trello.svg?branch=master)]

(travis-ci.org/celador/vscode-trello)

## Commands

1) Trello: Login - Logs the user into their Trello account. (currently being worked on)

2) Trello: Get A Card - Allows Users to select a board from their boards, then a particular list from the board they selected, and then a specific Card to work on

3) Trello: Move Card to a New List - Moves the current card the user has to a new list in the Current Board

4) Trello: Close Current Card - Closes the current card the user is working with 

Scheduled Commands:

1) Trello: Add Myself to Card

2) Trello: Add Label to Card

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Usage

### Login

#### Step 1: Login and Authorize

To make this Trello Client work you first need to get your Client Token and add it to the trello.ts file. 
Then you must authorize the extension on Trello's side. I am currently trying to automate this so it's easier for the user to get authorize their token. 

![Command Box](https://raw.githubusercontent.com/celador/vscode-trello/master/trellocommandbox.png)

![Login](https://raw.githubusercontent.com/celador/vscode-trello/master/trellologinsite.png)

#### Step 2: Copy User Token and Paste into InputBox

![Login Token](https://raw.githubusercontent.com/celador/vscode-trello/master/trellologinsitetoken.png)

![Paste Login](https://raw.githubusercontent.com/celador/vscode-trello/master/trellopastelogin.png)

Press 'Enter'

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of TrelloCode
