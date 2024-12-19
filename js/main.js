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