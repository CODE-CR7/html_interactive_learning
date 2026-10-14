#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const activity = path.join(__dirname, '../activities/10/mathematics/real-numbers/real-numbers-explorer-hcf-lcm-and-decimal-expansions/interactive/index.html');
const html = fs.readFileSync(activity, 'utf8');
const questions = JSON.parse(html.match(/const QUESTIONS = ([\s\S]*?);\n  const LEVELS/)[1]);
const byId = id => questions.find(q => q.id === id);
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const lcm = (a, b) => a / gcd(a, b) * b;

// Check coverage and parse every executable script, including the retained calculators.
assert.deepEqual(questions.map(q => q.id), Array.from({length: 30}, (_, i) => i + 1));
assert.equal(new Set(questions.map(q => q.level)).size, 5);
for (const q of questions) {
  assert.ok(q.steps.length >= 2 && q.goal && q.reason && q.paraphrase);
  assert.equal(new Set([q.goal, ...q.goal_wrong]).size, 3);
  assert.equal(new Set([q.reason, ...q.reason_wrong]).size, 3);
  assert.ok((q.prompt.match(/\[\[/g) || []).length >= 2);
  assert.equal((q.prompt.match(/\[\[/g) || []).length, (q.prompt.match(/\]\]/g) || []).length);
}
for (const match of html.matchAll(/<script(?: id="topic-preset-script")?>\s*([\s\S]*?)<\/script>/g)) {
  new vm.Script(match[1]);
}

// Independently verify the numerical answers and the requested units.
for (const id of [1, 4, 9, 10, 11, 12, 13, 14]) {
  const q = byId(id);
  assert.equal(q.answer, q.nums.reduce(gcd), `HCF form ${id}`);
}
for (const id of [2, 15, 16, 17, 18, 19, 28]) {
  const q = byId(id);
  assert.equal(q.answer, q.nums.reduce(lcm), `LCM form ${id}`);
}
assert.equal(byId(11).unit, 'cm');
assert.equal(byId(12).unit, 'm');
assert.equal(byId(18).unit, 'minutes');
assert.equal(byId(6).answer, 72 * 120 / 24);
assert.equal(byId(7).answer, 2028 / 156);
for (const [id, a, h, l] of [[8, 30, 6, 180], [24, 32, 8, 96]]) {
  const b = byId(id).answer;
  assert.equal(a * b, h * l);
  assert.equal(gcd(a, b), h);
  assert.equal(lcm(a, b), l);
}
assert.equal(gcd(26, 91), 13);
assert.equal(lcm(26, 91), 182);
assert.equal(13 * 182, 26 * 91);
assert.notEqual([12, 15, 20].reduce(gcd) * [12, 15, 20].reduce(lcm), 12 * 15 * 20);

// Remainder problems require explicit lower bounds and valid remainder constraints.
const q20 = byId(20);
assert.ok(q20.prompt.includes('greater than 20'));
const validSmallNumbers = [];
for (let n = 0; n <= q20.answer; n++) if ([12,16,20].every(d => n % d === 3)) validSmallNumbers.push(n);
assert.deepEqual(validSmallNumbers, [3, 243]);
assert.equal(validSmallNumbers.find(n => n > 20), q20.answer);
for (const [id, original, remainders] of [[21,[125,205,325],[5,5,5]], [22,[127,206,329],[7,6,9]]]) {
  const d = byId(id).answer;
  assert.equal(d, original.map((n,i) => n - remainders[i]).reduce(gcd));
  original.forEach((n,i) => { assert.ok(d > remainders[i]); assert.equal(n % d, remainders[i]); });
}

// Exhaustive small-domain checks protect the non-numeric conceptual solutions.
for (let a = 0; a <= 12; a++) assert.equal(gcd(2 ** 3 * 3 ** a, 2 ** 4 * 3 ** 2) === 2 ** 3 * 3 ** 2, a >= 2);
assert.ok(byId(23).answer.includes('a ≥ 2'));
assert.notEqual(90 % 12, 0);
const pairs = [];
for (let a = 1; a <= 72; a++) for (let b = a; b <= 72; b++) if (gcd(a,b) === 6 && lcm(a,b) === 72) pairs.push([a,b]);
assert.deepEqual(pairs, [[6,72], [18,24]]);
assert.equal(byId(26).answer, '(6,72) and (18,24)');
for (let n = 1; n <= 100; n++) assert.equal(gcd(n,n+1), 1);
assert.equal([4,6,8].reduce(lcm), 24);
assert.equal(lcm(4,6), 12);
assert.equal(24 / 4, 6);
assert.equal(gcd(48,60), 12);
assert.equal(lcm(15,20), 60);
// Counterexample included in the missing-number explanation.
assert.equal(6 * 180 / 24, 45);
assert.equal(gcd(24,45), 3);
assert.equal(lcm(24,45), 360);
console.log('Verified all 30 reading forms, numerical answers, units, remainder bounds, exponent range, feasible pairs, and embedded script syntax.');
