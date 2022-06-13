import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
// <<<<<<< Nikunj
  const MyImage = (props) => {
    return (
      <Image
        src="/images/rickMorty.jpeg"
        alt="Picture of rick n morty"
        width={50}
        height={50}
      />
    )
  }
// =======
  const optionList = ["Rick and Morty Wiki", "Explore", "Rick and Morty", "Episodes"]

// >>>>>>> master
  return (
  <div>
   <div className= "nav-container" style={{display : 'flex', margin :'auto'}}>
    {
        optionList.map((item, index) =>(
            <div className = "nav-element" key={index} style = {{ margin : '5px'}}>
                {item}
            </div>
        ))
    }
    </div>
   <div className="all">
    <div className="home">Home</div>
    <div className="welcome">Welcome to Rick and Morty Wiki!</div>
    <MyImage className="carousal" />
    <div className="decriptionBox">
      <div className="descriptionHead">Description</div>
      <div className="descriptionContent">abcd xyz</div>
    </div>
    <div className="mainCharactersBox">
      <div className="mainCharactersHead">Main Characters</div>
      <MyImage  />
      <MyImage  />
      <MyImage  />
      <MyImage  />
      <MyImage  />
    </div>
    <div className="episodeBox">
        <div> Previous Episode </div>
        <div> Next Episode</div>
        <MyImage  />
      <MyImage  />
      <div> Name of Episode </div>
        <div> Name of Episode</div>
        <div> Description</div>
        <div> Description</div>
   </div>
    <div className="Latest"> Latest Comic</div>
    <div> <MyImage  /> 
    <div> Name of comic</div>
    <div> Description</div> 
    </div>
    <div className="exploreBox">
      <div>Explore and Discover</div>
      <MyImage  />
      <MyImage  />
      <MyImage  />
      <MyImage  />
      <MyImage  />
      <MyImage  />
    </div>
   </div>
</div>
  )
  }