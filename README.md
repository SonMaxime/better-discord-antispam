#Update: 
Le npm a été mis à jour pour fonctionner avec la dernière mise à jour de discord.js v12!

Remarque : Si le bot a mis quelqu’un en sourdine pendant 10min, 4min ont passé puis au hasard le bot est allé hors ligne, n’oubliez pas de supprimer le rôle de l’utilisateur une fois que le reste 6min sont partis ou le il est mis en sourdine pour toujours! (modifiera plus tard)

Note supplémentaire : Cette version 2.0.0 est faite pour fonctionner avec le discord.js version 12 et seulement que, si vous essayez de l’utiliser avec une autre version (obv inférieur), il ne fonctionnera pas. Pour cela, récupérez la version 1.0.6 et n’oubliez pas de corriger le journal des canaux pour qu’il soit "antispam-logs".

Pour tout autre problème, veuillez l’ouvrir sur [Github](https://github.com/SonMaxime/better-discord-antispam)!
## better-discord-antispam.js
Un module simple basé sur le module de MirageZoe : better-discord-antispam.js ! Tout en contenant la même efficacité (configuration rapide et simple), il est livré avec de nouvelles choses comme la configuration d’un canal de rapport, timed mutes (supprimé l’option de ban et ajouté mute & unmute automatiquement) et beaucoup plus de fonctionnalités venant sur le chemin... Mais en français !

**DISCLAMER:** Vous pouvez seulement configurer 1 ensemble de configuration par client. (Cela signifie que vous ne pouvez pas configurer les paramètres pour chaque serveur pour l’instant. Vous pouvez seulement modifier dans quel vérificateur de guilde est exécuté et dans quel vérificateur n’est pas exécuté.)


## How to add this to your node_modules:
Pour installer ce module, saisir la commande de la console ci-dessous :
```
npm i discord-antispam-fr
```

## An example of how to set up:
Below you will find an example that would explain everything and what you must set up! (it's not too different!)

```js
const Discord = require('discord.js');
const antispam = require('discord-antispam-fr'); // Requiring this module.
const client = new Discord.Client();

client.on('ready', () => {
  // Module Configuration Constructor
   antispam(client, {
        limitUntilWarn: 3, // La quantité de messages autorisés à envoyer dans l’intervalle (temps) avant d’obtenir un avertissement.
        limitUntilMuted: 5, // La quantité de messages autorisés à envoyer dans l’intervalle (temps) avant d’obtenir une sourdine.
        interval: 2000, // L’intervalle (temps) où les messages sont envoyés. Pratiquement, si le membre X a envoyé 5+ messages en 2 secondes, il est mis en sourdine. (1000 millisecondes = 1 seconde, 2000 millisecondes = 2 secondes, etc.)
        warningMessage: "if you don't stop from spamming, I'm going to punish you!", // Message que vous recevez lorsque vous êtes averti!
        muteMessage: "was muted since we don't like too much advertisement type people!", // Message envoyé après que le membre X a été puni (mis en sourdine).
        maxDuplicatesWarning: 7,// Lorsque les gens envoient le même message, cela se produit lorsque le membre X envoie plus de 7 messages.
        maxDuplicatesMute: 10, // La limite où le membre X est mis en sourdine après avoir envoyé trop de messages (10+).
        ignoredRoles: ["Admin"], // Les membres ayant ce rôle (ou ces rôles) seront ignorés s’ils l’ont. Suggérez de ne pas ajouter cela à des gars aléatoires. De plus, c’est sensible à la casse.
        ignoredMembers: ["Mavis#2389"], // Ces membres sont directement touchés et ils n’ont pas besoin d’avoir le rôle ci-dessus. Bon pour les blagues d’infiltration.
		mutedRole: "muet", // Ici, vous mettez le nom du rôle qui ne devrait pas laisser les gens écrire/parler ou quoi que ce soit d’autre dans votre serveur. S’il n’y a pas de jeu de rôle, par défaut, le module tentera de créer le rôle pour vous et de le définir correctement pour chaque canal de votre serveur. Il sera nommé "muet".
		timeMuted: 1000 * 600, // C’est le temps pendant lequel le membre X sera mis en sourdine. Si ce n’est pas le cas, la valeur par défaut serait de 10 minutes.
		logChannel: "antispam-logs" // C’est le canal où chaque rapport sur le spamming va. S’il n’est pas configuré, il tentera de créer le canal.
      });
      
});

client.on('message', msg => {
  client.emit('checkMessage', msg); // Ceci exécute le filtre sur n’importe quel message que le bot reçoit dans n’importe quelle guilde.
  
}

client.login('token');
```
This is the main setup you have to add in order to protect your server from unwanted people. If they send more than 3 messages within 2 seconds, they get warned. At 5 they get muted. If they send same message 7+ times, he get warned and at 10 muted. Every member from <ignoredMembers> option and everyone that has the role/roles from <ignoredRoles> are protected from system so they can spam as much as they want.

## Little bit of documentation...

```js
antispam(<Client>);
```
This will configure module to run on its default configuration.<br>
`<Client>` - Variable that defines `new Discord.Client()`<br>
`antispam` - Variable that defines `require('better-discord-antispam')` <br>
<br>
```js
client.emit('checkMessage', <Message>)
```
`<Message>` - Variable that defines the message itself. (`client.on('message', async (msg) =>{})` in this situation msg is the <Message> variable.)
This will basically send your message to module. In fact is REQUIERED for module to run.<br>
<br>
```js
antispam(client, {
        limitUntilWarn: 3,
        limitUntilMuted: 5,
        interval: 2000,
        warningMessage: "",
        muteMessage: "",
        maxDuplicatesWarning: 7,
        maxDuplicatesMute: 10,
        ignoredRoles: [],
        ignoredMembers: [],
		mutedRole:"",
		timeMuted: 1000*600,
		logChannel: ""
      });
```
`antispam` - Variable that defines `require('better-discord-anti-spam')` <br>
`<Client>` - Requiered, Discord.Client<br>
`limitUntilWarn` - Optional, Type: Integer<br>
`limitUntilMuted` - Optional, Type: Integer<br>
`interval` - Optional, Type: Integer<br>
`warningMessage` - Optonal, Type: String, Minimum 5 Characters<br>
`muteMessage` - Optional, Type: String, Minimum 5 Characters<br>
`maxDuplicatesWarning` - Optional, Type: Integer<br>
`maxDuplicatesMute` - Optional, Type: Integer<br>
`ignoredRoles` - Optional, Type: Array<br>
`ignoredMembers`- Optional, Type: Array<br>
`mutedRole`- Optional, Type: String<br>
`timeMuted`- Optional, Type: Integer<br>
`logChannel`- Optional, Type: String<br>
<br>
**NOTE:** The module **will** throw errors for assigning incorect types to configuration values.<br>
<br>

P.S: If you have any issues, bugs or trouble setting the module up. feel free to open an issue on [Github](https://github.com/MirageZoe/better-discord-antispam)

P.S 2: This is just a release that is modified by me to suit the best my needs. If you find it on your taste, I'm happy. I'm not about to add complicated things only if I need them.

P.S 3: Remember if you don't get any notification in #antispam-logs, that means you haven't added with lowercase the name of  logchannel in config (this is because discord channels cannot have uppercase for some reasons but voice channels can.)
