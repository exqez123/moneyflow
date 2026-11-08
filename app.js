'use strict';
(() => {
const VERSION = '1.0.0';
const ITER = 600000;
const LS = { meta: 'mf_meta', data: 'mf_data', pref: 'mf_pref' };
const TG = 'https://t.me/exqez';
const TG_NAME = '@exqez';
const MAIL = 'konstantinkiricenko61@gmail.com';

/* ---------- i18n ---------- */
const I18N = window.MF_I18N;
const LANGN = { uk: 'Українська', ru: 'Русский', en: 'English' };
const LOC = { ru: 'ru-RU', uk: 'uk-UA', en: 'en-GB' };
let lang = 'ru';
function t(k, v) {
  let s = (I18N[lang] && I18N[lang][k]) ?? I18N.ru[k] ?? k;
  if (v) for (const n in v) s = s.split('{' + n + '}').join(String(v[n]));
  return s;
}
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const $ = (s, r = document) => r.querySelector(s);

/* ---------- icons ---------- */
const IC = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  stats: 'M4 20V10M10 20V4M16 20v-7M2 20h20',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  sliders: 'M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4',
  plus: 'M12 5v14M5 12h14', x: 'M6 6l12 12M18 6L6 18',
  chevL: 'M15 6l-6 6 6 6', chevR: 'M9 6l6 6-6 6', chevD: 'M6 9l6 6 6-6',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  eyeOff: 'M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.6 7.6C3.9 9.4 2 12 2 12s3.6 6 10 6a9 9 0 0 0 4.2-1M9.9 9.9a3 3 0 0 0 4.2 4.2',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  alert: 'M12 3l9.5 17h-19zM12 10v4M12 17.5h.01',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4M12 15v2',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  money: 'M12 3v18M16 7H10a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H7',
  swap: 'M4 7h13l-3-3M20 17H7l3 3',
  moon: 'M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  bolt: 'M13 3L5 14h6l-1 7 8-11h-6z',
  bank: 'M4 10l8-6 8 6M6 10v8M10 10v8M14 10v8M18 10v8M3 20h18',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  save: 'M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6',
  restore: 'M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5',
  send: 'M21 4L3 11l7 3 3 7zM10 14L21 4',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  bug: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v5M12 16h.01',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  face: 'M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M9 9v1M15 9v1M12 9v4h-1M9 16a4 4 0 0 0 6 0',
  backspace: 'M21 5H9l-6 7 6 7h12zM17 9l-6 6M11 9l6 6',
  logo: 'M3 17l5-5 4 4 8-8M15 8h5v5',
  check: 'M5 12l5 5 9-10',
  cart: 'M3 4h2l2.4 11h11.2L21 7H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  cup: 'M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 10h2a2 2 0 0 1 0 4h-2',
  bus: 'M5 4h14v13H5zM5 11h14M8 20v-3M16 20v-3',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
  phone: 'M7 3h10v18H7zM11 18h2',
  shirt: 'M8 4l4 2 4-2 4 3-2 3-2-1v11H8V9L6 10 4 7z',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5',
  dots: 'M5 12h.01M12 12h.01M19 12h.01',
  work: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  coins: 'M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  gift: 'M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0',
  car: 'M5 16h14M3 16v-4l2-5h14l2 5v4M7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  laptop: 'M5 5h14v10H5zM2 19h20',
  shield: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z',
  plane: 'M10 14l-6-2 1-2 7 1 5-6c1-1 3-1 3 0s0 2-1 3l-6 5 1 7-2 1-2-6',
  paw: 'M12 20c-3 0-5-2-5-4s2-4 5-4 5 2 5 4-2 4-5 4zM6 10a1.5 2 0 1 0 0-.1zM18 10a1.5 2 0 1 0 0-.1zM9.5 6a1.5 2 0 1 0 0-.1zM14.5 6a1.5 2 0 1 0 0-.1z'
};
const CAT_ICONS = ['cart', 'cup', 'bus', 'car', 'home', 'heart', 'star', 'phone', 'shirt', 'book', 'gift', 'plane', 'laptop', 'shield', 'paw', 'work', 'coins', 'bank', 'money', 'target', 'bolt', 'dots'];
const svg = (name, size = 20, sw = 2, color = 'currentColor') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC[name] || IC.dots}"/></svg>`;
const PAL = ['#2563EB', '#C2410C', '#0F7A43', '#6D3FD1', '#B42318', '#0E6E80', '#A16207', '#475467', '#BE185D'];
const PALD = ['#7AA2FF', '#F2A365', '#4FD08A', '#B39BFF', '#F28B8B', '#5CCDE0', '#E6BE52', '#AEB8CC', '#F48CC0'];
const dark = () => document.documentElement.dataset.theme === 'dark';
const col = i => (dark() ? PALD : PAL)[((+i || 0) % PAL.length + PAL.length) % PAL.length];
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const icoH = (icon, ci, cls = '') => { const c = col(ci); return `<span class="ico ${cls}" style="background:${rgba(c, dark() ? 0.18 : 0.13)}">${svg(icon, cls === 's' ? 18 : 20, 2, c)}</span>`; };

/* ---------- money & dates ---------- */
const CURS = { UAH: '₴', USD: '$', EUR: '€', PLN: 'zł', GBP: '£', CZK: 'Kč', CHF: 'CHF', CAD: 'C$', KZT: '₸', GEL: '₾', TRY: '₺', MDL: 'L' };
const sym = c => CURS[c] || c;
const r2 = n => Math.round(n * 100) / 100;
let nfCache = {};
function num(n) {
  const k = lang;
  if (!nfCache[k]) nfCache[k] = new Intl.NumberFormat(LOC[lang], { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  return nfCache[k].format(n);
}
function money(n, cur, sign = '') {
  if (ui.hidden) return sign + '•••• ' + sym(cur);
  return sign + num(Math.abs(n)) + ' ' + sym(cur);
}
const sMoney = (n, cur) => money(n, cur, n < 0 ? '−' : '');
const parseNum = v => parseFloat(String(v ?? '').replace(/[\s\u00a0\u202f]/g, '').replace(',', '.'));
const decSep = () => lang === 'en' ? '.' : ',';
const numIn = n => (n === null || n === undefined || n === '') ? '' : String(n).replace('.', decSep());
const pad = n => String(n).padStart(2, '0');
const dstr = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => dstr(new Date());
const nowT = () => { const d = new Date(); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const parseD = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d || 1); };
const ymOf = s => s.slice(0, 7);
const addYM = (ym, k) => { let [y, m] = ym.split('-').map(Number); m += k; y += Math.floor((m - 1) / 12); m = (((m - 1) % 12) + 12) % 12 + 1; return `${y}-${pad(m)}`; };
const monthsBetween = (a, b) => { const [ay, am] = a.split('-').map(Number); const [by, bm] = b.split('-').map(Number); return (by * 12 + bm) - (ay * 12 + am); };
const dim = ym => { const [y, m] = ym.split('-').map(Number); return new Date(y, m, 0).getDate(); };
const dueOf = (ym, day) => `${ym}-${pad(Math.min(day, dim(ym)))}`;
const ddiff = (a, b) => Math.round((parseD(b) - parseD(a)) / 864e5);
const addDays = (s, k) => { const d = parseD(s); d.setDate(d.getDate() + k); return dstr(d); };
const fmtDate = (s, opt) => new Intl.DateTimeFormat(LOC[lang], opt).format(parseD(s));
const fmtYM = ym => cap(new Intl.DateTimeFormat(LOC[lang], { month: 'long', year: 'numeric' }).format(parseD(ym + '-01')));
const fmtUntil = ym => new Intl.DateTimeFormat(LOC[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(parseD(ym + '-01')).replace(/^\s*0?1[.\s]\s*/, '');
const dayLabel = d => d === today() ? t('today') : d === addDays(today(), -1) ? t('yesterday') : fmtDate(d, { day: 'numeric', month: 'short' });
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

/* ---------- crypto ---------- */
const enc = new TextEncoder(), dec = new TextDecoder();
const rnd = n => crypto.getRandomValues(new Uint8Array(n));
function b64(buf) { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); }
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
async function pbkdf(secret, salt, iter) {
  const base = await crypto.subtle.importKey('raw', enc.encode(secret), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function aesEnc(key, bytes) { const iv = rnd(12); const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, bytes); return { iv: b64(iv), ct: b64(ct) }; }
async function aesDec(key, o) { return new Uint8Array(await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(o.iv) }, key, unb64(o.ct))); }
const importKey = raw => crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
async function prfKey(buf) {
  const base = await crypto.subtle.importKey('raw', buf, 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: new Uint8Array(32), info: enc.encode('MoneyFlow bio v1') }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
async function bioSupported() {
  try { return !!(window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()); }
  catch (e) { return false; }
}
async function bioGetPrf(id, salt) {
  const a = await navigator.credentials.get({ publicKey: { challenge: rnd(32), allowCredentials: [{ type: 'public-key', id }], userVerification: 'required', timeout: 60000, extensions: { prf: { eval: { first: salt } } } } });
  const r = a.getClientExtensionResults ? a.getClientExtensionResults() : {};
  if (!r.prf || !r.prf.results || !r.prf.results.first) throw new Error('noprf');
  return r.prf.results.first;
}
async function bioCreate() {
  const salt = rnd(32);
  const cred = await navigator.credentials.create({ publicKey: {
    challenge: rnd(32), rp: { name: 'MoneyFlow' }, user: { id: rnd(16), name: 'MoneyFlow', displayName: 'MoneyFlow' },
    pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
    authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'preferred' },
    timeout: 60000, extensions: { prf: { eval: { first: salt } } } } });
  const ext = cred.getClientExtensionResults ? cred.getClientExtensionResults() : {};
  const first = ext.prf && ext.prf.results && ext.prf.results.first;
  if (!ext.prf || (ext.prf.enabled === false && !first)) throw new Error('noprf');
  const pend = { id: b64(cred.rawId), salt: b64(salt) };
  if (first) { await bioFinish(pend, first); return true; }
  return pend;
}
async function bioFinish(pend, out) {
  if (!out) out = await bioGetPrf(unb64(pend.id), unb64(pend.salt));
  const kek = await prfKey(out);
  const m = getMeta();
  m.bio = { id: pend.id, salt: pend.salt, wrap: await aesEnc(kek, rawKey) };
  setMeta(m);
}

/* ---------- storage ---------- */
const getJSON = k => { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } };
const getMeta = () => getJSON(LS.meta);
const setMeta = m => localStorage.setItem(LS.meta, JSON.stringify(m));
const loadPref = () => getJSON(LS.pref) || {};
const savePref = p => localStorage.setItem(LS.pref, JSON.stringify(p));

let S = null, DEK = null, rawKey = null, bioOK = false, pref = {};
const ui = { route: 'home', prev: 'home', hidden: false, hist: { q: '', f: 'all', ym: null }, stats: { p: 'month', off: 0 }, plans: 'goals' };
let saving = Promise.resolve();
function save() {
  if (!S || !DEK) return saving;
  const snap = JSON.stringify(S), key = DEK;
  saving = saving.then(async () => {
    const o = await aesEnc(key, enc.encode(snap));
    localStorage.setItem(LS.data, JSON.stringify(o));
  }).catch(e => { console.error(e); toast(t('save_err')); });
  return saving;
}

