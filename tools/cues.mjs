#!/usr/bin/env node
/* Dump a template's sound cues: node tools/cues.mjs <page.html> > out/cues.json */
import path from 'node:path'; import { pathToFileURL } from 'node:url';
const { chromium } = await import('playwright');
const b = await chromium.launch(); const p = await b.newPage();
await p.goto(pathToFileURL(path.resolve(process.argv[2])).href); await p.evaluate(() => window.ready);
const r = await p.evaluate(() => ({ B: window.B || window.VP.B, DUR: window.DUR, cues: window.CUES() }));
console.log(JSON.stringify(r, null, 1)); await b.close();
