import Image from "next/image";
import WelcomeBox from "../welcomeBox/welcomeBox";
import DescriptionBox from "../descriptionBox/descriptionBox";
import MainCharacterBox from "../mainCharacterBox/mainCharacterBox";
import EpisodeBox from "../episodeBox/episodeBox";
import LatestComicBox from "../latestComicBox/latestComicBox";
import ExploreBox from "../exploreBox/exploreBox";

export default function MainContent() {
  return (
    <div className="all" id="home">
      <div className="home">HOME</div>
      <WelcomeBox />
      <DescriptionBox />
      <MainCharacterBox />
      <EpisodeBox />
      <LatestComicBox />
      <ExploreBox />
    </div>
  );
}
