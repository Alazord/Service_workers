export default function NavBar() {
  const optionList = [
    "RICK AND MORTY WIKI",
    "EXPLORE",
    "RICK AND MORTY",
    "EPISODES",
  ];
  return (
    <div className="nav-container">
      {optionList.map((item, index) => (
        <div className="nav-element" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
