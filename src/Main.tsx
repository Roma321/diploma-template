import React from "react"
import { useEffect } from "react"
import MixesBlock from "./MixesBlock"
import Track from "./Track"

interface Props{
    selected:string
}
function Main(selected:Props){
    const [tracks, setTracks]=React.useState({toptracks:{track:[{artist:{name:""},name:"", playcount:'0',image:[{text:""}]}]}})
    useEffect(()=>{
        fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${selected.selected}&api_key=4502be27513bd0d1830b1cc9f97b4cc6&format=json`).then(res => res.json()).then(setTracks)
    },[selected.selected])
    return <div className="main">
                <div className="tracks_header ">Трек</div>
                
                {tracks.toptracks.track.map((item)=>{return <Track duration={Math.floor((Math.random() * 180000) + 170000)} image='img/gradient_yellow.jpg' id="" name = {item.name} author={item.artist.name}/>})}
                
                <MixesBlock/>
            </div>
}

export default Main