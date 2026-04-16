// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id:1, name:'Red Chilli Powder', cat:'Groceries', price:190, unit:'1 Kg', tag:'Homemade', img:'Red Chlli.jpeg', stock:50,
    desc:'Pure sun-dried homemade red chilli powder. No adulteration, no artificial colors — just 100% pure chilli with natural bright red color and strong authentic flavor. Farm to Kitchen Fresh.',
    origin:'Local Farm', shelf:'6 months', storage:'Cool & dry airtight container',
    nutrition:{ energy:'280–320 kcal', carbs:'50–60 g', protein:'12–15 g', fat:'12–17 g', fiber:'25–30 g', vitaminC:'100–150 mg', iron:'7–10 mg', potassium:'~2000 mg' },
    benefits:['Boosts Metabolism','Supports Heart Health','Strong Antioxidant','Pain Relief & Anti-inflammatory','Improves Digestion','Immunity Booster','No Adulteration','No Preservatives'] },
];

const TAG_COLORS = {
  Premium:'#7c3aed', Organic:'#16a34a', Fresh:'#0284c7',
  Farm:'#d97706', Refined:'#6b7280', Pure:'#db2777', Iodised:'#0891b2',
  Homemade:'#b45309',
};

let currentDrawerCat = 'All';

// ===== DRAWER =====
function openDrawer(cat) {
  currentDrawerCat = cat;
  document.getElementById('drawerTitle').textContent = cat === 'All' ? 'All Products' : cat;
  document.getElementById('drawerSearch').value = '';
  const iconEl = document.getElementById('drawerCatIcon');
  const hcat = document.querySelector(`.hcat[data-cat="${cat}"]`);
  if (hcat) {
    const img = hcat.querySelector('img');
    iconEl.innerHTML = img ? `<img src="${img.src}" alt="${cat}"/>` : hcat.querySelector('.hcat-all')?.innerHTML || '';
  }
  renderDrawerProducts(PRODUCTS.filter(p => cat === 'All' || p.cat === cat));
  document.getElementById('drawerOverlay').classList.add('open');
  document.getElementById('productsDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.getElementById('drawerOverlay').classList.remove('open');
  document.getElementById('productsDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function filterDrawer() {
  const q = document.getElementById('drawerSearch').value.trim().toLowerCase();
  const filtered = PRODUCTS
    .filter(p => currentDrawerCat === 'All' || p.cat === currentDrawerCat)
    .filter(p => !q || p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
  renderDrawerProducts(filtered);
}

function renderDrawerProducts(list) {
  const body = document.getElementById('drawerBody');
  if (!list.length) {
    body.innerHTML = `<div class="drawer-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><p>No products found</p></div>`;
    return;
  }
  body.innerHTML = `<div class="prod-grid">${list.map(p => {
    const inCart = cart.find(c => c.id === p.id);
    const tagColor = TAG_COLORS[p.tag] || '#6b7280';
    const imgHtml = p.img.includes('.') ? `<img src="${p.img}" alt="${p.name}" class="prod-img-photo"/>` : `<span class="prod-emoji">${p.img}</span>`;
    return `<div class="prod-card" onclick="openProductDetail(${p.id})">
      <div class="prod-img">
        <span class="prod-tag" style="background:${tagColor}">${p.tag}</span>
        ${imgHtml}
        <span class="prod-view-hint">Tap for details</span>
      </div>
      <div class="prod-body">
        <div class="prod-cat-label">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-unit">${p.unit}</div>
        <div class="prod-footer" onclick="event.stopPropagation()">
          <span class="prod-price">₹${p.price}</span>
          ${inCart
            ? `<div class="prod-qty-ctrl">
                <button onclick="changeQty(${p.id},-1)">−</button>
                <span>${inCart.qty}</span>
                <button onclick="changeQty(${p.id},1)">+</button>
               </div>`
            : `<button class="prod-add-btn" onclick="addToCart(${p.id})">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add
               </button>`}
        </div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

// ===== PRODUCT DETAIL PANEL =====
function openProductDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const inCart = cart.find(c => c.id === id);
  const tagColor = TAG_COLORS[p.tag] || '#6b7280';
  const stockColor = p.stock > 20 ? '#16a34a' : p.stock > 5 ? '#d97706' : '#dc2626';
  const stockLabel = p.stock > 20 ? 'In Stock' : p.stock > 5 ? 'Low Stock' : 'Very Low';

  const pdImgHtml = p.img.includes('.') ? `<img src="${p.img}" alt="${p.name}" class="pd-img-photo"/>` : `<div class="pd-emoji">${p.img}</div>`;
  document.getElementById('pdBody').innerHTML = `
    <div class="pd-hero">
      ${pdImgHtml}
      <span class="pd-tag" style="background:${tagColor}">${p.tag}</span>
    </div>

    <div class="pd-info">
      <div class="pd-cat">${p.cat}</div>
      <h2 class="pd-name">${p.name}</h2>
      <p class="pd-desc">${p.desc}</p>

      <div class="pd-meta-row">
        <div class="pd-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>${p.origin}</span>
        </div>
        <div class="pd-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>Shelf: ${p.shelf}</span>
        </div>
        <div class="pd-meta-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
          <span>${p.storage}</span>
        </div>
      </div>

      <div class="pd-price-row">
        <div>
          <div class="pd-price">&#8377;${p.price}</div>
          <div class="pd-unit">${p.unit}</div>
        </div>
        <div class="pd-stock" style="color:${stockColor}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ${stockLabel} (${p.stock} left)
        </div>
      </div>

      <div class="pd-section-title">Nutritional Info <span>(per 100g)</span></div>
      <div class="pd-nutrition">
        ${Object.entries(p.nutrition).map(([k,v]) => `
          <div class="pd-nutr-item">
            <div class="pd-nutr-val">${v}</div>
            <div class="pd-nutr-key">${k.charAt(0).toUpperCase()+k.slice(1)}</div>
          </div>`).join('')}
      </div>

      <div class="pd-section-title">Key Benefits</div>
      <div class="pd-benefits">
        ${p.benefits.map(b => `<span class="pd-benefit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          ${b}</span>`).join('')}
      </div>
    </div>
  `;

  // Cart button
  const cartEl = document.getElementById('pdCartBtn');
  if (inCart) {
    cartEl.innerHTML = `
      <div class="prod-qty-ctrl pd-qty">
        <button onclick="pdChangeQty(${id},-1)">&#8722;</button>
        <span id="pdQtyNum">${inCart.qty}</span>
        <button onclick="pdChangeQty(${id},1)">+</button>
      </div>`;
  } else {
    cartEl.innerHTML = `
      <button class="btn-primary pd-add" onclick="pdAddToCart(${id})">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add to Cart
      </button>`;
  }

  document.getElementById('pdOverlay').classList.add('open');
}

function closePD() {
  document.getElementById('pdOverlay').classList.remove('open');
}

function pdAddToCart(id) {
  addToCart(id);
  openProductDetail(id); // re-render to show qty controls
}

function pdChangeQty(id, delta) {
  changeQty(id, delta);
  openProductDetail(id); // re-render
}


let cart = JSON.parse(localStorage.getItem('hm_cart') || '[]');
function saveCart() { localStorage.setItem('hm_cart', JSON.stringify(cart)); }
function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = total;
  const del = document.getElementById('drawerCartCount');
  if (del) del.textContent = total;
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) { existing.qty++; } else { cart.push({ ...p, qty: 1 }); }
  saveCart(); updateCartCount(); filterDrawer();
  const imgLabel = p.img.includes('.') ? '' : p.img + ' ';
  showToast(`${imgLabel}${p.name} added to cart!`);
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
  saveCart(); updateCartCount(); filterDrawer();
}

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 40));

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav  = document.getElementById('mobileNav');
menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
mobileNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => { mobileNav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', false); })
);

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.hcat, .hero-content, .hero-visual')
  .forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });

// ===== CATEGORY PILL CLICK =====
document.querySelectorAll('.hcat').forEach(pill => {
  pill.addEventListener('click', function () {
    document.querySelectorAll('.hcat').forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    openDrawer(this.dataset.cat);
  });
});

// ===== GLOBAL SEARCH =====
const searchInput    = document.getElementById('globalSearch');
const searchDropdown = document.getElementById('searchDropdown');
const searchClear    = document.getElementById('searchClear');

function highlight(text, q) {
  if (!q) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

function renderSearchDropdown(q) {
  if (!q) { searchDropdown.classList.remove('open'); return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q)
  );
  if (!results.length) {
    searchDropdown.innerHTML = `<div class="sd-no-results">No products found for "${q}"</div>`;
    searchDropdown.classList.add('open'); return;
  }
  const groups = {};
  results.forEach(p => { (groups[p.cat] = groups[p.cat] || []).push(p); });
  let html = '';
  Object.entries(groups).forEach(([cat, items]) => {
    html += `<div class="sd-section-label">${cat}</div>`;
    items.slice(0, 4).forEach(p => {
      const inCart = cart.find(c => c.id === p.id);
      const sdImgHtml = p.img.includes('.') ? `<img src="${p.img}" alt="${p.name}" class="sd-img-photo"/>` : `<span class="sd-emoji">${p.img}</span>`;
      html += `<div class="sd-item" onclick="sdOpenProduct(${p.id})">
        ${sdImgHtml}
        <div class="sd-info">
          <div class="sd-name">${highlight(p.name, q)}</div>
          <div class="sd-meta">${p.unit} · ${p.cat}</div>
        </div>
        <span class="sd-price">₹${p.price}</span>
        ${inCart
          ? `<span class="sd-add" style="background:#f0fdf4;color:var(--green-mid);border:1.5px solid var(--green-light)" onclick="event.stopPropagation();changeQtySD(${p.id})">×${inCart.qty}</span>`
          : `<button class="sd-add" onclick="event.stopPropagation();addToCartSD(${p.id})">+ Add</button>`}
      </div>`;
    });
  });
  html += `<div class="sd-footer"><button onclick="sdViewAll('${q}')">View all ${results.length} results →</button></div>`;
  searchDropdown.innerHTML = html;
  searchDropdown.classList.add('open');
}

function addToCartSD(id) { addToCart(id); renderSearchDropdown(searchInput.value.trim().toLowerCase()); }
function changeQtySD(id) {
  const item = cart.find(x => x.id === id);
  if (item) { item.qty++; saveCart(); updateCartCount(); }
  renderSearchDropdown(searchInput.value.trim().toLowerCase());
}
function sdOpenProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  closeSearchDropdown(); openDrawer(p.cat);
  setTimeout(() => { document.getElementById('drawerSearch').value = p.name; filterDrawer(); }, 350);
}
function sdViewAll(q) {
  closeSearchDropdown(); openDrawer('All');
  setTimeout(() => { document.getElementById('drawerSearch').value = q; filterDrawer(); }, 350);
}
function closeSearchDropdown() { searchDropdown.classList.remove('open'); }
function clearSearch() { searchInput.value = ''; searchClear.classList.remove('visible'); closeSearchDropdown(); searchInput.focus(); }

searchInput.addEventListener('input', function () {
  const q = this.value.trim().toLowerCase();
  searchClear.classList.toggle('visible', q.length > 0);
  renderSearchDropdown(q);
  document.querySelectorAll('.hcat').forEach(pill => {
    const match = !q || pill.querySelector('span').textContent.toLowerCase().includes(q);
    pill.style.opacity   = match ? '1' : '0.3';
    pill.style.transform = match ? '' : 'scale(0.92)';
  });
});
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') clearSearch();
  if (e.key === 'Enter') { const q = searchInput.value.trim().toLowerCase(); if (q) sdViewAll(q); }
});
document.addEventListener('click', e => {
  if (!document.getElementById('searchBox').contains(e.target)) closeSearchDropdown();
});

// ===== HERO CTA PULSE =====
window.addEventListener('load', () => {
  const btn = document.querySelector('.btn-primary');
  if (btn) {
    setTimeout(() => btn.classList.add('pulse-once'), 1200);
    btn.addEventListener('animationend', () => btn.classList.remove('pulse-once'));
  }
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active-link'));
      const link = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (link) link.classList.add('active-link');
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => navObserver.observe(s));

// ===== TOAST =====
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ===== GUEST ADDRESS =====
const ADDR_KEY = 'hm_guest_addresses';
let selectedAddrIndex = 0;
function getAddresses() { return JSON.parse(localStorage.getItem(ADDR_KEY) || '[]'); }
function setAddresses(arr) { localStorage.setItem(ADDR_KEY, JSON.stringify(arr)); }

// Open address book (from navbar icon)
function openAddressBook() {
  renderAddrbookList();
  hideAddrForm();
  document.getElementById('addrOverlay').classList.add('open');
}

// Open address modal from checkout "Add New" — opens form directly on top of checkout
function openAddrModal(editIndex) {
  editIndex = (editIndex === undefined) ? -1 : editIndex;
  renderAddrbookList();
  showAddrForm(editIndex);
  document.getElementById('addrOverlay').classList.add('open');
}

function closeAddrModal() {
  document.getElementById('addrOverlay').classList.remove('open');
  hideAddrForm();
}

function showAddrForm(editIndex) {
  const section = document.getElementById('addrbookFormSection');
  section.style.display = 'block';
  document.getElementById('addrEditIndex').value = editIndex;
  document.getElementById('addrForm').reset();
  document.querySelectorAll('.addr-label-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.addr-label-btn[data-label="Home"]').classList.add('active');
  if (editIndex >= 0) {
    const addr = getAddresses()[editIndex];
    document.getElementById('addrFormHeading').textContent = 'Edit Address';
    document.getElementById('addrName').value  = addr.name;
    document.getElementById('addrPhone').value = addr.phone;
    document.getElementById('addrLine').value  = addr.line;
    document.getElementById('addrCity').value  = addr.city;
    document.getElementById('addrPin').value   = addr.pin;
    document.querySelectorAll('.addr-label-btn').forEach(b => b.classList.toggle('active', b.dataset.label === addr.label));
  } else {
    document.getElementById('addrFormHeading').textContent = 'New Address';
  }
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
}

function hideAddrForm() {
  const s = document.getElementById('addrbookFormSection');
  if (s) { s.style.display = 'none'; document.getElementById('addrForm').reset(); }
}

function renderAddrbookList() {
  const list = getAddresses();
  const el   = document.getElementById('addrbookList');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<p class="addr-empty">No saved addresses yet. Click <strong>Add New</strong> to save one.</p>`;
    return;
  }
  el.innerHTML = list.map((a, i) => `
    <div class="addr-card">
      <div class="addr-card-body">
        <div class="addr-card-top">
          <span class="addr-label-tag">${a.label}</span>
          <strong>${a.name}</strong>
          <span class="addr-phone">${a.phone}</span>
        </div>
        <p>${a.line}, ${a.city} – ${a.pin}</p>
      </div>
      <div class="addr-card-actions">
        <button onclick="showAddrForm(${i})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button onclick="deleteAddress(${i})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
    </div>`).join('');
}

document.querySelectorAll('.addr-label-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.addr-label-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

function saveAddress(e) {
  e.preventDefault();
  const idx   = parseInt(document.getElementById('addrEditIndex').value);
  const label = document.querySelector('.addr-label-btn.active')?.dataset.label || 'Home';
  const addr  = {
    name:  document.getElementById('addrName').value.trim(),
    phone: document.getElementById('addrPhone').value.trim(),
    line:  document.getElementById('addrLine').value.trim(),
    city:  document.getElementById('addrCity').value.trim(),
    pin:   document.getElementById('addrPin').value.trim(),
    label,
  };
  const list = getAddresses();
  if (idx >= 0) { list[idx] = addr; } else { list.push(addr); }
  setAddresses(list);
  hideAddrForm();
  renderAddrbookList();
  renderCheckoutAddresses();
  showToast('✅ Address saved!');
}

function deleteAddress(idx) {
  const list = getAddresses();
  list.splice(idx, 1);
  setAddresses(list);
  if (selectedAddrIndex >= list.length) selectedAddrIndex = 0;
  renderAddrbookList();
  renderCheckoutAddresses();
  showToast('🗑️ Address removed.');
}

// ===== CHECKOUT WIZARD =====
const UPI_ID   = 'rathnaraj1234567890-7@okhdfcbank';
const UPI_NAME = 'Home Made';
let coCurrentStep = 1;
const CO_TOTAL_STEPS = 4;

function openCheckout() {
  if (!cart.length) { showToast('\u26a0\ufe0f Your cart is empty.'); return; }
  coCurrentStep = 1;
  renderOrderSummary();
  renderCheckoutAddresses();
  document.getElementById('txnIdInput').value = '';
  document.getElementById('txnCheck').innerHTML = '';
  coRender();
  document.getElementById('checkoutOverlay').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkoutOverlay').classList.remove('open');
}

function coRender() {
  // Show/hide panels
  for (let i = 1; i <= CO_TOTAL_STEPS; i++) {
    const panel = document.getElementById('coPanel' + i);
    if (panel) panel.style.display = i === coCurrentStep ? 'block' : 'none';
    const step  = document.getElementById('coStep' + i);
    if (step) {
      step.classList.toggle('active', i === coCurrentStep);
      step.classList.toggle('done',   i < coCurrentStep);
    }
  }

  // Back button
  const back = document.getElementById('coBtnBack');
  back.style.display = coCurrentStep > 1 ? 'flex' : 'none';

  // Next / Place Order button
  const next = document.getElementById('coBtnNext');
  if (coCurrentStep === CO_TOTAL_STEPS) {
    next.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Place Order`;
    next.onclick = placeOrder;
    next.disabled = false;
  } else {
    next.innerHTML = `Next <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
    next.onclick = coNext;
    next.disabled = false;
  }

  // Step 3: render UPI when entering
  if (coCurrentStep === 3) renderUpiSection();

  // Step 4: render confirm summary
  if (coCurrentStep === 4) renderConfirmSummary();
}

function coNext() {
  // Validate current step before advancing
  if (coCurrentStep === 1) {
    if (!cart.length) { showToast('\u26a0\ufe0f Your cart is empty.'); return; }
  }
  if (coCurrentStep === 2) {
    if (!getAddresses().length) { showToast('\u26a0\ufe0f Please add a delivery address.'); return; }
  }
  if (coCurrentStep === 3) {
    const txn = document.getElementById('txnIdInput').value.trim();
    if (txn.length < 8) { showToast('\u26a0\ufe0f Please enter a valid Transaction ID.'); return; }
  }
  coCurrentStep++;
  coRender();
}

function coBack() {
  if (coCurrentStep > 1) { coCurrentStep--; coRender(); }
}

function renderConfirmSummary() {
  const addrs = getAddresses();
  const addr  = addrs[selectedAddrIndex] || {};
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const txn   = document.getElementById('txnIdInput').value.trim();

  document.getElementById('coConfirmBox').innerHTML = `
    <div class="co-confirm-section">
      <div class="co-confirm-label">\ud83d\udce6 Items</div>
      ${cart.map(i => `
        <div class="co-confirm-row">
          <span>${i.img} ${i.name} <em>\u00d7${i.qty}</em></span>
          <span>\u20b9${i.price * i.qty}</span>
        </div>`).join('')}
      <div class="co-confirm-row co-confirm-total">
        <span>Total</span><span>\u20b9${total}</span>
      </div>
    </div>
    <div class="co-confirm-section">
      <div class="co-confirm-label">\ud83d\udccd Delivery Address</div>
      <div class="co-confirm-addr">
        <span class="addr-label-tag">${addr.label || ''}</span>
        <strong>${addr.name || ''}</strong> &nbsp; ${addr.phone || ''}<br/>
        ${addr.line || ''}, ${addr.city || ''} \u2013 ${addr.pin || ''}
      </div>
    </div>
    <div class="co-confirm-section">
      <div class="co-confirm-label">\ud83d\udcb3 Payment</div>
      <div class="co-confirm-row">
        <span>UPI ID</span><span class="co-upi-small">${UPI_ID}</span>
      </div>
      <div class="co-confirm-row">
        <span>Transaction ID</span><span><strong>${txn}</strong></span>
      </div>
    </div>`;
}

function renderCheckoutAddresses() {
  const list = getAddresses();
  const el   = document.getElementById('checkoutAddrList');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = `<p class="addr-empty">No saved addresses. <button class="link-btn" onclick="openAddrModal()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add one</button></p>`;
    return;
  }
  el.innerHTML = list.map((a, i) => `
    <div class="addr-card ${i === selectedAddrIndex ? 'addr-selected' : ''}" onclick="selectAddr(${i})">
      <div class="addr-card-radio"><div class="addr-radio-dot ${i === selectedAddrIndex ? 'active' : ''}"></div></div>
      <div class="addr-card-body">
        <div class="addr-card-top">
          <span class="addr-label-tag">${a.label}</span>
          <strong>${a.name}</strong>
          <span class="addr-phone">${a.phone}</span>
        </div>
        <p>${a.line}, ${a.city} \u2013 ${a.pin}</p>
      </div>
      <div class="addr-card-actions">
        <button onclick="event.stopPropagation();openAddrModal(${i})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
      </div>
    </div>`).join('');
}

function selectAddr(i) { selectedAddrIndex = i; renderCheckoutAddresses(); }

function renderOrderSummary() {
  const el = document.getElementById('checkoutOrderSummary');
  const totalEl = document.getElementById('checkoutTotal');
  if (!cart.length) { el.innerHTML = `<p class="addr-empty">Your cart is empty.</p>`; totalEl.innerHTML = ''; return; }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  el.innerHTML = cart.map(i => `
    <div class="order-item">
      <span class="order-item-name">${i.img} ${i.name} <em>\u00d7${i.qty}</em></span>
      <span class="order-item-price">\u20b9${i.price * i.qty}</span>
    </div>`).join('');
  totalEl.innerHTML = `<div class="order-item order-total-row"><span>Total</span><span>\u20b9${total}</span></div>`;
}

function renderUpiSection() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('upiAmountTag').textContent = '\u20b9' + total;
  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${total}&cu=INR&tn=${encodeURIComponent('HomeMade Order')}`;
  const qrEl = document.getElementById('upiQrCode');
  qrEl.innerHTML = '';
  if (typeof QRCode !== 'undefined') {
    try {
      new QRCode(qrEl, {
        text: upiUrl,
        width: 188,
        height: 188,
        colorDark: '#1b5e20',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M,
      });
    } catch(e) {
      qrEl.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=188x188&data=${encodeURIComponent(upiUrl)}&color=1b5e20&bgcolor=ffffff&margin=4" width="188" height="188" style="border-radius:6px" alt="QR Code"/>`;
    }
  } else {
    qrEl.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=188x188&data=${encodeURIComponent(upiUrl)}&color=1b5e20&bgcolor=ffffff&margin=4" width="188" height="188" style="border-radius:6px" alt="QR Code"/>`;
  }
}

