## Wut is this?
[Invite Link](https://discord.com/api/oauth2/authorize?client_id=940968101627969598&permissions=277025410048&scope=bot%20applications.commands) <br>
[Top.gg](https://top.gg/bot/940968101627969598)

Source of a cool bot that I managed to make with [discord.js](https://github.com/discordjs/discord.js). 
This bot's status cycles trough the price of Bitcoin, Ethereum, Dogecoin and Stellar. You can buy and sell crypto!!! LESGOOO buy Bitcoin to the MOON

# FEATURES
- Buy and sell over 1000 cryptocurrencies with USD
- Send USD to other users
- Get real-time price data and visual price chart
- Price_as_bot_status(Bitcoin, Ethereum, Dogecoin, Stellar);
- DM price alerts

And the best thing is that all this is FREE!

This bot gives users the ability to check the current price of over 1000 different cryptocurrencies. The visual chart is not very consistent so the chart may not be given for every request.

EXAMPLE:

![This is an image](https://cdn.discordapp.com/attachments/856939429447860274/962747496919085066/price.PNG)

The bot's status cycles through Bitcoin, Ethereum, Dogecoin and Stellar Lumen.

EXAMPLE: 

![This is gif](https://cdn.discordapp.com/attachments/856939429447860274/962754603168968734/ezgif-1-f2c582f819.gif)

Users can also buy and sell crypto coins with USD.

EXAMPLE:

![This an image](https://cdn.discordapp.com/attachments/856939429447860274/962747804726489178/buy.PNG)

### COMMAND LIST:
This bot uses only application commands!
```
/price [coin]             //Get current price

/bal                      //Get your USD balance

/wallet [coin]            //Get cryptocurrency wallet balance

/buy [amount] [coin]      //Buy coins

/sell [amount] [coin]     //Sell coins

/pay [amount] [@user]     //Send USD to @user

/mine [answer]            //Answer simple math question and receive USD.

/alert [coin] [price]     //DMs if coin value is more than price

/alerts                   //Gives a list of every alert you have set
```
### Mine command explained:
To get a new math question only type ```/mine``` without the [answer] argument it will then give you a simple math question. To answer that question type ```/mine [answer]``` and define the [answer]. If the answer was right you will receive USD reward.

Miner:

![This an image](https://cdn.discordapp.com/attachments/856939429447860274/962747494469603348/miner.PNG)

### Price Alerts
You can create price alerts with command `/alert [coin] [price]`

![This an image](https://cdn.discordapp.com/attachments/856939429447860274/962747494285066331/alert.PNG)

The bot sends you a private message when the coin's value is more than the price you defined.

![This an image](https://cdn.discordapp.com/attachments/856939429447860274/962750015292473384/alert-r.PNG)

### Bot down?
Check the bot's ABOUT ME section. There might be some reason for it.

![This an image](https://cdn.discordapp.com/attachments/856939429447860274/962747494083723284/Stattus.PNG)
## Installation

1.  Download the latest [version](https://github.com/JAAKKQ/CryptoDiscordBot/archive/refs/heads/main.zip)
2.  Extract it with WinRAR, 7zip, WinZip...
3.  Run `npm install` through CMD or double click on the `InstallModules.bat` file
4.  Go to the [Discord Developer Portal](https://discord.com/developers/applications) and grab your bot token
5.  Run the index.js: `node index.js` through CMD or double click on the `Start.bat` file
6.  The setup wizard will then ask: "Config file not found. Would you like to setup a new config or recover old data? s/r" 
7.  Type `s` and hit <kbd>enter</kbd>
8.  Paste your token and hit <kbd>enter</kbd>
9.  Then paste your bot's id and hit <kbd>enter</kbd>
10. Then the wizard will ask if you want to give a price chart when users ask for the price of a coin: "Insert chart API token from chart-img.com (optional)" this is optional. You can get the API key from [chart-img.com/account/api](https://chart-img.com/account/api)
11.  The bot should start if there were no errors

#### You should never write your bot's token, chart-img API key or client ID directly to the `config.json` file, always use the wizard to change them!

To start the wizard just run `node index.js` and when asks "Set new token?" type `y` and hit <kbd>enter</kbd>.