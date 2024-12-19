// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 播放按钮点击事件
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const podcastTitle = this.closest('.podcast-card').querySelector('.podcast-title').textContent;
            console.log(`正在播放: ${podcastTitle}`);
            // 这里可以添加实际的音频播放逻辑
        });
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // 向下滚动
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
});

// 平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    fetch('albums.json')
        .then(response => response.json())
        .then(data => {
            const podcastGrid = document.querySelector('.podcast-grid');
            podcastGrid.innerHTML = data.map(album => `
                <div class="podcast-card" data-episode-id="${album.id}">
                    <img src="${album.cover}" alt="播客封面" class="podcast-image">
                    <div class="podcast-content">
                        <h3 class="podcast-title">${album.title}</h3>
                        <div class="podcast-meta">
                            <span><i class="far fa-clock"></i> ${album.duration}</span>
                            <span><i class="far fa-calendar"></i> ${album.date}</span>
                        </div>
                        <button class="play-button" 
                                data-audio-src="${album.audioSrc}"
                                data-episode-title="${album.title}"
                                data-episode-duration="${album.duration}"
                                data-episode-date="${album.date}"
                                data-episode-description="${album.description}"
                                data-episode-cover="${album.cover}">
                            <i class="fas fa-play"></i> 立即收听
                        </button>
                    </div>
                </div>
            `).join('');

            // 事件监听器
            const playButtons = document.querySelectorAll('.play-button');
            playButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const episodeData = {
                        audioSrc: this.dataset.audioSrc,
                        title: this.dataset.episodeTitle,
                        duration: this.dataset.episodeDuration,
                        date: this.dataset.episodeDate,
                        description: this.dataset.episodeDescription,
                        cover: this.dataset.episodeCover
                    };

                    localStorage.setItem('currentEpisode', JSON.stringify(episodeData));
                    window.location.href = 'album.html';
                });
            });
        })
        .catch(error => console.error('Error loading albums:', error));
});