const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const path = require("path");

async function getDisplayName(participantId, groupId, bot) {
  try {
    const contact = await bot.getContactById(participantId); // Récupérer le contact
    return contact.pushname || contact.name || participantId.split("@")[0]; // Fallback sur l'ID
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du nom pour ${participantId} dans le groupe ${groupId}:`,
      error
    );
    return null;
  }
}

function playRockPaperScissors(args) {
  const choices = ["feuille", "papier", "ciseaux"];
  const userChoice = args[0]?.toLowerCase();
  if (!choices.includes(userChoice)) {
    return "Choisissez entre : `feuille`, `papier` ou `ciseaux`.";
  }

  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  if (userChoice === botChoice) {
    return `Égalité ! Nous avons tous les deux choisi ${botChoice}.`;
  }

  const wins = {
    feuille: "ciseaux",
    ciseaux: "papier",
    papier: "feuille",
  };

  if (wins[userChoice] === botChoice) {
    return `Bravo ! Vous avez gagné 🎉. J'ai choisi ${botChoice}.`;
  } else {
    return `Dommage, j'ai gagné 😎. J'ai choisi ${botChoice}.`;
  }
}

// Fonction pour vérifier si un utilisateur est admin dans un groupe donné
function isAdmin(user, groupId) {
  const group = groupes[groupId];
  return group && group.admins.includes(user);
}

