/* ═══════════════════════════════════════════
   EXPRESSO NOTE — main.js  v1f
   New features vs v1e:
   TAB BAR
     · Drag-to-reorder tabs (HTML5 drag API + ghost element)
     · Double-click tab label to rename inline
     · Middle-click tab to close
     · Right-click tab context menu (Rename, Close, Close Others,
       Close to Right)
     · Ctrl+Tab / Ctrl+Shift+Tab cycle through tabs
     · Numbered Untitled names (Untitled 1, Untitled 2 …)
     · Close Others / Close to Right commands
   EDITOR
     · Line numbers gutter (synced scroll, current line)
     · Current line highlight (CSS custom prop approach)
     · Indent selection (Tab) / Outdent selection (Shift+Tab)
     · Paste Plain Text (Ctrl+Shift+V)
   FIND & REPLACE
     · Match Case toggle (Alt+C)
     · Whole Word toggle (Alt+W)
     · RegEx mode toggle (Alt+R)
   COMMAND PALETTE
     · Ctrl+Shift+P — searchable list of all commands
     · Arrow key navigation, Enter to execute
   DOCUMENT
     · Word count goal — set target, progress bar in status bar
     · Session restore — reopen tabs from last session on reload
     · File drop — drag OS file onto window to open in new tab
═══════════════════════════════════════════ */

/* ══════════════════════════════
   AUTO-CORRECT DICTIONARY
══════════════════════════════ */
const AC_MAP = {
  'teh':'the','hte':'the','htey':'they','thier':'their',
  'recieve':'receive','beleive':'believe','freind':'friend',
  'wierd':'weird','occured':'occurred','occurance':'occurrence',
  'seperate':'separate','definately':'definitely','definate':'definite',
  'goverment':'government','enviroment':'environment',
  'existance':'existence','persistance':'persistence',
  'restaraunt':'restaurant','calender':'calendar',
  'febuary':'february','januray':'january','marth':'march',
  'apirl':'april','augest':'august','sepetember':'september',
  'octover':'october','novemeber':'november','decemeber':'december',
  'alot':'a lot','arent':'aren\'t','cant':'can\'t','dont':"don't",
  'doesnt':"doesn't",'didnt':"didn't",'havent':"haven't",
  'hasnt':"hasn't",'hadnt':"hadn't",'wouldnt':"wouldn't",
  'couldnt':"couldn't",'shouldnt':"shouldn't",'wasnt':"wasn't",
  'werent':"weren't",'isnt':"isn't",'wont':"won't",'im':"I'm",
  'ive':"I've",'id':"I'd",'ill':"I'll",'youre':"you're",
  'youve':"you've",'youd':"you'd",'youll':"you'll",
  'theyre':"they're",'theyve':"they've",'theyd':"they'd",
  'theyll':"they'll",'weve':"we've",'wed':"we'd",'well':"we'll",
  'hes':"he's",'shes':"she's",'thats':"that's",
  'whats':"what's",'whos':"who's",'wheres':"where's",
  'hows':"how's",'whens':"when's",'theres':"there's",
  'heres':"here's",'lets':"let's",
  'accomodate':'accommodate','acommodate':'accommodate',
  'agressive':'aggressive','aparent':'apparent',
  'begining':'beginning','bussiness':'business',
  'comittee':'committee','commitee':'committee',
  'embarass':'embarrass','harrass':'harass',
  'inoculate':'inoculate','liason':'liaison',
  'millenium':'millennium','necesary':'necessary',
  'neccessary':'necessary','occassion':'occasion',
  'posession':'possession','profesional':'professional',
  'recommed':'recommend','succesfull':'successful',
  'tommorow':'tomorrow','tommorrow':'tomorrow',
  'untill':'until','withold':'withhold',
  'acheive':'achieve','aquire':'acquire','bizzare':'bizarre',
  'buisness':'business','collegue':'colleague','concious':'conscious',
  'curiousity':'curiosity','dependant':'dependent',
  'equiptment':'equipment','excercise':'exercise',
  'exilerate':'exhilarate','florescent':'fluorescent',
  'foriegn':'foreign','guage':'gauge','grammer':'grammar',
  'greatful':'grateful','gurantee':'guarantee',
  'hygeine':'hygiene','immediatly':'immediately',
  'inadvertant':'inadvertent','interupt':'interrupt',
  'irresistable':'irresistible','knowlege':'knowledge',
  'liesure':'leisure','maintenence':'maintenance',
  'manuever':'maneuver','mispell':'misspell',
  'neice':'niece','noticable':'noticeable',
  'occassionally':'occasionally','ommit':'omit',
  'paralell':'parallel','parliment':'parliament',
  'particuraly':'particularly','perseverence':'perseverance',
  'playright':'playwright','privelege':'privilege',
  'pronounciation':'pronunciation','publically':'publicly',
  'questionaire':'questionnaire','reccomend':'recommend',
  'refering':'referring','relevent':'relevant',
  'rythm':'rhythm','seige':'siege','sieze':'seize',
  'similer':'similar','speach':'speech','strenght':'strength',
  'supercede':'supersede','tendancy':'tendency',
  'threshhold':'threshold','truely':'truly',
  'unfortunatly':'unfortunately','usefull':'useful',
  'vaccum':'vacuum','visious':'vicious',
  'visable':'visible','Wendsday':'Wednesday','wendsday':'wednesday',
  'wich':'which','wieght':'weight','writting':'writing',
};

/* ══════════════════════════════
   STORAGE KEYS
══════════════════════════════ */
const STORAGE_KEYS = {
  SETTINGS: 'en_settings',
  RECENT:   'en_recent',
  SESSION:  'en_session',
};

/* ══════════════════════════════
   SETTINGS DEFAULTS & PERSISTENCE
══════════════════════════════ */
const DEFAULTS = {
  wordWrap:     true,
  timestampOn:  false,
  spellCheck:   true,
  autoCorrect:  true,
  zoom:         100,
  fontSize:     14,
  fontFamily:   "'JetBrains Mono', monospace",
  lineSpacing:  1.5,
  textColor:    '#f0e8de',
  bgColor:      '#0e0b09',
  sidebarOpen:  true,
  lineNums:     false,
  curLine:      true,
  wordGoal:     0,
};

function loadSettings() {
  try {
    return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}'));
  } catch (e) {
    return Object.assign({}, DEFAULTS);
  }
}

function persistSettings() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
    wordWrap:    state.wordWrap,
    timestampOn: state.timestampOn,
    spellCheck:  state.spellCheck,
    autoCorrect: state.autoCorrect,
    zoom:        state.zoom,
    fontSize:    state.fontSize,
    fontFamily:  state.fontFamily,
    lineSpacing: state.lineSpacing,
    textColor:   state.textColor,
    bgColor:     state.bgColor,
    sidebarOpen: state.sidebarOpen,
    lineNums:    state.lineNums,
    curLine:     state.curLine,
    wordGoal:    state.wordGoal,
  }));
}

/* ══════════════════════════════
   STATE
══════════════════════════════ */
const persisted = loadSettings();

const state = {
  /* Persisted settings */
  wordWrap:    persisted.wordWrap,
  timestampOn: persisted.timestampOn,
  spellCheck:  persisted.spellCheck,
  autoCorrect: persisted.autoCorrect,
  zoom:        persisted.zoom,
  fontSize:    persisted.fontSize,
  fontFamily:  persisted.fontFamily,
  lineSpacing: persisted.lineSpacing,
  textColor:   persisted.textColor,
  bgColor:     persisted.bgColor,
  sidebarOpen: persisted.sidebarOpen,
  lineNums:    persisted.lineNums,
  curLine:     persisted.curLine,
  wordGoal:    persisted.wordGoal,

  /* Runtime */
  recent:              JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENT) || '[]'),
  altOpen:             false,
  findOpen:            false,
  findMode:            'find',
  findMatches:         [],
  findIndex:           0,
  findOptCase:         false,
  findOptWord:         false,
  findOptRegex:        false,

  /* Tab system */
  tabs:                [],
  activeTabId:         null,
  tabCounter:          0,
  untitledCounter:     0,

  /* Pending close target for unsaved-changes modal */
  pendingCloseTabId:   null,
  pendingClosePrevId:  null,

  /* Drag reorder */
  dragSrcTabId:        null,

  /* Tab context menu target */
  ctxTabId:            null,

  /* Palette */
  paletteOpen:         false,
  paletteIndex:        0,
  paletteFiltered:     [],
};

