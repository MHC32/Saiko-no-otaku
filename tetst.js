const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const targetGroups = [
    // '120363185782927568@g.us', // FUJOSHI 'S HOUSE 🫶🔥🇰🇷🇯🇵🇨🇳
    // '120363349353432469@g.us', // HENTAI HÀREMU🇰🇷🇯🇵🇨🇳🇭🇹
    // '120363365893803681@g.us', // SAIKÒ NO OTAKU 🇭🇹🇰🇷🇯🇵🇨🇳
    // '120363367342294030@g.us', // AKATSUKI - NEWS🇰🇷🇯🇵🇨🇳
    // '120363359615350827@g.us', // Le cerveau SOOU
    // '120363347676002416@g.us', // SPORT NEWS⚽🏀🏈🥋🥊🥅
    // '120363351624285854@g.us', // SAIKÒ NO OTAKU
    // '120363366281637932@g.us',
    '120363368780291860@g.us', // SENDEN PUB🎙️📻
];

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Scannez le QR code pour vous connecter.');
});

client.on('ready', async () => {
    console.log('Client prêt !');

    // Récupérer toutes les conversations
    const chats = await client.getChats();
    console.log(`Nombre total de conversations : ${chats.length}`);

    // Lister les noms et IDs de toutes les conversations
    chats.forEach((chat, index) => {
        console.log(`[${index + 1}] Nom : ${chat.name || 'Conversation individuelle'}`);
        console.log(`   ID : ${chat.id._serialized}`);
        console.log(`   Est un groupe : ${chat.isGroup}`);
    });

    console.log('Liste des conversations affichée avec succès !');
});

client.on('ready', async () => {
    console.log('Client prêt !');

    // Récupérer toutes les conversations (chats)
    const chats = await client.getChats();
    console.log(`Nombre total de conversations : ${chats.length}`);

    // Filtrer les chats pour récupérer uniquement les groupes surveillés
    const targetChatIds = targetGroups; // Liste des IDs de groupes surveillés
    const targetChats = chats.filter(chat => targetChatIds.includes(chat.id._serialized));

    // Loguer les informations sur chaque groupe surveillé
    targetChats.forEach(async (chat) => {
        console.log(`\n--- Informations du groupe : ${chat.name || 'Groupe sans nom'} ---`);
        console.log(`ID du groupe : ${chat.id._serialized}`);
        console.log(`Est un groupe ? : ${chat.isGroup}`);
        console.log(`Type de chat : ${chat.type}`);  // 'group', 'chat', 'private'

        // Vérifier si le chat est un groupe avant de récupérer les participants
        if (chat.isGroup) {
            try {
                const participants = await chat.getParticipants();
                console.log(`Nombre de participants : ${participants.length}`);

                // Construire un message pour taguer tous les participants
                let mentionMessage = 'Voici un message pour tous les membres du groupe :\n\n';
                participants.forEach(participant => {
                    mentionMessage += `@${participant.id.user} `; // Taguer le participant
                });

                // Envoyer le message dans le groupe
                await chat.sendMessage(mentionMessage, {
                    mentions: participants.map(participant => participant.id) // Mentionner tous les participants
                });

            } catch (error) {
                console.error("Erreur lors de la récupération des participants : ", error);
            }
        } else {
            console.log("Ce n'est pas un groupe, pas de participants disponibles.");
        }
    });
});

client.on('message', async (message) => {
    // Vérifier si le message provient d'un groupe surveillé
    if (message.from.endsWith('@g.us') && targetGroups.includes(message.from)) {
        console.log(`Message reçu dans un groupe surveillé : ${message.from}`);
        console.log(`Contenu du message : ${message.body}`);
        
        // Loguer l'ID du message
        console.log(`ID du message : ${message.id._serialized}`);

        // Récupérer les détails du chat (groupe)
        const chat = await message.getChat();

        // Commande pour taguer tous les membres
        if (message.body === '.tagAll') {
            try {
                const participants = await chat.getParticipants();

                // Construire un message pour taguer tous les membres
                let mentionMessage = 'Voici un message pour tous les membres du groupe :\n\n';
                participants.forEach(participant => {
                    mentionMessage += `@${participant.id.user} `; // Taguer le participant
                });

                // Envoyer le message dans le groupe
                await chat.sendMessage(mentionMessage, {
                    mentions: participants.map(participant => participant.id) // Mentionner tous les participants
                });

                console.log('Message envoyé avec succès avec toutes les mentions.');
            } catch (error) {
                console.error("Erreur lors de l'envoi des mentions : ", error);
            }
        }
    }
});

// Lancer le client
client.initialize();