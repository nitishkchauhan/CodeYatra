// JavaScript Intermediate · Module 2 · Money, dates and text.
// Times come from the server in UTC (the Z); lessons show them on India’s clock with the standard time-zone id.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, lesson, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug, toggleRun, truth } from './kit';

const DEPARTS = 'const departs = new Date("2026-11-02T03:45:00Z");';

export const JS_I_M2: Lesson[] = [
  lesson('js-i-2-1', 'Money with Intl.NumberFormat', 5, [
    atWork('Megan', ['City Travel Desk sells a yearly pass. The page shows its price as 120000, and customers read it as twelve thousand.', 'Indian prices are grouped in lakhs: ₹1,20,000. The browser already knows how to do that.']),
    run('Format the price', 'Pick a format. Can you show ₹1,20,000?', ['const price = 120000;', 'const money = new Intl.NumberFormat({{v}});', 'console.log(money.format(price));'], [
      '"en-IN"',
      '"en-IN", { style: "currency", currency: "INR" }',
      '"en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }',
      '"en-US", { style: "currency", currency: "USD" }',
    ], { goal: '₹1,20,000', caption: 'The locale ("en-IN") picks the grouping; style and currency add the symbol.' }),
    reveal('Why not just add “₹”?', [
      ['"₹" + price', 'Gives ₹120000: no commas, hard to read.'],
      ['price.toFixed(2)', 'Two decimals, but still no grouping.'],
      ['Intl.NumberFormat', 'Grouping, symbol and decimals for any country, built into every browser.'],
      ['Make it once', 'Create the formatter once, then call format() as often as you like.'],
    ], { mono: true }),
    predict('Decimals can surprise you', ['const fare = 0.1 + 0.2;', 'const shown = fare.toFixed(2);', 'const paise = Math.round(fare * 100);', 'console.log(fare, shown, paise);'], [
      [1, 'What will fare be?', ['0.30000000000000004', '0.3', '0.30'], 'Computers store most decimals almost, not exactly.', { var: 'fare' }],
      [2, 'What will shown be?', ['"0.30"', '0.3', '"0.30000000000000004"'], 'toFixed rounds, and gives back text.', { var: 'shown' }],
      [3, 'What will paise be?', ['30', '31', '0.3'], 'Whole paise are exact. Keep money in paise, and format it only to show it.', { var: 'paise' }],
    ]),
    check('Which shows ₹1,20,000?', ['new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(120000)', '"₹" + 120000', '(120000).toFixed(0)', 'new Intl.NumberFormat("en-US").format(120000)'], 'en-IN groups in lakhs, and the currency style adds ₹.', 'You need the locale and the currency.'),
    tapbug('TypeError: Currency code is required', ['const money = new Intl.NumberFormat("en-IN", { style: "currency" });'], [[1, '{ style: "currency" }', '{ style: "currency", currency: "INR" }']], 'A currency style needs to know which currency: a three-letter code like INR.'),
    recap([
      ['💰', 'Intl.NumberFormat shows money properly'],
      ['🔢', '"en-IN" groups in lakhs: 1,20,000'],
      ['🪙', 'Keep money in whole paise; format it to show it'],
    ]),
  ]),

  lesson('js-i-2-2', 'Dates and times in a time zone', 5, [
    atWork('Felix', ['The server sends departure times like "2026-11-02T03:45:00Z". The Z means UTC, the world’s reference clock.', 'Travellers need the station’s time: 09:15. And a phone set to another country must still show station time.']),
    run('Show the departure', 'Pick a time zone. Which one shows the station’s 09:15?', [DEPARTS, 'const clock = new Intl.DateTimeFormat("en-GB", { timeZone: {{v}}, hour: "2-digit", minute: "2-digit" });', 'console.log(clock.format(departs));'], ['"UTC"', '"Europe/London"', '"Asia/Tokyo"', '"Asia/Kolkata"'], { goal: '09:15', caption: 'The same moment on different clocks. India is 5 hours 30 minutes ahead of UTC.' }),
    reveal('Reading time zones', [
      ['"…Z"', 'The time is in UTC. Servers store times this way so everyone agrees.'],
      ['timeZone', 'Which clock to show it on, like "Asia/Kolkata". These ids are the same in every browser.'],
      ['No timeZone', 'The phone’s own zone is used, which may not be the station’s.'],
      ['Don’t add hours by hand', 'Many countries change their clocks for summer. Let Intl do the maths.'],
    ], { mono: true }),
    run('Dates people can read', 'Pick a style.', [DEPARTS, 'const show = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", {{v}} });', 'console.log(show.format(departs));'], ['dateStyle: "medium"', 'dateStyle: "full"', 'weekday: "long", day: "numeric", month: "long"', 'dateStyle: "medium", timeStyle: "short"'], { caption: 'Ready-made styles (dateStyle, timeStyle), or pick the parts you want.' }),
    check('The server sends "2026-11-02T18:30:00Z". What is that in India?', ['00:00 on 3 November', '18:30 on 2 November', '13:00 on 2 November', '00:00 on 2 November'], '18:30 plus 5 hours 30 minutes is midnight: the next day.', 'India is ahead of UTC.', { mono: false }),
    tapbug('It shows 03:45, not 09:15', ['const clock = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });'], [[1, '"UTC"', '"Asia/Kolkata"']], 'UTC is the server’s clock. Show it on the station’s clock.'),
    recap([
      ['🌍', 'Servers send times in UTC (the Z)'],
      ['🕘', 'Intl.DateTimeFormat with timeZone shows local time'],
      ['🧮', 'Never add hours by hand'],
    ]),
  ]),

  lesson('js-i-2-3', 'Cleaning and checking what users type', 5, [
    atWork('Megan', ['People type station names every way: "  harbour   point", "HARBOUR POINT", "Harbour Point ".', 'Clean what they type before you search, and check train numbers before you ask the server.']),
    run('Clean the station name', 'Pick a clean-up. The brackets show where the text starts and ends.', ['const typed = "  harbour   POINT ";', 'console.log("[" + {{v}} + "]");'], ['typed', 'typed.trim()', 'typed.trim().toLowerCase()', 'typed.trim().replace(/\\s+/g, " ").toLowerCase()'], { goal: '[harbour point]', caption: 'trim removes the outer spaces, replace squeezes the inner ones, toLowerCase makes the case match.' }),
    toggleRun('Check before you send', [
      ['A good number', ['const typed = " 90101 ";', 'const no = typed.trim();', 'console.log(/^\\d{5}$/.test(no) ? "OK: " + no : "Not a train number");'], 'Trimmed, exactly five digits: send it.', ['OK: 90101']],
      ['A typo', ['const typed = "9O101";', 'const no = typed.trim();', 'console.log(/^\\d{5}$/.test(no) ? "OK: " + no : "Not a train number");'], 'The letter O isn’t a zero. Catch it here, instead of asking the server.', ['Not a train number']],
    ]),
    predict('Compare names safely', ['const typed = " Harbour Point";', 'const station = "harbour point";', 'const same = typed === station;', 'const cleaned = typed.trim().toLowerCase() === station;', 'console.log(same, cleaned);'], [
      [3, 'What will same be?', ['false', 'true', 'undefined'], 'A space and two capitals make them different text.', { var: 'same' }],
      [4, 'What will cleaned be?', ['true', 'false', 'undefined'], 'After cleaning, they are the same.', { var: 'cleaned' }],
    ]),
    truth([
      ['trim() removes spaces inside the text too', false, 'Only at the start and end.'],
      ['/^\\d{5}$/ means exactly five digits', true, '^ is the start, $ is the end.'],
      ['Checking in the page means the server needn’t check', false, 'Always check on the server too. Page checks are for a quick, friendly message.'],
    ]),
    tapbug('"Harbour Point " is not found', ['const station = input.value.toLowerCase();'], [[1, 'input.value.toLowerCase()', 'input.value.trim().toLowerCase()']], 'The space at the end makes it a different name. Trim first.'),
    recap([
      ['✂️', 'trim, replace and toLowerCase clean what people type'],
      ['🔍', 'Patterns like /^\\d{5}$/ check the shape'],
      ['🛡', 'Check in the page for speed, on the server for safety'],
    ]),
  ]),

  challenge('js-i-2-ch', 'Module 2 Challenge', { icon: '🌐', name: 'Format Pro' }, ['Show money the way people read it', 'Show times on the right clock', 'Clean and check what people type'], [
    mcq(1, 'Which locale groups 120000 as 1,20,000?', ['"en-IN"', '"en-US"', '"en-GB"', '"de-DE"'], 'Lakh grouping is Indian English.', { mono: true }),
    mcq(2, 'What does the Z in "2026-11-02T03:45:00Z" mean?', ['The time is in UTC', 'Zero seconds', 'The zone is unknown', 'The last time of the day'], 'Z marks UTC.'),
    mcq(3, 'Why keep money in whole paise?', ['Decimals like 0.1 + 0.2 aren’t exact', 'It uses less memory', 'Intl only formats paise', 'Rupees can’t be stored'], 'Whole numbers are exact.'),
    mcq(4, 'Which shows a time on India’s clock?', ['timeZone: "Asia/Kolkata"', 'timeZone: "+5.5"', 'locale: "IN"', 'date.addHours(5.5)'], 'A standard time-zone id.', { mono: true }),
    mcq(5, 'What does "  Hi  ".trim() give?', ['"Hi"', '"  Hi"', '"Hi  "', '" Hi "'], 'Both ends are cleaned.', { mono: true }),
    swipe([
      ['"₹" + 120000 shows ₹1,20,000', false, 'No grouping: ₹120000.'],
      ['A time ending in Z is in UTC', true, 'The world’s reference clock.'],
      ['toLowerCase helps compare names', true, 'Then HARBOUR matches harbour.'],
      ['Adding 5.5 hours by hand works for every country', false, 'Many zones change for summer.'],
    ]),
    pairs([['Intl.NumberFormat', 'Money and numbers'], ['Intl.DateTimeFormat', 'Dates and times'], ['trim()', 'Remove outer spaces'], ['/^\\d{5}$/', 'Exactly five digits']], 'Tools for real-world text.'),
    pickCode('Which shows 03:45 UTC as 09:15?', ['new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }).format(d)', 'd.getHours() + 5.5', 'd.toString("Asia/Kolkata")', 'new Intl.NumberFormat("en-IN").format(d)'], 'A date formatter with a time zone.'),
    bugTask(['const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "Rupees" });', 'const station = typed.trim.toLowerCase();', 'const ok = /^\\d{5}/.test(no);'], [[1, '"Rupees"', '"INR"'], [2, 'trim.', 'trim().'], [3, '/^\\d{5}/', '/^\\d{5}$/']], 'Currency codes are three letters (INR), trim needs brackets to run, and without $ a six-digit number passes too.'),
    predictTask(['const pass = 120000;', 'const money = new Intl.NumberFormat("en-IN");', 'console.log(money.format(pass / 4));'], 'What does it print?', ['30,000', '30000', '3,0000', '₹30,000'], '120000 / 4 is 30000, grouped as 30,000. No currency style, so no ₹.'),
    arrange(['const typed = "  HARBOUR  ";', 'const station = typed.trim().toLowerCase();', 'console.log("Searching for " + station);'], 'take what was typed, clean it, then search', ['Searching for harbour']),
  ]),
];
