import React, { useEffect } from "react"
interface Props{
    updateData:(value: string) => void
}

const api_key = '4502be27513bd0d1830b1cc9f97b4cc6';
const Aside =( {updateData}:Props )=>{
    const [playlists, setPlaylists] = React.useState({topartists:{artist:[{name:"", mbid:""}]}})
    const [recentTracks, setRecentTracks] = React.useState({tracks:{track:[{name:""}]}})
    useEffect(()=>{
        fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=gothic&api_key=4502be27513bd0d1830b1cc9f97b4cc6&format=json`).then(res=>res.json()).then(setPlaylists)
        fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=gothic&api_key=4502be27513bd0d1830b1cc9f97b4cc6&format=json').then(res => res.json()).then(setRecentTracks)
    },[])
    return(
        <aside className="accordion">
            <ul className="accordion_ul">
                <li className="accordion_ul_li">Подкасты</li>
                <li className="accordion_ul_li">Исполнители
                    <ul className="accordion_ul_li_ul" id="playlists_list">
                        <div>
                        {playlists.topartists.artist.slice(0,15).map((item)=> <li className="accordion_ul_li_ul_li" onClick={()=>updateData(item.mbid)}>{item.name}</li>)}
                        </div>
                    </ul>
                </li>
                <li className="accordion_ul_li">Лучшие треки
                    <ul className="accordion_ul_li_ul" id="recent_tracks">
                    {recentTracks.tracks.track.slice(0,10).map((item)=> <li className="accordion_ul_li_ul_li">{item.name}</li>)}
                    </ul>
                </li>
            </ul>
        </aside>
    )
}

export default Aside