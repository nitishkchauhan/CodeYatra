// Python Advanced · Module 3 · APIs and HTTP. Lesson 3.1 keeps the old module id (py-apis).
// A small get()/post() in each program stands in for a real server, so lessons work offline and are always the same.
import type { Lesson } from '../../types';
import { arrange, atWork, bugTask, challenge, check, explore, lesson, matchUp, mcq, pairs, pickCode, predict, predictTask, recap, reveal, run, swipe, tapbug } from './kit';

const SERVER = [
  'REPLIES = {"/trains/90101": (200, {"train": "90101", "late_by": 0}), "/trains/90102": (200, {"train": "90102", "late_by": 12}), "/trains/90105": (503, {"error": "Busy"})}',
  'def get(path):',
  '    return REPLIES.get(path, (404, {"error": "Not found"}))',
];
const FLAKY = ['calls = 0', 'def get(path):', '    global calls', '    calls += 1', '    if calls < 3:', '        return 503, {"error": "Busy"}', '    return 200, {"train": "90106", "late_by": 0}'];

export const PY_A_M3: Lesson[] = [
  lesson('py-apis', 'Requests and status codes', 5, [
    atWork('Felix', ['City Travel Desk’s booking service asks the railway’s server for live train times, over HTTP.', 'Each request gets a reply with a status code. Your code must read the code before the data.']),
    reveal('Request and reply', [
      ['GET /trains/90101', 'A method (GET reads, POST sends new data) and an address.'],
      ['200 OK', 'It worked; the body has the data, usually JSON.'],
      ['404 Not Found', 'Our request was wrong: no such train.'],
      ['503 Service Unavailable', 'The server’s problem. Try again later.'],
    ], { mono: true }),
    run('Ask the practice server', 'Pick a train.', [...SERVER, 'status, body = get({{v}})', 'if status == 200:', '    print(body["train"], "late by", body["late_by"], "min")', 'elif 400 <= status < 500:', '    print("Check the train number:", status)', 'else:', '    print("Server trouble, try later:", status)'], ['"/trains/90101"', '"/trains/90102"', '"/trains/90999"', '"/trains/90105"'], { caption: 'This little get() stands in for the real server, so the lesson works offline. With the requests library: requests.get(url, timeout=5).' }),
    matchUp('Status codes', [['200', 'OK'], ['201', 'Created'], ['404', 'Not found'], ['500', 'Server error']], '2xx worked, 4xx is our mistake, 5xx is theirs.'),
    check('A reply is 401. Whose problem is it?', ['Ours: we aren’t signed in', 'The server’s', 'Nobody’s', 'The network’s'], '4xx means the request must change.', '4xx or 5xx?', { mono: false }),
    tapbug("KeyError: 'train' when the server is busy", ['status, body = get(path)', 'print(body["train"])'], [[2, 'print(body["train"])', 'print(body["train"]) if status == 200 else print("Try later")']], 'A busy reply has no train in it. Check the status before reading the data.'),
    recap([
      ['📨', 'A request: a method and an address'],
      ['🚦', '2xx worked, 4xx ours, 5xx theirs'],
      ['🔎', 'Check the status before the data'],
    ]),
  ]),

  lesson('py-a-3-2', 'Timeouts and retries', 5, [
    atWork('Felix', ['Train 90106’s server is busy at peak times: the first couple of requests fail with 503, and then it answers.', 'Good clients set a timeout, retry a few times with a growing wait, and then give up politely.']),
    run('How many tries?', 'Pick how many tries to allow. Can you get the answer?', [...FLAKY, 'def with_retry(path, tries):', '    for attempt in range(1, tries + 1):', '        status, body = get(path)', '        if status == 200:', '            return f"Got it on try {attempt}"', '    return f"Gave up after {tries} tries"', 'print(with_retry("/trains/90106", {{v}}))'], ['1', '2', '3', '5'], { goal: 'Got it on try 3', caption: 'Each run starts a fresh server, which is busy for the first two requests.' }),
    reveal('A good client', [
      ['timeout=5', 'requests.get(url, timeout=5): never wait for ever.'],
      ['Retry only what may pass', '503, 429 and timeouts. Never 400 or 404.'],
      ['Back off', 'Wait 1 s, 2 s, 4 s… between tries: time.sleep(2 ** attempt).'],
      ['Give up politely', 'After a few tries, show a clear message and log the error.'],
    ], { mono: true }),
    predict('Growing waits', ['waits = [2 ** attempt for attempt in range(4)]', 'total = sum(waits)', 'print(waits, total)'], [
      [1, 'What will waits be?', ['[1, 2, 4, 8]', '[0, 2, 4, 6]', '[2, 4, 8, 16]'], '2 ** 0 is 1, then it doubles.', { var: 'waits' }],
      [2, 'What will total be?', ['15', '8', '14'], 'The longest you could wait in all.', { var: 'total' }],
    ]),
    check('Which replies are worth retrying?', ['503 and timeouts', '404', '400', '401'], 'Only when trying again could change the answer.', 'Whose problem is it?'),
    tapbug('It retries a wrong train number again and again', ['if status >= 400:', '    continue  # try again'], [[1, 'status >= 400', 'status >= 500']], '4xx means our request is wrong, so trying again can’t help. Retry only server errors.'),
    recap([
      ['⏱', 'Always set a timeout'],
      ['🔁', 'Retry server errors, with a growing wait'],
      ['🙅', 'Never retry 4xx; give up politely'],
    ]),
  ]),

  lesson('py-a-3-3', 'Sending data: POST and JSON', 5, [
    atWork('Megan', ['Now the booking service must send new bookings to the railway: a POST with a JSON body.', 'The server checks it and answers 201 Created, or 400 with what was wrong.']),
    run('Send a booking', 'Pick a booking to send.', ['import json', 'def post(path, body):', '    data = json.loads(body)', '    if not isinstance(data.get("seats"), int) or data["seats"] < 1:', '        return 400, {"error": "seats must be a whole number, 1 or more"}', '    return 201, {"id": 17, **data}', 'booking = {{v}}', 'status, reply = post("/bookings", json.dumps(booking))', 'print(status, reply)'], ['{"train": "90101", "seats": 2}', '{"train": "90101", "seats": 0}', '{"train": "90101", "seats": "two"}'], { caption: 'json.dumps turns the dictionary into the JSON text that travels; the server answers with a status and JSON.' }),
    reveal('Methods', [
      ['GET', 'Read.'],
      ['POST', 'Create something new.'],
      ['PUT, PATCH', 'Change something.'],
      ['DELETE', 'Remove something.'],
    ], { mono: true }),
    explore('With the requests library', ['import requests', 'resp = requests.post(url, json=booking, timeout=5)', 'if resp.status_code == 201:', '    booking_id = resp.json()["id"]', 'else:', '    print(resp.json()["error"])'], [
      [2, 'json= sends the dictionary as JSON, with the right header.'],
      [3, '201 Created: the booking exists now.'],
      [4, 'Read the new id from the reply.'],
      [6, 'Otherwise, show the server’s message.'],
    ], { minTaps: 3 }),
    check('Which method creates a new booking?', ['POST', 'GET', 'DELETE', 'HEAD'], 'POST sends new data.', 'Create.', { mono: true }),
    tapbug('TypeError: Object of type set is not JSON serializable', ['booking = {"train", "90101"}'], [[1, '{"train", "90101"}', '{"train": "90101"}']], 'A comma makes a set; a colon makes a dictionary, which JSON can send.'),
    recap([
      ['📤', 'POST sends new data as JSON'],
      ['🆕', '201 Created, or 400 with a reason'],
      ['🧾', 'json.dumps before sending, json.loads after'],
    ]),
  ]),

  challenge('py-a-3-ch', 'Module 3 Challenge', { icon: '🌐', name: 'API Pro' }, ['Read status codes before data', 'Use timeouts and retry the right failures', 'Send data with POST and JSON'], [
    mcq(1, 'Which status means “created”?', ['201', '200', '204', '301'], 'A new thing exists.', { mono: true }),
    mcq(2, 'A 5xx status means…', ['The server failed', 'Our request was wrong', 'It worked', 'We must sign in'], '5xx: theirs.'),
    mcq(3, 'Why set a timeout?', ['So the program never waits for ever', 'To make requests faster', 'To retry automatically', 'Servers require it'], 'Networks can hang.'),
    mcq(4, 'Which method reads data?', ['GET', 'POST', 'PUT', 'DELETE'], 'GET reads.', { mono: true }),
    mcq(5, 'What does json.dumps do before sending?', ['Turns a dict into JSON text', 'Sends the request', 'Checks the status', 'Reads the reply'], 'dumps: to a string.'),
    swipe([
      ['Retry a 404 a few times', false, 'It will still not exist.'],
      ['Check the status before reading the body', true, 'Errors have a different body.'],
      ['Waits that double each time are called backoff', true, 'Exponential backoff.'],
      ['POST is for reading data', false, 'GET reads; POST creates.'],
    ]),
    pairs([['GET', 'Read'], ['POST', 'Create'], ['timeout=5', 'Don’t wait for ever'], ['503', 'Busy, try later']], 'HTTP tools.'),
    pickCode('Which sends a booking as JSON with requests?', ['requests.post(url, json=booking, timeout=5)', 'requests.get(url, booking)', 'requests.send(booking)', 'requests.post(url, booking=json)'], 'POST, with json= and a timeout.'),
    bugTask(['if status >= 400: retry()', 'print(body["train"])', 'booking = {"train", "90101"}'], [[1, '>= 400', '>= 500'], [2, 'body["train"]', 'body.get("train", "unknown")'], [3, '{"train", "90101"}', '{"train": "90101"}']], 'Retry only server errors, error replies have no train, and JSON needs a dictionary.'),
    predictTask(['status = 404', 'kind = "ok" if status < 300 else "ours" if status < 500 else "server"', 'print(kind)'], 'What does it print?', ['ours', 'server', 'ok', '404'], '404 is 300 or more, and under 500: our mistake.'),
    arrange(['import json', 'body = json.dumps({"train": "90101", "seats": 2})', 'print(json.loads(body)["seats"])'], 'import json, make the body, then read it back', ['2']),
  ]),
];
