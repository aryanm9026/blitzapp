

// --- Helper for creating placeholder dates ---
const dateMap = {
    1: 'Fri, 10 Oct',
    2: 'Sat, 11 Oct',
    3: 'Sun, 12 Oct',
    '1 & 2': 'Fri & Sat, 10-11 Oct',
    '2 & 3': 'Sat & Sun, 11-12 Oct',
    '1-3': 'Fri - Sun, 10-12 Oct',
};

const createDate = (day) => {
    const dayString = String(day);
    return dateMap[dayString] || 'TBA';
};


// --- Categorized Event Data ---

const eventsFlagship = [
  {
    id: 'panache',
    title: 'PANACHE',
    date: createDate(1),
    location: 'OAT',
    image: 'https://placehold.co/400x500/8A2BE2/ffffff?text=PANACHE',
    description: 'PANACHE 2025 is a fashion show aimed at redefining style, expressiveness, charisma, and glamour.',
    organizer: 'Blitzschlag Team',
    prizes: 'Varies',
  },
  {
    id: 'tamasha',
    title: 'TAMASHA',
    date: createDate(2),
    location: 'SAC Lawn, MNIT Jaipur',
    image: 'https://placehold.co/400x500/8A2BE2/ffffff?text=TAMASHA',
    description: 'A celebration of the raw, unfiltered power of storytelling and social commentary through Nukkad Natak.',
    organizer: 'Blitzschlag Team',
    prizes: 'Varies',
  },
  {
    id: 'battleofbands',
    title: 'BATTLE OF BANDS',
    category: 'Flagship',
    date: createDate(3),
    location: 'VLTC Back Parking, MNIT Jaipur',
    image: 'https://placehold.co/400x500/8A2BE2/ffffff?text=BATTLE+OF+BANDS',
    description: 'Watch local bands compete for the coveted title of "Best Band on Campus".',
    organizer: 'Blitzschlag Team',
    prizes: 'Varies',
  },
  {
    id: 'rambasamba',
    title: 'RAMBA SAMBA',
    date: createDate(3),
    location: 'OAT, MNIT Jaipur',
    image: 'https://placehold.co/400x500/8A2BE2/ffffff?text=RAMBA+SAMBA',
    description: 'A captivating journey through diverse dance styles, blending traditional and contemporary movements.',
    organizer: 'Blitzschlag Team',
    prizes: 'Varies',
  },
];

