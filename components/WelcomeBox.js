import Image from "next/image";
export default function WelcomeBox() {
  return (
    <div className="welcome-box">
      <div className="welcome">WELCOME TO RICK AND MORTY WIKI!</div>
      <div className="carousal">
        <Image
          alt="Rick and Morty"
          src="/images/rickMortyHome.jpeg"
          width="800px"
          height="400px"
        />
      </div>
    </div>
  );
}
