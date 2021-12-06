import CLI from "clui";
import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import Walletfy from "walletfy";

const Spinner = CLI.Spinner;

const cli = async () => {
  clear();

  console.log(
    chalk.yellow(figlet.textSync("Walletfy", { horizontalLayout: "full" }))
  );

  const coins = ["bitcoin", "ethereum", "litecoin", "nano", "shiba-inu"];

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "coin",
      message: "Which coin do you want to use?",
      choices: coins,
    },
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: ["Generate wallet", "Get balance", "Get coin symbol"],
    },
  ]);

  const walletfy = new Walletfy.default();
  const coin = walletfy.getCoin(answers.coin);

  switch (answers.action) {
    case "Generate wallet":
      const status = new Spinner("Generating wallet, please wait...");
      try {
        status.start();
        const wallet = await coin.generateWallet(answers.coin);
        console.log(chalk.green("Wallet generated successfully!"));
        console.log(chalk.green(`Address: ${wallet.address}`));
        console.log(chalk.green(`Private key: ${wallet.key}`));
        console.log(chalk.green(`Mnemonic: ${wallet.mnemonic}`));
      } catch (error) {
        throw new Error(error);
      } finally {
        status.stop();
      }
      break;
    case "Get balance":
      break;
    case "Get coin symbol":
      break;
  }
};

cli();