/* ══════════════════════════════
   TAB DESCRIPTOR FACTORY
══════════════════════════════ */
function createTabDescriptor(filename, ext, content) {
  state.tabCounter++;
  return {
    id:          state.tabCounter,
    filename:    filename,
    ext:         ext || 'nnt',
    content:     content || '',
    modified:    false,
    listCounter: 1,
  };
}

function nextUntitledName() {
  state.untitledCounter++;
  return `Untitled ${state.untitledCounter}`;
}

/* ══════════════════════════════
   DOM REFERENCES
══════════════════════════════ */
const editor            = document.getElementById('editor');
const tabList           = document.getElementById('tab-list');
const tabNewBtn         = document.getElementById('tab-new-btn');
const lineNumsEl        = document.getElementById('line-nums');
const findBar           = document.getElementById('find-bar');
const findBarTitle      = document.getElementById('find-bar-title');
const replaceRow        = document.getElementById('replace-row');
const frReplace         = document.getElementById('fr-replace');
const frReplaceAll      = document.getElementById('fr-replaceall');
const frOptCase         = document.getElementById('fr-opt-case');
const frOptWord         = document.getElementById('fr-opt-word');
const frOptRegex        = document.getElementById('fr-opt-regex');
const altPanel          = document.getElementById('alt-panel');
const sidebarEl         = document.getElementById('sidebar');
const recentList        = document.getElementById('recent-list');
const btnClearRecent    = document.getElementById('btn-clear-recent');
const ctxMenu           = document.getElementById('ctx-menu');
const ctxSuggestions    = document.getElementById('ctx-suggestions');
const ctxSpellSep       = document.getElementById('ctx-spell-sep');
const tabCtxMenu        = document.getElementById('tab-ctx-menu');
const paletteOverlay    = document.getElementById('palette-overlay');
const paletteInput      = document.getElementById('palette-input');
const paletteListEl     = document.getElementById('palette-list');
const dropOverlay       = document.getElementById('drop-overlay');
const stFile            = document.getElementById('st-file');
const stMod             = document.getElementById('st-modified');
const stWords           = document.getElementById('st-words');
const stGoalWrap        = document.getElementById('st-goal-wrap');
const stGoalNum         = document.getElementById('st-goal-num');
const stGoalFill        = document.getElementById('st-goal-fill');
const stChars           = document.getElementById('st-chars');
const stLines           = document.getElementById('st-lines');
const stCols            = document.getElementById('st-cols');
const stZoom            = document.getElementById('st-zoom');
const stLS              = document.getElementById('st-ls');
const stWW              = document.getElementById('st-ww');
const stSpell           = document.getElementById('st-spell');
const stTS              = document.getElementById('st-ts');
const stEncoding        = document.getElementById('st-encoding');
const wwIndicator       = document.getElementById('ww-indicator');
const spellIndicator    = document.getElementById('spell-indicator');
const acIndicator       = document.getElementById('ac-indicator');
const lnIndicator       = document.getElementById('ln-indicator');
const clIndicator       = document.getElementById('cl-indicator');
const tsMenuIndicator   = document.getElementById('ts-menu-indicator');
const btnTS             = document.getElementById('btn-ts');
const btnSpell          = document.getElementById('btn-spell');
const btnAC             = document.getElementById('btn-ac');
const btnLineNums       = document.getElementById('btn-linenums');
const btnBold           = document.getElementById('btn-bold');
const btnItalic         = document.getElementById('btn-italic');
const btnUnderline      = document.getElementById('btn-underline');
const btnStrikethrough  = document.getElementById('btn-strikethrough');
const fontFamilySel     = document.getElementById('font-family');
const fontSizeSel       = document.getElementById('font-size');
const lineSpacingSel    = document.getElementById('line-spacing');
const textColorIn       = document.getElementById('text-color');
const bgColorIn         = document.getElementById('bg-color');
const findInput         = document.getElementById('find-input');
const replaceInput      = document.getElementById('replace-input');
const findCount         = document.getElementById('find-count');
const altGrid           = document.getElementById('alt-grid');

/* ══════════════════════════════
   SPECIAL CHARACTERS
══════════════════════════════ */
const ALT_CHARS = [
  '©','®','™','°','±','×','÷','√','∞','≠',
  '≤','≥','←','→','↑','↓','↔','↕','•','—',
  '–','…','«','»','‹','›','\u201C','\u201D','\u2018','\u2019',
  '€','£','¥','¢','§','¶','†','‡','‰','¿',
  '¡','æ','ø','å','ñ','ü','ö','ä','é','è',
  'ê','ë','à','â','î','ï','ô','ù','û','ç',
];

function buildAltGrid() {
  altGrid.innerHTML = '';
  ALT_CHARS.forEach(ch => {
    const d = document.createElement('div');
    d.className = 'alt-char';
    d.textContent = ch;
    d.title = `Insert ${ch}`;
    d.addEventListener('click', () => insertText(ch));
    altGrid.appendChild(d);
  });
}
buildAltGrid();

/* ══════════════════════════════
   COMMAND PALETTE DATA
   Each entry: { label, shortcut?, cmd }
   cmd is a string key passed to cmd() dispatcher.
══════════════════════════════ */
const PALETTE_COMMANDS = [
  { label: 'New Tab',                  shortcut: 'Ctrl+N',         cmd: 'new' },
  { label: 'Open File…',               shortcut: 'Ctrl+O',         cmd: 'open' },
  { label: 'Save',                     shortcut: 'Ctrl+S',         cmd: 'save' },
  { label: 'Save As…',                 shortcut: 'Ctrl+Shift+S',   cmd: 'saveas' },
  { label: 'Print',                    shortcut: 'Ctrl+P',         cmd: 'print' },
  { label: 'Close Tab',                shortcut: 'Ctrl+W',         cmd: 'close' },
  { label: 'Close Other Tabs',         shortcut: '',               cmd: 'closeothers' },
  { label: 'Close Tabs to the Right',  shortcut: '',               cmd: 'closeright' },
  { label: 'Undo',                     shortcut: 'Ctrl+Z',         cmd: 'undo' },
  { label: 'Redo',                     shortcut: 'Ctrl+Y',         cmd: 'redo' },
  { label: 'Cut',                      shortcut: 'Ctrl+X',         cmd: 'cut' },
  { label: 'Copy',                     shortcut: 'Ctrl+C',         cmd: 'copy' },
  { label: 'Paste',                    shortcut: 'Ctrl+V',         cmd: 'paste' },
  { label: 'Paste Plain Text',         shortcut: 'Ctrl+Shift+V',   cmd: 'pasteplain' },
  { label: 'Select All',               shortcut: 'Ctrl+A',         cmd: 'selectall' },
  { label: 'Find…',                    shortcut: 'Ctrl+F',         cmd: 'find' },
  { label: 'Find & Replace…',          shortcut: 'Ctrl+H',         cmd: 'findreplace' },
  { label: 'Toggle Spell Check',       shortcut: '',               cmd: 'togglespell' },
  { label: 'Toggle Auto-Correct',      shortcut: '',               cmd: 'toggleac' },
  { label: 'Toggle Line Numbers',      shortcut: '',               cmd: 'togglelinenums' },
  { label: 'Toggle Current Line Highlight', shortcut: '',          cmd: 'togglecurline' },
  { label: 'Toggle Sidebar',           shortcut: '',               cmd: 'sidebar' },
  { label: 'Toggle Word Wrap',         shortcut: '',               cmd: 'wordwrap' },
  { label: 'Zoom In',                  shortcut: 'Ctrl++',         cmd: 'zoomin' },
  { label: 'Zoom Out',                 shortcut: 'Ctrl+-',         cmd: 'zoomout' },
  { label: 'Reset Zoom',               shortcut: '',               cmd: 'zoomreset' },
  { label: 'Line Spacing: 1',          shortcut: '',               cmd: 'ls1' },
  { label: 'Line Spacing: 1.5',        shortcut: '',               cmd: 'ls15' },
  { label: 'Line Spacing: 2',          shortcut: '',               cmd: 'ls2' },
  { label: 'Bold',                     shortcut: 'Ctrl+B',         cmd: 'bold' },
  { label: 'Italic',                   shortcut: 'Ctrl+I',         cmd: 'italic' },
  { label: 'Underline',                shortcut: 'Ctrl+U',         cmd: 'underline' },
  { label: 'Strikethrough',            shortcut: 'Ctrl+Shift+X',   cmd: 'strikethrough' },
  { label: 'Indent',                   shortcut: 'Tab',            cmd: 'indentmore' },
  { label: 'Outdent',                  shortcut: 'Shift+Tab',      cmd: 'indentless' },
  { label: 'Increase Font Size',       shortcut: '',               cmd: 'fontup' },
  { label: 'Decrease Font Size',       shortcut: '',               cmd: 'fontdown' },
  { label: 'Insert Bullet List Item',  shortcut: '',               cmd: 'bullet' },
  { label: 'Insert Numbered List Item',shortcut: '',               cmd: 'numbered' },
  { label: 'Insert Date/Time',         shortcut: '',               cmd: 'timestamp' },
  { label: 'Toggle Auto Timestamp',    shortcut: '',               cmd: 'togglets' },
  { label: 'Special Characters…',     shortcut: '',               cmd: 'altchars' },
  { label: 'Set Word Count Goal…',     shortcut: '',               cmd: 'wordgoal' },
];

