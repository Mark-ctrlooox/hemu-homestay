/* ==============================
   默默禾你 — Hamburger · BackTop · Timer · Danmaku
   修复 #1 #5 #8 #9
   ============================== */

(function() {
  var nav = document.getElementById('nav');
  var danmaku = document.getElementById('danmaku');
  var footerTime = document.getElementById('footerTime');
  var hero = document.getElementById('hero');
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');
  var backTop = document.getElementById('backTop');
  var doorLeft = document.getElementById('doorLeft');
  var doorRight = document.getElementById('doorRight');

  // ====== 1. HAMBURGER MENU (#1) ======
  var menuOpen = false;
  function toggleMenu() {
    menuOpen = !menuOpen;
    hamburger.classList.toggle('open', menuOpen);
    mobileNav.classList.toggle('open', menuOpen);
    hamburger.setAttribute('aria-expanded', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }
  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  // Close menu when clicking a link
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        if (menuOpen) toggleMenu();
      });
    });
  }

  // ====== 2. DANMAKU (#9 — 推门时即出现, 0.8s 淡入) ======
  var earlyComments = [
    '推开木屋的门…… 🚪',
    '诺瓦木屋的晨雾太美了！🌄',
    '冬天去禾木滑雪住溪闻，绝了 ❄️',
    '在禾木桥拍到了人生照片 📸',
    '吉克普林的粉雪真的太顶了 🎿',
    '白桦手礼的灯罩太有质感了 ✨',
    '禾木秋天就是一幅油画 🍂',
    '住诺瓦，推门就是禾木河 🏠',
    '援疆桥上看日落绝美 🌅',
    '默默家的木屋冬天超暖和 🔥',
    '禾木是我去过最美的地方没有之一',
    '下次还要来住溪闻民宿 🛖',
    '滑雪回来泡个热水澡太舒服了',
    '白桦树皮做的杯垫已经用上了 🍵',
    '在木屋里听溪水声入睡太治愈了',
    '禾木的星空绝了 🌌',
    '推开门外面就是白桦林 🌲',
    '诺瓦木屋的院子秋天超好看 🍁',
    '冬天的炊烟和白雪太配了 🏔️',
    '清晨被鸟鸣和溪水声叫醒 🐦'
  ];

  if (danmaku) {
    var rows = [20, 48, 78];
    earlyComments.forEach(function(text, i) {
      var el = document.createElement('div');
      el.className = 'danmaku-item';
      el.textContent = text;
      el.style.top = rows[i % 3] + 'px';
      el.style.setProperty('--speed', (16 + Math.random() * 22) + 's');
      el.style.animationDelay = (Math.random() * 10) + 's';
      el.style.fontSize = (0.72 + Math.random() * 0.2) + 'rem';
      danmaku.appendChild(el);
    });
  }

  // ====== 3. NAV SCROLL ======
  function updateNav() {
    if (window.pageYOffset > 60) {
      nav.classList.add('solid');
    } else {
      nav.classList.remove('solid');
    }
  }

  // ====== 4. NAV ACTIVE ======
  function updateNavActive() {
    var scrollY = window.pageYOffset + 140;
    var links = nav.querySelectorAll('.nav-links a');
    var sections = [
      document.getElementById('nuowa'),
      document.getElementById('xiwen'),
      document.getElementById('spots'),
      document.getElementById('vlog'),
      document.getElementById('contact')
    ];
    var current = -1;
    if (hero && scrollY < hero.offsetHeight + 100) current = -1;
    sections.forEach(function(s, i) { if (s && scrollY >= s.offsetTop) current = i; });
    links.forEach(function(link, i) { link.classList.toggle('active', i === current); });
  }

  // ====== 5. BACK TO TOP (#5) ======
  function updateBackTop() {
    if (window.pageYOffset > 500) {
      backTop.classList.add('show');
    } else {
      backTop.classList.remove('show');
    }
  }
  if (backTop) {
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== 6. REVEAL ======
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.story-pic,.story-txt,.bento-card,.vlog-card,.c-card,.xiwen-pic-main,.xiwen-pics div').forEach(function(el, i) {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('r1');
    if (i % 3 === 2) el.classList.add('r2');
    observer.observe(el);
  });

  // ====== 7. FOOTER TIMER (#8 — sessionStorage) ======
  var storageKey = 'hemu_visit_start';
  var startTime;
  try {
    var stored = sessionStorage.getItem(storageKey);
    if (stored) {
      startTime = parseInt(stored, 10);
    } else {
      startTime = Date.now();
      sessionStorage.setItem(storageKey, startTime);
    }
  } catch(e) {
    startTime = Date.now();
  }

  function updateFooterTime() {
    if (!footerTime) return;
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var m = Math.floor(elapsed / 60);
    var s = elapsed % 60;
    footerTime.textContent = '你在禾木的 ' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }
  setInterval(updateFooterTime, 1000);
  updateFooterTime();

  // ====== 8. SMOOTH SCROLL ======
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  // ====== 9. COMBINED SCROLL ======
  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        updateNav();
        updateNavActive();
        updateBackTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ====== 10. SHARE PANEL ======
  var shareFloat = document.getElementById('shareFloat');
  var shareOverlay = document.getElementById('shareOverlay');
  var sharePanel = document.getElementById('sharePanel');
  var shareClose = document.getElementById('shareClose');
  var shareCopied = document.getElementById('shareCopied');
  var shareWechatGuide = document.getElementById('shareWechatGuide');
  var shareOpen = false;
  var pageUrl = window.location.href;
  var pageTitle = document.title || '默默禾你 · 诺瓦木屋 & 禾木溪闻民宿';
  var pageDesc = '新疆阿勒泰禾木村，推开木屋的门——外面是雪山白桦，里面是炉火温暖。';

  function openShare() {
    shareOpen = true;
    sharePanel.classList.add('show');
    shareOverlay.classList.add('show');
    shareCopied.classList.remove('show');
    document.body.style.overflow = 'hidden';

    // Detect WeChat browser
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') !== -1) {
      shareWechatGuide.style.display = 'block';
    } else {
      shareWechatGuide.style.display = 'none';
    }
  }

  function closeShare() {
    shareOpen = false;
    sharePanel.classList.remove('show');
    shareOverlay.classList.remove('show');
    document.body.style.overflow = '';
    shareCopied.classList.remove('show');
  }

  if (shareFloat) {
    shareFloat.addEventListener('click', openShare);
    shareFloat.addEventListener('touchend', function(e) { e.preventDefault(); openShare(); });
  }
  if (shareOverlay) shareOverlay.addEventListener('click', closeShare);
  if (shareClose) shareClose.addEventListener('click', closeShare);

  // Share actions
  document.querySelectorAll('.share-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var action = item.getAttribute('data-action');
      switch (action) {
        case 'copy':
          copyLink();
          break;
        case 'native':
          nativeShare();
          break;
        case 'wechat-friend':
        case 'wechat-moments':
          wechatShare(action);
          break;
      }
    });
    item.addEventListener('touchend', function(e) {
      e.preventDefault();
      var action = item.getAttribute('data-action');
      switch (action) {
        case 'copy':
          copyLink();
          break;
        case 'native':
          nativeShare();
          break;
        case 'wechat-friend':
        case 'wechat-moments':
          wechatShare(action);
          break;
      }
    });
  });

  function copyLink() {
    try {
      var textarea = document.createElement('textarea');
      textarea.value = pageTitle + '\\n' + pageUrl;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showCopied();
    } catch (e) {
      // Fallback for mobile
      try {
        navigator.clipboard.writeText(pageTitle + ' ' + pageUrl).then(showCopied);
      } catch (e2) {
        showCopied();
      }
    }
  }

  function nativeShare() {
    if (navigator.share) {
      navigator.share({
        title: pageTitle,
        text: pageDesc,
        url: pageUrl
      }).then(function() {
        closeShare();
      }).catch(function() {
        // User cancelled
      });
    } else {
      // Fallback: copy link
      copyLink();
    }
  }

  function wechatShare(action) {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') !== -1) {
      // In WeChat, show guide
      shareWechatGuide.style.display = 'block';
      shareWechatGuide.querySelector('p:first-child').textContent =
        action === 'wechat-moments' ? '点击右上角 ··· → 分享到朋友圈' : '点击右上角 ··· → 发送给朋友';
    } else {
      // Not in WeChat, copy link
      copyLink();
      setTimeout(function() {
        shareCopied.textContent = '链接已复制，打开微信粘贴给好友即可';
        shareCopied.classList.add('show');
      }, 10);
    }
  }

  function showCopied() {
    shareCopied.textContent = '\u2713 链接已复制，去粘贴给朋友吧';
    shareCopied.classList.add('show');
    setTimeout(function() {
      shareCopied.classList.remove('show');
    }, 2500);
  }

  // Close share on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && shareOpen) {
      closeShare();
    }
  });

})();
