// HTML Intermediate · Module 1 · Forms everyone can fill (Greenfield School’s admission form).
import type { Lesson } from '../../types';
import { arrange, atWork, beforeAfter, bugTask, challenge, check, explore, lesson, live, matchUp, mcq, pairs, pickCode, place, recap, reveal, swipe, tapbug, tapPage, xray } from './kit';

const FORM_CSS = 'body{font-family:system-ui,sans-serif;margin:12px} fieldset{border:2px solid #C9C3FF;border-radius:10px;margin:0 0 10px;padding:8px 10px} legend{font-weight:bold;color:#4B3FD8;padding:0 4px} label{display:block;margin:6px 0} input,select{font:inherit;padding:6px;border:2px solid #ddd;border-radius:6px;width:100%;box-sizing:border-box} .hint{color:#666;font-size:13px;margin:2px 0} .err{color:#B91C1C}';
const PLAIN = '<label>Parent name <input></label>\n<label>Phone <input></label>\n<label>Child name <input></label>\n<label>Class <input></label>';
const GROUPED = '<fieldset>\n  <legend>Parent</legend>\n  <label>Name <input></label>\n  <label>Phone <input></label>\n</fieldset>\n<fieldset>\n  <legend>Child</legend>\n  <label>Name <input></label>\n  <label>Class <input></label>\n</fieldset>';
const PHONE_JS = 'const form = document.querySelector("#f");\nconst phone = document.querySelector("#phone");\nconst error = document.querySelector("#phone-error");\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const ok = /^[6-9]\\d{9}$/.test(phone.value.trim());\n  phone.setAttribute("aria-invalid", String(!ok));\n  error.textContent = ok ? "" : "Enter a 10-digit mobile number";\n  const said = ["Phone", ok ? "" : "invalid", error.textContent, document.querySelector("#phone-hint").textContent].filter(Boolean).join(", ");\n  console.log("Screen reader hears: " + said);\n});';