/* ══════════════════════════════
   PAGE TITLE
══════════════════════════════ */
function updatePageTitle() {
  const tab = activeTab();
  document.title = tab ? `${tab.filename}.${tab.ext} — Expresso Note` : 'Expresso Note';
}

/* ══════════════════════════════
   RECENT FILES
══════════════════════════════ */
function saveRecent(name, ext, content) {
  const entry = { name, ext, content: content.substring(0, 500), date: new Date().toLocaleString() };
  state.recent = state.recent.filter(r => r.name !== name);
  state.recent.unshift(entry);
  if (state.recent.length > 12) state.recent.pop();
  localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(state.recent));
  renderRecent();
}

function clearRecent() {
  state.recent = [];
  localStorage.removeItem(STORAGE_KEYS.RECENT);
  renderRecent();
}

function renderRecent() {
  recentList.innerHTML = '';
  if (!state.recent.length) {
    recentList.innerHTML = '<div class="recent-empty">No recent files</div>';
    return;
  }
  state.recent.forEach(r => {
    const d = document.createElement('div');
    d.className = 'recent-item';
    d.innerHTML = `<div class="recent-name">${r.name}.${r.ext}</div><div class="recent-meta">${r.date}</div>`;
    d.addEventListener('click', () => loadFromRecent(r));
    recentList.appendChild(d);
  });
}

function loadFromRecent(r) {
  const tab = activeTab();
  if (tab && tab.modified && !confirm('Discard unsaved changes in current tab?')) return;
  if (tab) {
    tab.filename = r.name;
    tab.ext      = r.ext;
    tab.modified = false;
  }
  editor.innerHTML = '';
  editor.textContent = r.content;
  if (tab) { tab.content = editor.innerHTML; tab.modified = false; }
  markClean();
  updateStatus();
  updatePageTitle();
  renderTabs();
}

/* ══════════════════════════════
   SESSION PERSISTENCE
   Saves open tab names/content to localStorage on unload;
   restores them on next load.
══════════════════════════════ */
function persistSession() {
  snapshotActiveTab();
  const session = state.tabs.map(t => ({
    filename:    t.filename,
    ext:         t.ext,
    content:     t.content,
    modified:    t.modified,
    listCounter: t.listCounter,
    active:      t.id === state.activeTabId,
  }));
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!Array.isArray(session) || session.length === 0) return null;
    return session;
  } catch (e) {
    return null;
  }
}

window.addEventListener('beforeunload', persistSession);

/* ══════════════════════════════
   TAB SYSTEM
══════════════════════════════ */
function activeTab() {
  return state.tabs.find(t => t.id === state.activeTabId) || null;
}

function snapshotActiveTab() {
  const tab = activeTab();
  if (tab) tab.content = editor.innerHTML;
}

function newTab(filename, ext, content) {
  snapshotActiveTab();
  const name = filename || nextUntitledName();
  const tab  = createTabDescriptor(name, ext || 'nnt', content || '');
  state.tabs.push(tab);
  activateTab(tab.id, true);
}

function activateTab(id, skipSnapshot) {
  if (!skipSnapshot) snapshotActiveTab();
  state.activeTabId = id;
  const tab = activeTab();
  if (!tab) return;
  editor.innerHTML = tab.content;
  stMod.style.display = tab.modified ? 'inline' : 'none';
  updateStatus();
  updatePageTitle();
  renderTabs();
  updateLineNums();
  editor.focus();
}

function closeTabById(id) {
  const idx = state.tabs.findIndex(t => t.id === id);
  if (idx === -1) return;
  const tab = state.tabs[idx];
  if (tab.modified) {
    const prevId = state.activeTabId;
    state.activeTabId        = id;
    activateTab(id, true);
    state.pendingCloseTabId  = id;
    state.pendingClosePrevId = prevId === id ? null : prevId;
    document.getElementById('overlay-close').style.display = 'flex';
    return;
  }
  _removeTab(idx);
}

function _removeTab(idx) {
  state.tabs.splice(idx, 1);
  if (state.tabs.length === 0) {
    const blank = createTabDescriptor(nextUntitledName(), 'nnt', '');
    state.tabs.push(blank);
    activateTab(blank.id, true);
    return;
  }
  const nextIdx = Math.min(idx, state.tabs.length - 1);
  activateTab(state.tabs[nextIdx].id, true);
}

/* Close all tabs except the one with the given id */
function closeOtherTabs(keepId) {
  const toClose = state.tabs.filter(t => t.id !== keepId);
  toClose.forEach(t => {
    if (t.modified) t.modified = false; /* force-close without save prompt for batch */
  });
  state.tabs = state.tabs.filter(t => t.id === keepId);
  if (!state.tabs.find(t => t.id === state.activeTabId)) {
    activateTab(state.tabs[0].id, true);
  } else {
    renderTabs();
  }
}

/* Close all tabs to the right of the given id */
function closeTabsToRight(anchorId) {
  const anchorIdx = state.tabs.findIndex(t => t.id === anchorId);
  if (anchorIdx === -1) return;
  state.tabs = state.tabs.slice(0, anchorIdx + 1);
  if (!state.tabs.find(t => t.id === state.activeTabId)) {
    activateTab(state.tabs[state.tabs.length - 1].id, true);
  } else {
    renderTabs();
  }
}

/* ── Tab rename inline ── */
function startTabRename(id) {
  const tabEl = tabList.querySelector(`.tab[data-tab-id="${id}"]`);
  if (!tabEl) return;
  const tab = state.tabs.find(t => t.id === id);
  if (!tab) return;

  const labelEl = tabEl.querySelector('.tab-label');
  if (!labelEl) return;

  const input = document.createElement('input');
  input.className   = 'tab-rename-input';
  input.value       = tab.filename;
  input.spellcheck  = false;
  labelEl.replaceWith(input);
  input.focus();
  input.select();

  function commit() {
    const val = input.value.trim();
    if (val) tab.filename = val;
    renderTabs();
    updatePageTitle();
    updateStatus();
  }
  input.addEventListener('blur',    commit);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); input.blur(); }
    if (e.key === 'Escape') { input.value = tab.filename; input.blur(); }
    e.stopPropagation();
  });
}

/* ── Tab cycling ── */
function cycleTab(direction) {
  if (state.tabs.length < 2) return;
  const idx     = state.tabs.findIndex(t => t.id === state.activeTabId);
  const newIdx  = (idx + direction + state.tabs.length) % state.tabs.length;
  activateTab(state.tabs[newIdx].id, false);
}