function defaults(lg, cur) {
  const C = (id, type, icon, color) => ({ id, type, key: id, icon, color, limit: null });
  const curs = [cur, 'USD', 'EUR', 'UAH'].filter((c, i, a) => a.indexOf(c) === i).slice(0, 3);
  return {
    v: 1,
    settings: { lang: lg, base: cur, curs, theme: pref.theme || 'light', autolock: 60, hideStart: false, method: 'days', lastBackup: null },
    cats: [C('groceries', 'exp', 'cart', 0), C('cafe', 'exp', 'cup', 1), C('transport', 'exp', 'bus', 5), C('home', 'exp', 'home', 2), C('health', 'exp', 'heart', 4), C('fun', 'exp', 'star', 3), C('comms', 'exp', 'phone', 5), C('clothes', 'exp', 'shirt', 8), C('edu', 'exp', 'book', 6), C('loans', 'exp', 'bank', 7), C('other', 'exp', 'dots', 7),
      C('salary', 'inc', 'work', 2), C('side', 'inc', 'coins', 2), C('gift', 'inc', 'gift', 3), C('other_inc', 'inc', 'dots', 7)],
    tx: [],
    tpls: [
      { id: uid(), type: 'exp', name: t('tpl_coffee'), amount: null, cur, cat: 'cafe' },
      { id: uid(), type: 'exp', name: t('tpl_ride'), amount: null, cur, cat: 'transport' },
      { id: uid(), type: 'exp', name: t('cat_groceries'), amount: null, cur, cat: 'groceries' },
      { id: uid(), type: 'inc', name: t('cat_salary'), amount: null, cur, cat: 'salary' }],
    goals: [], loans: []
  };
}
function migrate() {
  const d = defaults(S.settings && S.settings.lang || lang, S.settings && S.settings.base || 'UAH');
  S.settings = Object.assign({}, d.settings, S.settings || {});
  for (const k of ['cats', 'tx', 'tpls', 'goals', 'loans']) if (!Array.isArray(S[k])) S[k] = k === 'cats' ? d.cats : [];
  for (const id of ['other', 'other_inc', 'loans']) if (!S.cats.some(c => c.id === id)) S.cats.push(d.cats.find(c => c.id === id));
  if (!S.settings.curs.includes(S.settings.base)) S.settings.curs.unshift(S.settings.base);
}
function applyTheme(th) {
  document.documentElement.dataset.theme = th === 'dark' ? 'dark' : 'light';
  const m = $('meta[name=theme-color]'); if (m) m.content = th === 'dark' ? '#0B1220' : '#F3F5F9';
}
function applySettings() {
  lang = I18N[S.settings.lang] ? S.settings.lang : 'ru';
  document.documentElement.lang = lang;
  applyTheme(S.settings.theme);
  pref = { lang, theme: S.settings.theme }; savePref(pref);
}

/* ---------- domain helpers ---------- */
const catById = id => S.cats.find(c => c.id === id) || { id, type: 'exp', name: '—', icon: 'dots', color: 7 };
const catName = c => c.name || t('cat_' + c.key);
const sortTx = (a, b) => b.d.localeCompare(a.d) || (b.ts || 0) - (a.ts || 0);
const flows = x => x.type === 'inc' || x.type === 'exp';
function balances() {
  const b = {};
  for (const x of S.tx) {
    const v = x.type === 'inc' ? x.amount : x.type === 'adj' ? x.amount : -x.amount;
    b[x.cur] = r2((b[x.cur] || 0) + v);
  }
  return b;
}
function sums(from, to, cur) {
  let inc = 0, exp = 0;
  for (const x of S.tx) if (flows(x) && x.cur === cur && x.d >= from && x.d <= to) x.type === 'inc' ? inc += x.amount : exp += x.amount;
  return { inc: r2(inc), exp: r2(exp) };
}
const monthRange = ym => [ym + '-01', `${ym}-${pad(dim(ym))}`];
function limitInfo(ym) {
  const cur = S.settings.base, [a, z] = monthRange(ym);
  return S.cats.filter(c => c.type === 'exp' && c.limit > 0).map(c => {
    let spent = 0;
    for (const x of S.tx) if (x.type === 'exp' && x.cat === c.id && x.cur === cur && x.d >= a && x.d <= z) spent += x.amount;
    spent = r2(spent);
    return { c, spent, limit: c.limit, p: Math.round(spent / c.limit * 100) };
  });
}
function txView(x) {
  if (x.type === 'goal') { const g = S.goals.find(g => g.id === x.goal); return { icon: 'target', color: 0, name: t('goal_tx', { name: g ? g.name : '—' }), sub: x.t || '', amt: money(x.amount, x.cur, '−') }; }
  if (x.type === 'adj') return { icon: 'swap', color: 7, name: t('adj_tx'), sub: x.t || '', amt: money(x.amount, x.cur, x.amount < 0 ? '−' : '+'), inc: x.amount > 0 };
  const c = catById(x.cat), cn = catName(c);
  return { icon: c.icon, color: c.color, name: x.note || cn, sub: x.note ? cn + (x.t ? ', ' + x.t : '') : (x.t || t(x.type === 'inc' ? 'income' : 'expense')), amt: money(x.amount, x.cur, x.type === 'inc' ? '+' : '−'), inc: x.type === 'inc' };
}
const txRow = x => { const v = txView(x); return `<button class="item" data-a="tx" data-id="${x.id}">${icoH(v.icon, v.color)}<span class="m"><b>${esc(v.name)}</b><span>${esc(v.sub)}</span></span><span class="amt ${v.inc ? 'inc' : ''}">${v.amt}</span></button>`; };

function loanStatus(l) {
  const td = today(), ymNow = ymOf(td);
  if (l.balance <= 0.004 || (l.kind === 'loan' && l.left <= 0)) return { closed: true };
  const paid = !!(l.lastPaid && l.lastPaid >= ymNow);
  const dueYm = paid ? addYM(l.lastPaid, 1) : ymNow;
  const due = dueOf(dueYm, l.day);
  const days = ddiff(td, due);
  return { paid, due, dueYm, days, overdue: !paid && days < 0, amount: r2(Math.min(l.payment, l.balance)) };
}
function incomeStats(cur) {
  const td = today(), from30 = addDays(td, -29), from28 = addDays(td, -27);
  let sum = 0; const days = new Set();
  for (const x of S.tx) if (x.type === 'inc' && x.cur === cur) {
    if (x.d >= from30 && x.d <= td) sum += x.amount;
    if (x.d >= from28 && x.d <= td) days.add(x.d);
  }
  return { sum: r2(sum), days28: days.size };
}
const METH = { days: 'm_days', incdays: 'm_incdays', pct: 'm_pct' };
function aside() {
  const base = S.settings.base;
  const items = S.loans.filter(l => l.cur === base).map(l => loanStatus(l)).filter(s => !s.closed && s.amount > 0)
    .map(s => ({ amt: s.amount, days: Math.max(0, s.days) + 1, due: s.due })).sort((a, b) => a.days - b.days);
  if (!items.length) return null;
  let cum = 0; const steps = items.map(i => { cum += i.amt; return { cum, days: i.days, due: i.due }; });
  const total = r2(cum), last = steps[steps.length - 1];
  const inc = incomeStats(base);
  let line = null, note = '';
  const m = S.settings.method;
  if (m === 'pct') {
    const perDay = inc.sum / 30;
    if (perDay > 0) {
      let p = Math.ceil(Math.max(...steps.map(s => s.cum / (perDay * s.days))) * 100);
      if (p > 100) { p = 100; note = t('aside_short'); }
      line = t('aside_pct', { p });
    } else note = t('no_inc_data');
  } else if (m === 'incdays') {
    const f = inc.days28 / 28;
    if (f > 0) line = t('aside_incday', { x: money(Math.ceil(Math.max(...steps.map(s => s.cum / Math.max(1, Math.ceil(s.days * f))))), base) });
    else note = t('no_inc_data');
  }
  if (!line) line = t('aside_day', { x: money(Math.ceil(Math.max(...steps.map(s => s.cum / s.days))), base) });
  return { line, sub: t('aside_sub', { d: fmtDate(last.due, { day: 'numeric', month: 'long' }), x: money(total, base) }), note };
}

/* ---------- ui primitives ---------- */
let sheetEl = null, currentPad = null, busyExt = false, toastTimer = null;
function toast(msg, action, label, ms = 4000) {
  const el = $('#toast');
  el.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(label || t('undo'))}</button>` : ''}`;
  el.classList.remove('hidden');
  const hide = () => el.classList.add('hidden');
  if (action) el.querySelector('button').onclick = () => { hide(); action(); };
  clearTimeout(toastTimer); toastTimer = setTimeout(hide, action ? Math.max(ms, 5000) : ms);
}
function openSheet({ title, body, acts = {}, full = false, onMount, onClose, key }) {
  closeSheet(true);
  const bd = document.createElement('div');
  bd.className = 'backdrop';
  bd.innerHTML = `<div class="sheet ${full ? 'full' : ''}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sh-head"><span class="sp"></span><h3>${esc(title)}</h3><button type="button" class="ibtn" data-s="close" aria-label="${esc(t('close'))}">${svg('x', 18, 2.2)}</button></div><div class="sh-body">${body}</div></div>`;
  bd.addEventListener('click', e => {
    if (e.target === bd) { closeSheet(); return; }
    const el = e.target.closest('[data-s]'); if (!el || el.disabled) return;
    const k = el.dataset.s;
    if (k === 'close') { closeSheet(); return; }
    if (acts[k]) acts[k](el.dataset, el, e);
  });
  document.body.appendChild(bd);
  sheetEl = bd; bd._onClose = onClose; bd._key = key;
  document.body.classList.add('noscroll');
  if (onMount) onMount(bd);
  return bd;
}
function closeSheet(silent) {
  if (!sheetEl) return;
  const s = sheetEl; sheetEl = null; s.remove();
  document.body.classList.remove('noscroll');
  if (!silent && s._onClose) s._onClose();
}
const sheetBody = () => sheetEl && sheetEl.querySelector('.sh-body');
const field = (label, html, id) => `<div class="field"><label class="flab" ${id ? `for="${id}"` : ''}>${esc(label)}</label>${html}</div>`;
function curSelect(id, val) {
  const list = S.settings.curs.includes(val) ? S.settings.curs : [val, ...S.settings.curs];
  return `<select class="input" id="${id}">${list.map(c => `<option value="${c}" ${c === val ? 'selected' : ''}>${c} ${esc(sym(c))}</option>`).join('')}</select>`;
}
function choiceSheet(title, opts, cur, onPick) {
  openSheet({ title, body: `<div class="opts">${opts.map(o => `<button type="button" class="opt ${String(o.v) === String(cur) ? 'on' : ''}" data-s="p" data-v="${esc(o.v)}" aria-pressed="${String(o.v) === String(cur)}"><b>${esc(o.label)}</b>${o.desc ? `<span>${esc(o.desc)}</span>` : ''}</button>`).join('')}</div>`,
    acts: { p: d => { closeSheet(true); onPick(d.v); } } });
}
function confirmSheet(text, okLabel, danger, onOk) {
  openSheet({ title: okLabel, body: `<p>${esc(text)}</p><button type="button" class="btn ${danger ? 'danger' : ''}" data-s="ok">${esc(okLabel)}</button><button type="button" class="btn sec" data-s="close">${esc(t('cancel'))}</button>`,
    acts: { ok: () => { closeSheet(true); onOk(); } } });
}
function amountSheet(title, cur, def, onSave) {
  openSheet({ title, body: `${field(t('amount') + ', ' + sym(cur), `<input class="input big" id="am" inputmode="decimal" autocomplete="off" value="${esc(numIn(def))}">`, 'am')}<button type="button" class="btn" data-s="ok">${esc(t('save'))}</button>`,
    acts: { ok: () => { const v = parseNum($('#am').value); if (!(v > 0)) { toast(t('need_amount')); return; } closeSheet(true); onSave(r2(v)); } },
    onMount: bd => setTimeout(() => { const i = bd.querySelector('#am'); if (i) i.focus(); }, 280) });
}
async function deliverFile(name, blob) {
  busyExt = true;
  try {
    const file = new File([blob], name, { type: blob.type });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: name }); return true; }
      catch (e) { if (e && e.name === 'AbortError') return false; }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return true;
  } finally { setTimeout(() => { busyExt = false; }, 1500); }
}
function pickFile() {
  return new Promise(res => {
    const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json';
    busyExt = true;
    i.onchange = () => { setTimeout(() => { busyExt = false; }, 1500); res(i.files && i.files[0] || null); };
    i.click();
  });
}

