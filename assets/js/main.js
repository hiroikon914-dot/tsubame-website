/* =====================================================
   main.js — つばめ装業
   ===================================================== */

/* ─────────────────────────────────────
   ハンバーガーメニュー
───────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ─────────────────────────────────────
   アクティブナビ
───────────────────────────────────── */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a, .mobile-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* ─────────────────────────────────────
   FAQアコーディオン
───────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // 全て閉じる
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ─────────────────────────────────────
   概算計算ツール

   【単価を変更したいとき】
   下の PRICING オブジェクトの数値を変えてください。
   単位は「円（税込）」です。

   gaiheki : 外壁塗装（1坪あたり）
   heya    : 部屋塗装（1畳あたり）
   kabe    : 壁塗装（1㎡あたり）

   grade:
     omakase  → おまかせ（スタンダード）
     shikkari → しっかり（プレミアム）
     kodawari → こだわり（ハイグレード）
───────────────────────────────────── */
const PRICING = {
  gaiheki: {
    omakase:  { min:  8000, max: 12000 },
    shikkari: { min: 13000, max: 18000 },
    kodawari: { min: 19000, max: 28000 },
  },
  heya: {
    omakase:  { min:  8000, max: 12000 },
    shikkari: { min: 13000, max: 18000 },
    kodawari: { min: 19000, max: 26000 },
  },
  kabe: {
    omakase:  { min: 2500, max: 3500 },
    shikkari: { min: 3500, max: 5000 },
    kodawari: { min: 5000, max: 8000 },
  }
};

const calcWrap = document.querySelector('.pricing-calc');
if (calcWrap) {
  let state = {
    type:  'gaiheki',
    grade: 'shikkari',
    size:  30,
  };

  /* --- 工事種別 --- */
  calcWrap.querySelectorAll('.calc-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      calcWrap.querySelectorAll('.calc-type-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.type = btn.dataset.type;
      refreshSections();
      calculate();
    });
  });

  /* --- グレード --- */
  calcWrap.querySelectorAll('.grade-card').forEach(card => {
    card.addEventListener('click', () => {
      calcWrap.querySelectorAll('.grade-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.grade = card.dataset.grade;
      calculate();
    });
  });

  /* --- 坪数・畳数ボタン --- */
  calcWrap.querySelectorAll('.calc-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const section = opt.closest('[data-show-for]');
      section.querySelectorAll('.calc-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      state.size = parseFloat(opt.dataset.size);
      calculate();
    });
  });

  /* --- テキスト入力（畳数・㎡） --- */
  calcWrap.querySelectorAll('.calc-input-field').forEach(input => {
    input.addEventListener('input', () => updateFromInputs());
  });

  function updateFromInputs() {
    const w = parseFloat(calcWrap.querySelector('[data-role="width"]')?.value)  || 0;
    const h = parseFloat(calcWrap.querySelector('[data-role="height"]')?.value) || 0;
    const t = parseFloat(calcWrap.querySelector('[data-role="tatami"]')?.value) || 0;
    if (state.type === 'kabe') state.size = w * h;
    if (state.type === 'heya' && t > 0) state.size = t;
    calculate();
  }

  /* --- セクション切り替え --- */
  function refreshSections() {
    calcWrap.querySelectorAll('[data-show-for]').forEach(sec => {
      const types = sec.dataset.showFor.split(',');
      sec.style.display = types.includes(state.type) ? '' : 'none';
    });
    // 初期サイズをリセット
    const firstOpt = calcWrap.querySelector(`[data-show-for="${state.type}"] .calc-option`);
    if (firstOpt) {
      calcWrap.querySelectorAll('.calc-option').forEach(o => o.classList.remove('selected'));
      firstOpt.classList.add('selected');
      state.size = parseFloat(firstOpt.dataset.size) || 30;
    }
  }

  /* --- 計算 --- */
  function calculate() {
    const p = PRICING[state.type]?.[state.grade];
    if (!p || state.size <= 0) return;

    const min = Math.round(p.min * state.size / 1000) * 1000;
    const max = Math.round(p.max * state.size / 1000) * 1000;

    const resultEl  = calcWrap.querySelector('.calc-result');
    const amountEl  = calcWrap.querySelector('.result-amount');
    if (!resultEl || !amountEl) return;

    amountEl.textContent = `${min.toLocaleString()} 〜 ${max.toLocaleString()} 円（税込）`;
    resultEl.classList.add('show');
  }

  /* 初期化 */
  refreshSections();
  calculate();
}

/* ─────────────────────────────────────
   お問い合わせフォーム（擬似送信）
   ※ 実際のメール送信にはサーバー側の設定が必要です
───────────────────────────────────── */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.style.display = 'none';
    const thanks = document.querySelector('.form-thanks');
    if (thanks) thanks.classList.add('show');
  });
}

/* ─────────────────────────────────────
   ヒーロー スライドショー
   5秒ごとに自動切り替え＋ドットで手動選択
───────────────────────────────────── */
const slideshow = document.querySelector('.hero-slideshow');
if (slideshow) {
  const slides = slideshow.querySelectorAll('.slide');
  const dots   = slideshow.querySelectorAll('.dot');
  let current  = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.index, 10));
      startTimer();
    });
  });

  startTimer();
}