/* ── Tab render ── */
function renderTabs() {
  tabList.innerHTML = '';
  state.tabs.forEach(tab => {
    const el = document.createElement('div');
    el.className  = 'tab' +
      (tab.id === state.activeTabId ? ' active'   : '') +
      (tab.modified                 ? ' modified' : '');
    el.dataset.tabId    = tab.id;
    el.draggable        = true;
    el.title            = `${tab.filename}.${tab.ext}`;

    const dot = document.createElement('span');
    dot.className = 'tab-dot';

    const label = document.createElement('span');
    label.className   = 'tab-label';
    label.textContent = `${tab.filename}.${tab.ext}`;

    const closeBtn = document.createElement('button');
    closeBtn.className   = 'tab-close';
    closeBtn.textContent = '×';
    closeBtn.title       = 'Close tab';
    closeBtn.addEventListener('click', e => { e.stopPropagation(); closeTabById(tab.id); });

    el.appendChild(dot);
    el.appendChild(label);
    el.appendChild(closeBtn);

    /* Click to activate */
    el.addEventListener('click', () => {
      if (tab.id !== state.activeTabId) activateTab(tab.id, false);
    });

    /* Double-click label to rename */
    label.addEventListener('dblclick', e => {
      e.stopPropagation();
      startTabRename(tab.id);
    });

    /* Middle-click to close */
    el.addEventListener('mousedown', e => {
      if (e.button === 1) { e.preventDefault(); closeTabById(tab.id); }
    });

    /* Right-click for tab context menu */
    el.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
      state.ctxTabId = tab.id;
      openTabCtxMenu(e.clientX, e.clientY);
    });

    /* Drag reorder */
    el.addEventListener('dragstart', e => {
      state.dragSrcTabId = tab.id;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', tab.id);

      /* Create custom ghost */
      const ghost = document.createElement('div');
      ghost.className   = 'tab-drag-ghost';
      ghost.textContent = `${tab.filename}.${tab.ext}`;
      document.body.appendChild(ghost);
      ghost.style.left  = '-9999px';
      ghost.style.top   = '-9999px';
      e.dataTransfer.setDragImage(ghost, 0, 0);
      setTimeout(() => ghost.remove(), 0);
    });

    el.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      el.classList.add('drag-over');
    });

    el.addEventListener('dragleave', () => el.classList.remove('drag-over'));

    el.addEventListener('drop', e => {
      e.preventDefault();
      el.classList.remove('drag-over');
      const srcId  = state.dragSrcTabId;
      const destId = tab.id;
      if (srcId === null || srcId === destId) return;
      const srcIdx  = state.tabs.findIndex(t => t.id === srcId);
      const destIdx = state.tabs.findIndex(t => t.id === destId);
      if (srcIdx === -1 || destIdx === -1) return;
      const [moved] = state.tabs.splice(srcIdx, 1);
      state.tabs.splice(destIdx, 0, moved);
      renderTabs();
      state.dragSrcTabId = null;
    });

    el.addEventListener('dragend', () => {
      tabList.querySelectorAll('.tab').forEach(t => t.classList.remove('drag-over'));
      state.dragSrcTabId = null;
    });

    tabList.appendChild(el);
  });

  const activeEl = tabList.querySelector('.tab.active');
  if (activeEl) activeEl.scrollIntoView({ inline: 'nearest', block: 'nearest' });
}

/* ── Tab context menu ── */
function openTabCtxMenu(x, y) {
  closeTabCtxMenu();
  const menuW = 200, menuH = 160;
  tabCtxMenu.style.left    = Math.min(x, window.innerWidth  - menuW) + 'px';
  tabCtxMenu.style.top     = Math.min(y, window.innerHeight - menuH) + 'px';
  tabCtxMenu.classList.add('open');
}

function closeTabCtxMenu() {
  tabCtxMenu.classList.remove('open');
}

document.getElementById('tctx-rename').addEventListener('click', () => {
  closeTabCtxMenu();
  if (state.ctxTabId !== null) startTabRename(state.ctxTabId);
});
document.getElementById('tctx-close').addEventListener('click', () => {
  closeTabCtxMenu();
  if (state.ctxTabId !== null) closeTabById(state.ctxTabId);
});
document.getElementById('tctx-closeothers').addEventListener('click', () => {
  closeTabCtxMenu();
  if (state.ctxTabId !== null) closeOtherTabs(state.ctxTabId);
});
document.getElementById('tctx-closeright').addEventListener('click', () => {
  closeTabCtxMenu();
  if (state.ctxTabId !== null) closeTabsToRight(state.ctxTabId);
});

document.addEventListener('click', closeTabCtxMenu);

/* ══════════════════════════════
   LINE NUMBERS
══════════════════════════════ */
function updateLineNums() {
  if (!state.lineNums) { lineNumsEl.innerHTML = ''; return; }
  const text   = editor.innerText || '';
  const count  = (text.match(/\n/g) || []).length + 1;
  const curLn  = getCurrentLineNumber();
  let html = '';
  for (let i = 1; i <= count; i++) {
    html += `<div class="ln-num${i === curLn ? ' current' : ''}">${i}</div>`;
  }
  lineNumsEl.innerHTML = html;
  /* Sync scroll */
  lineNumsEl.scrollTop = editor.scrollTop;
}

function getCurrentLineNumber() {
  try {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return 1;
    const range = sel.getRangeAt(0);
    const tmp = document.createRange();
    tmp.setStart(editor, 0);
    tmp.setEnd(range.startContainer, range.startOffset);
    return (tmp.toString().match(/\n/g) || []).length + 1;
  } catch (e) {
    return 1;
  }
}

editor.addEventListener('scroll', () => {
  if (state.lineNums) lineNumsEl.scrollTop = editor.scrollTop;
});

/* ══════════════════════════════
   CURRENT LINE HIGHLIGHT
   Uses CSS custom properties to paint a band behind
   the active line without DOM manipulation.
══════════════════════════════ */
function updateCurLineHighlight() {
  if (!state.curLine) {
    editor.style.removeProperty('--cur-line-top');
    editor.style.removeProperty('--cur-line-h');
    return;
  }
  try {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range    = sel.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rect     = range.getBoundingClientRect();
    const edRect   = editor.getBoundingClientRect();
    const top      = rect.top  - edRect.top  + editor.scrollTop;
    const h        = rect.height || parseInt(getComputedStyle(editor).lineHeight) || 20;
    editor.style.setProperty('--cur-line-top', top);
    editor.style.setProperty('--cur-line-h',   h);
  } catch (e) { /* noop */ }
}

/* ══════════════════════════════
   STATUS BAR
══════════════════════════════ */
function updateStatus() {
  const tab     = activeTab();
  const sel     = window.getSelection();
  const selText = (sel && sel.toString()) || '';
  let wordCount = 0;

  if (selText.length > 0) {
    const selWords = selText.trim().split(/\s+/).filter(Boolean).length;
    stWords.textContent = `${selWords} sel words`;
    stChars.textContent = `${selText.length} sel chars`;
    wordCount = selWords;
  } else {
    const text  = editor.innerText || '';
    wordCount   = text.trim().length ? text.trim().split(/\s+/).length : 0;
    stWords.textContent = `${wordCount} words`;
    stChars.textContent = `${text.length} chars`;
  }

  /* Word goal progress */
  if (state.wordGoal > 0) {
    stGoalWrap.style.display = '';
    stGoalNum.textContent    = state.wordGoal;
    const pct = Math.min(100, Math.round((wordCount / state.wordGoal) * 100));
    stGoalFill.style.width   = pct + '%';
    stGoalFill.classList.toggle('complete', wordCount >= state.wordGoal);
  } else {
    stGoalWrap.style.display = 'none';
  }

  stFile.textContent     = tab ? `${tab.filename}.${tab.ext}` : 'Untitled.nnt';
  stZoom.textContent     = `${state.zoom}%`;
  stLS.textContent       = `Spacing: ${state.lineSpacing}×`;
  stWW.textContent       = `Wrap: ${state.wordWrap    ? 'ON' : 'OFF'}`;
  stSpell.textContent    = `Spell: ${state.spellCheck ? 'ON' : 'OFF'}`;
  stTS.textContent       = `TS: ${state.timestampOn   ? 'ON' : 'OFF'}`;
  stEncoding.textContent = tab ? `UTF-8 · .${tab.ext}` : 'UTF-8 · .nnt';

  wwIndicator.textContent    = state.wordWrap    ? 'ON' : 'OFF';
  spellIndicator.textContent = state.spellCheck  ? 'ON' : 'OFF';
  acIndicator.textContent    = state.autoCorrect ? 'ON' : 'OFF';
  lnIndicator.textContent    = state.lineNums    ? 'ON' : 'OFF';
  clIndicator.textContent    = state.curLine     ? 'ON' : 'OFF';
  tsMenuIndicator.textContent = state.timestampOn ? 'ON' : 'OFF';

  updateCursorPos();
  updateLineNums();
  updateCurLineHighlight();
}

function updateCursorPos() {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) { stLines.textContent = 'Ln 1'; stCols.textContent = 'Col 1'; return; }
  try {
    const range = sel.getRangeAt(0);
    const tmp   = document.createRange();
    tmp.setStart(editor, 0);
    tmp.setEnd(range.startContainer, range.startOffset);
    const before = tmp.toString();
    const blines = before.split('\n');
    stLines.textContent = `Ln ${blines.length}`;
    stCols.textContent  = `Col ${blines[blines.length - 1].length + 1}`;
  } catch (e) {
    stLines.textContent = 'Ln 1';
    stCols.textContent  = 'Col 1';
  }
}

