// Archived from original site - January 2026
// Work experience and projects preserved here, not displayed on site

export type CareerItem = {
  company: string;
  title: string;
  product: string;
  date: string;
  description: string;
};

export const careerItems: CareerItem[] = [
  {
    company: "Vercel",
    date: "January 2025 - Now",
    product: "",
    description: "",
    title: "Software Engineer",
  },
  {
    company: "Dosu",
    date: "August 2024 - December 2024",
    product: "",
    description: "",
    title: "Product Engineer",
  },
  {
    company: "Microsoft",
    date: "August 2023 - August 2024",
    product: "Teams",
    description: "",
    title: "Software Engineer",
  },
  {
    company: "Microsoft",
    date: "May 2022 - August 2022",
    product: "Teams",
    description: "",
    title: "Software Engineer Intern",
  },
  {
    company: "Raven Software",
    date: "May 2021 - August 2021",
    product: "Warzone",
    description: "",
    title: "Gameplay Programmer Intern",
  },
  {
    company: "Epic Games",
    date: "May 2020 - August 2020",
    product: "Fortnite",
    description: "",
    title: "Gameplay Programmer Optimization Intern",
  },
];

export type ProjectItem = {
  name: string;
  description: string;
  date: string;
  url: string;
};

export const projectItems: ProjectItem[] = [
  {
    name: "Answer Overflow",
    description:
      "Open source webpages for Discord forum channels. Bootstrapped to 350k MAU, built with Next.js, TypeScript, and Turborepo, tRPC, and Convex.",
    url: "https://www.answeroverflow.com",
    date: "January 2022 - Present",
  },
  {
    name: "Typelytics",
    description:
      "Typescript library for analytics querying & rendering of PostHog data",
    url: "https://typelytics.rhyssul.com",
    date: "January 2024 - Present",
  },
];

export type PastProject = {
  name: string;
  description: string;
  date: string;
  teamSize: string;
  duration: string;
  videoid: string;
};

export const pastProjects: PastProject[] = [
  {
    name: "Shelf Life",
    description:
      "iOS / Android app built with React Native to digitize a pantry. Used Python, Flask, and SQL for the backend. App tracks nutritional information, expiration dates, budget, and suggests recipes",
    teamSize: "4",
    duration: "2 months",
    videoid: "kMtXJYT95oc",
    date: "February - April 2021",
  },
  {
    name: "Into the Depths",
    description:
      "Singleplayer VR game where you pilot a submarine and fight a flying water dragon. Submarine had missiles and sonar for detecting floating mines.",
    date: "December 2020",
    duration: "7 days",
    teamSize: "5",
    videoid: "UQY_y9FIhzM",
  },
  {
    name: "Ground Control",
    date: "December 2019",
    description: `2 player game made for the theme "Down To Earth". One player is in a Spaceship trying to return to earth and survive reentry as their ship falls apart. The other player is in ground control telling the player in the Spaceship where their issues are and how to fix them.`,
    duration: "7 days",
    teamSize: "5",
    videoid: "lJHS-Mf3bMo",
  },
  {
    name: "Busy Bee Movers",
    date: "ArtCenter GameJam 2021",
    description:
      "2 Player LAN / Online Co-Op game. Both players control one character, if they move together they go full speed, if one person is only moving they go half speed, and if they do opposite inputs they don't move at all.",
    duration: "48 hours",
    teamSize: "4",
    videoid: "du1VECmZ8L8",
  },
  {
    name: "VR Kart Racer",
    date: "January - June 2019",
    description:
      "Virtual Reality Kart Racer that I made to learn VR, C++, and Networking",
    duration: "6 months",
    teamSize: "1",
    videoid: "LZSft4THWVQ",
  },
  {
    name: "VR Spin Bike Project",
    date: "April 2020",
    description:
      "VR project running on the Oculus Quest that converts spin bike pedaling into in-game input. You race 60 other bikes in a lap around an island.",
    duration: "2 weeks",
    teamSize: "1",
    videoid: "E6VWXjUquZo",
  },
];
