const pc = require("picocolors");
const inquirer = require("inquirer");
const Walletfy = require("walletfy");

const coins = ["bitcoin", "ethereum", "litecoin", "nano", "shiba-inu"];
const actions = ["Generate wallet", "Get balance", "Get symbol"];

const ACTIONS_MAP = {
  "generate-wallet": async (coin) => {
    console.log(pc.green("Generating wallet, please wait..."));
    try {
      const wallet = await coin.generateWallet(coin);
      console.log(pc.green("Wallet generated successfully!"));
      console.log(`${pc.magenta("Address:")} ${wallet.address}`);
      console.log(`${pc.magenta("Private key:")} ${wallet.key}`);
      console.log(`${pc.magenta("Mnemonic:")} ${wallet.mnemonic}`);
    } catch (error) {
      throw new Error(error);
    }
  },
  "get-balance": async (coin, address) => {
    try {
      console.log(pc.green("Getting balance..."));
      const balance = await coin.getBalance(address);
      console.log(`${pc.green(`Balance:`)} ${balance}`);
    } catch (error) {
      throw new Error(error);
    }
  },
  "get-symbol": async (coin) => {
    try {
      console.log(pc.green("Getting symbol..."));
      console.log(`${pc.green(`Symbol:`)} ${coin.getCode()}`);
    } catch (error) {
      throw new Error(error);
    }
  },
};

const run = async ({ coin: selectedCoin, action, address }) => {
  const walletfy = new Walletfy.default();
  const coin = walletfy.getCoin(selectedCoin);
  await ACTIONS_MAP[action](coin, address);
};

const ask = async () => {
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
      choices: actions,
    },
  ]);
  return answers;
};

module.exports = { coins, actions, run, ask };