function getAnimeRecommendation(query) {
  const recommendations = {
    action: [
      "Attack on Titan",
      "My Hero Academia",
      "Demon Slayer: Kimetsu no Yaiba",
      "One Piece",
      "Naruto",
      "Vinland Saga",
      "Mob Psycho 100",
      "Fullmetal Alchemist: Brotherhood",
      "Sword Art Online",
      "Tokyo Ghoul",
      "Bleach",
      "Hunter x Hunter",
      "Fairy Tail",
      "Berserk",
      "Black Clover",
      "JoJo's Bizarre Adventure",
      "Re:Zero - Starting Life in Another World",
      "Death Note",
      "Fate/Zero",
      "Fate/stay night: Unlimited Blade Works",
      "Overlord",
      "The Seven Deadly Sins",
      "Akame ga Kill!",
      "Guilty Crown",
      "No Game No Life",
      "Parasyte: The Maxim",
      "The Promised Neverland",
      "Kabaneri of the Iron Fortress",
      "Dororo",
      "The God of High School",
      "D.Gray-man",
      "Soul Eater",
      "Noragami",
      "Katekyo Hitman Reborn!",
      "Hellsing",
      "Tokyo Revengers",
      "Gundam Series",
      "Sword Art Online: Alicization",
      "Black Lagoon",
      "Fairy Gone",
      "Bungou Stray Dogs",
      "C: The Money of Soul and Possibility Control",
      "Zom 100: Bucket List of the Dead",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Rising of the Shield Hero",
      "KonoSuba: Legend of Crimson",
      "Magi: The Labyrinth of Magic",
      "Shingeki no Bahamut: Genesis",
      "C: The Money of Soul and Possibility Control",
      "Kakegurui",
      "Dorohedoro",
      "Blood Blockade Battlefront",
      "K Project",
      "Jujutsu Kaisen",
      "The Fate Series",
      "Tokyo Ghoul:re",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "Fairy Tail: Dragon Cry",
      "The King's Avatar",
      "KonoSuba: Legend of Crimson",
      "Re:Creators",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Eminence in Shadow",
      "The Executioner and Her Way of Life",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "The Faraway Paladin",
      "Alderamin on the Sky",
      "Guilty Crown",
      "The God of High School",
      "Demon Slayer: Kimetsu no Yaiba - Mugen Train",
      "Fate/Grand Order: Absolute Demonic Front - Babylonia",
      "The Rising of the Shield Hero",
      "The Heroic Legend of Arslan",
      "C: The Money of Soul and Possibility Control",
      "Kakegurui",
      "Dorohedoro",
      "Blood Blockade Battlefront",
      "K Project",
      "Jujutsu Kaisen",
      "Tokyo Revengers",
      "D.Gray-man",
      "Soul Eater",
      "Noragami",
      "Katekyo Hitman Reborn!",
      "Hellsing",
      "Tokyo Ghoul:re",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "Fairy Tail: Dragon Cry",
      "The King's Avatar",
      "KonoSuba: Legend of Crimson",
      "Re:Creators",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Eminence in Shadow",
      "The Executioner and Her Way of Life",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "The Faraway Paladin",
    ],
    romance: [
      "Your Lie in April",
      "Toradora!",
      "Clannad: After Story",
      "Kimi ni Todoke",
      "Fruits Basket",
      "Ao Haru Ride",
      "Lovely★Complex",
      "My Teen Romantic Comedy SNAFU",
      "Kaguya-sama: Love Is War",
      "Nana",
      "Shigatsu wa Kimi no Uso (Your Lie in April)",
      "The Pet Girl of Sakurasou",
      "ReLIFE",
      "Chunibyo & Other Delusions",
      "A Silent Voice",
      "Kimi ni Todoke",
      "Orange",
      "Anohana: The Flower We Saw That Day",
      "My Dress-Up Darling",
      "Kaguya-sama: Love Is War - First Kiss wa Owaranai",
      "Kimi to Kawaii Anoko no Karada",
      "Toradora! Spin-Off: The True Story of Taiga Aisaka",
      "Kaguya-sama: Love Is War - The First Kiss Never Ends",
      "Owari no Seraph",
      "Kimi ni Todoke: From Me to You",
      "Fruits Basket (2019)",
      "Kyoukai no Kanata",
      "Kimi no Na wa (Your Name)",
      "Kaguya-sama: Love Is War - The First Kiss Never Ends",
      "Kimi to Kawaii Anoko no Karada",
      "Kimi ni Todoke: From Me to You",
      "Sankarea: Undying Love",
      "Kimi ni Todoke",
      "My Love Story!!",
      "Kimi to Kawaii Anoko no Karada",
      "Kaguya-sama: Love Is War",
      "Kimi ni Todoke",
      "Ao Haru Ride",
      "Lovely★Complex",
      "Clannad",
      "Aho Girl",
      "Kimi ni Todoke",
      "My Dress-Up Darling",
      "Kaguya-sama: Love Is War",
      "Kimi ni Todoke",
      "Toradora!",
      "Fruits Basket",
      "Kimi to Kawaii Anoko no Karada",
      "Kimi ni Todoke",
      "My Teen Romantic Comedy SNAFU",
      "Kaguya-sama: Love Is War",
      "Your Lie in April",
      "Toradora!",
      "Clannad: After Story",
      "Kimi ni Todoke",
      "Fruits Basket",
      "Ao Haru Ride",
      "Lovely★Complex",
      "My Teen Romantic Comedy SNAFU",
      "Kaguya-sama: Love Is War",
      "Nana",
      "Shigatsu wa Kimi no Uso (Your Lie in April)",
      "The Pet Girl of Sakurasou",
      "ReLIFE",
      "Chunibyo & Other Delusions",
      "A Silent Voice",
      "Kimi ni Todoke",
      "Orange",
      "Anohana: The Flower We Saw That Day",
      "My Dress-Up Darling",
      "Kaguya-sama: Love Is War - First Kiss wa Owaranai",
      "Kimi to Kawaii Anoko no Karada",
      "Toradora! Spin-Off: The True Story of Taiga Aisaka",
      "Kaguya-sama: Love Is War - The First Kiss Never Ends",
      "Owari no Seraph",
      "Kimi ni Todoke: From Me to You",
      "Fruits Basket (2019)",
      "Kyoukai no Kanata",
      "Kimi no Na wa (Your Name)",
      "Kaguya-sama: Love Is War - The First Kiss Never Ends",
      "Kimi to Kawaii Anoko no Karada",
      "Kimi ni Todoke: From Me to You",
      "Sankarea: Undying Love",
      "Kimi ni Todoke",
      "My Love Story!!",
    ],
    fantasy: [
      "Sword Art Online",
      "Re:Zero - Starting Life in Another World",
      "Made in Abyss",
      "Konosuba: God's Blessing on This Wonderful World!",
      "Fairy Tail",
      "Overlord",
      "That Time I Got Reincarnated as a Slime",
      "No Game No Life",
      "The Rising of the Shield Hero",
      "Magi: The Labyrinth of Magic",
      "The Seven Deadly Sins",
      "Fate/Zero",
      "Fate/stay night: Unlimited Blade Works",
      "The Ancient Magus' Bride",
      "Akame ga Kill!",
      "Goblin Slayer",
      "Grimgar: Ashes and Illusions",
      "The God of High School",
      "Howl's Moving Castle",
      "The Faraway Paladin",
      "Mushoku Tensei: Jobless Reincarnation",
      "In Another World with My Smartphone",
      "Ascendance of a Bookworm",
      "The Devil is a Part-Timer!",
      "Re:Creators",
      "KonoSuba: Legend of Crimson",
      "The Saga of Tanya the Evil",
      "Kono Oto Tomare! Sounds of Life",
      "The Fruit of Evolution: Before I Knew It, My Life Had It Made",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "Fairy Tail: Dragon Cry",
      "The King's Avatar",
      "Alderamin on the Sky",
      "The Heroic Legend of Arslan",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "KonoSuba: Legend of Crimson",
      "The Rising of the Shield Hero",
      "Kono Oto Tomare! Sounds of Life",
      "The Eminence in Shadow",
      "The Executioner and Her Way of Life",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "The Faraway Paladin",
      "The Devil is a Part-Timer!",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Ancient Magus' Bride",
      "Sword Art Online: Alicization",
      "The Seven Deadly Sins: Dragon's Judgement",
      "Attack on Titan",
      "Fairy Tail: Dragon Cry",
      "The King's Avatar",
      "The Saga of Tanya the Evil",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Rising of the Shield Hero",
      "No Game No Life",
      "Magi: The Labyrinth of Magic",
      "The Ancient Magus' Bride",
      "Akame ga Kill!",
      "Goblin Slayer",
      "Grimgar: Ashes and Illusions",
      "The God of High School",
      "Howl's Moving Castle",
      "The Faraway Paladin",
      "Mushoku Tensei: Jobless Reincarnation",
      "In Another World with My Smartphone",
      "Ascendance of a Bookworm",
      "The Devil is a Part-Timer!",
      "Re:Creators",
      "KonoSuba: Legend of Crimson",
      "The Saga of Tanya the Evil",
      "Kono Oto Tomare! Sounds of Life",
      "The Fruit of Evolution: Before I Knew It, My Life Had It Made",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "The Faraway Paladin",
    ],
    comedy: [
      "One Punch Man",
      "Gintama",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Disastrous Life of Saiki K.",
      "Nichijou",
      "Ouran High School Host Club",
      "Monthly Girls' Nozaki-kun",
      "The Devil is a Part-Timer!",
      "My Teen Romantic Comedy SNAFU",
      "Kaguya-sama: Love Is War",
      "School Rumble",
      "Hinamatsuri",
      "Baka and Test: Summon the Beasts",
      "Saiki Kusuo no Psi-nan (The Disastrous Life of Saiki K.)",
      "Toradora!",
      "Daily Lives of High School Boys",
      "Hyouka",
      "Miss Kobayashi's Dragon Maid",
      "Konosuba: Legend of Crimson",
      "Fairy Tail",
      "Shimoneta: A Boring World Where the Concept of Dirty Jokes Doesn't Exist",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Pet Girl of Sakurasou",
      "Gekkan Shoujo Nozaki-kun",
      "The Morose Mononokean",
      "Kaguya-sama: Love Is War - First Kiss wa Owaranai",
      "Aho Girl",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "Yuru Camp",
      "Aggretsuko",
      "Kaguya-sama: Love Is War - The First Kiss Never Ends",
      "Hinamatsuri",
      "Non Non Biyori",
      "Sankarea: Undying Love",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "Bunny Girl Senpai",
      "Re:Zero - Starting Life in Another World",
      "Kono Oto Tomare! Sounds of Life",
      "The Devil is a Part-Timer!",
      "My Dress-Up Darling",
      "Aho Girl",
      "Kaguya-sama: Love Is War",
      "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
      "The King's Avatar",
      "KonoSuba: Legend of Crimson",
      "The Saga of Tanya the Evil",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "Gintama",
      "Kaguya-sama: Love Is War",
      "The Disastrous Life of Saiki K.",
      "Nichijou",
      "Ouran High School Host Club",
      "Monthly Girls' Nozaki-kun",
      "The Devil is a Part-Timer!",
      "My Teen Romantic Comedy SNAFU",
      "School Rumble",
      "Hinamatsuri",
      "Baka and Test: Summon the Beasts",
      "Saiki Kusuo no Psi-nan (The Disastrous Life of Saiki K.)",
      "Toradora!",
      "Daily Lives of High School Boys",
      "Hyouka",
      "Miss Kobayashi's Dragon Maid",
      "Konosuba: Legend of Crimson",
      "Fairy Tail",
      "Shimoneta: A Boring World Where the Concept of Dirty Jokes Doesn't Exist",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Pet Girl of Sakurasou",
      "Gekkan Shoujo Nozaki-kun",
      "The Morose Mononokean",
      "Kaguya-sama: Love Is War - First Kiss wa Owaranai",
      "Aho Girl",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "Yuru Camp",
      "Aggretsuko",
    ],
    sport: [
      "Haikyuu!!",
      "Kuroko's Basketball",
      "Yuri on Ice",
      "Free!",
      "Ace of Diamond",
      "Initial D",
      "Ping Pong the Animation",
      "Hajime no Ippo",
      "Chihayafuru",
      "Run with the Wind",
      "Major",
      "Slam Dunk",
      "Kaze ga Tsuyoku Fuiteiru",
      "Blue Lock",
      "One Outs",
      "Bamboo Blade",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
      "Kaze ga Tsuyoku Fuiteiru",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
      "Kaze ga Tsuyoku Fuiteiru",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
      "Kaze ga Tsuyoku Fuiteiru",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
      "Kaze ga Tsuyoku Fuiteiru",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
      "Kaze ga Tsuyoku Fuiteiru",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
      "Kaze ga Tsuyoku Fuiteiru",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
      "Kaze ga Tsuyoku Fuiteiru",
      "Kuroko's Basketball: Last Game",
      "Kimi to Boku no Saigo no Senjou, Aruiwa Sekai ga Hajimaru Seisen",
      "Daiya no Ace",
      "Yowamushi Pedal",
      "Kuroko no Basket: Winter Cup",
      "Saki",
      "Kono Oto Tomare! Sounds of Life",
      "Princess Tutu",
    ],
    isekai: [
      "Sword Art Online",
      "Re:Zero - Starting Life in Another World",
      "That Time I Got Reincarnated as a Slime",
      "No Game No Life",
      "Konosuba: God's Blessing on This Wonderful World!",
      "The Rising of the Shield Hero",
      "Overlord",
      "The Devil is a Part-Timer!",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Faraway Paladin",
      "In Another World with My Smartphone",
      "Ascendance of a Bookworm",
      "The Saga of Tanya the Evil",
      "Jobless Reincarnation: I Will Seriously Try If I Go to Another World",
      "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
      "How a Realist Hero Rebuilt the Kingdom",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "Wise Man's Grandchild",
      "Death March to the Parallel World Rhapsody",
      "The 8th Son: Are You Kidding Me?",
      "Arifureta: From Commonplace to World's Strongest",
      "Reincarnated as a Sword",
      "The Executioner and Her Way of Life",
      "The Eminence in Shadow",
      "My Isekai Life: I Gained a Second Character Class and Became Stronger Than Ever",
      "The Greatest Demon Lord Is Reborn as a Typical Nobody",
      "Isekai Cheat Magician",
      "Grim Reaper and Four Girlfriends",
      "The Saint's Magic Power is Omnipotent",
      "The Hero is Overpowered but Overly Cautious",
      "The Devil is a Part-Timer!",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Rising of the Shield Hero",
      "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
      "Re:Zero - Starting Life in Another World",
      "Sword Art Online: Alicization",
      "In Another World with My Smartphone",
      "No Game No Life",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Ancient Magus' Bride",
      "The King's Avatar",
      "KonoSuba: Legend of Crimson",
      "The Faraway Paladin",
      "Ascendance of a Bookworm",
      "How a Realist Hero Rebuilt the Kingdom",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "Wise Man's Grandchild",
      "Death March to the Parallel World Rhapsody",
      "The 8th Son: Are You Kidding Me?",
      "Arifureta: From Commonplace to World's Strongest",
      "Reincarnated as a Sword",
      "The Executioner and Her Way of Life",
      "The Eminence in Shadow",
      "My Isekai Life: I Gained a Second Character Class and Became Stronger Than Ever",
      "The Greatest Demon Lord Is Reborn as a Typical Nobody",
      "Isekai Cheat Magician",
      "Grim Reaper and Four Girlfriends",
      "The Saint's Magic Power is Omnipotent",
      "The Hero is Overpowered but Overly Cautious",
      "The Devil is a Part-Timer!",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Rising of the Shield Hero",
      "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
      "Re:Zero - Starting Life in Another World",
      "Sword Art Online: Alicization",
      "In Another World with My Smartphone",
      "No Game No Life",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Ancient Magus' Bride",
      "The King's Avatar",
      "KonoSuba: Legend of Crimson",
      "The Faraway Paladin",
      "Ascendance of a Bookworm",
      "How a Realist Hero Rebuilt the Kingdom",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "Wise Man's Grandchild",
      "Death March to the Parallel World Rhapsody",
      "The 8th Son: Are You Kidding Me?",
      "Arifureta: From Commonplace to World's Strongest",
      "Reincarnated as a Sword",
      "The Executioner and Her Way of Life",
      "The Eminence in Shadow",
      "My Isekai Life: I Gained a Second Character Class and Became Stronger Than Ever",
      "The Greatest Demon Lord Is Reborn as a Typical Nobody",
      "Isekai Cheat Magician",
      "Grim Reaper and Four Girlfriends",
      "The Saint's Magic Power is Omnipotent",
      "The Hero is Overpowered but Overly Cautious",
      "The Devil is a Part-Timer!",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Rising of the Shield Hero",
      "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
      "Re:Zero - Starting Life in Another World",
      "Sword Art Online: Alicization",
      "In Another World with My Smartphone",
      "No Game No Life",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Ancient Magus' Bride",
      "The King's Avatar",
      "KonoSuba: Legend of Crimson",
      "The Faraway Paladin",
      "Ascendance of a Bookworm",
      "How a Realist Hero Rebuilt the Kingdom",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "Wise Man's Grandchild",
      "Death March to the Parallel World Rhapsody",
      "The 8th Son: Are You Kidding Me?",
      "Arifureta: From Commonplace to World's Strongest",
      "Reincarnated as a Sword",
      "The Executioner and Her Way of Life",
      "The Eminence in Shadow",
      "My Isekai Life: I Gained a Second Character Class and Became Stronger Than Ever",
      "The Greatest Demon Lord Is Reborn as a Typical Nobody",
      "Isekai Cheat Magician",
      "Grim Reaper and Four Girlfriends",
      "The Saint's Magic Power is Omnipotent",
      "The Hero is Overpowered but Overly Cautious",
      "The Devil is a Part-Timer!",
      "KonoSuba: God's Blessing on This Wonderful World!",
      "The Rising of the Shield Hero",
      "Cautious Hero: The Hero Is Overpowered but Overly Cautious",
      "Re:Zero - Starting Life in Another World",
      "Sword Art Online: Alicization",
      "In Another World with My Smartphone",
      "No Game No Life",
      "Mushoku Tensei: Jobless Reincarnation",
      "The Ancient Magus' Bride",
      "The King's Avatar",
      "KonoSuba: Legend of Crimson",
      "The Faraway Paladin",
      "Ascendance of a Bookworm",
      "How a Realist Hero Rebuilt the Kingdom",
      "The World's Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
      "Wise Man's Grandchild",
      "Death March to the Parallel World Rhapsody",
      "The 8th Son: Are You Kidding Me?",
      "Arifureta: From Commonplace to World's Strongest",
      "Reincarnated as a Sword",
      "The Executioner and Her Way of Life",
      "The Eminence in Shadow",
      "My Isekai Life: I Gained a Second Character Class and Became Stronger Than Ever",
      "The Greatest Demon Lord Is Reborn as a Typical Nobody",
    ],
  };

  const genreIcons = {
    action: "🔥",
    romance: "❤️",
    fantasy: "✨",
    comedy: "😂",
    sport: "🏅",
    isekai: "🌍",
  };

  const genre = query.toLowerCase();

  // Vérifier si le genre existe dans les recommandations
  if (!recommendations[genre]) {
    return "Désolé, je n'ai pas de recommandation pour ce genre.";
  }

  // Sélectionner 3 éléments aléatoires
  const selected = recommendations[genre]
    .sort(() => Math.random() - 0.5) // Mélange la liste
    .slice(0, 3); // Prend les 3 premiers

  const icon = genreIcons[genre] || "🎬";

  return `${icon} Voici 3 animes ${genre} que je recommande : ${selected.join(
    ", "
  )}.`;
}