/* ---------- screens ---------- */
const A = {};
function go(r) { if (r !== ui.route && r !== 'settings') ui.prev = r; if (r === 'settings' && ui.route !== 'settings') ui.prev = ui.route; ui.route = r; render(); window.scrollTo(0, 0); }
function render() {
  if (!S) return;
  const fn = SCR[ui.route] || SCR.home;
  $('#app').innerHTML = `<div class="screen">${fn()}</div>`;
  renderNav();
}
function renderNav() {
  const n = $('#nav'); n.classList.toggle('hidden', !S);
  const tabs = [['home', 'home', 'nav_home'], ['history', 'list', 'nav_history'], null, ['stats', 'stats', 'nav_stats'], ['plans', 'target', 'nav_plans']];
  n.innerHTML = tabs.map(x => x
    ? `<button type="button" class="tab ${ui.route === x[0] ? 'on' : ''}" data-a="go" data-r="${x[0]}" ${ui.route === x[0] ? 'aria-current="page"' : ''}>${svg(x[1], 24)}<span>${esc(t(x[2]))}</span></button>`
    : `<button type="button" class="fab" data-a="add" aria-label="${esc(t('add_op'))}">${svg('plus', 26, 2.4)}</button>`).join('');
}
const alertH = (cls, icon, title, sub, act) => `<button type="button" class="alert ${cls}" data-a="${act}"><span class="ai">${svg(icon, 22)}</span><span class="m"><b>${esc(title)}</b><span>${esc(sub)}</span></span>${svg('chevR', 16, 2.2)}</button>`;

const SCR = {};
SCR.home = () => {
  const st = S.settings, cur = st.base, td = today(), ym = ymOf(td);
  const bal = balances(), b = bal[cur] || 0;
  const others = Object.entries(bal).filter(([c, v]) => c !== cur && Math.abs(v) > 0.004);
  const m = sums(...monthRange(ym), cur);
  const h = new Date().getHours();
  const g = h < 5 ? 'g_night' : h < 12 ? 'g_morning' : h < 18 ? 'g_day' : h < 23 ? 'g_evening' : 'g_night';
  const tpls = S.tpls.slice(0, 8).map(p => {
    const c = catById(p.cat);
    return `<button type="button" class="tile" data-a="tpl" data-id="${p.id}">${icoH(c.icon, c.color, 's')}<span class="n">${esc(p.name)}</span><span class="s">${p.amount > 0 ? money(p.amount, p.cur, p.type === 'inc' ? '+' : '−') : (p.type === 'inc' ? '+ ' : '') + esc(t('tpl_sum'))}</span></button>`;
  }).join('');
  const recent = [...S.tx].sort(sortTx).slice(0, 5);
  return `<div class="top"><div class="hello"><small>${esc(t(g))}</small><b>MoneyFlow</b></div><button type="button" class="ibtn" data-a="settings" aria-label="${esc(t('settings'))}">${svg('sliders', 18)}</button></div>
  <section class="navy">
    <div class="nrow"><span class="lbl">${esc(t('balance'))}</span><button type="button" class="eye" data-a="eye" aria-label="${esc(t(ui.hidden ? 'show_sums' : 'hide_sums'))}">${svg(ui.hidden ? 'eyeOff' : 'eye', 18)}</button></div>
    <button type="button" class="bigbtn" data-a="adjust" aria-label="${esc(t('adjust'))}"><span class="big">${sMoney(b, cur)}</span></button>
    ${others.length ? `<div class="ocur">${others.map(([c, v]) => `<span>${sMoney(v, c)}</span>`).join('')}</div>` : ''}
    <div class="grid2"><div class="nchip"><span class="lbl">${esc(t('inc_month'))}</span><span class="v inc-n">${money(m.inc, cur, '+')}</span></div><div class="nchip"><span class="lbl">${esc(t('exp_month'))}</span><span class="v exp-n">${money(m.exp, cur, '−')}</span></div></div>
  </section>
  <section class="blk"><div class="sec-h"><h2>${esc(t('quick'))}</h2><button type="button" class="link" data-a="tpls">${esc(t('edit'))}</button></div>
    <div class="grid4">${tpls || `<button type="button" class="tile dashed" data-a="tpls">${svg('plus', 16, 2.4)}${esc(t('add_tpl'))}</button>`}</div></section>
  ${homeAlerts()}
  <section class="blk"><div class="sec-h"><h2>${esc(t('recent'))}</h2>${S.tx.length ? `<button type="button" class="link" data-a="go" data-r="history">${esc(t('all'))}</button>` : ''}</div>
    ${recent.length ? `<div class="list">${recent.map(txRow).join('')}</div>` : `<p class="empty">${esc(t('no_tx'))}</p>`}</section>`;
};
function homeAlerts() {
  const out = [], base = S.settings.base;
  const L = limitInfo(ymOf(today())).filter(x => x.p >= 80).sort((a, b) => b.p - a.p)[0];
  if (L) {
    const cn = catName(L.c);
    out.push(L.p > 100 ? alertH('bad', 'alert', t('lim_over', { cat: cn }), t('lim_over_by', { x: money(L.spent - L.limit, base) }), 'goStats')
      : alertH('warn', 'alert', t('lim_warn', { cat: cn, p: L.p }), t('lim_left', { x: money(L.limit - L.spent, base) }), 'goStats'));
  }
  const up = S.loans.map(l => ({ l, s: loanStatus(l) })).filter(x => !x.s.closed && !x.s.paid && x.s.days <= 7).sort((a, b) => a.s.days - b.s.days)[0];
  if (up) {
    const w = up.s.overdue ? t('when_overdue') : up.s.days === 0 ? t('when_today') : t('when_in', { n: up.s.days });
    out.push(alertH(up.s.overdue ? 'bad' : 'info', 'cal', t('pay_title', { name: up.l.name }), t('pay_sub', { x: money(up.s.amount, up.l.cur), when: w }), 'goLoans'));
  }
  const lb = S.settings.lastBackup;
  if (S.tx.length >= 5 && (!lb || ddiff(lb, today()) >= 7)) out.push(alertH('info', 'save', t('bk_title'), lb ? t('bk_last', { d: fmtDate(lb, { day: 'numeric', month: 'long' }) }) : t('bk_never'), 'backup'));
  return out.join('');
}

SCR.history = () => {
  const h = ui.hist; if (!h.ym) h.ym = ymOf(today());
  return `<div class="top"><h1>${esc(t('nav_history'))}</h1></div>
  <div class="mnav"><button type="button" class="ibtn" data-a="hm" data-d="-1" aria-label="${esc(t('prev_period'))}">${svg('chevL', 16, 2.2)}</button><span class="ml">${esc(fmtYM(h.ym))}</span><button type="button" class="ibtn" data-a="hm" data-d="1" aria-label="${esc(t('next_period'))}">${svg('chevR', 16, 2.2)}</button></div>
  <label class="search">${svg('search', 18)}<input type="search" data-in="q" value="${esc(h.q)}" placeholder="${esc(t('search_ph'))}" aria-label="${esc(t('search_ph'))}" autocomplete="off"></label>
  <div class="seg">${['all', 'exp', 'inc'].map(f => `<button type="button" class="${h.f === f ? 'on' : ''}" data-a="hf" data-f="${f}">${esc(t('f_' + f))}</button>`).join('')}</div>
  <div id="hl" class="hl">${histList()}</div>`;
};
function histList() {
  const h = ui.hist, q = h.q.trim().toLowerCase(), base = S.settings.base;
  const [a, z] = monthRange(h.ym);
  const list = S.tx.filter(x => x.d >= a && x.d <= z)
    .filter(x => h.f === 'all' || (h.f === 'exp' ? (x.type === 'exp' || x.type === 'goal') : x.type === 'inc'))
    .filter(x => { if (!q) return true; const v = txView(x); return (v.name + ' ' + v.sub + ' ' + (x.note || '')).toLowerCase().includes(q); })
    .sort(sortTx);
  if (!list.length) return `<p class="empty">${esc(t(q ? 'nothing' : 'no_tx_month'))}</p>`;
  const groups = []; let cur = null;
  for (const x of list) { if (!cur || cur.d !== x.d) { cur = { d: x.d, items: [] }; groups.push(cur); } cur.items.push(x); }
  return groups.map(g => {
    let i = 0, e = 0; g.items.forEach(x => { if (x.cur !== base) return; if (x.type === 'inc') i += x.amount; else if (x.type === 'exp' || x.type === 'goal') e += x.amount; });
    const tot = [e > 0 ? money(e, base, '−') : '', i > 0 ? money(i, base, '+') : ''].filter(Boolean).join(' / ');
    const lbl = g.d === today() ? t('today') + ', ' + fmtDate(g.d, { day: 'numeric', month: 'long' }) : g.d === addDays(today(), -1) ? t('yesterday') + ', ' + fmtDate(g.d, { day: 'numeric', month: 'long' }) : cap(fmtDate(g.d, { weekday: 'short', day: 'numeric', month: 'long' }));
    return `<div class="hday"><div class="dayh"><b>${esc(lbl)}</b><span>${tot}</span></div><div class="list">${g.items.map(txRow).join('')}</div></div>`;
  }).join('');
}

