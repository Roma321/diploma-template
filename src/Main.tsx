import React from "react"
import { useEffect } from "react"
import MixesBlock from "./MixesBlock"
import Track from "./Track"

interface Props{
    selected:string
}
function Main(selected:Props){
    const [tracks, setTracks]=React.useState([{id:"",name:"",image:"", author:"", duration:0}])
    useEffect(()=>{
        fetch(`http://localhost:8888/playlist_tracks?id=${selected.selected}`).then(res => res.json()).then(setTracks)
    },[selected.selected])
    return <div className="main">
                <div className="tracks_header ">Трек</div>
                {console.log(tracks)}
                {tracks.map((item)=>{return <Track duration={item.duration} image={item.image} id={item.id} name = {item.name} author={item.author}/>})}
                <MixesBlock/>
            </div>
}

export default Main