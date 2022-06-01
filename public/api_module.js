export default {
    async getPlaylists() {
        const fetched = await fetch('http://localhost:8888/playlists').then(res => res.json())
        return fetched.body.items.map(item => ({ id: item.id, name: item.name, uri: item.uri }))
    },
    async getLoggedin() {
        const fetched = await fetch('http://localhost:8888/loggedin').then(res => res.json())
        return fetched.loggedin
    },
    async getTracksForPlayList(idd) {
        const fetched = await fetch(`http://localhost:8888/playlist_tracks?id=${idd}`).then(res => res.json())
        return fetched.body.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            author: item.track.artists[0].name,
            image: item.track.album.images[2].url,
            duration: item.track.duration_ms
        }))
    },

    async getRecentTracks() {
        const fetched = await fetch('http://localhost:8888/recent').then(res => res.json())
        return fetched.body.items.map(item => `${item.track.artists[0].name} — ${item.track.name}`)
    },
}