// Shared helpers for the browser-driven test suite.
// Each test file boots the real game (abyssal_revamped/index.html) in headless
// Chromium and runs assertions inside the page via page.evaluate().
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const GAME_URL = pathToFileURL(path.join(__dirname, '..', 'abyssal_revamped', 'index.html')).href;

async function openGame({ query = '' } = {}) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(GAME_URL + query);
  await page.waitForFunction(() => typeof G !== 'undefined' && document.readyState === 'complete');
  await page.evaluate(() => ensureAbilitiesLoaded());
  return { browser, page, errors };
}

// Loads every lazy fusion data file so FUSION_CLASSES / DUAL_FUSIONS are complete.
async function loadAllFusions(page) {
  await page.evaluate(() => Promise.all(Array.from({ length: 17 }, (_, i) => loadFusionFile(i + 1))));
}

// Puts the game into a fresh run on the given floor without going through the
// world-gen modal. Runs inside the page.
const START_RUN_IN_PAGE = `
  window.__startTestRun = function(classId, floor) {
    G.player = null;
    G.selectedClass = classId;
    G.floor = floor || 1;
    G.log = [];
    G.inCombat = false;
    G.enemy = null;
    G.player = createPlayer(classId);
    G.map = generateMap(G.floor);
    G.phase = 'explore';
    showScreen('game-screen');
    return G.player;
  };
`;

async function prepare(page) {
  await page.addScriptTag({ content: START_RUN_IN_PAGE });
}

module.exports = { openGame, loadAllFusions, prepare, GAME_URL };
