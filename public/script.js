import api_module from './api_module.js'
let autorization = await api_module.getLoggedin()
const selectedPlaylist = document.querySelector('.main')
const playlists = document.getElementById('playlists_list')
const tracks_header = '<div class="tracks_header ">Трек</div>'
const recent_tracks = document.getElementById('recent_tracks')
if (autorization) {
    selectedPlaylist.innerHTML = "Здесь будет выбранный плейлист"
    playlists.innerHTML = ""
    const fetched_playlists = await api_module.getPlaylists()
    fetched_playlists.forEach(element => {
        const playlist_li = document.createElement('li')
        playlist_li.setAttribute('class', 'accordion_ul_li_ul_li')
        playlist_li.innerHTML = element.name
        playlist_li.onclick = async() => {
            selectedPlaylist.innerHTML = tracks_header
            const tracks = await api_module.getTracksForPlayList(element.id)
                //console.log(tracks)
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
        playlists.insertAdjacentElement('beforeend', playlist_li)
    });
    recent_tracks.innerHTML = ""
    const recentTracksFetched = await api_module.getRecentTracks()
        //console.log(recentTracksFetched)
    recentTracksFetched.forEach(element => {
        const li = document.createElement('li')
        li.setAttribute('class', 'accordion_ul_li_ul_li')
        li.innerText = element
        recent_tracks.insertAdjacentElement('beforeend', li)
    })
} else {
    document.querySelector('.app').innerHTML = '<a href="http://localhost:8888/login">Залогиниться</a>'
}