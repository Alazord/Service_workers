export default function NavBar (){
    
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