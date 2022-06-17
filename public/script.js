let autorization = getLoggedin()
const selectedPlaylist = document.querySelector('.main')
const playlists = document.getElementById('playlists_list')
const tracks_header = '<div class="tracks_header ">Трек</div>'
const recent_tracks = document.getElementById('recent_tracks')

selectedPlaylist.innerHTML = "Здесь будет выбранный плейлист"
playlists.innerHTML = ""
setPlaylists()
    /*
    let fetched_playlists = fetch("http://jsonplaceholder.typicode.com/posts")
    console.log(fetched_playlists)

    recent_tracks.innerHTML = ""
    const recentTracksFetched = api_module.getRecentTracks()
        //console.log(recentTracksFetched)
    recentTracksFetched.forEach(element => {
        const li = document.createElement('li')
        li.setAttribute('class', 'accordion_ul_li_ul_li')
        li.innerText = element
        recent_tracks.insertAdjacentElement('beforeend', li)
    }) */

async function setPlaylists() {
    const fetched = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=gothic&api_key=4502be27513bd0d1830b1cc9f97b4cc6&format=json`).then(res => res.json())
    console.log(fetched)
    fetched_playlists = fetched.topartists.artist.slice(0, 15).map(item => (
        ({ id: item.mbid, name: item.name })
    ))
    fetched_playlists.forEach(element => {
        const playlist_li = document.createElement('li')
        playlist_li.setAttribute('class', 'accordion_ul_li_ul_li')
        playlist_li.innerHTML = element.name
        playlist_li.onclick = () => {
            console.log(element)
            setTracks(element.id)
        }
        playlists.insertAdjacentElement('beforeend', playlist_li)
    });
}
async function getLoggedin() {
    return true
}
async function getTracksForPlayList(idd) {
    const fetched = await fetch(`http://localhost:8888/playlist_tracks?id=${idd}`).then(res => res.json())
    return fetched.body.items.map(item => ({
        id: item.track.id,
        name: item.track.name,
        author: item.track.artists[0].name,
        image: item.track.album.images[2].url,
        duration: item.track.duration_ms
    }))
}

async function getRecentTracks() {
    const fetched = await fetch('http://localhost:8888/recent').then(res => res.json())
    return fetched.body.items.map(item => `${item.track.artists[0].name} — ${item.track.name}`)
}

async function setTracks(id) {
    selectedPlaylist.innerHTML = tracks_header

    let tracks = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${id}&api_key=4502be27513bd0d1830b1cc9f97b4cc6&format=json`).then(res => res.json())
    console.log(tracks)
    tracks = tracks.toptracks.track.map((item) => ({
        id: item.mbid,
        name: item.name,
        author: item.artist.name,
        image: item.image[0].text,
        duration: Math.floor((Math.random() * 180000) + 170000)
    }));
    console.log(tracks)
    tracks.forEach(el => {
        const track = document.createElement('div')
        track.setAttribute('class', 'track')

        const track_image = document.createElement('img')
        track_image.setAttribute('src', el.image)
        track_image.setAttribute('width', "20px")
        track_image.setAttribute('height', "20px")
        track_image.setAttribute('class', "track_image")

        const time_label = document.createElement('div');
        time_label.setAttribute('class', 'time_label');
        const minutes = Math.trunc(el.duration / 60000);
        let seconds = Math.trunc((el.duration - minutes * 60000) / 1000);
        if (seconds < 10) seconds = `0${seconds}`
        time_label.innerText = `${minutes}:${seconds}`;

        const track_info = document.createElement('div');
        track_info.innerText = `${el.author} — ${el.name}`;

        track.insertAdjacentElement('beforeend', track_image);
        track.insertAdjacentElement('beforeend', track_info);
        track.insertAdjacentElement('beforeend', time_label);

        track.onclick = () => {
            document.querySelectorAll('.track').forEach(tr => tr.classList.remove('selected_track'))
            track.classList.add('selected_track')
        }
        selectedPlaylist.insertAdjacentElement('beforeend', track);
    })
}