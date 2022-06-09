import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const optionList = ["Rick and Morty Wiki", "Explore", "Rick and Morty", "Episodes"]

  return (
   <div className= "nav-container" style={{display : 'flex', margin :'auto'}}>
    {
        optionList.map((item, index) =>(
            <div className = "nav-element" key={index} style = {{ margin : '5px'}}>
                {item}
            </div>
        ))
    }
   </div>
  )
}