export const HTML_I_M1: Lesson[] = [
  lesson('html-i-1-1', 'Group fields with fieldset', 5, [
    atWork('Megan', ['Welcome to Brightline Studio! Our first client is Greenfield School.', 'Parents want to apply for admission from their phones. The old form is one long list of boxes. Let’s make it clear for everyone, including people who use screen readers.']),
    beforeAfter('One long list, or groups?', [PLAIN.split('\n'), 'Four boxes in a row. Which “name” is the parent’s and which is the child’s?', { html: PLAIN, css: FORM_CSS }], [GROUPED.split('\n'), 'Grouped, with a title for each group. Screen readers read “Parent, group” before the boxes, so “Name” is never confusing.', { html: GROUPED, css: FORM_CSS }]),
    explore('fieldset and legend', ['<fieldset>', '  <legend>Parent</legend>', '  <label>Name <input></label>', '</fieldset>'], [
      [1, '<fieldset> wraps related fields into one group, with a border by default.', 'fieldset'],
      [2, '<legend> is the group’s title. It must be the first thing inside the fieldset.', 'legend'],
      [3, 'Each field still has its own label.', 'label'],
    ], { page: { html: '<fieldset><legend>Parent</legend><label>Name <input></label></fieldset>', css: FORM_CSS }, minTaps: 3 }),
    place('Group the child’s details', 'Fill the gaps.', [[{ gap: 0 }], ['  ', { gap: 1 }, 'Child', { gap: 2 }], ['  <label>Class <input></label>'], ['</fieldset>']], ['<fieldset>', '<legend>', '</legend>', '<label>', '<group>'], ['<fieldset>', '<legend>', '</legend>'], 'fieldset groups the fields; legend names the group.', { css: FORM_CSS }),
    check('Which element gives a group of fields its title?', ['<legend>', '<label>', '<caption>', '<title>'], 'legend titles a fieldset. (caption titles a table; label names one field.)', 'It lives inside fieldset.'),
    tapbug('The group has no title for screen readers', ['<fieldset>', '  <label>Parent details</label>', '  <label>Name <input></label>', '</fieldset>'], [[2, '<label>Parent details</label>', '<legend>Parent details</legend>']], 'A label without a field isn’t a group title. Use legend, as the first thing in the fieldset.'),
    recap([
      ['🗂', 'fieldset groups related fields'],
      ['🏷', 'legend is the group’s title, first inside'],
      ['🔊', 'Screen readers announce the group before its fields'],
    ]),
  ]),

  lesson('html-i-1-2', 'Errors that are read out', 6, [
    reveal('Linking help and errors to a field', [
      ['aria-describedby="phone-hint"', 'Points the field at the element with that id. Screen readers read it after the label.'],
      ['aria-invalid="true"', 'Says the value is wrong, so it is announced as “invalid”.'],
      ['One id, one element', 'Several ids can go in one aria-describedby, separated by spaces.'],
    ], { mono: true, intro: 'Sighted people see the hint under the box. Screen-reader users only hear it if it is linked.' }),
    explore('The pattern', ['<label for="phone">Phone</label>', '<input id="phone" aria-describedby="phone-hint phone-error">', '<p id="phone-hint">10 digits, no spaces</p>', '<p id="phone-error"></p>'], [
      [2, 'aria-describedby lists two ids: the hint and the error. Both are read with the field.', '#phone'],
      [3, 'The hint, always there.', '#phone-hint'],
      [4, 'The error starts empty. JavaScript fills it when the number is wrong.'],
    ], { page: { html: '<label for="phone">Phone</label><input id="phone" aria-describedby="phone-hint phone-error"><p id="phone-hint" class="hint">10 digits, no spaces</p><p id="phone-error" class="err"></p>', css: FORM_CSS }, minTaps: 3 }),
    tapPage('Hear what a screen reader hears', 'Type a short number and tap Send, then fix it and send again. The log shows what is read aloud.', { html: '<form id="f">\n  <label for="phone">Phone</label>\n  <input id="phone" inputmode="numeric" aria-describedby="phone-hint phone-error">\n  <p id="phone-hint" class="hint">10 digits, no spaces</p>\n  <p id="phone-error" class="err"></p>\n  <button>Send</button>\n</form>', css: FORM_CSS, js: PHONE_JS }, 'invalid, Enter a 10-digit', [{ type: ['#phone', '12345'] }, { submit: '#f' }], 'Because the error and hint are linked, a blind parent hears exactly what a sighted parent sees.'),
    check('What does aria-describedby do?', ['Links extra text (a hint or error) to a field, so it is read out', 'Adds a tooltip', 'Makes the field required', 'Changes the field’s colour'], 'It points to other elements by id.', 'It describes the field using other text.'),
    tapbug('The hint is never read out', ['<input id="phone" aria-describedby="hint">', '<p id="phone-hint">10 digits, no spaces</p>'], [[1, 'aria-describedby="hint"', 'aria-describedby="phone-hint"']], 'aria-describedby must use the exact id of the hint: phone-hint.'),
    recap([
      ['🔗', 'aria-describedby links hints and errors by id'],
      ['❌', 'aria-invalid="true" marks a wrong value'],
      ['🔊', 'What people see, screen readers should say'],
    ]),
  ]),

  lesson('html-i-1-3', 'Help phones fill it', 5, [
    reveal('Three attributes that save typing', [
      ['autocomplete', 'Tells the phone what the field is (name, tel, email, postal-code), so it can fill it in one tap.', '✨'],
      ['inputmode', 'Picks the keyboard: numeric, tel, email, decimal.', '⌨️'],
      ['enterkeyhint', 'Changes the keyboard’s Enter key label: next, send, search.', '↩️'],
    ]),
    live('Pick a keyboard', 'On a phone, tap the box to see each keyboard.', ['<input inputmode="{{v}}" placeholder="Tap me">'], ['numeric', 'tel', 'email', 'text', 'decimal'], { caption: 'inputmode only changes the keyboard. It doesn’t check the value: use type or pattern for that.' }),
    matchUp('Match the autocomplete value', [['name', 'Full name'], ['tel', 'Phone number'], ['email', 'Email address'], ['postal-code', 'PIN code']], 'Standard values let the phone fill saved details.'),
    explore('A phone-friendly field', ['<label for="pin">PIN code</label>', '<input id="pin" autocomplete="postal-code"', '  inputmode="numeric" enterkeyhint="next">'], [
      [2, 'autocomplete="postal-code": the phone can offer the saved PIN code.', '#pin'],
      [3, 'A number keyboard, and the Enter key says “Next”.', '#pin'],
    ], { page: { html: '<label for="pin">PIN code</label><input id="pin" autocomplete="postal-code" inputmode="numeric" enterkeyhint="next">', css: FORM_CSS }, minTaps: 2 }),
    check('Which shows a number keyboard for a PIN code but keeps it as text?', ['inputmode="numeric"', 'type="number"', 'autocomplete="numeric"', 'keyboard="numbers"'], 'type="number" adds arrows and drops leading zeros; inputmode only changes the keyboard.', 'Which only picks the keyboard?'),
    recap([
      ['✨', 'autocomplete lets phones fill saved details'],
      ['⌨️', 'inputmode picks the right keyboard'],
      ['↩️', 'enterkeyhint labels the Enter key'],
    ]),
  ]),

  challenge('html-i-1-ch', 'Module 1 Challenge', { icon: '📝', name: 'Form Pro' }, ['Group form fields with fieldset and legend', 'Link hints and errors so screen readers say them', 'Help phones fill forms with autocomplete and inputmode'], [
    mcq(1, 'Where does <legend> go?', ['First thing inside <fieldset>', 'After </fieldset>', 'Inside <label>', 'In the head'], 'It titles the group it starts.'),
    mcq(2, 'Which links an error message to a field?', ['aria-describedby', 'aria-label', 'for', 'name'], 'aria-describedby points to the error’s id.', { mono: true }),
    mcq(3, 'What does aria-invalid="true" tell a screen reader?', ['The value is wrong', 'The field is hidden', 'The field is optional', 'The form was sent'], 'It is announced as “invalid”.'),
    mcq(4, 'Which value lets a phone fill a saved phone number?', ['autocomplete="tel"', 'inputmode="tel"', 'type="phone"', 'autocomplete="number"'], 'autocomplete says what the field is.', { mono: true }),
    mcq(5, 'Why not use type="number" for a PIN code?', ['It can drop leading zeros and adds arrows', 'It is not allowed', 'It hides the keyboard', 'It needs JavaScript'], 'Use inputmode="numeric" instead.'),
    swipe([
      ['A fieldset can hold many fields', true, 'That’s what it is for.'],
      ['inputmode checks the value is a number', false, 'It only picks the keyboard.'],
      ['aria-describedby can list two ids', true, 'Separated by a space.'],
      ['Screen readers read a hint that is not linked', false, 'Only linked hints are read with the field.'],
    ]),
    pairs([['fieldset', 'Groups fields'], ['legend', 'Names the group'], ['aria-invalid', 'Marks a wrong value'], ['enterkeyhint', 'Labels the Enter key']], 'Tools for forms that work for everyone.'),
    pickCode('Which email field is best on a phone?', ['<input type="email" autocomplete="email">', '<input type="text">', '<input inputmode="numeric">', '<input type="email" autocomplete="off">'], 'The right type gives the email keyboard and checks; autocomplete fills it.'),
    bugTask(['<fieldset>', '  <label>Child</label>', '  <input id="age" aria-describedby="age-help">', '  <p id="agehelp">Age in years</p>', '</fieldset>'], [[2, '<label>Child</label>', '<legend>Child</legend>'], [4, 'id="agehelp"', 'id="age-help"']], 'A group title is a legend, and the id must match aria-describedby exactly.'),
    xray(
      { html: '<form><fieldset><legend>Parent</legend><label>Phone <input id="ph" autocomplete="tel" inputmode="tel" aria-describedby="ph-hint"></label><p id="ph-hint" class="hint">10 digits</p></fieldset></form>', css: FORM_CSS },
      [
        ['fieldset', 'The box around the parent’s fields', '<fieldset>', ['<fieldset>', '<section>', '<div>']],
        ['legend', 'The word “Parent” on the border', '<legend>', ['<legend>', '<label>', '<h2>']],
        ['#ph-hint', 'The hint read with the phone box', 'linked with aria-describedby', ['linked with aria-describedby', 'a placeholder', 'a title attribute']],
      ],
    ),
    arrange(['<fieldset>', '<legend>Child</legend>', '<label for="cls">Class</label>', '<input id="cls" inputmode="numeric">', '</fieldset>'], 'a group, its title, a label, then a number field for the class', FORM_CSS),
  ]),
];
