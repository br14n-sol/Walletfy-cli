const arg = require("arg");
const clear = require("clear");
const pc = require("picocolors");
const figlet = require("figlet");
const { coins, actions, ask, run } = require(".");
const { toKebabCase } = require("./utils/string");
const inquirer = require("inquirer");

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--coin": String,
      "--address": String,
      "--action": String,
      "-c": "--coin",
      "-a": "--address",
      "-g": "--action",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    coin: args["--coin"] || args["-c"],
    address: args["--address"] || args["-a"],
    action: args["--action"] || args["-g"],
  };
}

const cli = async (args) => {
  clear();

  console.log(
    pc.yellow(figlet.textSync("Walletfy", { horizontalLayout: "full" }))
  );

  let parsedArgs = parseArgumentsIntoOptions(args);

  if (Object.values(parsedArgs).every((value) => value === undefined)) {
    const answers = await ask();
    parsedArgs = {
      ...answers,
      action: toKebabCase(answers.action),
    };
    if (toKebabCase(answers.action) === "get-balance") {
      // Ask for the address
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "address",
          message: "Enter the address:",
        },
      ]);
      await run({ ...parsedArgs, address: answer.address });
      return;
    }
  }

  // Validation
  if (parsedArgs.coin === undefined && parsedArgs.action === undefined) {
    console.log(
      pc.red("You must provide a coin and an action. Try again with.")
    );
    console.log(
      pc.yellow("You can use the following arguments to perform this action:")
    );
    console.log(
      pc.yellow("--coin, -c: The coin you want to use to perform the action.")
    );
    console.log(
      pc.yellow(
        `--action, -g: The action you want to perform. Available actions are: ${pc.bold(
          "generate-wallet"
        )}, ${pc.bold("get-balance")}, ${pc.bold("get-symbol")}`
      )
    );
    return;
  }

  if (!coins.includes(parsedArgs.coin)) {
    console.log(
      pc.red(
        `The coin ${pc.bold(
          parsedArgs.coin
        )} is not supported. Please use one of the following coins: ${coins.join(
          ", "
        )}`
      )
    );
    return;
  }

  const possibleActions = actions.map(toKebabCase);
  if (!possibleActions.includes(parsedArgs.action)) {
    console.log(
      pc.red(
        `The action ${pc.bold(
          parsedArgs.action
        )} is not supported. Please use one of the following actions: ${possibleActions.join(
          ", "
        )}`
      )
    );
    return;
  }

  await run({ ...parsedArgs });
};

module.exports = { cli };
