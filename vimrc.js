// Grundlage von
// https://blog.iany.me/2023/04/the-ultimate-guide-to-customizing-obsidian-vim-mode-via-quickadd/
function notice(text) {
  new Notice(text);
  return text;
}
module.exports = {
    entry: myQuickAddScript,
    settings: {
        name: "Script Name",
        author: "Your Name",
        options: {
            // Define configurable options here
        }
    }
};

async function myQuickAddScript(params, settings) {
  const { app, quickAddApi, variables , obsidian } = params;
  // app         : obsidian app
  // quickAddApi : quickAddApi
  // variables   : settings von oben?
  // obsidian    : TFile, TFolder, Notice, ...

  const vim = window.CodeMirrorAdapter?.Vim;
  if (vim === undefined) {
    new Notice(`🔴error: vim mode is disabled`);
    return;
  }

  //console.log("app.plugins.plugins")
  //console.log(app.plugins.plugins)

  /*****************************************************************************/
    vim.defineEx("obr", "", function (cm, param) {
      if (param?.args?.length !== 1) {
        throw new Error(notice("🔴error: obr requires exactly 1 parameter"));
      }
      const command = param.args[0];
      app.commands.executeCommandById(command);
    });
    vim.defineEx("obl", "", async function (cm, param) {
      let commands = Object.keys(app.commands.commands);
      const command = param.args[0];
      for (const keyword of param?.args ?? []) {
        commands = commands.filter((command) => command.includes(keyword));
      }

      const choice = await quickAddApi.suggester(commands, commands);
      if (choice !== null) {
        await quickAddApi.utility.setClipboard(choice);
        new Notice(`🔵info: copied ${choice} to the clipboard`);
      }
    });
    vim.map("zo", ":obr editor:toggle-fold");
    vim.map("zc", ":obr editor:toggle-fold");
    vim.map("za", ":obr editor:toggle-fold");
    vim.map("zR", ":obr editor:unfold-all");
    vim.map("zM", ":obr editor:fold-all");
    // To use the space key as a key mapping prefix, it must first be unmapped.
    // vim.unmap("<Space>");
    // vim.map("<Space><Space>", ":obr switcher:open");
    // vim.map("<Space>n", ":nohl");

    vim.defineAction("swapLine", function(_cm, { repeat, down }) {
      const command = down ? "editor:swap-line-down" : "editor:swap-line-up";
      for (let i = 0; i < repeat; i++) {
        params.app.commands.executeCommandById(command);
      }
    });
    // undo after 5]e will only swap one line up.
    //vim.mapCommand("]e", "action", "swapLine", { down: true });
    //vim.mapCommand("[e", "action", "swapLine", { down: false });
  /*****************************************************************************/
    function titleCase(str, options) {
      // See https://github.com/words/ap-style-title-case/blob/master/index.js how to format str to apa title case
    }
    // Following helper funnctions are borrowed from https://codemirror.net/5/keymap/vim.js
    function cursorIsBefore(cur1, cur2) {
      if (cur1.line < cur2.line) {
        return true;
      }
      if (cur1.line == cur2.line && cur1.ch < cur2.ch) {
        return true;
      }
      return false;
    }
    function cursorMin(cur1, cur2) {
      return cursorIsBefore(cur1, cur2) ? cur1 : cur2;
    }
    function findFirstNonWhiteSpaceCharacter(text) {
      if (!text) {
        return 0;
      }
      var firstNonWS = text.search(/\S/);
      return firstNonWS == -1 ? text.length : firstNonWS;
    }
    vim.defineOperator("titleCase", function(cm, args, ranges, oldAnchor, newHead) {
      const selections = cm.getSelections();
      const newSelections = selections.map((s) =>
        titleCase(s, { keepSpaces: true })
      );
      cm.replaceSelections(newSelections);
      if (args.shouldMoveCursor) {
        return newHead;
      } else if (
        !cm.state.vim.visualMode &&
        args.linewise &&
        ranges[0].anchor.line + 1 == ranges[0].head.line
      ) {
        return {
          line: oldAnchor.line,
          ch: findFirstNonWhiteSpaceCharacter(cm.getLine(oldAnchor.line)),
        };
      } else if (args.linewise) {
        return oldAnchor;
      } else {
        return cursorMin(ranges[0].anchor, ranges[0].head);
      }
      return newHead;
    });
    // vim.mapCommand("gz", "operator", "titleCase");
  /*****************************************************************************/
  console.log(`🔵info: vimrc.js loaded`);

  // console.log(window);
  // console.log(context);


  vim.defineMotion("myUp", function(cm, ub, args, state) {
    //console.log("myUp")
    //console.log(cm)
    //console.log(ub)
    //console.log(args)
    //console.log(state)
    let newLine = ub.line-1
    let newChar = ub.ch
    return {
      line: newLine,
      ch:   newChar
    }
  });
  vim.defineMotion("myDown", function(cm, ub, args, state) {
    //console.log("myDown")
    //console.log(cm)
    //console.log(ub)
    //console.log(args)
    //console.log(state)
    let newLine = ub.line+1
    let newChar = ub.ch
    return {
      line: newLine,
      ch:   newChar
    }
  });
  vim.defineMotion("myLeft", function(cm, ub, args, state) {
    //console.log("myLeft")
    //console.log(cm)
    //console.log(ub)
    //console.log(args)
    //console.log(state)
    let newLine = ub.line
    let newChar = ub.ch-1
    if(ub.ch == 0) {
      newLine = ub.line-1
    }
    return {
      line: newLine,
      ch:   newChar
    }
  });
  vim.defineMotion("myRight", function(cm, ub, args, state) {
    //console.log("myRight")
    //console.log(cm)
    //console.log(ub)
    //console.log(args)
    //console.log(state)
    let newLine = ub.line
    let newChar = ub.ch+1
    if(cm.getLine(ub.line).length == ub.ch) {
      newLine = ub.line+1
      newChar = 0
    }
    return {
      line: newLine,
      ch:   newChar
    }
  });
  vim.defineMotion("myLeftStart", function(cm, ub, args, state) {
    //console.log("myLeftStart")
    let newLine = ub.line
    let newChar = 0
    if(newChar == ub.ch) {
      newLine = ub.line-1
    }
    return {
      line: newLine,
      ch:   newChar
    }
  });
  vim.defineMotion("myRightEnd", function(cm, ub, args, state) {
    //console.log("myRightEnd")
    let newLine = ub.line
    let newChar = cm.getLine(ub.line).length
    if(newChar == ub.ch) {
      newLine = ub.line+1
      newChar = 0
    }
    return {
      line: newLine,
      ch:   newChar
    }
  });





  var argsn = {
    context: "normal",
  }
  var extran = {
    context: "normal",
  }
  vim.mapCommand("<A-k>", "motion", "myUp", argsn, extran, )
  vim.mapCommand("<A-j>", "motion", "myDown", argsn, extran, )
  vim.mapCommand("<A-h>", "motion", "myLeft", argsn, extran, )
  vim.mapCommand("<A-l>", "motion", "myRight", argsn, extran, )
  vim.mapCommand("<A-S-H>", "motion", "myLeftStart", argsn, extran, )
  vim.mapCommand("<A-S-L>", "motion", "myRightEnd", argsn, extran, )

  var argsi = {
    context: "insert",
  }
  var extrai = {
    context: "insert",
  }
 
  vim.mapCommand("<A-k>", "motion", "myUp", argsi, extrai, )
  vim.mapCommand("<A-j>", "motion", "myDown", argsi, extrai, )
  vim.mapCommand("<A-h>", "motion", "myLeft", argsi, extrai, )
  vim.mapCommand("<A-l>", "motion", "myRight", argsi, extrai, )
  vim.mapCommand("<A-S-H>", "motion", "myLeftStart", argsi, extrai, )
  vim.mapCommand("<A-S-L>", "motion", "myRightEnd", argsi, extrai, )

  //console.log(vim);
  //console.log(context);
  //console.log(window);
  //console.log(params);
  vim.map("j", "gj");
  vim.map("k", "gk");
    // Besser funktioniert Ctlr-C
  vim.map("jk", "<Esc>", "insert");

};