// Exemple d'utilisation
console.log(getAnimeRecommendation("action"));
console.log(getAnimeRecommendation("romance"));
console.log(getAnimeRecommendation("fantasy"));
console.log(getAnimeRecommendation("comedy"));
console.log(getAnimeRecommendation("sport"));
console.log(getAnimeRecommendation("isekai"));
// Liste des groupes surveillés

const groupesSurveillés = {
  "120363359615350827@g.us": {
    name: "Le cerveau SOOU",
  },
  "120363347676002416@g.us": {
    name: "SPORT NEWS⚽🏀🏈🥋🥊🥅",
  },
  "120363351624285854@g.us": {
    name: "// SAIKÒ NO OTAKU",
  },
  "120363367342294030@g.us": {
    name: "AKATSUKI - NEWS 🇰🇷🇯🇵🇨🇳",
  },
  "120363366281637932@g.us": {
    name: "SENDEN PUB 🎙️📻",
  },
  "120363368780291860@g.us": {
    name: "Groupe test",
  },
  "120363349353432469@g.us": {
    name: "HENTAI HÀREMU 🇰🇷🇯🇵🇨🇳🇭🇹",
    welcomeImage: path.join(__dirname, "whatsapp-bot/assets/hentai.jpg"),
    welcomeMessage: `
🌟 *Bienvenue sur notre groupe Hentai Hàremu* 🌟
Voici notre Modèle de Présentation :

◇ Nom et Prénom  
◇ Date de Naissance  
◇ Âge  
◇ Hentai/Manhwa Préféré  
◇ Études  
◇ Loisirs  
◇ Une photo de vous  

🔥 *Programme de la semaine - Hentai Hàremu* 🔥
- 🍑 *Lundi* : Histoire & Manhwa Hentai Comics  
- 💋 *Mardi* : Débat sur les Sujets Tabous  
- 🧠 *Mercredi* : Quizz Coquin  
- 🔥 *Jeudi* : Séance Vidéo Hentai  
- 🎓 *Vendredi* : Quizz Torride  
`,
  },
  "120363185782927568@g.us": {
    name: "FUJOSHI'S HOUSE 🫶🔥🇰🇷🇯🇵🇨🇳",
    welcomeImage: path.join(__dirname, "whatsapp-bot/assets/fujoshi.jpg"),
    welcomeMessage: `
🌟 *Bienvenue sur notre groupe Fujoshi\'s House 🔥* 🌟
    Içi nous partageons des Contenus à caractère Homosexuels 👨‍❤️‍💋‍👨👩‍❤️‍💋‍👩 à savoir Photos, Vidéos,livres ect...
    Si tel est vos Souhaits pour être parmi nous Nous vous Souhaitons la plus cordiales des Bienvenue.
    Sinon vous pouvez Rebrousser votre chemin.
   
   Merci de votre compréhension !!!

Voici notre Modèle de Présentation :

◇ Nom et Prénom  
◇ Date de Naissance  
◇ Âge  
◇ Yaois/BL Préféré  
◇ Études  
◇ Loisirs  
◇ Une photo de vous  

🔥 *Programme de la semaine Fujoshi's House* 🔥
- 🎥 *Lundi* : Homo Romance  
- 🌈 *Mardi* : Yaoi Delight + Quiz  
- 🗣️ *Mercredi* : Débat Wednesdays  
- 🔥 *Jeudi* : Orgies Bi Express  
- 🌸 *Vendredi* : Yuri Ecstasy  
- 💬 *Samedi* : Quiz et vidéos  
`,
  },
  "120363365893803681@g.us": {
    name: "SAIKÒ NO OTAKU 🇭🇹🇰🇷🇯🇵🇨🇳",
    welcomeImage: path.join(__dirname, "whatsapp-bot/assets/saiko.jpg"),
    welcomeMessage: `
🌟 *Bienvenue sur notre groupe Saikò No Otaku 🔥* 🌟
Voici notre Modèle de Présentation :

◇ Nom et Prénom  
◇ Date de Naissance  
◇ Âge  
◇ Anime/Manga Préféré  
◇ Études  
◇ Loisirs  

🔥 *Programme de la semaine - Saikò No Otaku* 🔥
- 🧠 *Lundi* : Quizz  
- 📚 *Mardi* : Thèmes & Personnages  
- 🎮 *Mercredi* : Gaming Night  
- ✨ *Jeudi* : Nouveaux Animés  
- ⚔️ *Vendredi* : Débat + Quizz  
- 🍿 *Samedi* : Projection Animé  
- 🔮 *Dimanche* : Rétrospective  
`,
  },
};