/* ══════════════════════════════
   MODIFIED FLAG
══════════════════════════════ */
function markModified() {
  const tab = activeTab();
  if (tab) tab.modified = true;
  stMod.style.display = 'inline';
  renderTabs();
}

function markClean() {
  const tab = activeTab();
  if (tab) tab.modified = false;
  stMod.style.display = 'none';
  renderTabs();
}

/* ══════════════════════════════
   TEXT INSERTION
══════════════════════════════ */
function insertText(txt) {
  editor.focus();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  range.deleteContents();
  const node = document.createTextNode(txt);
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  markModified();
  updateStatus();
}

/* ══════════════════════════════
   INDENT / OUTDENT SELECTION
   Tab with selection: indent all selected lines.
   Shift+Tab with or without selection: outdent.
══════════════════════════════ */
const INDENT = '    '; /* 4 spaces */

function indentSelection() {
  editor.focus();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) { insertText(INDENT); return; }
  const range = sel.getRangeAt(0);
  if (range.collapsed) { insertText(INDENT); return; }

  /* Expand range to full lines */
  const frag   = range.cloneContents();
  const text   = frag.textContent;
  const lines  = text.split('\n');
  const indented = lines.map(l => INDENT + l).join('\n');
  range.deleteContents();
  range.insertNode(document.createTextNode(indented));
  markModified(); updateStatus();
}

function outdentSelection() {
  editor.focus();
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  const frag  = range.cloneContents();
  const text  = frag.textContent;
  if (!text) return;
  const lines     = text.split('\n');
  const outdented = lines.map(l => l.startsWith(INDENT) ? l.slice(INDENT.length) : l.replace(/^ {1,3}/, '')).join('\n');
  range.deleteContents();
  range.insertNode(document.createTextNode(outdented));
  markModified(); updateStatus();
}

/* ══════════════════════════════
   APPLY SETTINGS
══════════════════════════════ */
function applyWordWrap() {
  editor.style.whiteSpace = state.wordWrap ? 'pre-wrap' : 'pre';
  editor.style.overflowX  = state.wordWrap ? 'hidden'  : 'auto';
}

function applyLineSpacing() {
  editor.style.lineHeight = String(state.lineSpacing);
  lineSpacingSel.value    = String(state.lineSpacing);
}

function applyZoom() {
  editor.style.fontSize = Math.round(state.fontSize * (state.zoom / 100)) + 'px';
}

function applyFont() {
  editor.style.fontFamily = state.fontFamily;
  fontFamilySel.value     = state.fontFamily;
  applyZoom();
}

function applyFontSize() {
  fontSizeSel.value = String(state.fontSize);
  applyZoom();
}

function applyColors() {
  editor.style.color      = state.textColor;
  editor.style.background = state.bgColor;
  textColorIn.value       = state.textColor;
  bgColorIn.value         = state.bgColor;
}

function applySidebar() {
  sidebarEl.classList.toggle('collapsed', !state.sidebarOpen);
}

function applyTimestamp() {
  btnTS.classList.toggle('active', state.timestampOn);
  stTS.textContent          = `TS: ${state.timestampOn ? 'ON' : 'OFF'}`;
  tsMenuIndicator.textContent = state.timestampOn ? 'ON' : 'OFF';
}

function applySpellCheck() {
  editor.setAttribute('spellcheck', state.spellCheck ? 'true' : 'false');
  btnSpell.classList.toggle('active', state.spellCheck);
  spellIndicator.textContent = state.spellCheck ? 'ON' : 'OFF';
  stSpell.textContent        = `Spell: ${state.spellCheck ? 'ON' : 'OFF'}`;
}

function applyAutoCorrect() {
  btnAC.classList.toggle('active', state.autoCorrect);
  acIndicator.textContent = state.autoCorrect ? 'ON' : 'OFF';
}

function applyLineNums() {
  lineNumsEl.classList.toggle('visible', state.lineNums);
  btnLineNums.classList.toggle('active', state.lineNums);
  lnIndicator.textContent = state.lineNums ? 'ON' : 'OFF';
  updateLineNums();
}

function applyCurLine() {
  editor.classList.toggle('show-curline', state.curLine);
  clIndicator.textContent = state.curLine ? 'ON' : 'OFF';
  updateCurLineHighlight();
}

function applyAllSettings() {
  applyWordWrap();
  applyLineSpacing();
  applyFont();
  applyFontSize();
  applyColors();
  applySidebar();
  applyTimestamp();
  applySpellCheck();
  applyAutoCorrect();
  applyLineNums();
  applyCurLine();
}

/* ══════════════════════════════
   AUTO-CORRECT ENGINE
══════════════════════════════ */
editor.addEventListener('keydown', e => {
  /* Tab / Shift+Tab — indent/outdent */
  if (e.key === 'Tab') {
    e.preventDefault();
    if (e.shiftKey) outdentSelection();
    else            indentSelection();
    return;
  }

  /* Auto-correct */
  if (!state.autoCorrect) return;
  const triggers = [' ', '.', ',', '!', '?', ';', ':'];
  if (!triggers.includes(e.key)) return;

  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  if (range.startContainer.nodeType !== Node.TEXT_NODE) return;

  const textNode = range.startContainer;
  const offset   = range.startOffset;
  const text     = textNode.nodeValue;
  let wordStart  = offset - 1;
  while (wordStart > 0 && !/\s/.test(text[wordStart - 1])) wordStart--;
  const word = text.slice(wordStart, offset);
  if (!word) return;

  const lower      = word.toLowerCase();
  const correction = AC_MAP[lower] || AC_MAP[word];
  if (!correction) return;

  const finalCorrection = (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase())
    ? correction.charAt(0).toUpperCase() + correction.slice(1)
    : correction;

  textNode.nodeValue = text.slice(0, wordStart) + finalCorrection + text.slice(offset);
  const newRange = document.createRange();
  newRange.setStart(textNode, wordStart + finalCorrection.length);
  newRange.collapse(true);
  sel.removeAllRanges();
  sel.addRange(newRange);
  markModified(); updateStatus();
});

/* ══════════════════════════════
   CUSTOM CONTEXT MENU (editor)
══════════════════════════════ */
function closeCtxMenu() { ctxMenu.classList.remove('open'); }

editor.addEventListener('contextmenu', e => {
  e.preventDefault();
  closeCtxMenu();
  ctxSuggestions.innerHTML  = '';
  ctxSpellSep.style.display = 'none';

  if (state.spellCheck) {
    let wordUnder = '';
    try {
      const r = document.caretRangeFromPoint ? document.caretRangeFromPoint(e.clientX, e.clientY) : null;
      if (r && r.startContainer.nodeType === Node.TEXT_NODE) {
        const txt = r.startContainer.nodeValue;
        let s = r.startOffset, end = r.startOffset;
        while (s   > 0          && /\w/.test(txt[s - 1])) s--;
        while (end < txt.length && /\w/.test(txt[end]))   end++;
        wordUnder = txt.slice(s, end);
      }
    } catch (_) {}

    const suggestions = [];
    if (wordUnder) {
      const lower = wordUnder.toLowerCase();
      if (AC_MAP[lower] && !suggestions.includes(AC_MAP[lower])) suggestions.push(AC_MAP[lower]);
    }

    if (suggestions.length > 0) {
      ctxSpellSep.style.display = 'block';
      suggestions.slice(0, 4).forEach(suggestion => {
        const d = document.createElement('div');
        d.className   = 'ctx-suggestion';
        d.textContent = suggestion;
        d.addEventListener('mousedown', ev => {
          ev.preventDefault();
          try {
            const r2 = document.caretRangeFromPoint ? document.caretRangeFromPoint(e.clientX, e.clientY) : null;
            if (r2 && r2.startContainer.nodeType === Node.TEXT_NODE) {
              const txt2 = r2.startContainer.nodeValue;
              let s2 = r2.startOffset, e2 = r2.startOffset;
              while (s2 > 0           && /\w/.test(txt2[s2 - 1])) s2--;
              while (e2 < txt2.length && /\w/.test(txt2[e2]))     e2++;
              r2.startContainer.nodeValue = txt2.slice(0, s2) + suggestion + txt2.slice(e2);
              markModified(); updateStatus();
            }
          } catch (_) {}
          closeCtxMenu();
        });
        ctxSuggestions.appendChild(d);
      });
    }
  }

  const menuW = 200, menuH = 220;
  ctxMenu.style.left = Math.min(e.clientX, window.innerWidth  - menuW) + 'px';
  ctxMenu.style.top  = Math.min(e.clientY, window.innerHeight - menuH) + 'px';
  ctxMenu.classList.add('open');
});

