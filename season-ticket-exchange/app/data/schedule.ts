export interface GAME {
  opponent: string;
  date: Date;
  time: string;
}

// NOTE: Just setting the home games
export const schedule: Array<GAME> = [
  // October
  {
    opponent: "Arizona Coyotes",
    date: new Date("10/16/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Nashville Predators",
    date: new Date("10/19/2023"),
    time: "7:00 PM ET",
  },
  // November
  {
    opponent: "Carolina Hurricanes",
    date: new Date("11/02/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Detroit Red Wings",
    date: new Date("11/07/2023"),
    time: "7:30 PM ET",
  },
  {
    opponent: "Minnesota Wild",
    date: new Date("11/09/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Columbus Blue Jackets",
    date: new Date("11/12/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Boston Bruins",
    date: new Date("11/25/2023"),
    time: "1:00 PM ET",
  },
  {
    opponent: "Buffalo Sabres",
    date: new Date("11/27/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Detroit Red Wings",
    date: new Date("11/29/2023"),
    time: "7:30 PM ET",
  },
  // December
  {
    opponent: "San Jose Sharks",
    date: new Date("12/03/2023"),
    time: "6:00 PM ET",
  },
  {
    opponent: "Los Angeles Kings",
    date: new Date("12/10/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Toronto Maple Leafs",
    date: new Date("12/12/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Anaheim Ducks",
    date: new Date("12/15/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Edmonton Oilers",
    date: new Date("12/22/2023"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Buffalo Sabres",
    date: new Date("12/23/2023"),
    time: "7:30 PM ET",
  },
  {
    opponent: "Washington Capitals",
    date: new Date("12/27/2023"),
    time: "7:00 PM ET",
  },

  // January
  {
    opponent: "Carolina Hurricanes",
    date: new Date("01/02/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Chicago Blackhawks",
    date: new Date("01/04/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Vancouver Canucks",
    date: new Date("01/08/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Washington Capitals",
    date: new Date("01/14/2024"),
    time: "1:00 PM ET",
  },
  {
    opponent: "Seattle Kraken",
    date: new Date("01/16/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Las Vegas Golden Knights",
    date: new Date("01/26/2024"),
    time: "7:00 PM ET",
  },

  // February
  {
    opponent: "Colorado Avalanche",
    date: new Date("02/05/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Tampa Bay Lightning",
    date: new Date("02/07/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Calgary Flames",
    date: new Date("02/12/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Montreal Canadiens",
    date: new Date("02/15/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Dallas Stars",
    date: new Date("02/20/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Columbus Blue Jackets",
    date: new Date("02/28/2024"),
    time: "7:00 PM ET",
  },
  // March
  {
    opponent: "Florida Panthers",
    date: new Date("03/04/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "St. Louis Blues",
    date: new Date("03/09/2024"),
    time: "7:30 PM ET",
  },
  {
    opponent: "New Jersey Devils",
    date: new Date("03/11/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "New York Islanders",
    date: new Date("03/17/2024"),
    time: "1:00 PM ET",
  },
  {
    opponent: "Winnepeg Jets",
    date: new Date("03/19/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Florida Panthers",
    date: new Date("03/23/2024"),
    time: "8:00 PM ET",
  },
  {
    opponent: "Philadelphia",
    date: new Date("03/26/2024"),
    time: "7:00 PM ET",
  },
  // April
  {
    opponent: "Pittsburgh Penguins",
    date: new Date("04/01/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "New Jersey Devils",
    date: new Date("04/03/2024"),
    time: "7:30 PM ET",
  },
  {
    opponent: "Montreal Canadiens",
    date: new Date("04/07/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "Philadelphia Flyers",
    date: new Date("04/11/2024"),
    time: "7:00 PM ET",
  },
  {
    opponent: "New York Islanders",
    date: new Date("04/13/2024"),
    time: "12:30 PM ET",
  },
  {
    opponent: "Ottawa Senators",
    date: new Date("04/15/2024"),
    time: "7:30 PM ET",
  },
];
