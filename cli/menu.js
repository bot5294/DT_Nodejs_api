const { get, display, post, del, put } = require("./commands");
const inquirer = require("inquirer");
let loop = {
  shouldLoop: true,
};
let questions = [
  {
    name: "menu",
    message: "Welcome to cli app, select an option to proceed :",
    type: "list",
    choices: ["Display", "Get", "Post", "Put", "Delete", "Exit"],
  },
];
module.exports.start = () => {
  function menu() {
    let awaitResult = false;
    inquirer.prompt(questions).then(async (result) => {
      switch (result.menu) {
        case "Display":
          // let displayPromise = new Promise((resolve, reject) => {
          //   let executed = display();
          //   if (executed) {
          //     resolve(executed);
          //   } else {
          //     reject();
          //   }
          // });
          // displayPromise.then((executed) => {
          //   console.log("extecuted : ", executed);
          //   return menu();

          // });
          awaitResult = display();
          if (awaitResult)
            setTimeout(() => {
              return menu();
            }, 1000);
          break;
        case "Get":
          awaitResult = await get();
          if (awaitResult) {
            return menu();
          }
          break;
        case "Post":
          inquirer
            .prompt({
              name: "file",
              message: "Enter file address : ",
              type: "input",
            })
            .then(async (result) => {
              awaitResult = await post(result.file);
              if (awaitResult) {
                return menu();
              }
            });
          break;
        case "Delete":
          awaitResult = await del();
          if (awaitResult) {
            return menu();
          }
          break;
        case "Put":
          awaitResult = await put();
          console.log(awaitResult);
          if (awaitResult) return menu();
          break;
        case "Exit":
          loop.shouldLoop = false;
          console.log("\nThanks for using our cli app");
          return;
      }
    });
  }
  if (loop.shouldLoop) {
    return menu();
  }
};
