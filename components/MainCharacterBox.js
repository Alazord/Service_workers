import Image from "next/image";
export default function MainCharacterBox() {
  const characterList = [
    ["Beth Smith", "/images/bethSmith.jpeg"],
    ["Summer Smith", "/images/summerSmith.jpeg"],
    ["Rick Sanchez", "/images/rickSanchez.jpg"],
    ["Morty Smith", "/images/mortySmith.jpg"],
    ["Jerry Smith", "/images/jerrySmith.jpg"],
  ];
  return (
    <div className="mainCharactersBox">
      <div className="mainCharactersHead">MAIN CHARACTERS</div>
      <div className="Line"></div>
      <div className="mainCharacterImages" style={{ display: "flex" }}>
        {characterList.map((item) => (
          <div className="mainCharacterImgList" key={1}>
            <Image alt="" src={item[1]} height={140} width={140} />
            <div className="mainCharacterImgTag">{item[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
