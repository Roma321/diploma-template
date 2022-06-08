import React, { useEffect } from "react"
interface Props{
    updateData:(value: string) => void
}
const Aside =( {updateData}:Props )=>{
    const [playlists, setPlaylists] = React.useState([{id:"1", name:"Playlist 1"},{id:"2", name:"Playlist 2"}, {id:"3", name:"Playlist 3"}])
    const [recentTracks, setRecentTracks] = React.useState(["Трек 1", "Трек 2", "Трек 3", "Трек 4", "Трек 5"])
    useEffect(()=>{
        fetch("http://localhost:8888/playlists").then(res=>res.json()).then(setPlaylists)
        fetch('http://localhost:8888/recent').then(res => res.json()).then(setRecentTracks)
    },[])
    return(
        <aside className="accordion">
            <ul className="accordion_ul">
                <li className="accordion_ul_li">Подкасты</li>
                <li className="accordion_ul_li">Плейлисты
                    <ul className="accordion_ul_li_ul" id="playlists_list">
                        {playlists.map((item)=> <li className="accordion_ul_li_ul_li" onClick={()=>updateData(item.id)}>{item.name}</li>)}
                    </ul>
                </li>
                <li className="accordion_ul_li">Недавно прослушано
                    <ul className="accordion_ul_li_ul" id="recent_tracks">
                        {recentTracks.map((item)=> <li className="accordion_ul_li_ul_li">{item}</li>)}
                    </ul>
                </li>
            </ul>
        </aside>
    )
}

export default Aside