import Image from "next/image";
import WelcomeBox from "./WelcomeBox";
import DescriptionBox from "./DescriptionBox";
import MainCharacterBox from "./MainCharacterBox";
import EpisodeBox from "./EpisodeBox";
import LatestComicBox from "./LatestComicBox";
import ExploreBox from "./ExploreBox";

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
