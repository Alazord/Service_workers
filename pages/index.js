import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
   <div className="all">
    <div className="home">Home</div>
    <div className="welcome">Welcome to Rick and Morty Wiki!</div>
    <div className="carousal">Img to be shown</div>
    <div className="decriptionBox">
      <div className="descriptionHead">Description</div>
      <div className="descriptionContent">abcd xyz</div>
    </div>
    <div className="mainCharactersBox">
      <div className="mainCharactersHead">Main Characters</div>
      <div  className="mainCharactersContent">img list</div>
    </div>
   </div>
  )
}