const groupes = {
  "120363349353432469@g.us": {
    // HENTAI HÀREMU 🇰🇷🇯🇵🇨🇳🇭🇹
    participants: [
      "50937033502@c.us",
      "50931187734@c.us",
      "50936104806@c.us",
      "50940370516@c.us",
      "50941480863@c.us",
      "50942811475@c.us",
      "50934501418@c.us",
      "50944901079@c.us",
      "50944048266@c.us",
      "50936975946@c.us",
      "50941580292@c.us",
      "50931542309@c.us",
      "22395147826@c.us",
    ],
    admins: [
      "50941480863@c.us",
      "50936104806@c.us",
      "50942811475@c.us",
      "50932479710@c.us",
      "50940370516@c.us",
      "50931192830@c.us",
      "50936048429@c.us",
      "50931187734@c.us",
      "50937033502@c.us",
    ],
  },
  "120363185782927568@g.us": {
    // FUJOSHI'S HOUSE 🫶🔥🇰🇷🇯🇵🇨🇳
    participants: [
      "50941217121@c.us",
      "50931704893@c.us",
      "50947761013@c.us",
      "50938362694@c.us",
      "50948443695@c.us",
      "50936048429@c.us",
      "50955425666@c.us",
      "50941480863@c.us",
      "50947272838@c.us",
      "50931192830@c.us",
      "50931706251@c.us",
      "18092717016@c.us",
      "50941078352@c.us",
      "18133995622@c.us",
      "50932676425@c.us",
      "50955315397@c.us",
      "50936116613@c.us",
      "50940370516@c.us",
      "50947032424@c.us",
      "50934047754@c.us",
      "50949167515@c.us",
      "50955422419@c.us",
      "50947418022@c.us",
      "50936486896@c.us",
      "50947156347@c.us",
      "50941777068@c.us",
      "50934501418@c.us",
      "22395147826@c.us",
      "50931805025@c.us",
      "50932911094@c.us",
      "50935928679@c.us",
      "50941722971@c.us",
      "50942661248@c.us",
      "50948621944@c.us",
      "50955340809@c.us",
      "50944048266@c.us",
      "50946847378@c.us",
      "50932000591@c.us",
      "50939401994@c.us",
      "16094312609@c.us",
      "15617188857@c.us",
      "50944802843@c.us",
      "50942889352@c.us",
      "50931542309@c.us",
      "50936539945@c.us",
      "18293888320@c.us",
      "50940985266@c.us",
      "17868613618@c.us",
      "50934066256@c.us",
      "50941582778@c.us",
      "50943804664@c.us",
      "50948183688@c.us",
      "50934239265@c.us",
      "50941099462@c.us",
      "50948474084@c.us",
      "50941095582@c.us",
      "50942586307@c.us",
      "19548727038@c.us",
      "50932792680@c.us",
      "50938956353@c.us",
      "50936330583@c.us",
      "50933863931@c.us",
      "50932118234@c.us",
      "12564706675@c.us",
      "50937645987@c.us",
      "50939079512@c.us",
      "50931631995@c.us",
      "50938452021@c.us",
    ],
    admins: [
      "50941480863@c.us",
      "50936104806@c.us",
      "50942811475@c.us",
      "50932479710@c.us",
      "50940370516@c.us",
      "50931192830@c.us",
      "50936048429@c.us",
      "50931187734@c.us",
      "50937033502@c.us",
    ],
  },
  "120363359615350827@g.us": {
    // Le cerveau SOOU
    participants: [
      "50941480863@c.us",
      "50936104806@c.us",
      "50942811475@c.us",
      "50937033502@c.us",
      "50932479710@c.us",
      "50940370516@c.us",
      "50931192830@c.us",
      "50936048429@c.us",
      "50931187734@c.us",
    ],
    admins: [
      "50941480863@c.us",
      "50936104806@c.us",
      "50942811475@c.us",
      "50932479710@c.us",
      "50940370516@c.us",
      "50931192830@c.us",
      "50936048429@c.us",
      "50931187734@c.us",
      "50937033502@c.us",
    ],
  },
  "120363365893803681@g.us": {
    // SAIKÒ NO OTAKU 🇭🇹🇰🇷🇯🇵🇨🇳
    participants: [
      "13055460076@c.us",
      "50931542309@c.us",
      "50955425666@c.us",
      "50938956353@c.us",
      "50940370516@c.us",
      "50941709101@c.us",
      "50947272838@c.us",
      "50940535318@c.us",
      "50939401994@c.us",
      "50938362694@c.us",
      "50935664595@c.us",
      "50936975946@c.us",
      "50936486896@c.us",
      "50932118234@c.us",
      "50948443695@c.us",
      "50932000591@c.us",
      "50940068644@c.us",
      "50932911094@c.us",
      "50940228478@c.us",
      "50942811475@c.us",
      "50947418022@c.us",
      "50946506591@c.us",
      "50931192830@c.us",
      "15617188857@c.us",
      "50937645987@c.us",
      "50934066256@c.us",
      "50941480863@c.us",
      "16094312609@c.us",
      "50943158632@c.us",
      "50934501418@c.us",
      "50936104806@c.us",
      "50955892539@c.us",
      "50947102917@c.us",
      "50949167515@c.us",
      "19548727038@c.us",
      "50931187734@c.us",
    ],
    admins: [
      "50941480863@c.us",
      "50936104806@c.us",
      "50942811475@c.us",
      "50932479710@c.us",
      "50940370516@c.us",
      "50931192830@c.us",
      "50936048429@c.us",
      "50931187734@c.us",
      "50937033502@c.us",
    ],
  },
};

