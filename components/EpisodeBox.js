import Image from "next/image";
export default function EpisodeBox() {
  return (
    <div className="episode-box">
      <div className="episode-head">EPISODES</div>
      <div className="line"></div>
      <div className="episode-content">
        <div className="episode-previous">
          <div>Previous Episode</div>
          <Image alt="" src="/images/s1e1.jpeg" width="386px" height="240px" />
          <div className="episode-name">Name of Episode</div>
          <div className="episode-description">Small description</div>
        </div>
        <div className="episode-next">
          <div>Next Episode</div>
          <Image alt="" src="/images/s5e5.jpeg" width="386px" height="240px" />
          <div className="episode-name">Name of Episode</div>
          <div className="episode-description">Small description</div>
        </div>
      </div>
    </div>
  );
}
