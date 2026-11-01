// CI check: 15 families (6 management, 9 technical), unique ids, complete mappings, valid sample.
"use strict";
const path = require("path");
const CAT = require(path.join(__dirname, "..", "data", "controls.js"));
const SAMPLE = require(path.join(__dirname, "..", "data", "sample.js"));

let errors = [];
const fail = (m) => errors.push(m);

const ids = CAT.families.map((f) => f.id);
if (ids.length !== 15) fail(`expected 15 families, found ${ids.length}`);
if (new Set(ids).size !== ids.length) fail("duplicate family ids");
if (CAT.families.filter((f) => f.group === "management").length !== 6) fail("expected 6 management families");
if (CAT.families.filter((f) => f.group === "technical").length !== 9) fail("expected 9 technical families");
for (const f of CAT.families) {
  if (!/^[MT]\d$/.test(f.id)) fail(`${f.id}: id must be M1–M6 or T1–T9`);
  if (!f.name || !f.desc || !f.evidence) fail(`${f.id}: name, desc and evidence are required`);
  if (!Array.isArray(f.iso) || !f.iso.length) fail(`${f.id}: at least one ISO 27001 reference`);
  if (!Array.isArray(f.csf) || !f.csf.length) fail(`${f.id}: at least one NIST CSF reference`);
  for (const r of f.iso) if (!/^(Cl\. \d+(\.\d+)*|[5-8]\.\d{1,2})$/.test(r)) fail(`${f.id}: ISO reference "${r}" is not an Annex A control (5.1–8.34) or a clause`);
  for (const r of f.csf) if (!/^(GV|ID|PR|DE|RS|RC)\.[A-Z]{2}$/.test(r)) fail(`${f.id}: CSF reference "${r}" is not a CSF 2.0 category`);
}
const statusIds = new Set(CAT.statuses.map((s) => s.id));
if (statusIds.size !== 6) fail("expected 6 statuses");
for (const id of Object.keys(SAMPLE.items)) {
  if (!ids.includes(id)) fail(`sample: unknown family ${id}`);
  const it = SAMPLE.items[id];
  if (!statusIds.has(it.status)) fail(`sample ${id}: unknown status ${it.status}`);
  if (it.priority && !CAT.priorities.includes(it.priority)) fail(`sample ${id}: unknown priority ${it.priority}`);
}
if (Object.keys(SAMPLE.items).length !== 15) fail("sample must cover all 15 families");

// ---- consistency with the verified UAE IAR v1.1 overlay (grc-control-crosswalk snapshot) ----
const fs = require("fs");
const { parseCsv, split } = require("./csv");
const root = path.join(__dirname, "..");
const subs = parseCsv(fs.readFileSync(path.join(root, "data", "iar-v1.1-subfamilies.csv"), "utf8"));
const isoToCsf = {};
for (const r of parseCsv(fs.readFileSync(path.join(root, "data", "iso27001-to-nist-csf.csv"), "utf8"))) isoToCsf[r.iso27001_2022] = split(r.nist_csf_2.replace(/,/g, ";"));
if (subs.length !== 66) fail(`snapshot: expected 66 IAR v1.1 sub-families, found ${subs.length}`);
if (Object.keys(isoToCsf).length !== 93) fail(`snapshot: expected 93 Annex A controls in the CSF map, found ${Object.keys(isoToCsf).length}`);
const sorted = (a) => a.slice().sort();
for (const f of CAT.families) {
  const mine = subs.filter((r) => r.ref.split(".")[0] === f.id);
  if (!mine.length) { fail(`${f.id}: no sub-family in the snapshot`); continue; }
  const familyName = mine[0].family.replace(/^[MT]\d /, "");
  if (f.name !== familyName) fail(`${f.id}: name "${f.name}" differs from the IAR v1.1 family name "${familyName}"`);
  const annex = [...new Set(mine.flatMap((r) => split(r.iso27001_2022)))];
  const clauses = [...new Set(mine.flatMap((r) => split(r.iso27001_clauses)))];
  const expectedIso = annex.map((a) => a.replace(/^A\./, "")).concat(clauses.map((c) => "Cl. " + c));
  if (JSON.stringify(sorted(f.iso)) !== JSON.stringify(sorted(expectedIso))) fail(`${f.id}: ISO mapping is not the union of its sub-families in the crosswalk (expected ${expectedIso.join(", ")})`);
  const expectedCsf = [...new Set(annex.flatMap((a) => (isoToCsf[a] || []).map((s) => s.split("-")[0])))];
  if (JSON.stringify(sorted(f.csf)) !== JSON.stringify(sorted(expectedCsf))) fail(`${f.id}: CSF categories are not those of its Annex A controls in the crosswalk (expected ${expectedCsf.join(", ")})`);
}
const SUBS = require(path.join(root, "data", "subfamilies.js"));
if (SUBS.length !== subs.length) fail("data/subfamilies.js is out of date: run node scripts/build_data.js");
for (const s of SUBS) if (!CAT.priorities.includes(s.priority)) fail(`${s.id}: priority ${s.priority} is not P1-P4`);

// ---- the worked example must be dated and its figures must match the sample ----
const example = fs.readFileSync(path.join(root, "examples", "falcon-bay-worked-example.md"), "utf8");
const scoreOf = {}; for (const s of CAT.statuses) scoreOf[s.id] = s.score;
let applicable = 0, sum = 0, implemented = 0, partial = 0, open = 0, p1open = 0;
for (const id of Object.keys(SAMPLE.items)) {
  const it = SAMPLE.items[id], sc = scoreOf[it.status];
  if (sc === null) continue;
  applicable++; sum += sc;
  if (sc >= 3) implemented++; else if (sc === 2) partial++; else open++;
  if (sc < 3 && it.priority === "P1") p1open++;
}
const pct = Math.round((sum / (applicable * 4)) * 100);
const expected = [`Compliance score: **${pct} %**`, `Implemented or verified: **${implemented} of ${applicable}**`, `Partially implemented: **${partial}**`,
  `Not started or planned: **${open}**`, `P1 items still open: **${p1open}**`, `Assessment date (fictional): ${SAMPLE.assessment_date}`];
for (const line of expected) if (!example.includes(line)) fail(`worked example: expected "${line}"`);
for (const f of CAT.families) if (!new RegExp("^\\| " + f.id + " ", "m").test(example)) fail(`worked example: no row for ${f.id}`);

if (errors.length) { console.error("FAIL\n  " + errors.join("\n  ")); process.exit(1); }
console.log(`OK: ${ids.length} families consistent with the crosswalk snapshot (66 sub-families), ${CAT.statuses.length} statuses, sample "${SAMPLE.organisation}" complete, worked example figures match`);