ctxMenu.querySelectorAll('.menu-item[data-cmd]').forEach(item => {
  item.addEventListener('mousedown', ev => {
    ev.preventDefault();
    closeCtxMenu();
    cmd(item.dataset.cmd);
  });
});

document.addEventListener('click', closeCtxMenu);

/* ══════════════════════════════
   FIND & REPLACE
══════════════════════════════ */
function openFindBar(mode) {
  state.findMode = mode;
  state.findOpen = true;
  findBar.classList.add('open');
  if (mode === 'replace') {
    findBarTitle.textContent = 'Find & Replace';
    replaceRow.classList.add('visible');
    frReplace.classList.add('visible');
    frReplaceAll.classList.add('visible');
  } else {
    findBarTitle.textContent = 'Find';
    replaceRow.classList.remove('visible');
    frReplace.classList.remove('visible');
    frReplaceAll.classList.remove('visible');
  }
  setTimeout(() => findInput.focus(), 50);
}

function closeFindBar() {
  clearHighlights();
  findBar.classList.remove('open');
  state.findOpen = false;
}

function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function clearHighlights() {
  editor.querySelectorAll('mark.fn-mark').forEach(m => {
    const p = m.parentNode;
    while (m.firstChild) p.insertBefore(m.firstChild, m);
    p.removeChild(m);
  });
  editor.normalize();
  state.findMatches = [];
  findCount.textContent = '';
}

function buildFindRegex(q) {
  if (!q) return null;
  try {
    const pattern = state.findOptRegex ? q : escapeReg(q);
    const wrapped = state.findOptWord  ? `\\b${pattern}\\b` : pattern;
    const flags   = state.findOptCase  ? 'g' : 'gi';
    return new RegExp(wrapped, flags);
  } catch (e) {
    return null;
  }
}

function doFind() {
  clearHighlights();
  state.findIndex = 0;
  const q  = findInput.value;
  const re = buildFindRegex(q);
  if (!re) return;

  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  const nodes  = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach(node => {
    const text = node.nodeValue;
    re.lastIndex = 0;
    let m, last = 0, hasMatch = false;
    const frag = document.createDocumentFragment();
    while ((m = re.exec(text)) !== null) {
      hasMatch = true;
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const mark = document.createElement('mark');
      mark.className   = 'fn-mark';
      mark.textContent = m[0];
      state.findMatches.push(mark);
      frag.appendChild(mark);
      last = m.index + m[0].length;
    }
    if (!hasMatch) return;
    frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  });

  findCount.textContent = state.findMatches.length ? `${state.findMatches.length} found` : 'Not found';
  highlightCurrent();
}

function highlightCurrent() {
  state.findMatches.forEach((m, i) => m.classList.toggle('current', i === state.findIndex));
  if (state.findMatches[state.findIndex])
    state.findMatches[state.findIndex].scrollIntoView({ block: 'center' });
}

/* Find option toggles */
frOptCase.addEventListener('click', () => {
  state.findOptCase = !state.findOptCase;
  frOptCase.classList.toggle('active', state.findOptCase);
  doFind();
});
frOptWord.addEventListener('click', () => {
  state.findOptWord = !state.findOptWord;
  frOptWord.classList.toggle('active', state.findOptWord);
  doFind();
});
frOptRegex.addEventListener('click', () => {
  state.findOptRegex = !state.findOptRegex;
  frOptRegex.classList.toggle('active', state.findOptRegex);
  doFind();
});

document.getElementById('fr-next').addEventListener('click', () => {
  if (!state.findMatches.length) return;
  state.findIndex = (state.findIndex + 1) % state.findMatches.length;
  highlightCurrent();
});
document.getElementById('fr-prev').addEventListener('click', () => {
  if (!state.findMatches.length) return;
  state.findIndex = (state.findIndex - 1 + state.findMatches.length) % state.findMatches.length;
  highlightCurrent();
});
document.getElementById('fr-replace').addEventListener('click', () => {
  if (!state.findMatches.length) return;
  const m = state.findMatches[state.findIndex];
  m.parentNode.replaceChild(document.createTextNode(replaceInput.value), m);
  state.findMatches.splice(state.findIndex, 1);
  if (state.findIndex >= state.findMatches.length) state.findIndex = 0;
  findCount.textContent = state.findMatches.length ? `${state.findMatches.length} found` : '';
  highlightCurrent();
  markModified();
});
document.getElementById('fr-replaceall').addEventListener('click', () => {
  state.findMatches.forEach(m => m.parentNode.replaceChild(document.createTextNode(replaceInput.value), m));
  state.findMatches = [];
  findCount.textContent = '';
  markModified();
});
document.getElementById('fr-close').addEventListener('click', closeFindBar);
findInput.addEventListener('input', doFind);

/* ══════════════════════════════
   COMMAND PALETTE
══════════════════════════════ */
function openPalette() {
  state.paletteOpen  = true;
  state.paletteIndex = 0;
  paletteInput.value = '';
  paletteOverlay.style.display = 'flex';
  filterPalette('');
  setTimeout(() => paletteInput.focus(), 30);
}

function closePalette() {
  state.paletteOpen = false;
  paletteOverlay.style.display = 'none';
}

function filterPalette(q) {
  const lower = q.toLowerCase().trim();
  state.paletteFiltered = PALETTE_COMMANDS.filter(c =>
    !lower || c.label.toLowerCase().includes(lower)
  );
  state.paletteIndex = 0;
  renderPalette(lower);
}

function renderPalette(q) {
  paletteListEl.innerHTML = '';
  if (!state.paletteFiltered.length) {
    paletteListEl.innerHTML = '<div style="padding:12px 14px;color:var(--muted);font-size:13px">No matching commands</div>';
    return;
  }
  state.paletteFiltered.forEach((c, i) => {
    const el = document.createElement('div');
    el.className = 'pal-item' + (i === state.paletteIndex ? ' active' : '');

    /* Highlight matching characters */
    let labelHtml = '';
    if (q) {
      const idx = c.label.toLowerCase().indexOf(q);
      if (idx !== -1) {
        labelHtml =
          escHTML(c.label.slice(0, idx)) +
          `<span class="pal-match">${escHTML(c.label.slice(idx, idx + q.length))}</span>` +
          escHTML(c.label.slice(idx + q.length));
      } else {
        labelHtml = escHTML(c.label);
      }
    } else {
      labelHtml = escHTML(c.label);
    }

    el.innerHTML = `<span class="pal-item-label">${labelHtml}</span>` +
      (c.shortcut ? `<span class="pal-item-shortcut">${escHTML(c.shortcut)}</span>` : '');

    el.addEventListener('mousedown', ev => {
      ev.preventDefault();
      closePalette();
      cmd(c.cmd);
    });
    el.addEventListener('mouseenter', () => {
      state.paletteIndex = i;
      renderPalette(q);
    });

    paletteListEl.appendChild(el);
  });

  /* Scroll active item into view */
  const activeEl = paletteListEl.querySelector('.pal-item.active');
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
}

function escHTML(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

paletteInput.addEventListener('input', () => filterPalette(paletteInput.value));
paletteInput.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    state.paletteIndex = Math.min(state.paletteIndex + 1, state.paletteFiltered.length - 1);
    renderPalette(paletteInput.value.toLowerCase().trim());
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    state.paletteIndex = Math.max(state.paletteIndex - 1, 0);
    renderPalette(paletteInput.value.toLowerCase().trim());
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const c = state.paletteFiltered[state.paletteIndex];
    if (c) { closePalette(); cmd(c.cmd); }
  } else if (e.key === 'Escape') {
    e.preventDefault();
    closePalette();
  }
  e.stopPropagation();
});

paletteOverlay.addEventListener('mousedown', e => {
  if (e.target === paletteOverlay) closePalette();
});

/* ══════════════════════════════
   FILE DROP
══════════════════════════════ */
let dragCounter = 0;

document.addEventListener('dragenter', e => {
  if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
    dragCounter++;
    dropOverlay.classList.add('active');
  }
});

document.addEventListener('dragleave', () => {
  dragCounter--;
  if (dragCounter <= 0) { dragCounter = 0; dropOverlay.classList.remove('active'); }
});

document.addEventListener('dragover', e => e.preventDefault());