// Initialisation du client WhatsApp
const bot = new Client({
  authStrategy: new LocalAuth(), // Sauvegarde les sessions pour éviter de scanner à chaque fois
});

// Événement : QR code
bot.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("Scannez ce QR code avec WhatsApp pour connecter le bot.");
});

// Événement : Authentification réussie
bot.on("ready", () => {
  console.log("Le bot est prêt !");
});

// Événement : Nouveau message
bot.on("group_join", async (notification) => {
  console.log("Nouvel événement de groupe détecté :", notification); // Log de l'événement brut

  const groupId = notification.id.remote; // ID du groupe
  const newParticipants = notification.recipientIds; // Liste des nouveaux participants
  console.log("Groupe ID :", groupId);
  console.log("Participants ajoutés :", newParticipants);

  if (groupesSurveillés[groupId]) {
    console.log("Groupe surveillé détecté :", groupId);

    const group = groupesSurveillés[groupId];
    console.log("Détails du groupe surveillé :", group);

    const chat = await bot.getChatById(groupId); // Récupérer le chat pour envoyer un message

    for (const participant of newParticipants) {
      const userName = participant.split("@")[0]; // Extraire le nom d'utilisateur sans domaine
      console.log(`Envoi d'un message d'accueil pour : ${participant}`);

      try {
        // Envoi de l'image d'accueil avec un message personnalisé
        await bot.sendMessage(groupId, {
          caption: `Bienvenue @${userName} !\n\n${group.welcomeMessage}`,
          media: {
            type: "image",
            path: group.welcomeImage,
          },
          mentions: [participant], // Mentionner l'utilisateur
        });
        console.log(`Message et image envoyés avec succès à : ${participant}`);
      } catch (error) {
        console.error(
          `Erreur lors de l'envoi de l'image et du message à ${participant}:`,
          error
        );
      }

      // Envoi d'un message textuel simple via le chat
      try {
        await chat.sendMessage(
          `Bienvenue @${userName} dans le groupe !\n\n${group.welcomeMessage}`,
          { mentions: [participant] }
        );
        console.log(`Message textuel de bienvenue envoyé à : ${participant}`);
      } catch (error) {
        console.error(
          `Erreur lors de l'envoi du message texte à ${participant}:`,
          error
        );
      }

      // Ajouter chaque participant à la liste des membres du groupe (facultatif)
      if (!group.participants) {
        group.participants = [];
        console.log(
          "Liste des participants initialisée pour le groupe :",
          groupId
        );
      }

      group.participants.push(participant);
      console.log("Participant ajouté à la liste :", participant);
    }
  } else {
    console.log("Groupe non surveillé :", groupId);
  }
});

