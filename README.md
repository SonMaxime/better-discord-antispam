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
C’est la configuration principale que vous devez ajouter afin de protéger votre serveur contre les personnes indésirables. S’ils envoient plus de 3 messages en 2 secondes, ils sont avertis. À 5, ils sont mis en sourdine. S’ils envoient le même message 7+ fois, il est averti et à 10 muet. Chaque membre de ignoredMembers> option et tous ceux qui ont le rôle / rôles de ignoredRoles> sont protégés du système afin qu’ils puissent spam autant qu’ils le veulent.

## Little bit of documentation...

```js
antispam(<Client>);
```
This will configure module to run on its default configuration.<br>
`<Client>` - Variable qui définis `new Discord.Client()`<br>
`antispam` - Variable qui définis `require('better-discord-antispam')` <br>
<br>
```js
client.emit('checkMessage', <Message>)
```
`<Message>` - Variable qui définis le message lui même. (`client.on('message', async (msg) =>{})`dans cette situation, msg est la variable de <Message>.)
Cela va essentiellement envoyer votre message au module. En fait, est REQUIS pour le module à exécuter.<br>
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
`antispam` - Variable qui définis `require('better-discord-anti-spam')` <br>
`<Client>` - Requis, Discord.Client<br>
`limitUntilWarn` - Optionnel, Type: Integer<br>
`limitUntilMuted` - Optionnel, Type: Integer<br>
`interval` - Optional, Type: Integer<br>
`warningMessage` - Optionnel, Type: String, Minimum 5 Characters<br>
`muteMessage` - Optionnel, Type: String, Minimum 5 Characters<br>
`maxDuplicatesWarning` - Optionnel, Type: Integer<br>
`maxDuplicatesMute` - Optionnel, Type: Integer<br>
`ignoredRoles` - Optionnel, Type: Array<br>
`ignoredMembers`- Optionnel, Type: Array<br>
`mutedRole`- Optionnel, Type: String<br>
`timeMuted`- Optionnel, Type: Integer<br>
`logChannel`- Optionnel, Type: String<br>
<br>
**NOTE:** The module **will** throw errors for assigning incorect types to configuration values.<br>
<br>

P.S: If you have any issues, bugs or trouble setting the module up. feel free to open an issue on [Github](https://github.com/MirageZoe/better-discord-antispam)

P.S 2: This is just a release that is modified by me to suit the best my needs. If you find it on your taste, I'm happy. I'm not about to add complicated things only if I need them.

P.S 3: Remember if you don't get any notification in #antispam-logs, that means you haven't added with lowercase the name of  logchannel in config (this is because discord channels cannot have uppercase for some reasons but voice channels can.)