function periodRange() {
  const p = ui.stats.p, o = ui.stats.off, td = today();
  if (p === 'week') {
    const wd = (parseD(td).getDay() + 6) % 7, start = addDays(td, -wd + 7 * o), end = addDays(start, 6);
    return { start, end, label: fmtDate(start, { day: 'numeric', month: 'short' }) + ' – ' + fmtDate(end, { day: 'numeric', month: 'short' }),
      buckets: [...Array(7)].map((_, i) => { const s = addDays(start, i); return { s, e: s, l: fmtDate(s, { weekday: 'short' }) }; }) };
  }
  if (p === 'month') {
    const ym = addYM(ymOf(td), o), n = dim(ym);
    return { start: ym + '-01', end: `${ym}-${pad(n)}`, ym, label: fmtYM(ym),
      buckets: [[1, 7], [8, 14], [15, 21], [22, n]].map(([a, z]) => ({ s: `${ym}-${pad(a)}`, e: `${ym}-${pad(z)}`, l: `${a}–${z}` })) };
  }
  const y = new Date().getFullYear() + o;
  return { start: `${y}-01-01`, end: `${y}-12-31`, label: String(y),
    buckets: [...Array(12)].map((_, i) => { const ym = `${y}-${pad(i + 1)}`; return { s: ym + '-01', e: `${ym}-${pad(dim(ym))}`, l: fmtDate(ym + '-01', { month: 'narrow' }) }; }) };
}
SCR.stats = () => {
  const R = periodRange(), cur = S.settings.base;
  const txs = S.tx.filter(x => flows(x) && x.cur === cur && x.d >= R.start && x.d <= R.end);
  let inc = 0, exp = 0; txs.forEach(x => x.type === 'inc' ? inc += x.amount : exp += x.amount);
  const net = r2(inc - exp);
  const B = R.buckets.map(b => { let i = 0, e = 0; txs.forEach(x => { if (x.d >= b.s && x.d <= b.e) x.type === 'inc' ? i += x.amount : e += x.amount; }); return { ...b, i, e }; });
  const mx = Math.max(1, ...B.map(b => Math.max(b.i, b.e)));
  const hgt = v => v > 0 ? Math.max(3, Math.round(v / mx * 116)) : 0;
  const cols = `grid-template-columns:repeat(${B.length},minmax(0,1fr))`;
  const byCat = {}; txs.forEach(x => { if (x.type === 'exp') byCat[x.cat] = (byCat[x.cat] || 0) + x.amount; });
  const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  const ttl = ui.stats.p === 'week' ? 'by_days' : ui.stats.p === 'month' ? 'by_weeks' : 'by_months';
  let limHtml = '';
  if (ui.stats.p === 'month') {
    const L = limitInfo(R.ym);
    limHtml = `<section class="card"><div class="sec-h"><h2>${esc(t('limits'))}</h2><button type="button" class="link" data-a="cats">${esc(t('tune'))}</button></div>${L.length ? L.map(x => {
      const over = x.p > 100, warn = x.p >= 80 && !over;
      return `<div class="lrow"><div class="ct"><b>${esc(catName(x.c))}</b><span>${money(x.spent, cur)} / ${money(x.limit, cur)}</span></div><div class="bar"><i class="${over ? 'b' : warn ? 'w' : ''}" style="width:${Math.min(100, x.p)}%"></i></div><span class="ln ${over ? 'b' : warn ? 'w' : ''}">${esc(over ? t('lim_over_by', { x: money(x.spent - x.limit, cur) }) : t('lim_line', { p: x.p, x: money(x.limit - x.spent, cur) }))}</span></div>`;
    }).join('') : `<p class="small muted" style="margin:0">${esc(t('no_limits'))}</p>`}</section>`;
  }
  return `<div class="top"><h1>${esc(t('nav_stats'))}</h1></div>
  <div class="seg">${['week', 'month', 'year'].map(p => `<button type="button" class="${ui.stats.p === p ? 'on' : ''}" data-a="sp" data-p="${p}">${esc(t(p))}</button>`).join('')}</div>
  <div class="mnav"><button type="button" class="ibtn" data-a="so" data-d="-1" aria-label="${esc(t('prev_period'))}">${svg('chevL', 16, 2.2)}</button><span class="ml">${esc(R.label)}</span><button type="button" class="ibtn" data-a="so" data-d="1" aria-label="${esc(t('next_period'))}">${svg('chevR', 16, 2.2)}</button></div>
  <div class="grid3"><div class="stat"><span>${esc(t('s_inc'))}</span><b class="inc">${money(inc, cur, '+')}</b></div><div class="stat"><span>${esc(t('s_exp'))}</span><b>${money(exp, cur, '−')}</b></div><div class="stat"><span>${esc(t('s_rest'))}</span><b class="br">${money(net, cur, net < 0 ? '−' : '+')}</b></div></div>
  <section class="card"><div class="sec-h"><h2>${esc(t(ttl))}</h2><div class="legend"><span><i></i>${esc(t('s_inc'))}</span><span><i class="e"></i>${esc(t('s_exp'))}</span></div></div>
    <div class="chart" style="${cols}">${B.map(b => `<div class="c"><i style="height:${hgt(b.i)}px"></i><i class="e" style="height:${hgt(b.e)}px"></i></div>`).join('')}</div>
    <div class="chart-l" style="${cols}">${B.map(b => `<span>${esc(b.l)}</span>`).join('')}</div></section>
  <section class="card"><h2>${esc(t('by_cat'))}</h2>${cats.length ? cats.map(([id, v]) => {
    const c = catById(id), p = exp > 0 ? Math.round(v / exp * 100) : 0;
    return `<div class="crow">${icoH(c.icon, c.color, 's')}<div class="m"><div class="ct"><b>${esc(catName(c))}</b><span>${money(v, cur)}</span></div><div class="bar"><i style="width:${p}%;background:${col(c.color)}"></i></div></div><span class="pr">${p}%</span></div>`;
  }).join('') : `<p class="small muted" style="margin:0">${esc(t('no_data'))}</p>`}</section>
  ${limHtml}
  <p class="small muted" style="margin:0;text-align:center">${esc(t('cur_note', { cur }))}</p>`;
};

SCR.plans = () => {
  const g = ui.plans === 'goals';
  return `<div class="top"><h1>${esc(t('nav_plans'))}</h1><button type="button" class="pill soft" data-a="${g ? 'goalNew' : 'loanNew'}">${svg('plus', 16, 2.4)}${esc(t(g ? 'new_goal' : 'new_loan'))}</button></div>
  <div class="seg"><button type="button" class="${g ? 'on' : ''}" data-a="pt" data-t="goals">${esc(t('goals'))}</button><button type="button" class="${!g ? 'on' : ''}" data-a="pt" data-t="loans">${esc(t('loans'))}</button></div>
  ${g ? goalsHtml() : loansHtml()}`;
};
function goalsHtml() {
  if (!S.goals.length) return `<p class="empty">${esc(t('no_goals'))}</p>`;
  const base = S.settings.base, [a, z] = monthRange(ymOf(today()));
  const savedM = r2(S.tx.filter(x => x.type === 'goal' && x.cur === base && x.d >= a && x.d <= z).reduce((s, x) => s + x.amount, 0));
  const active = S.goals.filter(g => g.saved < g.target).length;
  return `<section class="navy"><div class="grid2"><div class="nstat"><span class="lbl">${esc(t('goals_active'))}</span><span class="v2">${active}</span></div><div class="nstat"><span class="lbl">${esc(t('saved_this_month'))}</span><span class="v2 inc-n">${money(savedM, base)}</span></div></div></section>
  ${S.goals.map(goalCard).join('')}`;
}
function goalCard(g) {
  const p = g.target > 0 ? Math.min(100, Math.round(g.saved / g.target * 100)) : 0;
  const rem = r2(Math.max(0, g.target - g.saved));
  let line;
  if (rem <= 0) line = t('reached');
  else if (g.deadline) line = t('need_month', { x: money(Math.ceil(rem / Math.max(1, monthsBetween(ymOf(today()), g.deadline))), g.cur) });
  else line = t('left_x', { x: money(rem, g.cur) });
  return `<section class="card"><button type="button" class="gh" data-a="goalEdit" data-id="${g.id}">${icoH(g.icon || 'target', g.color ?? 0)}<span class="m"><b>${esc(g.name)}</b><span>${esc(g.deadline ? t('until', { d: fmtUntil(g.deadline) }) : t('no_deadline'))}</span></span><span class="pct">${p}%</span></button>
  <div class="bar lg"><i style="width:${p}%"></i></div>
  <div class="gf"><span class="m"><b>${esc(t('of', { a: money(g.saved, g.cur), b: money(g.target, g.cur) }))}</b><span>${esc(line)}</span></span>${rem > 0 ? `<button type="button" class="btn small" data-a="goalTop" data-id="${g.id}">${esc(t('top_up'))}</button>` : ''}</div></section>`;
}
function loansHtml() {
  if (!S.loans.length) return `<p class="empty">${esc(t('no_loans'))}</p>`;
  const base = S.settings.base;
  const act = S.loans.filter(l => !loanStatus(l).closed && l.cur === base);
  const debt = r2(act.reduce((s, l) => s + l.balance, 0));
  const pm = r2(act.reduce((s, l) => s + Math.min(l.payment, l.balance), 0));
  const a = aside(), inc = incomeStats(base);
  const share = inc.sum > 0 && pm > 0 ? Math.round(pm / inc.sum * 100) : null;
  const rank = l => { const s = loanStatus(l); return s.closed ? 1e6 : s.paid ? 1e5 + s.days : s.days; };
  const sorted = [...S.loans].sort((x, y) => rank(x) - rank(y));
  return `<section class="navy"><div class="grid2"><div class="nstat"><span class="lbl">${esc(t('total_debt'))}</span><span class="v2">${money(debt, base)}</span></div><div class="nstat"><span class="lbl">${esc(t('pay_month'))}</span><span class="v2">${money(pm, base)}</span></div></div>
  ${a ? `<div class="nchip"><div class="nrow"><span class="aside-t inc-n">${esc(a.line)}</span><button type="button" class="mchip" data-a="method">${esc(t(METH[S.settings.method]))}${svg('chevD', 12, 2.4)}</button></div><span class="lbl sm">${esc(a.sub)}${share !== null ? ' ' + esc(t('loans_share', { p: share })) : ''}</span>${a.note ? `<span class="lbl sm">${esc(a.note)}</span>` : ''}</div>` : `<div class="nchip"><span class="lbl">${esc(t('all_closed'))}</span></div>`}</section>
  ${sorted.map(loanCard).join('')}`;
}
function loanCard(l) {
  const s = loanStatus(l);
  let chip, cc;
  if (s.closed) { chip = t('st_closed'); cc = 'ok'; }
  else if (s.paid) { chip = t('st_paid'); cc = 'ok'; }
  else if (s.overdue) { chip = t('st_overdue'); cc = 'bad'; }
  else if (s.days === 0) { chip = t('st_today'); cc = 'warn'; }
  else { chip = t('st_in', { n: s.days }); cc = s.days <= 7 ? 'warn' : 'info'; }
  let sub, pct, bc = '';
  if (l.kind === 'card') { pct = l.limit > 0 ? Math.min(100, Math.round(l.balance / l.limit * 100)) : 0; sub = s.closed ? t('loan_closed') : l.limit > 0 ? t('card_line', { p: pct, x: money(l.limit, l.cur) }) : ''; bc = 'w'; }
  else { pct = l.n0 > 0 ? Math.max(0, Math.min(100, Math.round((l.n0 - l.left) / l.n0 * 100))) : 0; sub = s.closed ? t('loan_closed') : t('l_left_line', { n: l.left, d: fmtUntil(addYM(s.dueYm, Math.max(0, l.left - 1))) }); if (s.closed) pct = 100; }
  return `<section class="card"><button type="button" class="lh" data-a="loanEdit" data-id="${l.id}"><b>${esc(l.name)}</b><span class="chip ${cc}">${esc(chip)}</span></button>
  ${sub ? `<span class="small muted">${esc(sub)}</span>` : ''}<div class="bar"><i class="${bc}" style="width:${pct}%"></i></div>
  ${s.closed ? '' : `<div class="lf"><span class="m"><span>${esc(t('payment'))}</span><b>${money(s.amount, l.cur)}, ${esc(fmtDate(s.due, { day: 'numeric', month: 'long' }))}</b></span><span class="m r"><span>${esc(t(l.kind === 'card' ? 'debt' : 'remaining'))}</span><b>${money(l.balance, l.cur)}</b></span></div>
  ${s.paid ? '' : `<button type="button" class="btn small sec wide" data-a="loanPay" data-id="${l.id}">${esc(t('pay'))}</button>`}`}</section>`;
}

SCR.settings = () => {
  const st = S.settings, m = getMeta() || {};
  const si = i => `<span class="si">${svg(i, 20)}</span>`;
  const chev = `<span class="chev">${svg('chevR', 16, 2.2)}</span>`;
  const row = (a, i, l, r = '') => `<button type="button" class="rowb" data-a="${a}">${si(i)}<span class="l">${esc(l)}</span><span class="r">${esc(r)}</span>${chev}</button>`;
  const link = (href, i, l, r = '') => `<a class="rowb" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${si(i)}<span class="l">${esc(l)}</span><span class="r">${esc(r)}</span>${chev}</a>`;
  const sw = (a, i, l, on) => `<div class="rowb">${si(i)}<span class="l" id="lb_${a}">${esc(l)}</span><button type="button" class="switch" role="switch" aria-checked="${!!on}" aria-labelledby="lb_${a}" data-a="${a}"><i></i></button></div>`;
  const grp = (title, inner) => `<div class="grp"><span class="gt">${esc(title)}</span><div class="rows">${inner}</div></div>`;
  const bug = `mailto:${MAIL}?subject=${encodeURIComponent(t('bug_subj'))}&body=${encodeURIComponent(t('bug_body', { v: VERSION, l: lang, ua: navigator.userAgent }))}`;
  return `<div class="top"><div class="tl"><button type="button" class="ibtn" data-a="back" aria-label="${esc(t('back'))}">${svg('chevL', 18, 2.2)}</button><h1>${esc(t('settings'))}</h1></div></div>
  <div class="grp"><span class="gt">${esc(t('language'))}</span><div class="seg">${['uk', 'ru', 'en'].map(l => `<button type="button" class="${lang === l ? 'on' : ''}" data-a="lang" data-l="${l}" lang="${l}">${LANGN[l]}</button>`).join('')}</div></div>
  ${grp(t('general'), row('mainCur', 'money', t('main_cur'), `${st.base} ${sym(st.base)}`) + row('opCurs', 'swap', t('op_curs'), st.curs.join(', ')) + sw('dark', 'moon', t('dark'), st.theme === 'dark'))}
  ${grp(t('security'), row('changePin', 'lock', t('change_pin')) + sw('bio', 'face', t('bio'), !!m.bio) + row('autolock', 'clock', t('autolock'), t('al_' + st.autolock)) + sw('hideStart', 'eye', t('hide_start'), st.hideStart))}
  ${grp(t('accounting'), row('cats', 'grid', t('categories'), String(S.cats.length)) + row('tpls', 'bolt', t('templates'), String(S.tpls.length)) + row('method', 'bank', t('aside_set'), t(METH[st.method])))}
  ${grp(t('data'), row('csv', 'download', t('export_csv')) + row('backup', 'save', t('backup'), st.lastBackup ? fmtDate(st.lastBackup, { day: 'numeric', month: 'short' }) : t('never')) + row('restore', 'restore', t('restore')))}
  ${grp(t('contact'), link(TG, 'send', t('tg'), TG_NAME) + link(`mailto:${MAIL}?subject=${encodeURIComponent(t('mail_subj'))}`, 'mail', t('email'), MAIL) + link(bug, 'bug', t('bug')))}
  <button type="button" class="btn danger" data-a="wipe">${esc(t('wipe'))}</button>
  <div class="foot"><b>${esc(t('foot1', { v: VERSION }))}</b><span>${esc(t('foot2'))}</span></div>`;
};

