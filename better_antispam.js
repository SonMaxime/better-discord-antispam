const { MessageEmbed } = require("discord.js");

let authors = [];
let warned = [];
let punishedList = [];
let messageLog = [];

module.exports = async (client, options) => {
  
  const limitUntilWarn = (options && options.limitUntilWarn) || 3;
  const limitUntilMuted = (options && options.limitUntilMuted) || 5;
  const interval = (options && options.interval) || 2000;
  const warningMessage = (options && options.warningMessage) || "Si vous n’arrêtez pas de spammer, je vais vous punir !"; 
  const muteMessage = (options && options.muteMessage) || "a été mis en sourdine car nous n’aimons pas trop les gens de type spammeur...";
  const maxDuplicatesWarning = (options && options.maxDuplicatesWarning || 7);
  const maxDuplicatesMute = (options && options. maxDuplicatesMute || 10);
  const ignoredRoles = (options && options.ignoredRoles) || [];
  const ignoredMembers = (options && options.ignoredMembers) || [];
  const mutedRole = (options && options.mutedRole) || "Muté"; 
  const timeMuted = (options && options.timeMuted) || 1000 * 600;
  const logChannel = (options && options.logChannel) || "antispam-logs";

  if(isNaN(limitUntilWarn)) throw new Error("ERREUR : L’option <limitUntilWarn> n’est pas configurée correctement ! Veuillez vérifier à nouveau qu’il s’agit d’un nombre dans les paramètres.");
  if(isNaN(limitUntilMuted)) throw new Error("ERREUR : L’option <limitUntilMuted> n’est pas configurée correctement ! Veuillez ajouter un nombre dans les paramètres.");
  if(isNaN(interval)) throw new Error("ERREUR : L’option <interval> n’est pas configurée correctement ! Veuillez ajouter un nombre dans les paramètres.");
  if(!isNaN(warningMessage) || warningMessage.length < 5) throw new Error("ERREUR : L’option <warningMessage> doit être une chaîne de caractères et comporter au moins 5 caractères (y compris l’espace).");
  if(!isNaN(muteMessage) || muteMessage.length < 5) throw new Error("ERREUR : L’option <muteMessage> doit être une chaîne de caractères et avoir au moins 5 caractères (y compris l’espace).");
  if(isNaN(maxDuplicatesWarning)) throw new Error("ERREUR : L’option <maxDuplicatesWarning> n’est pas configurée correctement ! Veuillez vérifier à nouveau qu’il s’agit d’un nombre dans les paramètres.")
  if(isNaN(maxDuplicatesMute)) throw new Error("ERREUR : L’option <maxDuplicatesMute> n’est pas configurée correctement ! Veuillez vérifier à nouveau qu’il s’agit d’un nombre dans les paramètres.");
  if(isNaN(timeMuted)) throw new Error("ERREUR : L’option <timeMuted> n’est pas configurée correctement ! Veuillez vérifier à nouveau qu’il s’agit d’un nombre dans les paramètres.");
  if(ignoredRoles.constructor !== Array) throw new Error("ERREUR : L’option <ignoredRoles> n’est pas configurée correctement ! Veuillez vérifier à nouveau qu’il s’agit d’un tableau dans les paramètres.");
  if(ignoredMembers.constructor !== Array) throw new Error("ERREUR : L’option <ignoredMembers> n’est pas configurée correctement ! Veuillez vérifier à nouveau qu’il s’agit d’un tableau dans les paramètres.");
  
 client.on("checkMessage", async (message) => {
 
  let clock = new Date();
  let ss = String(clock.getSeconds()).padStart(2, '0');
  let min = String(clock.getMinutes()).padStart(2, '0');
  let hrs = String(clock.getHours()).padStart(1, '0');
  clock = hrs + ':' + min +':' + ss;

  let TheDate = new Date()
  let zilelesaptamanii = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  let weekday = zilelesaptamanii[TheDate.getDay()];
  let dd = String(TheDate.getDate()).padStart(2, '0');
  let mon = String(TheDate.getMonth()+ 1);
  let year = String(TheDate.getFullYear()).padStart(4,'00');
  TheDate = weekday+", " + mon + '/' + dd +'/' + year;

  let amORpm;
  if(hrs >= 0 && hrs <= 12){
      amORpm = "AM"
  }else{
      amORpm = "PM"
  };
  // The Mute function.
  const MuteMember = async (m, muteMsg) => {
    for (var i = 0; i < messageLog.length; i++) {
        if (messageLog[i].author == m.author.id) {
          messageLog.splice(i);
        }
      }
  
      punishedList.push(m.author.id);
      
      let user = m.guild.members.cache.get(m.author.id);
      let ReportChannel = m.guild.channels.cache.find(ch => ch.name === logChannel);
      if(!ReportChannel){
        try{
            ReportChannel = await m.guild.channels.create('antispam-logs', {
              type: 'text',
              permissionOverwrites:[{
                id: m.guild.id,
                deny: ['VIEW_CHANNEL']
              }]
            })
              .then(m=> m.send(`Création du canal ** "reports"** puisqu’un canal pour les rapports n’a pas été fourni dès le début lors de la configuration du module.`))
              .catch(console.error)
  
        }catch(e){
          console.log(e.stack);
        }
      };

      let role = m.guild.roles.cache.find(namae => namae.name === mutedRole);      
      if (!role) {
        try {
            role = await m.guild.roles.create({
              data:{
                name: "Muté",
                color: "#000000",
                permissions: []
              },
              reason: `Role non trouvé, merci d'en créer un.`
            })
            m.guild.channels.cache.forEach(async (thechann, id) => {
                await thechann.updateOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    SPEAK: false
                });
            });
           ReportChannel.send(`Création du rôle ** "Muté"** puisqu’un rôle (à appliquer à la personne muette) car n’a pas été fourni dès le début lors de la configuration du module.`) 
        } catch (e) {
            console.log(e.stack);
        }
    }
    
      if (user) {
        user.roles.add(role).then(()=>{
          m.channel.send(`<@!${m.author.id}>, ${muteMsg}`);
          let muteEmbed = new MessageEmbed()
            .setAuthor('Action | Auto Mute', `https://cdn.discordapp.com/icons/690549564620537889/33d5bb0874db59d78a5817d3964ee7e2.jpg`)
            .addField('Membre muté:',`${user}`)
            .addField(`Muté combien de temps ? :`,`${timeMuted} seconds (10 min)`)
            .addField('Raison du mute : ', `Spam`)
            .addField(`Quand a-t-il été mute ? :`,TheDate+ " at "+ clock+" "+amORpm)
            .setColor('#D9D900')
          ReportChannel.send(muteEmbed);
          setTimeout(()=>{
            user.roles.remove(role);
            let unmutedEmbed = new MessageEmbed()
              .setAuthor('Action | Auto Unmute')
              .addField(`Membre unmute:`,`${user}`)
              .addField(`Raison de l'unmute:`,`Temps atteint (10 min)`)
              .setColor('#D9D900')
          ReportChannel.send(unmutedEmbed)
          }, timeMuted);
          return true;
       }).catch((e) => {
          m.guild.owner.send(`Oops je n'ai pas les permissions... <@!${message.author.id}>!\n Il se peut que ce soit un autre type d’erreur qui s’est produitt ! Tell me on github: https://github.com/MirageZoe/ \n Tout c'est passé le ${TheDate} à ${clock} ${amORpm} avec le message:\n\n\`${e.message}\`\n\n *P.S: Si c’est la première fois que vous obtenez quelque chose comme ça, très probablement parce qu’il n’a pas été bien configuré le canal journal au début et ne savait pas où envoyer les rapports. Ne paniquez pas, la prochaine fois ça va marcher puisqu’il a créé le canal où envoyer les rapports !*`);
          return false;
      });
    }
  }
  
    
   const WarnMember = async (m, reply) => {
    warned.push(m.author.id);
    m.channel.send(`<@${m.author.id}>, ${reply}`);
   }

    if (message.author.bot) return;
    if (message.channel.type !== "text" || !message.member || !message.guild || !message.channel.guild) return;
   
    if (message.member.roles.cache.some(r => ignoredRoles.includes(r.name)) || ignoredMembers.includes(message.author.tag)) return;

    if (message.author.id !== client.user.id) {
      let currentTime = Math.floor(Date.now());
      authors.push({
        "temps": currentTime,
        "auteur": message.author.id
      });
      
      messageLog.push({
        "message": message.content,
        "auteur": message.author.id
      });
      
      let msgMatch = 0;
      for (var i = 0; i < messageLog.length; i++) {
        if (messageLog[i].message == message.content && (messageLog[i].author == message.author.id) && (message.author.id !== client.user.id)) {
          msgMatch++;
        }
      }
      
      if (msgMatch == maxDuplicatesWarning && !warned.includes(message.author.id)) {
        WarnMember(message, warningMessage);
      }

      if (msgMatch == maxDuplicatesMute && !punishedList.includes(message.author.id)) {
        MuteMember(message, muteMessage);
      }

      var matched = 0;

      for (var i = 0; i < authors.length; i++) {
        if (authors[i].time > currentTime - interval) {
          matched++;
          if (matched == limitUntilWarn && !warned.includes(message.author.id)) {
            WarnMember(message, warningMessage);
          } else if (matched == limitUntilMuted) {
            if (!punishedList.includes(message.author.id)) {
              MuteMember(message, muteMessage);
            }
          }
        } else if (authors[i].time < currentTime - interval) {
          authors.splice(i);
          warned.splice(warned.indexOf(authors[i]));
          punishedList.splice(warned.indexOf(authors[i]));
        }

        if (messageLog.length >= 200) {
          messageLog.shift();
        }
      }
    }
  });
}