function copyUpiId() {
  navigator.clipboard.writeText(UPI_ID).then(() => {
    const btn = document.getElementById('upiCopyBtn');
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
    btn.style.background = '#dcfce7'; btn.style.color = '#16a34a';
    setTimeout(() => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy`;
      btn.style.background = ''; btn.style.color = '';
    }, 2000);
  }).catch(() => showToast('Copy failed \u2014 please copy manually.'));
}

function onTxnInput() {
  const val   = document.getElementById('txnIdInput').value.trim();
  const check = document.getElementById('txnCheck');
  if (val.length >= 8) {
    check.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  } else {
    check.innerHTML = val.length > 0 ? `<svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>` : '';
  }
}

// ===== ORDER HISTORY =====
const ORDERS_KEY = 'hm_orders';
function getOrders() { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
function saveOrders(arr) { localStorage.setItem(ORDERS_KEY, JSON.stringify(arr)); }

function placeOrder() {
  const addrs = getAddresses();
  if (!addrs.length) { showToast('\u26a0\ufe0f Please add a delivery address first.'); return; }
  if (!cart.length)  { showToast('\u26a0\ufe0f Your cart is empty.'); return; }
  const txn = document.getElementById('txnIdInput').value.trim();
  if (txn.length < 8) { showToast('\u26a0\ufe0f Please enter a valid Transaction ID.'); return; }

  const addr    = addrs[selectedAddrIndex];
  const total   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const orderId = 'HM' + Date.now();
  const dateStr = new Date().toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short' });

  // Save locally
  const order = { id: orderId, date: dateStr, txn,
    items: cart.map(i => ({ name:i.name, img:i.img, qty:i.qty, price:i.price, unit:i.unit })),
    total, addr: { ...addr } };
  const orders = getOrders(); orders.unshift(order); saveOrders(orders);

  // Build WhatsApp message
  const itemLines = order.items
    .map(i => `  \u2022 ${i.img} ${i.name} (${i.unit}) \u00d7 ${i.qty} = \u20b9${i.price * i.qty}`)
    .join('%0A');
  const msg =
    `\ud83d\uded2 *New Order \u2013 Home Made*%0A` +
    `\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501%0A` +
    `\ud83c\udd94 Order ID: ${orderId}%0A` +
    `\ud83d\udcc5 Date: ${dateStr}%0A%0A` +
    `\ud83d\udce6 *Items:*%0A${itemLines}%0A%0A` +
    `\ud83d\udcb0 *Total: \u20b9${total}*%0A` +
    `\ud83d\udcb3 UPI TXN ID: ${txn}%0A%0A` +
    `\ud83d\udccd *Delivery Address:*%0A` +
    `  ${addr.name} (${addr.phone})%0A` +
    `  ${addr.line},%0A` +
    `  ${addr.city} \u2013 ${addr.pin}%0A` +
    `  Label: ${addr.label}%0A%0A` +
    `\u2705 Payment done via UPI to ${UPI_ID}`;

  cart = []; saveCart(); updateCartCount(); closeCheckout();
  showToast(`\ud83c\udf89 Order #${orderId} placed! Opening WhatsApp\u2026`);
  setTimeout(() => window.open(`https://wa.me/918248599487?text=${msg}`, '_blank'), 800);
}

document.getElementById('addrOverlay').addEventListener('click', function(e) { if (e.target === this) closeAddrModal(); });
document.getElementById('checkoutOverlay').addEventListener('click', function(e) { if (e.target === this) closeCheckout(); });

// ===== INIT =====
updateCartCount();
