![image](https://user-images.githubusercontent.com/63687573/144889684-e16773fa-2505-40a4-920f-5b06ed4e0b19.png)

# Walletfy-cli

[Walletfy](https://github.com/sammwyy/Walletfy) command-line tools for wallet management.

## Installation

```bash
npm install walletfy-cli -g
```

## Usage

### With prompt:

Run `walletfy` to start the prompt.

```bash
walletfy
```

### Manually:

Getting balance:

```bash
walletfy -c bitcoin -a 34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo -g get-balance
```

Generating new address:

```bash
walletfy -c bitcoin -g generate-wallet
```

Getting coin symbol:

```bash
walletfy -c bitcoin -g get-symbol
```

## Options

| Option        | Description |
| ------------- | ----------- |
| -c, --coin    | Coin name   |
| -a, --address | Address     |
| -g, --action  | Action      |
