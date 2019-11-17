// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Extension "dai-plugin" is now active!');

  /*   // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage('Hello World!');
    }
  );

  context.subscriptions.push(disposable); */

  vscode.languages.registerHoverProvider('plugin', {
    provideHover(document, position, token) {
      const range = document.getWordRangeAtPosition(position);
      const word = document.getText(range);

      if (word === 'plugin') {
        return new vscode.Hover('plugin keyword');
      }
    }
  });

  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      'plugin',
      {
        provideCompletionItems(
          document: vscode.TextDocument,
          position: vscode.Position,
          token: vscode.CancellationToken,
          context: vscode.CompletionContext
        ) {
          // get all text until the `position` and check if it reads `chrome.tabs.`
          // and iff so then complete if `log`, `warn`, and `error`
          let linePrefix = document
            .lineAt(position)
            .text.substr(0, position.character);
          if (!linePrefix.endsWith('plugin.')) {
            return undefined;
          }

          // TODO: read from a json file
          const pluginSection = [
            {
              name: 'start',
              description:
                'Identifies the start of a plugin section. A switch can be given optionally',
              code: 'plugin.start\nplugin.start plugin_manta'
            },
            { name: 'revision', description: 'revision hash', code: '' },
            {
              name: 'apl',
              description: 'apl version',
              code: 'plugin.apl 8.6'
            },
            {
              name: 'expand',
              description:
                'enables plugin expansion, which auto-generates a lot of boilerplate code',
              code: ''
            },
            {
              name: 'switch',
              description:
                'declare a functional block provided by the plugin. These switches can then be used as arguments to the later sections. A section defined with a switch will then only be executed if the switch is set. This is useful for conditionally including entire files in the system build. The switch mechanism is used only where entire files are dependent upon another plugin.',
              code: 'plugin.switch manta'
            },
            {
              name: 'version',
              description: 'plugin version',
              code: 'plugin.version 1.0.0'
            },
            {
              name: 'prereq',
              description: 'declare dependencies of this plugin',
              code: ''
            },
            { name: 'header', description: 'plugin header', code: '' },
            { name: 'libgen', description: 'plugin libgen', code: '' },
            { name: 'lib', description: 'plugin lib', code: '' },
            {
              name: 'dbupdater',
              description:
                'any databases that you want the DB Updater functionality to be enabled for.',
              code: ''
            },
            {
              name: 'exe',
              description: 'files that are to be compiled into executables',
              code: ''
            },
            {
              name: 'rootexe',
              description:
                'Specifies files which will be compiled into executables and set up as setuid root.',
              code: ''
            },
            { name: 'files', description: 'plugin files', code: '' },
            {
              name: 'segments',
              description:
                'actual source code elements to be added to the central files',
              code: ''
            },
            {
              name: 'branch',
              description:
                'sets the branch of the plugin to issue or update from',
              code: 'plugin.branch develop'
            },
            {
              name: 'oel',
              description:
                'Automatically generates OEL logging calls in set functions',
              code: ''
            },
            {
              name: 'event',
              description: 'Generates event logging for the plugin',
              code: ''
            },
            { name: 'end', description: 'Ends the plugin file', code: '' }
          ];

          const pluginSectionCompletionItems = pluginSection.map(func => {
            const completionItem = new vscode.CompletionItem(
              func.name,
              vscode.CompletionItemKind.Class
            );
            completionItem.documentation = new vscode.MarkdownString(
              func.description
            );
            if (func.code) {
              completionItem.documentation.appendCodeblock(func.code, 'plugin');
            }
            completionItem.documentation.appendMarkdown(
              '\n\nfor details: https://wiki.daiad.dai.co.uk/wiki/index.php?title=Plugin_File_Format'
            );
            return completionItem;
          });

          return [...pluginSectionCompletionItems];
        }
      },
      '.'
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
