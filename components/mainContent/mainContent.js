import WelcomeBox from "../welcomeBox/WelcomeBox";
import DescriptionBox from "../descriptionBox/DescriptionBox";
import MainCharacterBox from "../mainCharacterBox/MainCharacterBox";
import EpisodeBox from "../episodeBox/EpisodeBox";
import LatestComicBox from "../latestComicBox/LatestComicBox";
import ExploreBox from "../exploreBox/ExploreBox";

export default function MainContent() {
  return (
    <div className="all" id="home">
      <div className="home"></div>
      <WelcomeBox />
      <DescriptionBox />
      <MainCharacterBox />
      <EpisodeBox />
      <LatestComicBox />
      <ExploreBox />
    </div>
  );
}