const eventsFun = [
  {
    id: 'meltdown',
    title: 'Meltdown Madness',
    date: createDate(1),
    location: 'SAC Lawn, Right Side from Back',
    image: 'https://placehold.co/400x500/FF6B6B/ffffff?text=Meltdown',
    description: 'Dodge, duck, and dive in this wipeout-style game with a rotating arm!',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'bodyZorbing',
    title: 'Body Zorbing',
    date: createDate(1),
    location: 'SAC Lawn (Left side)',
    image: 'https://placehold.co/400x500/FF6B6B/ffffff?text=Body+Zorbing',
    description: 'Run, bounce, and collide in inflatable bubble suits for a thrilling, fun experience.',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'arcade',
    title: 'Arcade Arena',
    date: createDate(1),
    location: 'SAC LAWN Entry from Back(left side)',
    image: 'https://placehold.co/400x500/FF6B6B/ffffff?text=Arcade+Arena',
    description: 'A blend of retro and modern games for an exhilarating experience.',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'clayPottery',
    title: 'Clay Pottery',
    date: createDate('2 & 3'),
    location: 'VLTC Back Parking',
    image: 'https://placehold.co/400x500/FF6B6B/ffffff?text=Clay+Pottery',
    description: 'Shape and mold clay into creative, decorative, or functional objects.',
    organizer: 'Blitzschlag Team',
    prizes: 'Take home your creation!',
  },
  {
    id: 'neonPainting',
    title: 'Neon Painting',
    date: createDate(1),
    location: 'OAT Entrance',
    image: 'https://placehold.co/400x500/FF6B6B/ffffff?text=Neon+Painting',
    description: 'Glow-in-the-dark face painting with UV-reactive paints for a vibrant look.',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'sillyVoices',
    title: 'Silly Voices',
    date: createDate(1),
    location: 'VLTC L004',
    image: 'https://placehold.co/400x500/FF6B6B/ffffff?text=Silly+Voices',
    description: 'Inhale helium for hilarious, high-pitched voices that spark laughter!',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
];

const eventsClub = [
  {
    id: 'gameoflife',
    title: 'Game of Life',
    date: createDate(2),
    location: 'Homi J Bhabha Hall',
    image: 'https://placehold.co/400x500/00CED1/ffffff?text=Game+of+Life',
    description: 'A classic fighting game with a twist of blindness!',
    organizer: 'ED CELL',
    prizes: 'Varies',
  },
  {
    id: 'iplauction',
    title: 'IPL AUCTION',
    date: createDate(1),
    location: 'VLTC L106,107,108',
    image: 'https://placehold.co/400x500/00CED1/ffffff?text=IPL+AUCTION',
    description: 'Witness the high-stakes drama of the IPL Auction and build your own Dream team!',
    organizer: 'ED CELL',
    prizes: 'Varies',
  },
  {
    id: 'moments',
    title: 'Moments',
    date: createDate(1),
    location: 'SAC',
    image: 'https://placehold.co/400x500/00CED1/ffffff?text=Moments',
    description: 'Photography Exhibition on various genres of Photography.',
    organizer: 'Photography Club',
    prizes: 'Varies',
  },
   // Add all other club events here...
  {
    id: 'fashioninsta',
    title: 'Fashion Insta Couture',
    date: createDate(3),
    location: 'CV RAMAN HALL',
    image: 'https://placehold.co/400x500/00CED1/ffffff?text=Fashion+Insta',
    description: 'Design and present an exclusive, one-of-a-kind piece that highlights your unique vision of high fashion.',
    organizer: 'Creative Arts Club',
    prizes: 'Varies',
  },
  {
    id: 'udtateer',
    title: 'Udta Teer',
    date: createDate('1 & 2'),
    location: 'Outside CV RAMAN HALL',
    image: 'https://placehold.co/400x500/00CED1/ffffff?text=Udta+Teer',
    description: 'Test your aim and skill in this exciting archery challenge.',
    organizer: 'Mavericks Club',
    prizes: 'Varies',
  }
];

const eventsAttractions = [
  {
    id: 'boltiBand',
    title: 'Bolti Band',
    date: createDate(1),
    location: 'VLTC(L-106)',
    image: 'https://placehold.co/400x500/FFD700/ffffff?text=Bolti+Band',
    description: 'A lip-reading game testing teamwork, concentration, and creativity!',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'musicalTambola',
    title: 'Musical Tambola',
    date: createDate(1),
    location: 'VLTC L109',
    image: 'https://placehold.co/400x500/FFD700/ffffff?text=Musical+Tambola',
    description: 'A tambola game with music-based challenges!',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'blindMaze',
    title: 'Blind Maze',
    date: createDate(1),
    location: 'SAC Lawn (Near Gym)',
    image: 'https://placehold.co/400x500/FFD700/ffffff?text=Blind+Maze',
    description: 'A teamwork challenge where one navigates a maze blindfolded while guided verbally!',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'treasureHunt',
    title: 'Treasure Hunt',
    date: createDate(1),
    location: 'MNIT Campus',
    image: 'https://placehold.co/400x500/FFD700/ffffff?text=Treasure+Hunt',
    description: 'Solve clues and locate hidden treasures across the campus!',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
  {
    id: 'minuteToWinIt',
    title: 'Minute-to-Win-It',
    date: createDate(1),
    location: 'VLTC RAMANUJAN HALL',
    image: 'https://placehold.co/400x500/FFD700/ffffff?text=Minute-to-Win-It',
    description: 'Quick, fun challenges to be completed in under a minute!',
    organizer: 'Blitzschlag Team',
    prizes: 'On-the-spot goodies',
  },
];


export { eventsFlagship, eventsFun, eventsClub, eventsAttractions };