document.addEventListener('drop', e => {
  e.preventDefault();
  dragCounter = 0;
  dropOverlay.classList.remove('active');

  const files = e.dataTransfer && e.dataTransfer.files;
  if (!files || !files.length) return;

  Array.from(files).forEach(f => {
    const allowed = ['.txt', '.nnt'];
    const ok = allowed.some(ext => f.name.endsWith(ext));
    if (!ok) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const txt   = ev.target.result;
      const parts = f.name.split('.');
      const ext   = parts.pop() || 'nnt';
      const name  = parts.join('.') || nextUntitledName();
      newTab(name, ext, '');
      const t = activeTab();
      editor.innerHTML = '';
      editor.textContent = txt;
      if (t) { t.content = editor.innerHTML; t.modified = false; }
      markClean(); updateStatus(); updatePageTitle();
      saveRecent(name, ext, txt);
      renderTabs();
    };
    reader.readAsText(f);
  });
});

/* ══════════════════════════════
   MENU SYSTEM
══════════════════════════════ */
let openMenuEl = null;

document.querySelectorAll('[data-menu]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const id = 'menu-' + btn.dataset.menu;
    const dd = document.getElementById(id);
    if (!dd) return;
    const rect = btn.getBoundingClientRect();
    if (openMenuEl && openMenuEl !== dd) {
      openMenuEl.classList.remove('open');
      document.querySelectorAll('[data-menu]').forEach(b => b.classList.remove('open'));
    }
    dd.style.left = rect.left + 'px';
    const isOpen = dd.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    openMenuEl = isOpen ? dd : null;
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.menu-dropdown').forEach(d => d.classList.remove('open'));
  document.querySelectorAll('[data-menu]').forEach(b => b.classList.remove('open'));
  openMenuEl = null;
});

document.querySelectorAll('.menu-item[data-cmd]').forEach(item => {
  item.addEventListener('click', e => {
    e.stopPropagation();
    cmd(item.dataset.cmd);
    document.querySelectorAll('.menu-dropdown').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('[data-menu]').forEach(b => b.classList.remove('open'));
    openMenuEl = null;
  });
});

/* ══════════════════════════════
   TOOLBAR LISTENERS
══════════════════════════════ */
document.querySelectorAll('.tb-btn[data-cmd]').forEach(btn => {
  btn.addEventListener('click', () => cmd(btn.dataset.cmd));
});

fontFamilySel.addEventListener('change', () => {
  state.fontFamily = fontFamilySel.value; applyFont(); persistSettings();
});
fontSizeSel.addEventListener('change', () => {
  state.fontSize = parseInt(fontSizeSel.value, 10); applyFontSize(); persistSettings();
});
lineSpacingSel.addEventListener('change', () => {
  state.lineSpacing = parseFloat(lineSpacingSel.value);
  applyLineSpacing(); persistSettings(); updateStatus();
});
textColorIn.addEventListener('input', () => {
  state.textColor = textColorIn.value; editor.style.color = state.textColor; persistSettings();
});
bgColorIn.addEventListener('input', () => {
  state.bgColor = bgColorIn.value; editor.style.background = state.bgColor; persistSettings();
});

tabNewBtn.addEventListener('click',       () => cmd('new'));
btnClearRecent.addEventListener('click',  clearRecent);

/* ══════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════ */
document.addEventListener('keydown', e => {
  const ctrl = e.ctrlKey || e.metaKey;

  /* Escape: close palette → find bar → alt panel → context menus */
  if (e.key === 'Escape') {
    if (state.paletteOpen) { closePalette(); return; }
    if (state.findOpen)    { closeFindBar(); return; }
    if (state.altOpen)     { altPanel.classList.remove('open'); state.altOpen = false; return; }
    closeCtxMenu();
    closeTabCtxMenu();
    return;
  }

  /* Ctrl+Tab / Ctrl+Shift+Tab — cycle tabs */
  if (ctrl && e.key === 'Tab') {
    e.preventDefault();
    cycleTab(e.shiftKey ? -1 : 1);
    return;
  }

  /* Find option shortcuts when find bar is open */
  if (state.findOpen && e.altKey) {
    if (e.key === 'c' || e.key === 'C') { e.preventDefault(); frOptCase.click();  return; }
    if (e.key === 'w' || e.key === 'W') { e.preventDefault(); frOptWord.click();  return; }
    if (e.key === 'r' || e.key === 'R') { e.preventDefault(); frOptRegex.click(); return; }
  }

  if (ctrl && e.shiftKey && e.key === 'P') { e.preventDefault(); cmd('palette'); return; }
  if (ctrl && e.shiftKey && e.key === 'V') { e.preventDefault(); cmd('pasteplain'); return; }
  if (ctrl && e.key === 'n')               { e.preventDefault(); cmd('new'); }
  if (ctrl && e.key === 'o')               { e.preventDefault(); cmd('open'); }
  if (ctrl && e.shiftKey && e.key === 'S') { e.preventDefault(); cmd('saveas'); }
  else if (ctrl && e.key === 's')          { e.preventDefault(); cmd('save'); }
  if (ctrl && e.key === 'p')               { e.preventDefault(); cmd('print'); }
  if (ctrl && e.key === 'w')               { e.preventDefault(); cmd('close'); }
  if (ctrl && e.key === 'f')               { e.preventDefault(); cmd('find'); }
  if (ctrl && e.key === 'h')               { e.preventDefault(); cmd('findreplace'); }
  if (ctrl && (e.key === '=' || e.key === '+')) { e.preventDefault(); cmd('zoomin'); }
  if (ctrl && e.key === '-')               { e.preventDefault(); cmd('zoomout'); }
  if (ctrl && e.key === 'a' && document.activeElement === editor) { e.preventDefault(); cmd('selectall'); }
  if (ctrl && e.shiftKey && e.key === 'X') { e.preventDefault(); cmd('strikethrough'); }
});

/* ══════════════════════════════
   EDITOR EVENTS
══════════════════════════════ */
editor.addEventListener('input',   () => { markModified(); updateStatus(); });
editor.addEventListener('keyup',   updateStatus);
editor.addEventListener('mouseup', updateStatus);

document.addEventListener('selectionchange', () => {
  if (document.activeElement !== editor && !editor.contains(document.activeElement)) return;
  btnBold.classList.toggle('active',          document.queryCommandState('bold'));
  btnItalic.classList.toggle('active',        document.queryCommandState('italic'));
  btnUnderline.classList.toggle('active',     document.queryCommandState('underline'));
  btnStrikethrough.classList.toggle('active', document.queryCommandState('strikeThrough'));
  updateStatus();
});

/* ══════════════════════════════
   SAVE LOGIC
══════════════════════════════ */
function doSave() {
  const tab      = activeTab();
  const content  = editor.innerText || '';
  const filename = tab ? tab.filename : 'Untitled 1';
  const ext      = tab ? tab.ext      : 'nnt';
  const blob     = new Blob([content], { type: 'text/plain' });
  const a        = document.createElement('a');
  a.href         = URL.createObjectURL(blob);
  a.download     = `${filename}.${ext}`;
  a.click();
  URL.revokeObjectURL(a.href);
  markClean(); updateStatus(); updatePageTitle();
  saveRecent(filename, ext, content);
}

