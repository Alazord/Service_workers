import Image from "next/image";

function Explore(src, expTitle, expDesc) {
  this.src = src;
  this.expTitle = expTitle;
  this.expDesc = expDesc;
}
export default function ExploreBox() {
  const explore = [
    new Explore(
      "/images/comic3.avif",
      "COMICS",
      "Some weird stuff happens in the comics broh."
    ),
    new Explore(
      "/images/song.jpeg",
      "SONGS",
      "There is some real toasty music in the show dawg."
    ),
    new Explore(
      "/images/location.jpeg",
      "LOCATIONS",
      "There are some sick locals in RnM duuudes."
    ),
    new Explore(
      "/images/episode.jpeg",
      "EPISODES",
      "The stuff that happens in these episodes is sick yo."
    ),
    new Explore(
      "/images/character.jpg",
      "CHARACTERS",
      "Things get weeeird when these guys are around."
    ),
    new Explore(
      "/images/cast.jpeg",
      "CAST and CREW",
      "These are the hot faces behind the scenes broh."
    ),
  ];
  return (
    <div className="exploreBox">
      <div className="exploreHead" id="explore">
        EXPLORE AND DISCOVER
      </div>
      <div className="Line"></div>
      <div className="exploreContent">
        {explore.map((item) => (
          <div className="exploreContentTag">
            <Image alt="" src={item.src} width="240px" height="168px" />
            <div className="exploreTitle">{item.expTitle}</div>
            <div className="exploreDescription">{item.expDesc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
