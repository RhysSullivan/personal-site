import { YouTubeEmbed } from "@next/third-parties/google";
import { GitHub, Twitter } from "./icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rhys Sullivan",
  description: "Portfolio website for Rhys Sullivan, Product Engineer",
};

type CareerItem = {
  company: React.ReactNode;
  title: React.ReactNode;
  product: React.ReactNode;
  date: React.ReactNode;
  description: React.ReactNode;
};
const carerItems: CareerItem[] = [
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

type ProjectItem = {
  name: React.ReactNode;
  description: React.ReactNode;
  date: React.ReactNode;
  url: string;
};

const projectItems: ProjectItem[] = [
  {
    name: "Answer Overflow",
    description:
      "Open source webpages for Discord forum channels. Bootstrapped to 350k MAU, built with Next.js, TypeScript, and Turborepo, tRPC, and Drizzle.",
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

type Misc = {
  name: string;
  description: string;
  date: string;
  teamSize: string;
  duration: string;
  videoid: string;
};

const misc: Misc[] = [
  {
    name: "Shelf Life",
    description:
      " iOS / Android app built with React Native to digitize a pantry. Used Python, Flask, and SQL for the backend. App tracks nutritional information, expiration dates, budget, and suggests recipes",
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
    date: "January - June 2019",
    description:
      "Virtual Reality Kart Racer that I made to learn VR, C++, and Networking",
    duration: "6 months",
    name: "VR Kart Racer",
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

export default function Home() {
  return (
    <main className="flex text-white bg-zinc-950 min-h-screen flex-col items-center min-w-full p-4">
      <div className="max-w-3xl w-full ">
        <section className="py-4 sm:py-10 flex flex-row justify-between">
          <div>
            <h1 className="font-bold text-xl p-0 m-0 ">Rhys Sullivan</h1>
            <span className="text-neutral-200 p-0 m-0">Software Engineer</span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/rhyssullivan"
              target="_blank"
              className="fill-current hover:fill-neutral-300"
              aria-label="Twitter"
            >
              <GitHub />
            </a>
            <a
              href="https://twitter.com/rhyssullivan"
              target="_blank"
              className="fill-current hover:fill-neutral-300"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
          </div>
        </section>
        <section className="text-left w-full flex gap-4 flex-col">
          <h2 className="text-xl font-bold">Career</h2>
          {carerItems.map((item, index) => (
            <div key={index}>
              <div>
                <div className="min-w-full flex-row justify-between hidden sm:flex">
                  <div className="flex flew-row">
                    <h3 className="font-bold">{item.company}</h3>
                    <span className="mx-2 font-bold">-</span>
                    <span className="font-bold">{item.product}</span>
                    <i className="mx-2">{item.title}</i>
                  </div>
                  <div>
                    <span>{item.date}</span>
                  </div>
                </div>
                <span>{item.description}</span>
                <div className="flex flex-col sm:hidden justify-start">
                  <div className="flex flew-row justify-start">
                    <h3 className="font-bold">{item.company}</h3>
                    <span className="mx-2 font-bold">-</span>
                    <span className="font-bold">{item.product}</span>
                  </div>
                  <i>{item.title}</i>
                  <div>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <section className="text-left w-full flex gap-4 flex-col mt-4 py-4 border-t-2 border-zinc-800 rounded-e-md">
          <h2 className="text-xl font-bold">Active Projects</h2>
          {projectItems.map((item, index) => (
            <div key={index} className="py-4">
              <div className="min-w-full flex flex-row justify-between">
                <div className="flex flew-row">
                  <a href={item.url} target="_blank">
                    <h3
                      className="font-bold
                    hover:text-neutral-300
                    hover:underline
                    "
                    >
                      {item.name}
                    </h3>
                  </a>
                </div>
                <div>
                  <span>{item.date}</span>
                </div>
              </div>
              <span>{item.description}</span>
            </div>
          ))}
        </section>
        <section className="text-left w-full flex gap-4 flex-col mt-4 py-4 border-t-2 border-zinc-800 rounded-e-md">
          <h2 className="text-xl font-bold">Past Projects</h2>
          {misc.map((item, index) => (
            <div key={index} className="pb-8 border-b-2 border-zinc-900">
              <div className="min-w-full flex flex-row justify-between">
                <div className="flex flew-row">
                  <h3 className="font-bold">{item.name}</h3>
                </div>
                <div>
                  <span>{item.date}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span>{item.description}</span>
                <span>Team Size: {item.teamSize}</span>
                <span>Duration: {item.duration}</span>
              </div>
              <YouTubeEmbed videoid={item.videoid} />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
