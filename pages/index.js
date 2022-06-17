import Head from "next/head";
import Image from "next/image";
import Navbar from "./navBar";

export default function Home() {
  const MyImage = (props) => {
    return (
      <Image
        src={props.src}
        alt="Picture of rick n morty"
        width="50px"
        height="50px"
      />
    );
  };

  const characterList = [
    ["Beth Smith", "/images/bethSmith.png"],
    // ["Beth Smith", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcomicvine.gamespot.com%2Fa%2Fuploads%2Foriginal%2F6%2F66303%2F4472083-vlcsnap-2015-01-31-18h46m55s179.png&imgrefurl=https%3A%2F%2Fcomicvine.gamespot.com%2Fbeth-smith%2F4005-117107%2Fimages%2F&tbnid=ZrM4x0Xl_GHm8M&vet=12ahUKEwihoZDwoLT4AhWFNLcAHbGbDj8QMygDegUIARCbAQ..i&docid=FEYs-vZWintFkM&w=622&h=831&q=beth%20smith%20image%20url&ved=2ahUKEwihoZDwoLT4AhWFNLcAHbGbDj8QMygDegUIARCbAQ"],
    ["Summer Smith", "/images/summerSmith.png"],
    ["Rick Sanchez", "/images/rickSanchez.png"],
    ["Morty Smith", "/images/mortySmith.png"],
    ["Jerry Smith", "/images/jerrySmith.png"],
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Head>
        <title>Rick and Morty Wiki</title>
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar id="homeNavbar" />
      <div className="all" id="home">
        <div className="home">HOME</div>
        <div className="welcomeBox">
          <div className="welcome">WELCOME TO RICK AND MORTY!</div>
          <div className="carousal">
            <Image alt="" src="/images/rickMorty.jpeg" width="800px" height="400px" />
          </div>
        </div>
        <div className="descriptionBox">
          <div className="descriptionHead">DESCRIPTION</div>
          <div className="Line"></div>
          <div className="descriptionContent">
            <p>
              There are some slight differences between earlier fake
              memory of Rick, in which his Diane and Beth died, and what really happened.
              In the fake memory, he immediately designed a portal gun to escape
              to other realities where his family was still alive. In reality,
              he spent a long time consumed by grief and drinking, before
              eventually perfecting a portal gun - after which he went on
              adventures, but all the while searching for the specific Rick who
              killed his family. As seen in  memories of Birdperson, he then
              started attacking the pre-Citadel, interdimensional club of Ricks
              - not to bring his family back or get an alternate version of
              them, but purely for revenge. Nor was he satisfied with killing
              any of the other Ricks, he kept hunting for the specific Rick who
              killed his family. However, even defeating all the other Ricks and
              organizing them
            </p>
          </div>
        </div>
        <div className="mainCharactersBox">
          <div className="mainCharactersHead">MAIN CHARACTERS</div>
          <div className="Line"></div>
          <div className="mainCharacterImages" style={{ display: "flex" }}>
            {characterList.map((item) => (
              <div key={1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Image alt="" src="https://1tb.favim.com/preview/7/773/7738/77387/7738741.jpg" width="140px" height="140px" />
                {/* <Image alt="" src="/images/rickMorty.jpeg" width="140px" height="140px" /> */}
                {/* MyImage (item[1]) */}
                <div
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  {item[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="episodeBox">
          <div className="episodeHead">EPISODES</div>
          <div className="Line"></div>
          <div className="episodeContent">
            <div className="episodePrevious">
              <div>Previous Episode</div>
              <Image alt="" src="/images/rickMorty.jpeg" width="386px" height="240px" />
              <div className="episodeName">Name of Episode</div>
              <div className="episodeDescription">Small description</div>
            </div>
            <div className="episodeNext">
              <div>Next Episode</div>
              <Image alt="" src="/images/rickMorty.jpeg" width="386px" height="240px" />
              <div className="episodeName">Name of Episode</div>
              <div className="episodeDescription">Small description</div>
            </div>
          </div>
        </div>
        <div className="latestComicBox">
          <div className="latestComicHead">LATEST COMIC</div>
          <div className="Line"></div>
          <div className="latestComicContent">
            <Image alt="" src="/images/rickMorty.jpeg" width="180px" height="240px" />
            <div className="latestComicDetails">
              <div className="latestComicTitle">
                Rick And Morty Presents: The Hotel Immortal
              </div>
              <div className="latestComicDescription">
                <p>
                  Murder at the Hotel Immortal?! Impossible, you say? Not so!
                  Find out who done stabbed whom in this whodunnit issue of Rick
                  and Morty Presents. When Cornvelious Daniels checks in for
                  some RnR at the Hotel Immortal, bodies start dropping--and
                  accusations start flying!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="exploreBox">
          <div className="exploreHead" id="explore">
            EXPLORE AND DISCOVER
          </div>
          <div className="Line"></div>
          <div className="exploreContent">
            <div
              style={{
                height: "249px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "240px",
                }}
              >
                <Image alt=""
                  src="/images/rickMorty.jpeg"
                  width="240px"
                  height="168px"
                />
                <div className="exploreTitle">COMICS</div>
                <div className="exploreDescription">
                  Some weird stuff happens in the comics broh.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "240px",
                }}
              >
                <Image alt=""
                  src="/images/rickMorty.jpeg"
                  width="240px"
                  height="168px"
                />
                <div className="exploreTitle">SONGS</div>
                <div className="exploreDescription">
                  There is some real toasty music in the show dawg.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "240px",
                }}
              >
                <Image alt=""
                  src="/images/rickMorty.jpeg"
                  width="240px"
                  height="168px"
                />
                <div className="exploreTitle">LOCATIONS</div>
                <div className="exploreDescription">
                  There are some sick locals in RnM duuudes.
                </div>
              </div>
            </div>

            <div
              style={{
                height: "249px",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "240px",
                }}
              >
                <Image alt=""
                  src="/images/rickMorty.jpeg"
                  width="240px"
                  height="168px"
                />
                <div className="exploreTitle">EPISODES</div>
                <div className="exploreDescription">
                  The stuff that happens in these episodes is sick yo.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "240px",
                }}
              >
                <Image alt=""
                  src="/images/rickMorty.jpeg"
                  width="240px"
                  height="168px"
                />
                <div className="exploreTitle">CHARACTERS</div>
                <div className="exploreDescription">
                  Things get weeeird when these guys are around.
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "240px",
                }}
              >
                <Image alt=""
                  src="/images/rickMorty.jpeg"
                  width="240px"
                  height="168px"
                />
                <div className="exploreTitle">CAST and CREW</div>
                <div className="exploreDescription">
                  These are the hot faces behind the scenes broh.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
