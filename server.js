const express = require('express');
const app = express();
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();
app.use('/', router);
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/public/img/'));

app.listen(process.env.port || 8888);
const location = path.join(__dirname, 'public')

console.log('Running at Port 8888');
// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: '5387027332cd418c8c89fd5da5fed116',
    clientSecret: 'f62ba0c6db864b0488ce529a9855676e',
    redirectUri: 'http://localhost:8888/callback'
});
const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

let loggedin = false

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});


app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi.authorizationCodeGrant(code).then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);

        console.log(
            `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        loggedin = true;
        res.redirect('http://localhost:8888/');

        setInterval(async() => {
            const data = await spotifyApi.refreshAccessToken();
            const access_token = data.body['access_token'];

            console.log('The access token has been refreshed!');
            console.log('access_token:', access_token);
            spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
    });
});

app.get('/playlists', (req, res) => {
    (async() => {
        const result = await spotifyApi.getUserPlaylists();
        res.send(result);
    })().catch(e => {
        res.send({ error: true });
    });
});

router.get('/', function(req, res) {
    res.sendFile(path.join(location, 'index.html'));
});

app.get('/loggedin', (req, res) => {
    res.send({ loggedin: loggedin });
});

app.get('/playlist_tracks', (req, res) => {
    (async() => {
        console.log(req.query.id)
        const a = await spotifyApi.getPlaylistTracks(req.query.id)
        res.send(a)
    })().catch(e => {
        res.send({ error: true, args: req.query });
    });
});

app.get('/recent', (req, res) => {
    (async() => {
        const a = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 10 })
        res.send(a)
    })().catch(e => {
        res.send({ error: true, args: req.query });
    });
});