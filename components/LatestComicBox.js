import Image from "next/image";
export default function LatestComicBox() {
  return (
    <div className="latest-comic-box">
      <div className="latest-comic-head">LATEST COMIC</div>
      <div className="line"></div>
      <div className="latest-comic-content">
        <Image
          className="latest-comic-content-img"
          alt="Latest Comic"
          src="/images/comic2.jpeg"
          width="1000%"
          height="300%"
        />
        <div className="latest-comic-details">
          <div className="latest-comic-title">
            Rick And Morty Presents: The Hotel Immortal
          </div>
          <div className="latest-comic-description">
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
