// Rosa’s Café (Paris): the page the CSS track styles, a little more in every module. Same café as the Python project.

/** The menu page, plain HTML. */
export const MENU = `<h1>Rosa’s Café</h1>
<p class="tag">Fresh tea and snacks in Paris</p>
<div class="menu">
  <div class="card"><h2>Lemon Tea</h2><p class="price">₹40</p></div>
  <div class="card"><h2>Coffee</h2><p class="price">₹60</p></div>
  <div class="card"><h2>Cheese Toast</h2><p class="price">₹80</p></div>
</div>`;

/** The finished look, used in "before and after" screens. */
export const CAFE_CSS = `body { font-family: system-ui, sans-serif; background: #FFF8EC; color: #3B2A1A; margin: 16px; }
h1 { color: #C2410C; margin: 0; }
.tag { color: #7C5E45; }
.menu { display: flex; flex-wrap: wrap; gap: 10px; }
.card { background: white; border-radius: 12px; padding: 10px 14px; box-shadow: 0 2px 6px rgba(0,0,0,.12); }
.card h2 { font-size: 18px; margin: 0; }
.price { color: #15803D; font-weight: bold; margin: 4px 0 0; }`;

/** A plain base so a screen only shows the one thing it teaches. */
export const BASE = 'body { font-family: system-ui, sans-serif; margin: 14px; color: #2B2118; }';

/** One menu card. */
export const CARD = '<div class="card"><h2>Lemon Tea</h2><p class="price">₹40</p></div>';
