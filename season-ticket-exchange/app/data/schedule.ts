export interface GAME {
  game: number;
  opponent: string;
  date: string;
  time: string;
  gameType: GAME_TYPE;
}

export enum GAME_TYPE {
  PRE_SEASON = "Preseason",
  REGULAR_SEASON = "Regular Season",
  PLAYOFFS_ROUND1 = "Playoffs First Round",
  PLAYOFFS_ROUND2 = "Playoffs Second Round",
  PLAYOFFS_ROUND3 = "Playoffs Third Round (Conference Finals)",
  PLAYOFFS_ROUND4 = "Playoffs Fourth Round (Stanley Cup Finals)",
}
// NOTE: Just setting the home games
export const schedule: Array<GAME> = [
  // September
  {
    game: 1,
    opponent: "New York Islanders",
    date: "09/26/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.PRE_SEASON,
  },
  {
    game: 2,
    opponent: "New Jersey Devils",
    date: "09/28/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.PRE_SEASON,
  },
  // October
  {
    game: 3,
    opponent: "Boston Bruins",
    date: "10/05/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.PRE_SEASON,
  },

  {
    game: 4,
    opponent: "Arizona Coyotes",
    date: "10/16/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 5,
    opponent: "Nashville Predators",
    date: "10/19/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  // November
  {
    game: 6,
    opponent: "Carolina Hurricanes",
    date: "11/02/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 7,
    opponent: "Detroit Red Wings",
    date: "11/07/2023",
    time: "7:30 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 8,
    opponent: "Minnesota Wild",
    date: "11/09/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 9,
    opponent: "Columbus Blue Jackets",
    date: "11/12/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 10,
    opponent: "Boston Bruins",
    date: "11/25/2023",
    time: "1:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 11,
    opponent: "Buffalo Sabres",
    date: "11/27/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 12,
    opponent: "Detroit Red Wings",
    date: "11/29/2023",
    time: "7:30 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  // December
  {
    game: 13,
    opponent: "San Jose Sharks",
    date: "12/03/2023",
    time: "6:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 14,
    opponent: "Los Angeles Kings",
    date: "12/10/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 15,
    opponent: "Toronto Maple Leafs",
    date: "12/12/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 16,
    opponent: "Anaheim Ducks",
    date: "12/15/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 17,
    opponent: "Edmonton Oilers",
    date: "12/22/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 18,
    opponent: "Buffalo Sabres",
    date: "12/23/2023",
    time: "7:30 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 19,
    opponent: "Washington Capitals",
    date: "12/27/2023",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },

  // January
  {
    game: 20,
    opponent: "Carolina Hurricanes",
    date: "01/02/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 21,
    opponent: "Chicago Blackhawks",
    date: "01/04/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 22,
    opponent: "Vancouver Canucks",
    date: "01/08/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 23,
    opponent: "Washington Capitals",
    date: "01/14/2024",
    time: "1:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 24,
    opponent: "Seattle Kraken",
    date: "01/16/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 25,
    opponent: "Las Vegas Golden Knights",
    date: "01/26/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },

  // February
  {
    game: 26,
    opponent: "Colorado Avalanche",
    date: "02/05/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 27,
    opponent: "Tampa Bay Lightning",
    date: "02/07/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 28,
    opponent: "Calgary Flames",
    date: "02/12/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 29,
    opponent: "Montreal Canadiens",
    date: "02/15/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 30,
    opponent: "Dallas Stars",
    date: "02/20/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 31,
    opponent: "Columbus Blue Jackets",
    date: "02/28/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  // March
  {
    game: 32,
    opponent: "Florida Panthers",
    date: "03/04/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 33,
    opponent: "St. Louis Blues",
    date: "03/09/2024",
    time: "7:30 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 34,
    opponent: "New Jersey Devils",
    date: "03/11/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 35,
    opponent: "New York Islanders",
    date: "03/17/2024",
    time: "1:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 36,
    opponent: "Winnepeg Jets",
    date: "03/19/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 37,
    opponent: "Florida Panthers",
    date: "03/23/2024",
    time: "8:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 38,
    opponent: "Philadelphia",
    date: "03/26/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  // April
  {
    game: 39,
    opponent: "Pittsburgh Penguins",
    date: "04/01/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 40,
    opponent: "New Jersey Devils",
    date: "04/03/2024",
    time: "7:30 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 41,
    opponent: "Montreal Canadiens",
    date: "04/07/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 42,
    opponent: "Philadelphia Flyers",
    date: "04/11/2024",
    time: "7:00 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 43,
    opponent: "New York Islanders",
    date: "04/13/2024",
    time: "12:30 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
  {
    game: 44,
    opponent: "Ottawa Senators",
    date: "04/15/2024",
    time: "7:30 PM ET",
    gameType: GAME_TYPE.REGULAR_SEASON,
  },
];

export const gameInfo = (gameId: string) => {
  return schedule.filter((game: GAME) => game.game === parseInt(gameId))[0];
};

export const getRemainingSchedule = () => {
  const todaysDate = new Date();
  const remainingGames = schedule.filter(
    (game: GAME) => new Date(game.date) >= todaysDate
  );
  return remainingGames;
};