// Événement : Un membre quitte le groupe
bot.on("group_leave", async (notification) => {
  const groupId = notification.id.remote;
  const participantId = notification.recipientIds[0]; // ID du membre qui quitte

  // Vérifier si le groupe est surveillé
  if (groupes[groupId]) {
    const group = groupes[groupId];
    const groupName = group.name || "le groupe";

    // Retirer le membre de la liste des participants
    const participantIndex = group.participants.indexOf(participantId);
    if (participantIndex !== -1) {
      group.participants.splice(participantIndex, 1);
      console.log(`Participant ${participantId} retiré du groupe ${groupName}`);
    } else {
      console.log(
        `Participant ${participantId} n'était pas dans la liste du groupe ${groupName}`
      );
    }

    // Message d'adieu humoristique
    const farewellMessage = `😢 Oh non, ${participantId} a décidé de nous quitter... Bon vent et à la prochaine ! 🌬️😂`;
    try {
      await bot.sendMessage(groupId, farewellMessage);
      console.log(`Message d'adieu envoyé pour ${participantId}`);
    } catch (error) {
      console.error(
        `Erreur lors de l'envoi du message d'adieu à ${participantId} :`,
        error
      );
    }
  } else {
    console.log(`Aucune action nécessaire pour ce groupe (${groupId}).`);
  }
});

// Commande pour fermer le groupe
bot.on("message", async (message) => {
  if (message.body === "!close") {
    const groupId = message.from;

    if (isAdmin(message.author, groupId)) {
      try {
        await bot.groupSettingUpdate(groupId, "announcement");
        await bot.sendMessage(
          groupId,
          "✅ *Le groupe a été fermé* : seuls les administrateurs peuvent maintenant envoyer des messages."
        );
        console.log(`Groupe ${groupId} fermé avec succès.`);
      } catch (error) {
        console.error(
          `Erreur lors de la fermeture du groupe ${groupId} :`,
          error
        );
        await bot.sendMessage(
          groupId,
          "❌ Une erreur est survenue lors de la fermeture du groupe."
        );
      }
    } else {
      await bot.sendMessage(
        groupId,
        "❌ Vous n'avez pas les permissions nécessaires pour fermer le groupe."
      );
      console.log(
        `Utilisateur non-admin (${message.author}) a tenté de fermer le groupe.`
      );
    }
  }
});

// Commande pour ouvrir le groupe
bot.on("message", async (message) => {
  if (message.body === "!open") {
    const groupId = message.from;

    if (isAdmin(message.author, groupId)) {
      try {
        await bot.groupSettingUpdate(groupId, "not_announcement");
        await bot.sendMessage(
          groupId,
          "✅ *Le groupe a été ouvert* : tous les participants peuvent maintenant envoyer des messages."
        );
        console.log(`Groupe ${groupId} ouvert avec succès.`);
      } catch (error) {
        console.error(
          `Erreur lors de l’ouverture du groupe ${groupId} :`,
          error
        );
        await bot.sendMessage(
          groupId,
          "❌ Une erreur est survenue lors de l’ouverture du groupe."
        );
      }
    } else {
      await bot.sendMessage(
        groupId,
        "❌ Vous n'avez pas les permissions nécessaires pour ouvrir le groupe."
      );
      console.log(
        `Utilisateur non-admin (${message.author}) a tenté d’ouvrir le groupe.`
      );
    }
  }
});

// Commande pour envoyer une annonce avec mention de tous les membres
bot.on("message", async (message) => {
  if (message.body.startsWith("!announce ")) {
    const groupId = message.from;

    if (isAdmin(message.author, groupId)) {
      const announcement = message.body.replace("!announce ", "").trim();
      if (announcement) {
        try {
          // Récupération des participants du groupe
          const group = groupes[groupId];
          const mentions = group.participants.map((participant) => participant);

          if (!group || !group.participants.length) {
            await bot.sendMessage(
              groupId,
              "❌ Impossible de récupérer les participants du groupe."
            );
            return;
          }

          // Envoi du message avec mentions
          await bot.sendMessage(
            groupId,
            `📢 *Annonce importante* :\n${announcement}\n\n@tout_le_monde`,
            {
              mentions,
            }
          );
          console.log(
            `Annonce envoyée avec mentions dans le groupe ${groupId}.`
          );
        } catch (error) {
          console.error(
            `Erreur lors de l’envoi de l’annonce dans ${groupId} :`,
            error
          );
          await bot.sendMessage(
            groupId,
            "❌ Une erreur est survenue lors de l'envoi de l'annonce."
          );
        }
      } else {
        await bot.sendMessage(
          groupId,
          "❌ Veuillez ajouter un message après la commande `!announce`."
        );
      }
    } else {
      await bot.sendMessage(
        groupId,
        "❌ Vous n'avez pas les permissions nécessaires pour envoyer une annonce."
      );
      console.log(
        `Utilisateur non-admin (${message.author}) a tenté d’envoyer une annonce.`
      );
    }
  }
});

bot.on("message", async (message) => {
  if (message.body.startsWith("!meeting ")) {
    const groupId = message.from;

    // Vérifier que le message est envoyé dans "Le cerveau SOOU"
    if (groupId !== "120363359615350827@g.us") {
      await bot.sendMessage(
        groupId,
        "❌ Cette commande ne peut être exécutée que dans le groupe *Le cerveau SOOU*."
      );
      console.log(
        `Commande refusée : tentative d'exécution dans un groupe non autorisé (${groupId}).`
      );
      return;
    }

    // Vérifier si l'utilisateur est admin
    if (isAdmin(message.author, groupId)) {
      const meetingTime = message.body.replace("!meeting ", "").trim();

      if (meetingTime) {
        const group = groupes[groupId]; // Récupérer les informations du groupe
        const mentions = group.participants.map((participant) => ({
          id: participant,
        }));

        try {
          // Envoyer l'annonce de la réunion avec les mentions
          await bot.sendMessage(
            groupId,
            `📅 *Réunion programmée* :\nHeure : ${meetingTime}\n\n@tous, veuillez confirmer votre présence.`,
            { mentions }
          );
          console.log(
            `Réunion programmée à ${meetingTime} pour le groupe ${groupId}.`
          );
        } catch (error) {
          console.error(
            `Erreur lors de la planification de la réunion pour ${groupId} :`,
            error
          );
        }
      } else {
        // L'utilisateur n'a pas spécifié l'heure
        await bot.sendMessage(
          groupId,
          "❌ Veuillez spécifier une heure après la commande `!meeting`."
        );
      }
    } else {
      // L'utilisateur n'est pas admin
      await bot.sendMessage(
        groupId,
        "❌ Vous n'avez pas les permissions nécessaires pour programmer une réunion."
      );
      console.log(
        `Utilisateur non-admin (${message.author}) a tenté de programmer une réunion.`
      );
    }
  }
});

