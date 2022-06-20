import Image from "next/image";
export default function LatestComicBox() {
  return (
    <div className="latestComicBox">
      <div className="latestComicHead">LATEST COMIC</div>
      <div className="Line"></div>
      <div className="latestComicContent">
        <Image
          className="latestComicContentImg"
          alt=""
          src="/images/comic2.jpeg"
          width="1000%"
          height="300%"
        />
        <div className="latestComicDetails">
          <div className="latestComicTitle">
            Rick And Morty Presents: The Hotel Immortal
          </div>
          <div className="latestComicDescription">
            <p>
              Murder at the Hotel Immortal?! Impossible, you say? Not so! Find
              out who done stabbed whom in this whodunnit issue of Rick and
              Morty Presents. When Cornvelious Daniels checks in for some RnR at
              the Hotel Immortal, bodies start dropping--and accusations start
              flying!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