/* ══════════════════════════════
   COMMAND DISPATCHER
══════════════════════════════ */
function cmd(name) {
  const tab = activeTab();

  switch (name) {

    /* ── File ── */
    case 'new': newTab(null, 'nnt', ''); break;

    case 'open': {
      const inp = document.createElement('input');
      inp.type   = 'file';
      inp.accept = '.txt,.nnt';
      inp.onchange = e => {
        const f = e.target.files[0]; if (!f) return;
        const reader = new FileReader();
        reader.onload = ev => {
          const txt   = ev.target.result;
          const parts = f.name.split('.');
          const ext   = parts.pop() || 'nnt';
          const name  = parts.join('.') || nextUntitledName();
          newTab(name, ext, '');
          const t = activeTab();
          editor.innerHTML = ''; editor.textContent = txt;
          if (t) { t.content = editor.innerHTML; t.modified = false; }
          markClean(); updateStatus(); updatePageTitle();
          saveRecent(name, ext, txt); renderTabs();
        };
        reader.readAsText(f);
      };
      inp.click();
      break;
    }

    case 'save':    doSave(); break;

    case 'saveas':
      if (tab) document.getElementById('saveas-name').value = tab.filename;
      document.getElementById('overlay-save').style.display = 'flex';
      setTimeout(() => document.getElementById('saveas-name').select(), 50);
      break;

    case 'print': window.print(); break;

    case 'close':
      if (tab) closeTabById(tab.id);
      break;

    case 'closeothers':
      if (tab) closeOtherTabs(tab.id);
      break;

    case 'closeright':
      if (tab) closeTabsToRight(tab.id);
      break;

    /* ── Edit ── */
    case 'undo':       editor.focus(); document.execCommand('undo'); break;
    case 'redo':       editor.focus(); document.execCommand('redo'); break;
    case 'cut':        editor.focus(); document.execCommand('cut'); break;
    case 'copy':       editor.focus(); document.execCommand('copy'); break;
    case 'paste':
      editor.focus();
      navigator.clipboard.readText().then(t => insertText(t)).catch(() => document.execCommand('paste'));
      break;
    case 'pasteplain':
      editor.focus();
      navigator.clipboard.readText()
        .then(t => insertText(t.replace(/<[^>]+>/g, '')))
        .catch(() => { /* fallback: plain execCommand paste still pastes plain in most browsers */ document.execCommand('paste'); });
      break;
    case 'selectall':  editor.focus(); document.execCommand('selectAll'); break;
    case 'delete':     editor.focus(); document.execCommand('delete'); break;

    case 'find':
      if (state.findOpen && state.findMode === 'find') closeFindBar();
      else openFindBar('find');
      break;
    case 'findreplace':
      if (state.findOpen && state.findMode === 'replace') closeFindBar();
      else openFindBar('replace');
      break;

    case 'palette':
      if (state.paletteOpen) closePalette();
      else openPalette();
      break;

    case 'togglespell':
      state.spellCheck = !state.spellCheck;
      applySpellCheck(); persistSettings(); updateStatus();
      break;

    case 'toggleac':
      state.autoCorrect = !state.autoCorrect;
      applyAutoCorrect(); persistSettings();
      break;

    /* ── View ── */
    case 'sidebar':
      state.sidebarOpen = !state.sidebarOpen;
      applySidebar(); persistSettings();
      break;
    case 'togglelinenums':
      state.lineNums = !state.lineNums;
      applyLineNums(); persistSettings(); updateStatus();
      break;
    case 'togglecurline':
      state.curLine = !state.curLine;
      applyCurLine(); persistSettings(); updateStatus();
      break;
    case 'wordwrap':
      state.wordWrap = !state.wordWrap;
      applyWordWrap(); persistSettings(); updateStatus();
      break;
    case 'zoomin':
      state.zoom = Math.min(300, state.zoom + 10);
      applyZoom(); persistSettings(); updateStatus();
      break;
    case 'zoomout':
      state.zoom = Math.max(50, state.zoom - 10);
      applyZoom(); persistSettings(); updateStatus();
      break;
    case 'zoomreset':
      state.zoom = 100;
      applyZoom(); persistSettings(); updateStatus();
      break;
    case 'ls1':  state.lineSpacing = 1;   applyLineSpacing(); persistSettings(); updateStatus(); break;
    case 'ls15': state.lineSpacing = 1.5; applyLineSpacing(); persistSettings(); updateStatus(); break;
    case 'ls2':  state.lineSpacing = 2;   applyLineSpacing(); persistSettings(); updateStatus(); break;

    /* ── Format ── */
    case 'bold':          editor.focus(); document.execCommand('bold'); break;
    case 'italic':        editor.focus(); document.execCommand('italic'); break;
    case 'underline':     editor.focus(); document.execCommand('underline'); break;
    case 'strikethrough': editor.focus(); document.execCommand('strikeThrough'); break;
    case 'indentmore':    indentSelection(); break;
    case 'indentless':    outdentSelection(); break;
    case 'fontup':
      state.fontSize = Math.min(72, state.fontSize + 2);
      fontSizeSel.value = state.fontSize; applyZoom(); persistSettings();
      break;
    case 'fontdown':
      state.fontSize = Math.max(8, state.fontSize - 2);
      fontSizeSel.value = state.fontSize; applyZoom(); persistSettings();
      break;

    /* ── Insert ── */
    case 'bullet':    insertText('\n• '); break;
    case 'numbered': {
      const t2 = activeTab();
      insertText('\n' + (t2 ? t2.listCounter : 1) + '. ');
      if (t2) t2.listCounter++;
      break;
    }
    case 'timestamp': insertText('[' + new Date().toLocaleString() + '] '); break;
    case 'togglets':
      state.timestampOn = !state.timestampOn;
      applyTimestamp(); persistSettings(); updateStatus();
      break;
    case 'altchars':
      state.altOpen = !state.altOpen;
      altPanel.classList.toggle('open', state.altOpen);
      break;
    case 'wordgoal':
      document.getElementById('goal-input').value = state.wordGoal || 0;
      document.getElementById('overlay-goal').style.display = 'flex';
      setTimeout(() => document.getElementById('goal-input').select(), 50);
      break;
  }
}

/* ══════════════════════════════
   SAVE AS MODAL
══════════════════════════════ */
function doSaveAs() {
  const tab  = activeTab();
  const name = document.getElementById('saveas-name').value.trim() || 'Untitled';
  const ext  = document.getElementById('saveas-type').value;
  if (tab) { tab.filename = name; tab.ext = ext; }
  document.getElementById('overlay-save').style.display = 'none';
  doSave(); renderTabs();
}
document.getElementById('saveas-ok').addEventListener('click', doSaveAs);
document.getElementById('saveas-cancel').addEventListener('click', () => {
  document.getElementById('overlay-save').style.display = 'none';
});
document.getElementById('saveas-name').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); doSaveAs(); }
});
document.getElementById('saveas-type').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); doSaveAs(); }
});

/* ══════════════════════════════
   CLOSE TAB MODAL
══════════════════════════════ */
function doCloseDiscard() {
  document.getElementById('overlay-close').style.display = 'none';
  const idx = state.tabs.findIndex(t => t.id === state.pendingCloseTabId);
  if (idx !== -1) _removeTab(idx);
  state.pendingCloseTabId  = null;
  state.pendingClosePrevId = null;
}

document.getElementById('close-discard').addEventListener('click', doCloseDiscard);

document.getElementById('close-cancel').addEventListener('click', () => {
  document.getElementById('overlay-close').style.display = 'none';
  if (state.pendingClosePrevId !== null) activateTab(state.pendingClosePrevId, false);
  state.pendingCloseTabId  = null;
  state.pendingClosePrevId = null;
});

document.getElementById('close-save').addEventListener('click', () => {
  document.getElementById('overlay-close').style.display = 'none';
  doSave();
  const idx = state.tabs.findIndex(t => t.id === state.pendingCloseTabId);
  if (idx !== -1) _removeTab(idx);
  state.pendingCloseTabId  = null;
  state.pendingClosePrevId = null;
});

/* ══════════════════════════════
   WORD COUNT GOAL MODAL
══════════════════════════════ */
document.getElementById('goal-ok').addEventListener('click', () => {
  const val = parseInt(document.getElementById('goal-input').value, 10) || 0;
  state.wordGoal = Math.max(0, val);
  document.getElementById('overlay-goal').style.display = 'none';
  persistSettings(); updateStatus();
});
document.getElementById('goal-cancel').addEventListener('click', () => {
  document.getElementById('overlay-goal').style.display = 'none';
});
document.getElementById('goal-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); document.getElementById('goal-ok').click(); }
  if (e.key === 'Escape') { document.getElementById('overlay-goal').style.display = 'none'; }
});

/* ══════════════════════════════
   INIT
   Restore session or open a fresh blank tab.
══════════════════════════════ */
(function init() {
  applyAllSettings();

  const session = loadSession();
  if (session && session.length > 0) {
    let activeId = null;
    session.forEach(s => {
      state.tabCounter++;
      const tab = {
        id:          state.tabCounter,
        filename:    s.filename,
        ext:         s.ext,
        content:     s.content,
        modified:    s.modified,
        listCounter: s.listCounter || 1,
      };
      /* Track untitled counter so new tabs don't collide */
      const m = s.filename.match(/^Untitled (\d+)$/);
      if (m) state.untitledCounter = Math.max(state.untitledCounter, parseInt(m[1], 10));

      state.tabs.push(tab);
      if (s.active) activeId = tab.id;
    });
    state.activeTabId = activeId || state.tabs[0].id;
    const tab = activeTab();
    if (tab) editor.innerHTML = tab.content;
    stMod.style.display = (tab && tab.modified) ? 'inline' : 'none';
  } else {
    const first = createTabDescriptor(nextUntitledName(), 'nnt', '');
    state.tabs.push(first);
    state.activeTabId = first.id;
  }

  renderTabs();
  renderRecent();
  updateStatus();
  updatePageTitle();
  editor.focus();
})();