/* ---------- actions ---------- */
A.go = d => go(d.r);
A.goStats = () => { ui.stats = { p: 'month', off: 0 }; go('stats'); };
A.goLoans = () => { ui.plans = 'loans'; go('plans'); };
A.settings = () => go('settings');
A.back = () => go(ui.prev && ui.prev !== 'settings' ? ui.prev : 'home');
A.add = () => txSheet(null);
A.eye = () => { ui.hidden = !ui.hidden; render(); };
A.hm = d => { ui.hist.ym = addYM(ui.hist.ym, +d.d); render(); };
A.hf = d => { ui.hist.f = d.f; $('#hl').innerHTML = histList(); document.querySelectorAll('[data-a=hf]').forEach(b => b.classList.toggle('on', b.dataset.f === d.f)); };
A.sp = d => { ui.stats = { p: d.p, off: 0 }; render(); };
A.so = d => { ui.stats.off += +d.d; render(); };
A.pt = d => { ui.plans = d.t; render(); };
A.tx = d => { const x = S.tx.find(y => y.id === d.id); if (!x) return; if (x.type === 'goal' || x.type === 'adj') simpleTxSheet(x); else txSheet(x); };
A.tpl = d => {
  const p = S.tpls.find(q => q.id === d.id); if (!p) return;
  const c = catById(p.cat), note = p.name !== catName(c) ? p.name : '';
  if (p.amount > 0) {
    const x = { id: uid(), type: p.type, amount: p.amount, cur: p.cur, cat: p.cat, d: today(), t: nowT(), note, ts: Date.now() };
    S.tx.push(x); save(); render();
    toast(t('added', { x: p.name }), () => { S.tx = S.tx.filter(y => y !== x); save(); render(); });
  } else txSheet(null, { type: p.type, cat: p.cat, cur: p.cur, note });
};
A.tpls = () => tplsSheet();
A.cats = () => catsSheet();
A.method = () => choiceSheet(t('method'), Object.keys(METH).map(k => ({ v: k, label: t(METH[k]), desc: t(METH[k] + '_d') })), S.settings.method, v => { S.settings.method = v; save(); render(); });
A.adjust = () => {
  const cur = S.settings.base, b = balances()[cur] || 0;
  openSheet({ title: t('adjust'), body: `<p class="small muted">${esc(t('adjust_sub'))}</p>${field(t('actual_balance', { cur: sym(cur) }), `<input class="input big" id="ab" inputmode="decimal" autocomplete="off" value="${ui.hidden ? '' : esc(numIn(r2(b)))}">`, 'ab')}<button type="button" class="btn" data-s="ok">${esc(t('save'))}</button>`,
    acts: { ok: () => {
      const raw = $('#ab').value.trim(), neg = /^[-−]/.test(raw);
      let v = parseNum(raw.replace(/^[-−]/, ''));
      if (isNaN(v)) { toast(t('need_amount')); return; }
      if (neg) v = -v;
      const diff = r2(v - b);
      if (Math.abs(diff) > 0.004) S.tx.push({ id: uid(), type: 'adj', amount: diff, cur, d: today(), t: nowT(), ts: Date.now() });
      save(); closeSheet(true); render(); toast(t('saved'));
    } } });
};
A.goalNew = () => goalEdit(null);
A.goalEdit = d => goalEdit(S.goals.find(g => g.id === d.id));
A.goalTop = d => {
  const g = S.goals.find(x => x.id === d.id); if (!g) return;
  amountSheet(t('top_up_t', { name: g.name }), g.cur, null, v => {
    g.saved = r2(g.saved + v);
    S.tx.push({ id: uid(), type: 'goal', goal: g.id, amount: v, cur: g.cur, d: today(), t: nowT(), ts: Date.now() });
    save(); render(); toast(t('saved'));
  });
};
A.loanNew = () => loanEdit(null);
A.loanEdit = d => loanEdit(S.loans.find(l => l.id === d.id));
A.loanPay = d => {
  const l = S.loans.find(x => x.id === d.id); if (!l) return;
  const s = loanStatus(l); if (s.closed) return;
  amountSheet(t('pay_t', { name: l.name }), l.cur, s.amount, v => {
    S.tx.push({ id: uid(), type: 'exp', amount: v, cur: l.cur, cat: 'loans', d: today(), t: nowT(), note: l.name, ts: Date.now() });
    l.balance = r2(Math.max(0, l.balance - v));
    if (l.kind === 'loan') l.left = Math.max(0, l.left - 1);
    l.lastPaid = s.dueYm;
    save(); render();
    toast(loanStatus(l).closed ? t('loan_closed') : t('paid_toast'));
  });
};
A.lang = d => { S.settings.lang = d.l; applySettings(); save(); render(); };
A.dark = () => { S.settings.theme = S.settings.theme === 'dark' ? 'light' : 'dark'; applySettings(); save(); render(); };
A.hideStart = () => { S.settings.hideStart = !S.settings.hideStart; save(); render(); };
A.autolock = () => choiceSheet(t('autolock'), [0, 60, 300, 900].map(v => ({ v, label: t('al_' + v) })), S.settings.autolock, v => { S.settings.autolock = +v; save(); render(); });
A.mainCur = () => choiceSheet(t('main_cur'), Object.keys(CURS).map(c => ({ v: c, label: `${c} ${sym(c)}` })), S.settings.base, v => {
  S.settings.base = v; if (!S.settings.curs.includes(v)) S.settings.curs.unshift(v); save(); render();
});
A.opCurs = () => {
  const draw = () => Object.keys(CURS).map(c => { const on = S.settings.curs.includes(c), lk = c === S.settings.base; return `<button type="button" class="opt row ${on ? 'on' : ''}" data-s="c" data-v="${c}" aria-pressed="${on}" ${lk ? 'disabled' : ''}><b>${c} ${esc(sym(c))}</b><span class="ck">${on ? svg('check', 18, 2.4) : ''}</span></button>`; }).join('');
  openSheet({ title: t('op_curs'), body: `<div class="opts" id="cl">${draw()}</div>`, onClose: render,
    acts: { c: d => { const a = S.settings.curs, i = a.indexOf(d.v); if (i >= 0) a.splice(i, 1); else a.push(d.v); save(); $('#cl').innerHTML = draw(); } } });
};
A.changePin = () => changePin();
A.bio = async () => {
  const m = getMeta();
  if (m.bio) { delete m.bio; setMeta(m); toast(t('bio_off')); render(); return; }
  if (!bioOK) { toast(t('bio_unsup')); return; }
  try {
    busyExt = true;
    const r = await bioCreate();
    if (r === true) toast(t('bio_on'));
    else toast(t('bio_confirm'), async () => { try { busyExt = true; await bioFinish(r); toast(t('bio_on')); } catch (e) { toast(t('bio_fail2')); } finally { busyExt = false; render(); } }, t('confirm'), 15000);
  } catch (e) { toast(e && e.message === 'noprf' ? t('bio_unsup') : t('bio_fail2')); }
  finally { setTimeout(() => { busyExt = false; }, 800); }
  render();
};
A.csv = () => {
  openSheet({ title: t('export_csv'), body: `<p>${esc(t('csv_warn'))}</p><button type="button" class="btn" data-s="go">${esc(t('export'))}</button>`,
    acts: { go: () => {
      const dn = decSep(), q = s => { s = String(s ?? ''); return /[;"\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
      const rows = [t('csv_head')];
      [...S.tx].sort((a, b) => a.d.localeCompare(b.d) || (a.ts || 0) - (b.ts || 0)).forEach(x => {
        const type = x.type === 'inc' ? t('income') : x.type === 'exp' ? t('expense') : x.type === 'goal' ? t('type_goal') : t('type_adj');
        const cat = flows(x) ? catName(catById(x.cat)) : x.type === 'goal' ? ((S.goals.find(g => g.id === x.goal) || {}).name || '') : '';
        const neg = x.type === 'exp' || x.type === 'goal' || (x.type === 'adj' && x.amount < 0);
        rows.push([x.d, x.t || '', type, cat, (neg ? '-' : '') + String(Math.abs(x.amount)).replace('.', dn), x.cur, x.note || ''].map(q).join(';'));
      });
      deliverFile(`moneyflow-${today()}.csv`, new Blob(['\ufeff' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' })).then(ok => { if (ok) closeSheet(true); });
    } } });
};
A.backup = () => backupSheet();
A.restore = async () => {
  const f = await pickFile(); if (!f) return;
  let o; try { o = await readBackup(f); } catch (e) { toast(t('rs_bad')); return; }
  restorePw(o, data => confirmSheet(t('rs_q'), t('restore'), false, () => {
    S = data; migrate(); applySettings(); save(); ui.hidden = false; go('home'); toast(t('rs_done'));
  }));
};
A.wipe = () => confirmSheet(t('wipe_q'), t('wipe'), true, wipeAll);
function wipeAll() { Object.values(LS).forEach(k => localStorage.removeItem(k)); location.reload(); }

/* ---------- sheets ---------- */
function txSheet(x0, preset) {
  const src = x0 || preset || {};
  const st = { type: src.type === 'inc' ? 'inc' : 'exp', amt: src.amount ? numIn(src.amount).replace('.', ',') : '', cur: src.cur || S.settings.base, cat: src.cat || null, d: x0 ? x0.d : today(), note: src.note || '' };
  const fixCat = () => { const c = S.cats.find(c => c.id === st.cat); if (!c || c.type !== st.type) st.cat = (S.cats.find(c => c.type === st.type) || {}).id; };
  fixCat();
  const amtTxt = () => {
    if (!st.amt) return '0';
    const [i, f] = st.amt.split(',');
    return (i ? num(parseInt(i, 10)) : '0') + (st.amt.includes(',') ? decSep() + (f || '') : '');
  };
  const cats = () => S.cats.filter(c => c.type === st.type).map(c => `<button type="button" class="cat ${st.cat === c.id ? 'on' : ''}" data-s="cat" data-id="${c.id}" aria-pressed="${st.cat === c.id}">${icoH(c.icon, c.color, 's')}<span>${esc(catName(c))}</span></button>`).join('');
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'];
  const press = k => {
    let a = st.amt;
    if (k === 'del') a = a.slice(0, -1);
    else if (k === ',') { if (!a.includes(',')) a = (a || '0') + ','; }
    else {
      if (a.includes(',') && a.split(',')[1].length >= 2) return;
      if (a.replace(',', '').length >= 10) return;
      a = (a === '0' ? '' : a) + k;
    }
    st.amt = a; $('#an').textContent = amtTxt();
  };
  const doSave = () => {
    const v = parseNum(st.amt);
    if (!(v > 0)) { toast(t('need_amount')); return; }
    st.note = $('#ni').value.trim().slice(0, 80);
    if (x0) Object.assign(x0, { type: st.type, amount: r2(v), cur: st.cur, cat: st.cat, d: st.d, note: st.note });
    else S.tx.push({ id: uid(), type: st.type, amount: r2(v), cur: st.cur, cat: st.cat, d: st.d, t: nowT(), note: st.note, ts: Date.now() });
    save(); closeSheet(true); render(); toast(t('saved'));
  };
  openSheet({
    title: t(x0 ? 'edit_op' : 'new_op'), full: true,
    body: `<div class="seg">${['exp', 'inc'].map(k => `<button type="button" class="${st.type === k ? 'on' : ''}" data-s="type" data-v="${k}">${esc(t(k === 'exp' ? 'expense' : 'income'))}</button>`).join('')}</div>
    <div class="amount"><div class="num" id="an" aria-live="polite">${amtTxt()}</div><button type="button" class="pill" data-s="cur" aria-label="${esc(t('currency'))}"><span id="cu">${st.cur} ${esc(sym(st.cur))}</span>${S.settings.curs.length > 1 ? svg('swap', 14, 2.2) : ''}</button></div>
    <div class="cats" id="cg">${cats()}</div>
    <div class="grid2"><label class="pill date">${svg('cal', 16)}<span id="dl">${esc(dayLabel(st.d))}</span><input type="date" id="di" value="${st.d}" aria-label="${esc(t('date'))}"></label><input class="input sm" id="ni" placeholder="${esc(t('note'))}" aria-label="${esc(t('note'))}" value="${esc(st.note)}" maxlength="80" autocomplete="off"></div>
    <div class="keys">${keys.map(k => `<button type="button" class="key" data-s="key" data-k="${k}" ${k === 'del' ? `aria-label="${esc(t('erase'))}"` : ''}>${k === 'del' ? svg('backspace', 22, 1.8) : k === ',' ? decSep() : k}</button>`).join('')}</div>
    <button type="button" class="btn" data-s="save">${esc(t('save'))}</button>
    ${x0 ? `<button type="button" class="btn danger" data-s="del">${esc(t('del'))}</button>` : ''}`,
    acts: {
      type: (d, el) => { st.type = d.v; fixCat(); el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === st.type)); $('#cg').innerHTML = cats(); },
      cat: d => { st.cat = d.id; $('#cg').querySelectorAll('.cat').forEach(b => { const on = b.dataset.id === d.id; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); }); },
      cur: () => { const a = S.settings.curs.includes(st.cur) ? S.settings.curs : [st.cur, ...S.settings.curs]; st.cur = a[(a.indexOf(st.cur) + 1) % a.length]; $('#cu').textContent = `${st.cur} ${sym(st.cur)}`; },
      key: d => press(d.k),
      save: doSave,
      del: () => {
        const i = S.tx.indexOf(x0); if (i < 0) return;
        S.tx.splice(i, 1); save(); closeSheet(true); render();
        toast(t('deleted'), () => { S.tx.splice(i, 0, x0); save(); render(); });
      }
    },
    onMount: bd => { bd.querySelector('#di').addEventListener('change', e => { st.d = e.target.value || today(); $('#dl').textContent = dayLabel(st.d); }); },
    key: e => {
      if (/^\d$/.test(e.key)) press(e.key);
      else if (e.key === ',' || e.key === '.') press(',');
      else if (e.key === 'Backspace') press('del');
      else if (e.key === 'Enter') doSave();
      else return;
      e.preventDefault();
    }
  });
}
function simpleTxSheet(x) {
  const v = txView(x);
  openSheet({ title: t('edit_op'), body: `<div class="list"><div class="item">${icoH(v.icon, v.color)}<span class="m"><b>${esc(v.name)}</b><span>${esc(fmtDate(x.d, { day: 'numeric', month: 'long', year: 'numeric' }))}</span></span><span class="amt ${v.inc ? 'inc' : ''}">${v.amt}</span></div></div><button type="button" class="btn danger" data-s="del">${esc(t('del'))}</button>`,
    acts: { del: () => {
      const i = S.tx.indexOf(x); if (i < 0) return;
      const g = x.type === 'goal' ? S.goals.find(g => g.id === x.goal) : null;
      S.tx.splice(i, 1); if (g) g.saved = r2(Math.max(0, g.saved - x.amount));
      save(); closeSheet(true); render();
      toast(t('deleted'), () => { S.tx.splice(i, 0, x); if (g) g.saved = r2(g.saved + x.amount); save(); render(); });
    } } });
}
function goalEdit(g) {
  openSheet({ title: t(g ? 'edit_goal' : 'new_goal'),
    body: `${field(t('name'), `<input class="input" id="gn" maxlength="30" autocomplete="off" value="${esc(g ? g.name : '')}">`, 'gn')}
    ${field(t('goal_target'), `<input class="input" id="gt" inputmode="decimal" autocomplete="off" value="${esc(g ? numIn(g.target) : '')}">`, 'gt')}
    ${field(t('goal_saved'), `<input class="input" id="gs" inputmode="decimal" autocomplete="off" value="${esc(g ? numIn(g.saved) : '')}">`, 'gs')}
    ${field(t('currency'), curSelect('gc', g ? g.cur : S.settings.base), 'gc')}
    ${field(t('deadline'), `<input class="input" id="gd" type="month" value="${g && g.deadline ? g.deadline : ''}">`, 'gd')}
    <p class="small muted">${esc(t('deadline_hint'))}</p>
    <button type="button" class="btn" data-s="save">${esc(t('save'))}</button>${g ? `<button type="button" class="btn danger" data-s="del">${esc(t('del'))}</button>` : ''}`,
    acts: {
      save: () => {
        const name = $('#gn').value.trim(), target = parseNum($('#gt').value), saved = parseNum($('#gs').value) || 0;
        if (!name) { toast(t('name_req')); return; }
        if (!(target > 0)) { toast(t('need_amount')); return; }
        const v = { name, target: r2(target), saved: r2(Math.max(0, saved)), cur: $('#gc').value, deadline: /^\d{4}-\d{2}$/.test($('#gd').value) ? $('#gd').value : null };
        if (g) Object.assign(g, v); else S.goals.push(Object.assign({ id: uid(), icon: 'target', color: S.goals.length % PAL.length }, v));
        save(); closeSheet(true); render(); toast(t('saved'));
      },
      del: () => confirmSheet(t('del_q', { name: g.name }), t('del'), true, () => { S.goals = S.goals.filter(x => x !== g); save(); render(); toast(t('deleted')); })
    } });
}
function loanEdit(l) {
  const v = l ? { ...l } : { kind: 'loan', name: '', balance: '', payment: '', day: '', left: '', limit: '', cur: S.settings.base };
  const collect = () => {
    const q = id => { const e = $('#' + id); return e ? e.value : undefined; };
    v.name = q('ln') ?? v.name; v.balance = q('lb') ?? v.balance; v.payment = q('lp') ?? v.payment; v.day = q('ld') ?? v.day;
    if (q('ll') !== undefined) v.left = q('ll'); if (q('lm') !== undefined) v.limit = q('lm'); v.cur = q('lc') ?? v.cur;
  };
  const body = () => `<div class="seg">${['loan', 'card'].map(k => `<button type="button" class="${v.kind === k ? 'on' : ''}" data-s="kind" data-v="${k}">${esc(t(k === 'loan' ? 'k_loan' : 'k_card'))}</button>`).join('')}</div>
    ${field(t('name'), `<input class="input" id="ln" maxlength="30" autocomplete="off" value="${esc(v.name)}">`, 'ln')}
    ${field(t('l_balance'), `<input class="input" id="lb" inputmode="decimal" autocomplete="off" value="${esc(numIn(v.balance))}">`, 'lb')}
    ${field(t(v.kind === 'card' ? 'l_min' : 'l_payment'), `<input class="input" id="lp" inputmode="decimal" autocomplete="off" value="${esc(numIn(v.payment))}">`, 'lp')}
    ${field(t('l_day'), `<input class="input" id="ld" inputmode="numeric" autocomplete="off" value="${esc(v.day)}">`, 'ld')}
    ${v.kind === 'loan' ? field(t('l_left'), `<input class="input" id="ll" inputmode="numeric" autocomplete="off" value="${esc(v.left)}">`, 'll') : field(t('l_limit'), `<input class="input" id="lm" inputmode="decimal" autocomplete="off" value="${esc(numIn(v.limit))}">`, 'lm')}
    ${field(t('currency'), curSelect('lc', v.cur), 'lc')}
    ${!l ? `<label class="check"><input type="checkbox" id="lpn"><span>${esc(t('l_paid_now'))}</span></label>` : ''}
    <button type="button" class="btn" data-s="save">${esc(t('save'))}</button>${l ? `<button type="button" class="btn danger" data-s="del">${esc(t('del'))}</button>` : ''}`;
  openSheet({ title: t(l ? 'edit_loan' : 'new_loan'), body: body(),
    acts: {
      kind: d => { collect(); v.kind = d.v; sheetBody().innerHTML = body(); },
      save: () => {
        collect();
        const name = String(v.name).trim(), bal = parseNum(v.balance), pay = parseNum(v.payment), day = parseInt(v.day, 10);
        const left = parseInt(v.left, 10), lim = parseNum(v.limit);
        if (!name) { toast(t('name_req')); return; }
        if (!(bal >= 0) || !(pay > 0)) { toast(t('need_amount')); return; }
        if (!(day >= 1 && day <= 31)) { toast(t('bad_day')); return; }
        if (v.kind === 'loan' && !(left >= 1) && !(l && left === 0)) { toast(t('bad_left')); return; }
        const o = { name, kind: v.kind, balance: r2(bal), payment: r2(pay), day, cur: v.cur, left: v.kind === 'loan' ? left : 0, limit: v.kind === 'card' && lim > 0 ? r2(lim) : null };
        if (l) { Object.assign(l, o); if (l.kind === 'loan' && (!l.n0 || l.left > l.n0)) l.n0 = l.left; }
        else { const pn = $('#lpn') && $('#lpn').checked; S.loans.push(Object.assign({ id: uid(), n0: o.left, lastPaid: pn ? ymOf(today()) : null }, o)); }
        save(); closeSheet(true); ui.plans = 'loans'; render(); toast(t('saved'));
      },
      del: () => confirmSheet(t('del_q', { name: l.name }), t('del'), true, () => { S.loans = S.loans.filter(x => x !== l); save(); render(); toast(t('deleted')); })
    } });
}
function catsSheet() {
  const base = S.settings.base;
  const grp = (type, title) => `<div class="grp"><span class="gt">${esc(title)}</span><div class="list">${S.cats.filter(c => c.type === type).map(c => `<button type="button" class="item" data-s="e" data-id="${c.id}">${icoH(c.icon, c.color, 's')}<span class="m"><b>${esc(catName(c))}</b>${type === 'exp' ? `<span>${c.limit ? esc(t('lim_month', { cur: sym(base) })) + ': ' + money(c.limit, base) : esc(t('no_lim'))}</span>` : ''}</span>${svg('chevR', 16, 2.2)}</button>`).join('')}</div><button type="button" class="btn sec" data-s="new" data-t="${type}">${svg('plus', 16, 2.4)} ${esc(t('new_cat'))}</button></div>`;
  openSheet({ title: t('categories'), body: grp('exp', t('exp_cats')) + grp('inc', t('inc_cats')), acts: { e: d => catEdit(catById(d.id)), new: d => catEdit(null, d.t) } });
}
function catEdit(c, type) {
  const st = { icon: c ? c.icon : 'dots', color: c ? c.color : 0 };
  const ty = c ? c.type : type, sys = c && ['other', 'other_inc', 'loans'].includes(c.id);
  const icons = () => CAT_ICONS.map(i => `<button type="button" class="pick ${st.icon === i ? 'on' : ''}" data-s="ic" data-v="${i}" aria-label="${i}" aria-pressed="${st.icon === i}">${svg(i, 20, 2, col(st.color))}</button>`).join('');
  const colors = () => PAL.map((_, i) => `<button type="button" class="sw ${st.color === i ? 'on' : ''}" data-s="co" data-v="${i}" style="background:${col(i)}" aria-label="${esc(t('color'))} ${i + 1}" aria-pressed="${st.color === i}"></button>`).join('');
  openSheet({ title: t(c ? 'edit_cat' : 'new_cat'),
    body: `${field(t('name'), `<input class="input" id="cn" maxlength="24" autocomplete="off" value="${esc(c ? catName(c) : '')}">`, 'cn')}
    <div class="field"><span class="flab">${esc(t('icon'))}</span><div class="picks" id="pi">${icons()}</div></div>
    <div class="field"><span class="flab">${esc(t('color'))}</span><div class="sws" id="pc">${colors()}</div></div>
    ${ty === 'exp' ? field(t('lim_month', { cur: sym(S.settings.base) }), `<input class="input" id="cl" inputmode="decimal" autocomplete="off" placeholder="${esc(t('no_lim'))}" value="${c && c.limit ? esc(numIn(c.limit)) : ''}">`, 'cl') : ''}
    <button type="button" class="btn" data-s="save">${esc(t('save'))}</button>${c && !sys ? `<button type="button" class="btn danger" data-s="del">${esc(t('del'))}</button>` : ''}`,
    onClose: catsSheet,
    acts: {
      ic: d => { st.icon = d.v; $('#pi').innerHTML = icons(); },
      co: d => { st.color = +d.v; $('#pi').innerHTML = icons(); $('#pc').innerHTML = colors(); },
      save: () => {
        const name = $('#cn').value.trim(); if (!name) { toast(t('name_req')); return; }
        const lim = ty === 'exp' ? parseNum($('#cl').value) : NaN;
        if (c) { if (name !== catName(c)) c.name = name; c.icon = st.icon; c.color = st.color; if (ty === 'exp') c.limit = lim > 0 ? r2(lim) : null; }
        else S.cats.push({ id: uid(), type: ty, name, icon: st.icon, color: st.color, limit: lim > 0 ? r2(lim) : null });
        save(); render(); catsSheet();
      },
      del: () => {
        const fb = ty === 'exp' ? 'other' : 'other_inc';
        confirmSheet(t('cat_moved', { x: catName(catById(fb)) }), t('del'), true, () => {
          S.tx.forEach(x => { if (x.cat === c.id) x.cat = fb; }); S.tpls.forEach(p => { if (p.cat === c.id) p.cat = fb; });
          S.cats = S.cats.filter(z => z !== c); save(); render(); catsSheet();
        });
      }
    } });
}
function tplsSheet() {
  openSheet({ title: t('templates'),
    body: `${S.tpls.length ? `<div class="list">${S.tpls.map(p => { const c = catById(p.cat); return `<button type="button" class="item" data-s="e" data-id="${p.id}">${icoH(c.icon, c.color, 's')}<span class="m"><b>${esc(p.name)}</b><span>${esc(catName(c))}</span></span><span class="amt ${p.type === 'inc' ? 'inc' : ''}">${p.amount > 0 ? money(p.amount, p.cur, p.type === 'inc' ? '+' : '−') : ''}</span></button>`; }).join('')}</div>` : `<p class="empty">${esc(t('no_tpls'))}</p>`}
    <p class="small muted">${esc(t('tpl_hint'))}</p><button type="button" class="btn" data-s="new">${svg('plus', 16, 2.4)} ${esc(t('new_tpl'))}</button>`,
    acts: { e: d => tplEdit(S.tpls.find(p => p.id === d.id)), new: () => tplEdit(null) } });
}
function tplEdit(p) {
  const st = { type: p ? p.type : 'exp' };
  const opts = () => S.cats.filter(c => c.type === st.type).map(c => `<option value="${c.id}" ${p && p.cat === c.id ? 'selected' : ''}>${esc(catName(c))}</option>`).join('');
  openSheet({ title: t(p ? 'edit_tpl' : 'new_tpl'),
    body: `<div class="seg">${['exp', 'inc'].map(k => `<button type="button" class="${st.type === k ? 'on' : ''}" data-s="type" data-v="${k}">${esc(t(k === 'exp' ? 'expense' : 'income'))}</button>`).join('')}</div>
    ${field(t('name'), `<input class="input" id="tn" maxlength="20" autocomplete="off" value="${esc(p ? p.name : '')}">`, 'tn')}
    ${field(t('category'), `<select class="input" id="tc">${opts()}</select>`, 'tc')}
    ${field(t('tpl_amount'), `<input class="input" id="ta" inputmode="decimal" autocomplete="off" value="${p && p.amount ? esc(numIn(p.amount)) : ''}">`, 'ta')}
    ${field(t('currency'), curSelect('tcu', p ? p.cur : S.settings.base), 'tcu')}
    <button type="button" class="btn" data-s="save">${esc(t('save'))}</button>${p ? `<button type="button" class="btn danger" data-s="del">${esc(t('del'))}</button>` : ''}`,
    onClose: tplsSheet,
    acts: {
      type: (d, el) => { st.type = d.v; el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === st.type)); $('#tc').innerHTML = opts(); },
      save: () => {
        const name = $('#tn').value.trim(); if (!name) { toast(t('name_req')); return; }
        const amt = parseNum($('#ta').value);
        const o = { type: st.type, name, cat: $('#tc').value, amount: amt > 0 ? r2(amt) : null, cur: $('#tcu').value };
        if (p) Object.assign(p, o); else S.tpls.push(Object.assign({ id: uid() }, o));
        save(); render(); tplsSheet();
      },
      del: () => { S.tpls = S.tpls.filter(x => x !== p); save(); render(); tplsSheet(); }
    } });
}
function backupSheet() {
  let file = null;
  openSheet({ title: t('backup'),
    body: `<p class="small muted">${esc(t('bk_pw_sub'))}</p>
    ${field(t('bk_pw'), `<input class="input" id="p1" type="password" autocomplete="new-password">`, 'p1')}
    ${field(t('bk_pw2'), `<input class="input" id="p2" type="password" autocomplete="new-password">`, 'p2')}
    <button type="button" class="btn" data-s="go">${esc(t('export'))}</button>`,
    acts: {
      go: async (d, el) => {
        const a = $('#p1').value, b = $('#p2').value;
        if (a.length < 6) { toast(t('pw_short')); return; }
        if (a !== b) { toast(t('pw_mismatch')); return; }
        el.disabled = true; el.textContent = t('working');
        try {
          const salt = rnd(16), k = await pbkdf(a, salt, ITER);
          const data = await aesEnc(k, enc.encode(JSON.stringify(S)));
          const body = { app: 'MoneyFlow', fmt: 1, created: new Date().toISOString(), kdf: { name: 'PBKDF2-SHA256', iter: ITER, salt: b64(salt) }, data };
          file = { name: `moneyflow-backup-${today()}.json`, blob: new Blob([JSON.stringify(body)], { type: 'application/json' }) };
          sheetBody().innerHTML = `<p>${esc(t('bk_ready'))}</p><button type="button" class="btn" data-s="file">${svg('download', 18, 2.2)} ${esc(t('bk_file'))}</button>`;
        } catch (e) { console.error(e); toast(t('save_err')); el.disabled = false; el.textContent = t('export'); }
      },
      file: async () => {
        if (!file) return;
        const ok = await deliverFile(file.name, file.blob);
        if (ok) { S.settings.lastBackup = today(); save(); closeSheet(true); render(); toast(t('bk_done')); }
      }
    } });
}
async function readBackup(f) {
  if (f.size > 20 * 1024 * 1024) throw new Error('big');
  const o = JSON.parse(await f.text());
  if (!o || o.app !== 'MoneyFlow' || !o.data || !o.kdf || !o.kdf.salt) throw new Error('fmt');
  const it = +o.kdf.iter; if (!(it >= 100000 && it <= 5000000)) throw new Error('kdf');
  return o;
}
function restorePw(o, onOk) {
  openSheet({ title: t('restore'),
    body: `${field(t('rs_pw'), `<input class="input" id="rp" type="password" autocomplete="current-password">`, 'rp')}<button type="button" class="btn" data-s="go">${esc(t('rs_open'))}</button>`,
    acts: { go: async (d, el) => {
      el.disabled = true; el.textContent = t('working');
      try {
        const k = await pbkdf($('#rp').value, unb64(o.kdf.salt), +o.kdf.iter);
        const data = JSON.parse(dec.decode(await aesDec(k, o.data)));
        if (!data || !Array.isArray(data.tx) || !data.settings) throw new Error('bad');
        closeSheet(true); onOk(data);
      } catch (e) { toast(t('rs_bad')); el.disabled = false; el.textContent = t('rs_open'); }
    } } });
}

