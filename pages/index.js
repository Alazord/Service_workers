import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
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
  return (
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
  )
}
