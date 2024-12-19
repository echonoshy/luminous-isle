document.addEventListener('DOMContentLoaded', function() {
    fetch('playlist.json')
        .then(response => response.json())
        .then(data => {
            const playlistData = data;
            let currentIndex = 0;

            function loadEpisode(index) {
                const episode = playlistData[index];
                document.querySelector('.album-title').textContent = episode.title;
                document.querySelector('.album-audio source').src = episode.audioSrc;
                document.querySelector('.album-audio').load();
            }

            function updatePlaylist() {
                const playlistItems = document.querySelector('.playlist-items');
                playlistItems.innerHTML = playlistData.map((episode, index) => `
                    <li class="playlist-item ${index === currentIndex ? 'active' : ''}" data-index="${index}">
                        ${episode.title}
                    </li>
                `).join('');

                document.querySelectorAll('.playlist-item').forEach(item => {
                    item.addEventListener('click', function() {
                        currentIndex = parseInt(this.dataset.index);
                        loadEpisode(currentIndex);
                        updatePlaylist();
                    });
                });
            }

            document.querySelector('.prev-button').addEventListener('click', function() {
                if (currentIndex > 0) {
                    currentIndex--;
                    loadEpisode(currentIndex);
                    updatePlaylist();
                }
            });

            document.querySelector('.next-button').addEventListener('click', function() {
                if (currentIndex < playlistData.length - 1) {
                    currentIndex++;
                    loadEpisode(currentIndex);
                    updatePlaylist();
                }
            });

            if (playlistData.length > 0) {
                loadEpisode(currentIndex);
                updatePlaylist();
            } else {
                document.querySelector('.album-content').innerHTML = '<p>未找到专辑信息。</p>';
            }
        })
        .catch(error => console.error('Error loading playlist:', error));
});