/* ---------- lock, pin & onboarding ---------- */
function mountPad(L, o) {
  let v = '', busy = false;
  L.innerHTML = `<div class="logo">${svg(o.icon || 'logo', 38, 2.2, '#fff')}</div><b class="lt">MoneyFlow</b><span class="ls" id="pt">${esc(o.title)}</span>${o.sub ? `<span class="lsub">${esc(o.sub)}</span>` : ''}
  <div class="dots" id="pd" role="img" aria-label="0/6">${'<i></i>'.repeat(6)}</div><div class="lmsg" id="pm" role="alert"></div>
  <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => `<button type="button" class="pk" data-k="${n}">${n}</button>`).join('')}${o.bio ? `<button type="button" class="pk ghost" data-k="bio" aria-label="${esc(t('bio_btn'))}">${svg('face', 30, 1.8)}</button>` : '<span></span>'}<button type="button" class="pk" data-k="0">0</button><button type="button" class="pk ghost" data-k="del" aria-label="${esc(t('erase'))}">${svg('backspace', 28, 1.8)}</button></div>
  <div class="lbot">${o.bottom || ''}</div>`;
  const pd = $('#pd', L), dots = [...pd.querySelectorAll('i')];
  const paint = () => { dots.forEach((d, i) => d.classList.toggle('f', i < v.length)); pd.setAttribute('aria-label', `${v.length}/6`); };
  const api = {
    setMsg: m => { const e = $('#pm', L); if (e) e.textContent = m || ''; },
    setTitle: s => { const e = $('#pt', L); if (e) e.textContent = s; },
    reset: (m, shake) => { v = ''; paint(); api.setMsg(m); if (shake) { pd.classList.remove('shake'); void pd.offsetWidth; pd.classList.add('shake'); if (navigator.vibrate) navigator.vibrate(60); } },
    press: async k => {
      if (busy) return;
      if (k === 'bio') { if (o.onBio) o.onBio(api); return; }
      if (k === 'del') { v = v.slice(0, -1); paint(); return; }
      if (!/^\d$/.test(k)) { if (o.onAction) o.onAction(k); return; }
      if (v.length >= 6) return;
      v += k; paint();
      if (v.length === 6) {
        busy = true; const p = v;
        await new Promise(r => setTimeout(r, 90));
        try { await o.onPin(p, api); } catch (e) { console.error(e); } finally { busy = false; }
      }
    }
  };
  L.onclick = e => { const b = e.target.closest('[data-k]'); if (b && !b.disabled) api.press(b.dataset.k); };
  currentPad = api;
  return api;
}
function showLockEl() { const L = $('#lock'); L.classList.remove('hidden'); return L; }
function hideLock() { const L = $('#lock'); L.classList.add('hidden'); L.innerHTML = ''; L.onclick = null; currentPad = null; }
const waitLeft = m => m && m.until && Date.now() < m.until ? Math.ceil((m.until - Date.now()) / 1000) : 0;
function showLock() {
  const m = getMeta(), L = showLockEl();
  $('#ob').classList.add('hidden');
  const pad = mountPad(L, {
    title: t('enter_pin'), bio: !!(m && m.bio),
    bottom: `<button type="button" class="lk" data-k="forgot">${esc(t('forgot'))}</button>`,
    onPin: async (p, api) => {
      const mm = getMeta(), w = waitLeft(mm);
      if (w) { api.reset(t('wait_s', { s: w }), true); return; }
      let raw;
      try { raw = await aesDec(await pbkdf(p, unb64(mm.salt), mm.iter), mm.wrapPin); }
      catch (e) {
        mm.fails = (mm.fails || 0) + 1;
        if (mm.fails >= 5) mm.until = Date.now() + Math.min(3600, 30 * 2 ** (mm.fails - 5)) * 1000;
        setMeta(mm);
        const w2 = waitLeft(mm);
        api.reset(w2 ? t('wait_s', { s: w2 }) : t('wrong_pin'), true);
        return;
      }
      mm.fails = 0; mm.until = 0; setMeta(mm);
      await unlockWithRaw(raw);
    },
    onBio: async api => {
      try {
        busyExt = true;
        const mm = getMeta();
        const out = await bioGetPrf(unb64(mm.bio.id), unb64(mm.bio.salt));
        const raw = await aesDec(await prfKey(out), mm.bio.wrap);
        await unlockWithRaw(raw);
      } catch (e) { api.setMsg(t('bio_fail')); }
      finally { setTimeout(() => { busyExt = false; }, 800); }
    },
    onAction: k => { if (k === 'forgot') confirmSheet(t('forgot_t'), t('forgot_btn'), true, wipeAll); }
  });
  const w = waitLeft(m); if (w) pad.setMsg(t('wait_s', { s: w }));
}
async function unlockWithRaw(raw) {
  rawKey = new Uint8Array(raw);
  DEK = await importKey(rawKey);
  const d = getJSON(LS.data);
  try { S = d ? JSON.parse(dec.decode(await aesDec(DEK, d))) : null; } catch (e) { S = null; console.error(e); }
  if (!S) S = defaults(lang, 'UAH');
  migrate(); applySettings();
  enterApp();
}
function enterApp() {
  hideLock(); $('#ob').classList.add('hidden');
  ui.hidden = !!S.settings.hideStart; ui.route = 'home'; ui.hist = { q: '', f: 'all', ym: ymOf(today()) };
  render(); window.scrollTo(0, 0);
}
function lock() {
  if (!S) return;
  closeSheet(true);
  if (rawKey) rawKey.fill(0);
  rawKey = null; DEK = null; S = null;
  $('#app').innerHTML = ''; $('#nav').classList.add('hidden'); $('#toast').classList.add('hidden');
  showLock();
}
const ob = { cur: 'UAH', start: '', restored: null };
function showWelcome() {
  hideLock();
  const el = $('#ob'); el.classList.remove('hidden');
  const r = ob.restored;
  el.innerHTML = `<div class="obw"><div class="logo">${svg('logo', 38, 2.2, '#fff')}</div><h1>${esc(t('ob_title'))}</h1><p class="muted">${esc(t('ob_sub'))}</p>
  <div class="field"><span class="flab">${esc(t('language'))}</span><div class="seg">${['uk', 'ru', 'en'].map(l => `<button type="button" class="${lang === l ? 'on' : ''}" data-o="lang" data-l="${l}" lang="${l}">${LANGN[l]}</button>`).join('')}</div></div>
  ${r ? `<p class="alert info" style="margin:0">${esc(t('restored_note'))}</p>` : `${field(t('main_cur'), `<select class="input" id="obc">${Object.keys(CURS).map(c => `<option value="${c}" ${c === ob.cur ? 'selected' : ''}>${c} ${esc(sym(c))}</option>`).join('')}</select>`, 'obc')}
  ${field(t('ob_start'), `<input class="input" id="obs" inputmode="decimal" autocomplete="off" value="${esc(ob.start)}">`, 'obs')}`}
  <button type="button" class="btn" data-o="next">${esc(t('ob_next'))}</button>${r ? '' : `<button type="button" class="btn sec" data-o="restore">${esc(t('ob_restore'))}</button>`}</div>`;
  const keep = () => { const c = $('#obc'), s = $('#obs'); if (c) ob.cur = c.value; if (s) ob.start = s.value; };
  el.onclick = async e => {
    const b = e.target.closest('[data-o]'); if (!b) return;
    const k = b.dataset.o;
    if (k === 'lang') { keep(); lang = b.dataset.l; nfCache = {}; document.documentElement.lang = lang; pref.lang = lang; savePref(pref); showWelcome(); }
    else if (k === 'next') { keep(); el.classList.add('hidden'); createPin(); }
    else if (k === 'restore') {
      keep();
      const f = await pickFile(); if (!f) return;
      let o; try { o = await readBackup(f); } catch (er) { toast(t('rs_bad')); return; }
      restorePw(o, data => { ob.restored = data; if (data.settings && I18N[data.settings.lang]) lang = data.settings.lang; showWelcome(); });
    }
  };
}
function createPin() {
  const L = showLockEl(); let first = null;
  mountPad(L, {
    title: t('create_pin'), sub: t('pin_warn'),
    bottom: `<button type="button" class="lk" data-k="back">${esc(t('back'))}</button>`,
    onAction: k => { if (k === 'back') showWelcome(); },
    onPin: async (p, api) => {
      if (first === null) { first = p; api.reset(''); api.setTitle(t('repeat_pin')); return; }
      if (p !== first) { first = null; api.reset(t('pin_mismatch'), true); api.setTitle(t('create_pin')); return; }
      api.setTitle(t('working'));
      await finishSetup(p);
    }
  });
}
async function finishSetup(pin) {
  const raw = rnd(32), salt = rnd(16);
  const meta = { v: 1, iter: ITER, salt: b64(salt), wrapPin: await aesEnc(await pbkdf(pin, salt, ITER), raw), fails: 0, until: 0 };
  rawKey = raw; DEK = await importKey(raw);
  if (ob.restored) { S = ob.restored; migrate(); S.settings.lang = lang; }
  else {
    S = defaults(lang, ob.cur);
    const st = parseNum(ob.start);
    if (st > 0) S.tx.push({ id: uid(), type: 'adj', amount: r2(st), cur: ob.cur, d: today(), t: nowT(), ts: Date.now() });
  }
  setMeta(meta);
  applySettings();
  await save();
  ob.restored = null; ob.start = '';
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch (e) { /* optional */ }
  if (bioOK) bioOffer(); else enterApp();
}
function bioOffer() {
  const L = showLockEl(); currentPad = null; let pend = null;
  const draw = msg => {
    L.innerHTML = `<div class="logo">${svg('face', 38, 2, '#fff')}</div><b class="lt">${esc(t('bio_q'))}</b><span class="lsub">${esc(t('bio_q_sub'))}</span><div class="lmsg" role="alert">${esc(msg || '')}</div>
    <div class="lbtns"><button type="button" class="btn" data-k="${pend ? 'fin' : 'en'}">${esc(t(pend ? 'confirm' : 'enable'))}</button><button type="button" class="lk" data-k="no">${esc(t('later'))}</button></div>`;
  };
  draw();
  L.onclick = async e => {
    const b = e.target.closest('[data-k]'); if (!b || b.disabled) return;
    const k = b.dataset.k;
    if (k === 'no') { enterApp(); return; }
    b.disabled = true; busyExt = true;
    try {
      if (k === 'en') { const r = await bioCreate(); if (r === true) { toast(t('bio_on')); enterApp(); return; } pend = r; draw(t('bio_confirm')); }
      else { await bioFinish(pend); toast(t('bio_on')); enterApp(); }
    } catch (er) { draw(er && er.message === 'noprf' ? t('bio_unsup') : t('bio_fail2')); }
    finally { setTimeout(() => { busyExt = false; }, 800); }
  };
}
function changePin() {
  const L = showLockEl(); let step = 0, np = null;
  mountPad(L, {
    title: t('old_pin'),
    bottom: `<button type="button" class="lk" data-k="cancel">${esc(t('cancel'))}</button>`,
    onAction: k => { if (k === 'cancel') hideLock(); },
    onPin: async (p, api) => {
      const m = getMeta();
      if (step === 0) {
        try { await aesDec(await pbkdf(p, unb64(m.salt), m.iter), m.wrapPin); step = 1; api.reset(''); api.setTitle(t('new_pin')); }
        catch (e) { api.reset(t('wrong_pin'), true); }
      } else if (step === 1) { np = p; step = 2; api.reset(''); api.setTitle(t('repeat_pin')); }
      else {
        if (p !== np) { step = 1; np = null; api.reset(t('pin_mismatch'), true); api.setTitle(t('new_pin')); return; }
        api.setTitle(t('working'));
        const salt = rnd(16);
        m.salt = b64(salt); m.iter = ITER; m.wrapPin = await aesEnc(await pbkdf(p, salt, ITER), rawKey);
        setMeta(m); hideLock(); toast(t('pin_changed'));
      }
    }
  });
}

