// vars
const parts = ['4c67', '2513', '1b21', '3c8d', '0955', '896b', '938a', '34b0'];
const apiKey = parts.join('');
const username = 'tasoryy';
let currentTrackName = '';

// script
function fetchCurrentTrack() {
    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`)
        .then(response => response.json())
        .then(data => {
            const recentTracks = data.recenttracks.track;
            if (recentTracks.length > 0) {
                const currentTrack = recentTracks[0];
                const newTrackName = currentTrack.name;

                if (newTrackName !== currentTrackName) {
                    currentTrackName = newTrackName;
                    document.getElementById('album-title').innerText = currentTrack.album['#text'];
                    document.getElementById('track-title').innerText = currentTrack.name;
                    document.getElementById('artist-name').innerText = currentTrack.artist['#text'];
                    document.getElementById('album-cover').src = currentTrack.image[3]['#text'];
                    
                    const trackQuery = encodeURIComponent(`${currentTrack.name} ${currentTrack.artist['#text']}`);
                    const trackLink = `https://www.youtube.com/results?search_query=${trackQuery}`;
                    
                    const trackLinkElement = document.getElementById('track-link');
                    trackLinkElement.href = trackLink;
                    trackLinkElement.innerText = 'Watch on YouTube';
                }
            } else {
                document.getElementById('album-title').innerText = 'No data';
                document.getElementById('track-title').innerText = '';
                document.getElementById('track-link').innerText = '';
            }
        })
        .catch(error => console.error('error:', error));
}

setInterval(fetchCurrentTrack, 1000);
fetchCurrentTrack();