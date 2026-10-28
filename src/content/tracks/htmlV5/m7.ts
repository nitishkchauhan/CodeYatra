// HTML track · Module 7 · Forms.
import type { Lesson } from '../../types';
import { arrange, beforeAfter, bugTask, challenge, chat, check, explore, lesson, live, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, toggle, xray } from './kit';

const FORM_CSS = 'label{display:block;margin-top:8px;font:14px sans-serif} input,select,textarea,button{font:15px sans-serif;margin-top:4px}';

export const HTML_M7: Lesson[] = [
  lesson('h-form-1', 'Form basics', 4, [
    chat(['Every login box, search bar and sign-up page is a form.', 'Forms let people send you information.']),
    explore('A form, part by part', ['<form action="/signup" method="post">', '  <label for="fname">First name:</label>', '  <input type="text" id="fname" name="fname">', '  <input type="submit" value="Send">', '</form>'], [
      [1, '<form> wraps the inputs. action is where the data goes; method is how it travels.', 'form'],
      [2, '<label> is the visible name of the field.', 'label'],
      [3, '<input> is the box the user types in.', '#fname'],
      [4, 'type="submit" makes the send button.', 'input[type=submit]'],
    ], { page: { html: '<form action="#" onsubmit="return false"><label for="fname">First name:</label><input type="text" id="fname" name="fname"> <input type="submit" value="Send"></form>', css: FORM_CSS } }),
    reveal('Why every input needs a name', [['📦 name="fname"', 'When the form is sent, each value travels with its name, like fname=Riya. An input without a name is not sent at all.']]),
    toggle('GET or POST?', [
      ['GET', ['<form action="/search" method="get">'], 'The data shows in the address bar: /search?fname=Riya. Good for searches, never for passwords. If you set no method, GET is used.'],
      ['POST', ['<form action="/signup" method="post">'], 'The data travels hidden inside the request. Use it for logins, payments and anything private.'],
    ]),
    place('Connect the label', 'Give the label and the input matching names, so tapping the label jumps into the box.', [['<label ', { gap: 0 }, '>Email</label>'], ['<input ', { gap: 1 }, ' name="email">']], ['for="email"', 'id="email"', 'name="email-box"'], ['for="email"', 'id="email"'], 'A label’s for must match the input’s id. It helps people tapping small boxes, and screen readers.', { css: FORM_CSS }),
    tapbug('The label is lost', ['<label for="city">City</label>', '<input type="text" id="town" name="city">'], [[2, 'id="town"', 'id="city"']], 'for="city" needs an input with id="city".'),
    recap([
      ['📝', '<form> wraps the inputs'],
      ['📮', 'action is where; method is how'],
      ['🏷', 'name is needed to send a value; label for matches input id'],
      ['🔒', 'Use POST for private data'],
    ]),
  ]),

  lesson('h-inputs-1', 'Form elements', 5, [
    reveal('Radio or checkbox?', [
      ['🔘 Radio buttons', 'Pick one option. All the options share the same name.'],
      ['☑️ Checkboxes', 'Pick any number of options.'],
    ], { intro: 'A pizza order: one size, but as many toppings as you like.' }),
    live('One group, one choice', 'Tap a name for the second radio button, then try choosing both sizes in the page.', ['<input type="radio" id="s" name="size" value="small">', '<label for="s">Small</label>', '<input type="radio" id="l" name="{{v}}" value="large">', '<label for="l">Large</label>'], ['size', 'size2'], { caption: 'With the same name, picking one un-picks the other. With different names, both can be picked.' }),
    explore('A dropdown', ['<select id="city" name="city">', '  <option value="del">Delhi</option>', '  <option value="mum" selected>Mumbai</option>', '</select>'], [
      [1, '<select> makes a dropdown. Add multiple to allow several choices.', 'select'],
      [3, 'selected picks the option shown at the start.', 'select'],
    ], { minTaps: 2 }),
    explore('A box for longer text', ['<textarea name="msg" rows="4" cols="30">Write here...</textarea>'], [[1, '<textarea> is a box with several lines. Unlike <input>, it has a closing tag.', 'textarea']], { minTaps: 1 }),
    reveal('Three kinds of button', [
      ['<button type="submit">', 'Sends the form.'],
      ['<button type="reset">', 'Clears the form.'],
      ['<button type="button">', 'Does nothing by itself; used with JavaScript.'],
    ], { mono: true, intro: 'Always set the type. Inside a form, a button with no type acts as submit.' }),
    place('Group the fields', 'Put a titled box around the personal details.', [[{ gap: 0 }], ['  ', { gap: 1 }], ['  <label>Name <input name="n"></label>'], ['  <label>Email <input name="e"></label>'], [{ gap: 2 }]], ['<fieldset>', '<legend>Personal details</legend>', '</fieldset>', '<title>Personal details</title>'], ['<fieldset>', '<legend>Personal details</legend>', '</fieldset>'], '<fieldset> draws a box around related fields, and <legend> gives it a title.', { css: FORM_CSS }),
    explore('Suggestions as you type', ['<input list="langs" name="lang">', '<datalist id="langs">', '  <option value="HTML">', '  <option value="Python">', '</datalist>'], [
      [1, 'list="langs" connects the box to the datalist below.', 'input'],
      [2, '<datalist> holds suggestions. Type H in the page and HTML is suggested, but any text is still allowed.', 'input'],
    ], { minTaps: 2 }),
    recap([
      ['🔘', 'Radio: one choice (same name)'],
      ['☑️', 'Checkbox: any number'],
      ['🔽', 'select and option make a dropdown; textarea is several lines'],
      ['📦', 'fieldset and legend group fields; datalist suggests'],
    ]),
  ]),

  lesson('html-7-3', 'Input types', 4, [
    chat(['Change one word, the type,', 'and an input becomes a date picker, a slider or a colour picker!']),
    reveal('Twelve input types', [
      ['text', 'One line of text.'],
      ['password', 'Hides the characters.'],
      ['email', 'Checks for an @ address; phones show an email keyboard.'],
      ['number', 'Numbers only, with up and down arrows.'],
      ['tel', 'Phones show a number pad.'],
      ['url', 'Web addresses.'],
      ['search', 'A search box.'],
      ['date', 'A calendar picker.'],
      ['time', 'A time picker.'],
      ['color', 'A colour picker.'],
      ['range', 'A slider.'],
      ['file', 'Choose a file to upload.'],
    ], { mono: true }),
    toggle('The right keyboard', [
      ['type="text"', ['<input type="text">'], 'Letters keyboard.', { html: '<input type="text" placeholder="Tap me on a phone">' }],
      ['type="email"', ['<input type="email">'], 'A keyboard with an @ key.', { html: '<input type="email" placeholder="you@example.com">' }],
      ['type="tel"', ['<input type="tel">'], 'A number pad. The right type gives the right keyboard.', { html: '<input type="tel" placeholder="98765 43210">' }],
    ]),
    place('Pick the best type', 'Tap the types in order: birthday, volume, photo, mobile, favourite colour.', [['Birthday <input type="', { gap: 0 }, '"><br>'], ['Volume <input type="', { gap: 1 }, '"><br>'], ['Photo <input type="', { gap: 2 }, '"><br>'], ['Mobile <input type="', { gap: 3 }, '"><br>'], ['Colour <input type="', { gap: 4 }, '">']], ['date', 'range', 'file', 'tel', 'color'], ['date', 'range', 'file', 'tel', 'color'], 'Each type brings its own control: a calendar, a slider, a file picker, a number pad and a colour picker.'),
    reveal('Special types', [
      ['checkbox, radio', 'Choices (Lesson 7.2).'],
      ['submit, reset', 'Buttons.'],
      ['hidden', 'Sends a value the user never sees.'],
      ['datetime-local, month, week', 'More date pickers.'],
    ], { mono: true }),
    tapbug('No email check', ['<input type="mail" name="email">'], [[1, 'type="mail"', 'type="email"']], 'An unknown type falls back to plain text, so the email check is lost.'),
    recap([
      ['🎛', 'The type attribute changes the control'],
      ['📱', 'The right type gives the right keyboard'],
      ['📅', 'date, color, range, file and password'],
    ]),
  ]),

  lesson('html-7-4', 'Input attributes', 4, [
    reveal('Helpful attributes', [
      ['value', 'The starting value.'],
      ['placeholder', 'Grey hint text that disappears when typing.'],
      ['autofocus', 'The cursor starts in this field.'],
      ['autocomplete', 'Lets the browser suggest saved entries (on or off).'],
    ], { mono: true }),
    beforeAfter('value or placeholder?', [['<input value="Riya">'], 'value is real text: it is sent with the form.', { html: '<input value="Riya">' }], [['<input placeholder="Your name">'], 'placeholder is only a grey hint: it is not sent.', { html: '<input placeholder="Your name">' }], undefined, ['value', 'placeholder']),
    toggle('Checks the browser does for you', [
      ['required', ['<input name="n" required>', '<button>Send</button>'], 'The field can’t be empty. Tap Send with it empty to see the warning.', { html: '<form onsubmit="return false"><input name="n" required> <button>Send</button></form>' }],
      ['maxlength', ['<input name="n" maxlength="10">'], 'At most 10 characters (minlength sets the fewest).', { html: '<input name="n" maxlength="10" placeholder="Try typing a lot">' }],
      ['min / max', ['<input type="number" min="18" max="60">', '<button>Send</button>'], 'A number range. Type 5 and tap Send.', { html: '<form onsubmit="return false"><input type="number" min="18" max="60"> <button>Send</button></form>' }],
      ['pattern', ['<input name="pin" pattern="[0-9]{6}">', '<button>Send</button>'], 'Must be exactly 6 digits, like a PIN code.', { html: '<form onsubmit="return false"><input name="pin" pattern="[0-9]{6}" placeholder="6 digits"> <button>Send</button></form>' }],
    ]),
    reveal('readonly or disabled?', [
      ['🔒 readonly', 'Can’t be edited, but is sent with the form.'],
      ['🚫 disabled', 'Can’t be edited or tapped, and is not sent.'],
    ]),
    place('Build a sign-up', 'Make email required, the password at least 8 characters, and the age at least 13.', [['<input type="email" name="email" ', { gap: 0 }, '><br>'], ['<input type="password" name="pw" ', { gap: 1 }, '><br>'], ['<input type="number" name="age" ', { gap: 2 }, '>']], ['required', 'minlength="8"', 'min="13"', 'maxlength="8"'], ['required', 'minlength="8"', 'min="13"'], 'Now the browser checks all three before the form can be sent.'),
    check('Which attribute makes a field compulsory?', ['required', 'placeholder', 'value'], 'required blocks an empty field.', 'Which one stops an empty field from being sent?'),
    recap([
      ['💬', 'placeholder is a hint, value is real text'],
      ['❗', 'required, min, max, maxlength and pattern are browser checks'],
      ['🔒', 'readonly is sent; disabled is not'],
    ]),
  ]),

  challenge('html-7-ch', 'Module 7 Challenge', { icon: '📝', name: 'Form Builder' }, ['Build a form that sends data the right way', 'Choose the right element and input type for each field', 'Let the browser check answers before sending'], [
    mcq(1, 'Which attribute decides where form data is sent?', ['action', 'method', 'name', 'target'], 'action holds the destination address.', { mono: true }),
    mcq(2, 'Which method should a login form use?', ['POST', 'GET', 'SEND', 'LOGIN'], 'POST keeps data out of the address bar.'),
    mcq(3, 'How do radio buttons become one group?', ['The same name', 'The same id', 'The same value', 'The same label'], 'Radios that share a name allow only one choice.'),
    mcq(4, 'Which input type shows a slider?', ['range', 'slider', 'number', 'scale'], 'type="range" draws a slider.', { mono: true }),
    mcq(5, 'What is the difference between readonly and disabled?', ['readonly values are sent; disabled values are not', 'There is no difference', 'disabled values are sent; readonly values are not', 'readonly hides the field'], 'Both stop editing, but only readonly fields are sent.'),
    swipe([
      ['An input without a name is still sent', false, 'Only named inputs are sent.'],
      ['<textarea> has a closing tag', true, 'Unlike <input>.'],
      ['Placeholder text is sent with the form', false, 'It is only a hint.'],
      ['GET shows form data in the address', true, 'Like ?q=shoes.'],
    ]),
    pairs([['<select>', 'Dropdown list'], ['<fieldset>', 'Groups related fields'], ['type="password"', 'Hides the characters'], ['pattern', 'Checks the value against a rule']], 'Each one shapes how a form works.'),
    pickCode('Which label is connected to its input?', ['<label for="age">Age</label><input id="age" name="age">', '<label id="age">Age</label><input for="age">', '<label name="age">Age</label><input name="age">'], 'The label’s for matches the input’s id.'),
    bugTask(['<form action="/order" method="post">', '  <input type="radio" name="size" value="s"> Small', '  <input type="radio" name="sizes" value="l"> Large', '  <button type="submit">Order</button>', '</form>'], [[3, 'name="sizes"', 'name="size"']], 'Radios need the same name, or both sizes can be picked at once.'),
    xray(
      { html: '<form onsubmit="return false"><input class="who" type="text" placeholder="Your name"><br><input type="date"><br><select><option>Pune</option><option>Jaipur</option></select><br><input type="radio" name="g" id="r1"><label for="r1">Day batch</label><br><input type="checkbox" id="c1"><label for="c1">I agree</label><br><textarea rows="2">Message</textarea><br><button type="submit">Send</button></form>', css: 'input,select,textarea,button{margin:4px 0;font:14px sans-serif}' },
      [
        ['.who', 'The box with grey hint text', '<input placeholder>', ['<input placeholder>', '<textarea>', '<label>']],
        ['input[type=date]', 'The calendar field', 'type="date"', ['type="date"', 'type="time"', 'type="number"']],
        ['select', 'The dropdown', '<select>', ['<select>', '<datalist>', '<option>']],
        ['input[type=radio]', 'The round option', 'type="radio"', ['type="radio"', 'type="checkbox"', 'type="button"']],
        ['input[type=checkbox]', 'The tick box', 'type="checkbox"', ['type="checkbox"', 'type="radio"', 'type="range"']],
        ['textarea', 'The message box', '<textarea>', ['<textarea>', '<input>', '<pre>']],
        ['button', 'The Send button', '<button type="submit">', ['<button type="submit">', '<button type="reset">', '<a>']],
      ],
    ),
    arrange(['<form action="/join" method="post">', '<label for="mail">Email</label>', '<input type="email" id="mail" name="mail" required>', '<label for="pw">Password</label>', '<input type="password" id="pw" name="pw" minlength="8" required>', '<button type="submit">Join</button>', '</form>'], 'a working form: tapping Join with empty fields shows the browser’s warning', FORM_CSS),
  ]),
];