/* ---------- global events ---------- */
document.addEventListener('click', e => {
  if (!S) return;
  const el = e.target.closest('[data-a]');
  if (!el || el.closest('.backdrop') || el.closest('#lock')) return;
  const fn = A[el.dataset.a]; if (fn) fn(el.dataset, el, e);
});
document.addEventListener('input', e => {
  if (S && e.target.dataset && e.target.dataset.in === 'q') { ui.hist.q = e.target.value; const h = $('#hl'); if (h) h.innerHTML = histList(); }
});
document.addEventListener('keydown', e => {
  const L = $('#lock');
  if (currentPad && L && !L.classList.contains('hidden') && !sheetEl) {
    if (/^\d$/.test(e.key)) { currentPad.press(e.key); e.preventDefault(); }
    else if (e.key === 'Backspace') { currentPad.press('del'); e.preventDefault(); }
    return;
  }
  if (sheetEl) {
    if (e.key === 'Escape') { closeSheet(); return; }
    const inField = e.target.matches && e.target.matches('input,select,textarea');
    if (sheetEl._key && !inField) sheetEl._key(e);
  }
});
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (busyExt) { hiddenAt = 0; return; }
    document.documentElement.classList.add('privacy');
    hiddenAt = Date.now();
    if (S && S.settings.autolock === 0) lock();
  } else {
    document.documentElement.classList.remove('privacy');
    if (S && hiddenAt && Date.now() - hiddenAt >= S.settings.autolock * 1000) lock();
    hiddenAt = 0;
  }
});

/* ---------- service worker ---------- */
function regSW() {
  if (!('serviceWorker' in navigator)) return;
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloading) return; reloading = true; location.reload(); });
  navigator.serviceWorker.register('./sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const w = reg.installing; if (!w) return;
      w.addEventListener('statechange', () => {
        if (w.state === 'installed' && navigator.serviceWorker.controller) toast(t('update'), () => w.postMessage('skip'), t('reload'), 20000);
      });
    });
  }).catch(e => console.warn('SW', e));
}

/* ---------- init ---------- */
async function init() {
  pref = loadPref();
  const nl = (navigator.language || '').toLowerCase();
  lang = I18N[pref.lang] ? pref.lang : nl.startsWith('uk') ? 'uk' : nl.startsWith('ru') ? 'ru' : nl.startsWith('en') ? 'en' : 'uk';
  document.documentElement.lang = lang;
  applyTheme(pref.theme || 'light');
  if (!window.isSecureContext || !window.crypto || !crypto.subtle) {
    document.body.innerHTML = `<p class="fatal">${esc(t('fatal'))}</p>`;
    return;
  }
  bioOK = await bioSupported();
  const m = getMeta();
  if (m && m.wrapPin) showLock(); else showWelcome();
  regSW();
}
init();
})();