bot.on("message", async (message) => {
  try {
    // Vérifier si le message commence par "!"
    if (message.body.startsWith("!")) {
      try {
        // Utiliser l'ID du message pour le supprimer
        await message.delete(message.id, true); // false = suppression pour tout le monde
        console.log(`Message supprimé : ${message.body}`);
      } catch (error) {
        console.error("Erreur lors de la suppression du message :", error);
      }

      const args = message.body.slice(1).trim().split(/ +/); // Supprime le "!" et divise les arguments
      const command = args.shift().toLowerCase(); // Première partie = commande

      console.log(`Commande reçue : ${command}, Arguments : ${args}`);

      switch (command) {
        case "help":
          await message.reply(
            "*Commandes disponibles :*\n" +
              "- `!help` : Affiche cette liste\n" +
              "- `!rules` : Règles du groupe\n" +
              "- `!events` : Programme des événements\n" +
              "- `!anime [genre/nom]` : Recommandation d'anime\n" +
              "- `!game` : Jouer à Feuille, Papier, Ciseaux\n" +
              "- `!close` : Ferme le groupe (admin seulement)\n" +
              "- `!open` : Ouvre le groupe (admin seulement)\n" +
              "- `!announce [message]` : Envoie une annonce avec mention des participants\n" +
              "- `!meeting [heure]` : Planifie une réunion (admin seulement)"
          );
          break;

        case "rules":
          await message.reply(
            "*Règles du groupe :*\n" +
              "1️⃣ Pas de spam\n" +
              "2️⃣ Respectez les autres membres\n" +
              "3️⃣ Publiez uniquement du contenu lié aux animes/mangas\n" +
              "4️⃣ Participez aux événements !"
          );
          break;

        case "events":
          await message.reply(
            "*Programme de la semaine - Saikò No Otaku :*\n" +
              "🌟 *Lundi* : Quizz\n" +
              "🌟 *Mardi* : Thèmes & Personnages\n" +
              "🌟 *Mercredi* : Gaming Night\n" +
              "🌟 *Jeudi* : Nouveaux Animés\n" +
              "🌟 *Vendredi* : Débat + Quizz\n" +
              "🌟 *Samedi* : Projection Animé\n" +
              "🌟 *Dimanche* : Rétrospective"
          );
          break;

        case "anime":
          if (args.length === 0) {
            await message.reply(
              "Veuillez fournir un genre ou un nom d'anime. Exemple : `!anime action`"
            );
          } else {
            const query = args.join(" ");
            const recommendation = getAnimeRecommendation(query); // Fonction à implémenter
            await message.reply(recommendation);
          }
          break;

        case "game":
          const gameResult = playRockPaperScissors(args); // Fonction de mini-jeu à implémenter
          await message.reply(gameResult);
          break;

        case "close":
          const groupIdClose = message.from;
          if (isAdmin(message.author, groupIdClose)) {
            try {
              await bot.groupSettingUpdate(groupIdClose, "announcement");
              await bot.sendMessage(
                groupIdClose,
                "✅ *Le groupe a été fermé* : seuls les administrateurs peuvent maintenant envoyer des messages."
              );
              console.log(`Groupe ${groupIdClose} fermé avec succès.`);
            } catch (error) {
              console.error(
                `Erreur lors de la fermeture du groupe ${groupIdClose} :`,
                error
              );
              await bot.sendMessage(
                groupIdClose,
                "❌ Une erreur est survenue lors de la fermeture du groupe."
              );
            }
          } else {
            await bot.sendMessage(
              groupIdClose,
              "❌ Vous n'avez pas les permissions nécessaires pour fermer le groupe."
            );
            console.log(
              `Utilisateur non-admin (${message.author}) a tenté de fermer le groupe.`
            );
          }
          break;

        case "open":
          const groupIdOpen = message.from;
          if (isAdmin(message.author, groupIdOpen)) {
            try {
              await bot.groupSettingUpdate(groupIdOpen, "not_announcement");
              await bot.sendMessage(
                groupIdOpen,
                "✅ *Le groupe a été ouvert* : tous les participants peuvent maintenant envoyer des messages."
              );
              console.log(`Groupe ${groupIdOpen} ouvert avec succès.`);
            } catch (error) {
              console.error(
                `Erreur lors de l’ouverture du groupe ${groupIdOpen} :`,
                error
              );
              await bot.sendMessage(
                groupIdOpen,
                "❌ Une erreur est survenue lors de l’ouverture du groupe."
              );
            }
          } else {
            await bot.sendMessage(
              groupIdOpen,
              "❌ Vous n'avez pas les permissions nécessaires pour ouvrir le groupe."
            );
            console.log(
              `Utilisateur non-admin (${message.author}) a tenté d’ouvrir le groupe.`
            );
          }
          break;

        case "announce":
          const groupIdAnnounce = message.from;
          console.log(`Groupe cible: ${groupIdAnnounce}`);

          // Vérifier si l'utilisateur est un admin
          if (isAdmin(message.author, groupIdAnnounce)) {
            console.log(
              `L'utilisateur ${message.author} est un admin du groupe ${groupIdAnnounce}`
            );

            const announcement = message.body.replace("!announce ", "").trim();
            if (announcement) {
              console.log(`Message d'annonce trouvé: "${announcement}"`);

              try {
                // Récupération des participants du groupe
                const group = groupes[groupIdAnnounce];
                if (!group || !group.participants.length) {
                  console.log(
                    `Aucun participant trouvé dans le groupe ${groupIdAnnounce}`
                  );
                  await bot.sendMessage(
                    groupIdAnnounce,
                    "❌ Impossible de récupérer les participants du groupe."
                  );
                  return;
                }

                // Logger tous les participants à mentionner
                console.log(
                  `Participants à mentionner (${group.participants.length} au total) :`
                );
                group.participants.forEach((p) => console.log(` - ${p}`));

                // Préparer les mentions avec les noms d'affichage
                const mentions = [];
                const mentionText = [];
                for (const participant of group.participants) {
                  const displayName = await getDisplayName(
                    participant,
                    groupIdAnnounce,
                    bot
                  ); // Appel avec le bot
                  if (displayName) {
                    mentions.push({
                      id: participant,
                      displayName: `@${displayName}`,
                    });
                    mentionText.push(`@${displayName}`);
                  } else {
                    console.log(
                      `Nom d'affichage non trouvé pour ${participant}`
                    );
                    mentionText.push(`@${participant.split("@")[0]}`); // Fallback
                  }
                }

                // Vérifier s'il y a des mentions
                if (!mentions.length) {
                  console.log("Aucune mention n'a pu être générée.");
                  await bot.sendMessage(
                    groupIdAnnounce,
                    `📢 *Annonce importante* :\n${announcement}\n⚠️ Aucune mention n'a été ajoutée.`
                  );
                  return;
                }

                // Préparer le texte final avec les mentions
                const messageToSend = {
                  text: `📢 *Annonce importante* 📢 :\n${announcement}\n${mentions
                    .map((mention) => mention.displayName)
                    .join(" ")}`, // Ajouter les noms formatés dans le texte
                  mentions: mentions.map((mention) => ({ id: mention.id })), // Associer les mentions par ID
                };

                console.log(`Message à envoyer :`);
                console.log(`Texte de l'annonce : ${messageToSend.text}`);
                console.log(`Mentions : ${mentionText.join(", ")}`);

                // Envoi du message avec mentions
                await bot.sendMessage(groupIdAnnounce, messageToSend);

                console.log(
                  `Annonce envoyée dans le groupe ${groupIdAnnounce} avec ${mentions.length} mentions.`
                );
              } catch (error) {
                console.error(
                  `Erreur lors de l’envoi de l’annonce dans ${groupIdAnnounce}:`,
                  error
                );
                await bot.sendMessage(
                  groupIdAnnounce,
                  "❌ Une erreur est survenue lors de l'envoi de l'annonce."
                );
              }
            } else {
              console.log("Aucun message d'annonce trouvé après !announce");
              await bot.sendMessage(
                groupIdAnnounce,
                "❌ Veuillez ajouter un message après la commande `!announce`."
              );
            }
          } else {
            console.log(
              `Utilisateur non-admin (${message.author}) a tenté d’envoyer une annonce dans le groupe ${groupIdAnnounce}.`
            );
            await bot.sendMessage(
              groupIdAnnounce,
              "❌ Vous n'avez pas les permissions nécessaires pour envoyer une annonce."
            );
          }
          break;

        case "meeting":
          const groupIdMeeting = message.from;

          // Vérifier que le message est envoyé dans le groupe autorisé
          if (groupIdMeeting !== "120363359615350827@g.us") {
            await bot.sendMessage(
              groupIdMeeting,
              "❌ Cette commande ne peut être exécutée que dans le groupe *Le cerveau SOOU*."
            );
            console.log(
              `Commande refusée : tentative d'exécution dans un groupe non autorisé (${groupIdMeeting}).`
            );
            return;
          }

          // Vérifier si l'utilisateur est admin
          if (isAdmin(message.author, groupIdMeeting)) {
            const meetingTime = message.body.replace("!meeting ", "").trim();

            if (meetingTime) {
              try {
                // Récupération des informations du groupe
                const group = groupes[groupIdMeeting];
                if (!group || !group.participants.length) {
                  console.log(
                    `Aucun participant trouvé dans le groupe ${groupIdMeeting}`
                  );
                  await bot.sendMessage(
                    groupIdMeeting,
                    "❌ Impossible de récupérer les participants du groupe."
                  );
                  return;
                }

                console.log(
                  `Participants détectés (${group.participants.length} au total) :`
                );
                group.participants.forEach((p) => console.log(` - ${p}`));

                // Préparer les mentions pour les participants
                const mentions = [];
                for (const participant of group.participants) {
                  const displayName = await getDisplayName(
                    participant,
                    groupIdMeeting,
                    bot
                  ); // Appel avec le bot
                  mentions.push({
                    id: participant,
                    displayName: `@${displayName || participant.split("@")[0]}`,
                  });
                }

                // Construire le message à envoyer dans le groupe
                const messageToSend = {
                  text: `📅 *Réunion programmée* :\nHeure : ${meetingTime}\n\n${mentions
                    .map((mention) => mention.displayName)
                    .join(" ")}, veuillez confirmer votre présence.`,
                  mentions: mentions.map((mention) => ({ id: mention.id })),
                };

                // Envoi du message dans le groupe
                await bot.sendMessage(groupIdMeeting, messageToSend);

                console.log(
                  `Réunion programmée à ${meetingTime} dans le groupe ${groupIdMeeting}.`
                );

                // Envoi de messages privés aux participants
                for (const participant of group.participants) {
                  try {
                    await bot.sendMessage(
                      participant,
                      `📅 *Réunion programmée dans le groupe* *Le cerveau SOOU* :\nHeure : ${meetingTime}\n\nMerci de confirmer votre présence dans le groupe.`
                    );
                    console.log(
                      `Message privé envoyé à ${participant} concernant la réunion.`
                    );
                  } catch (error) {
                    console.error(
                      `Erreur lors de l'envoi d'un message privé à ${participant} :`,
                      error
                    );
                  }
                }
              } catch (error) {
                console.error(
                  `Erreur lors de la planification de la réunion pour ${groupIdMeeting} :`,
                  error
                );
                await bot.sendMessage(
                  groupIdMeeting,
                  "❌ Une erreur est survenue lors de la planification de la réunion."
                );
              }
            } else {
              // L'utilisateur n'a pas spécifié l'heure
              await bot.sendMessage(
                groupIdMeeting,
                "❌ Veuillez spécifier une heure après la commande `!meeting`."
              );
            }
          } else {
            // L'utilisateur n'est pas admin
            await bot.sendMessage(
              groupIdMeeting,
              "❌ Vous n'avez pas les permissions nécessaires pour programmer une réunion."
            );
            console.log(
              `Utilisateur non-admin (${message.author}) a tenté de programmer une réunion.`
            );
          }
          break;

        default:
          await message.reply(
            "Commande inconnue. Tapez `!help` pour la liste des commandes."
          );
          break;
      }
    }
  } catch (error) {
    console.error("Erreur lors du traitement du message :", error);
  }
});

bot.on("ready", async () => {
  console.log("Client prêt !");

  // Récupérer toutes les conversations
  const chats = await bot.getChats();
  console.log(`Nombre total de conversations : ${chats.length}`);

  // Lister les noms et IDs de toutes les conversations
  chats.forEach((chat, index) => {
    console.log(
      `[${index + 1}] Nom : ${chat.name || "Conversation individuelle"}`
    );
    console.log(`   ID : ${chat.id._serialized}`);
    console.log(`   Est un groupe : ${chat.isGroup}`);
  });

  console.log("Liste des conversations affichée avec succès !");
});

// Lancement du bot
bot.initialize();
