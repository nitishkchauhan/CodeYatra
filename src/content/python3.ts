import type { EditorStep } from './types';

export const canteenBill: EditorStep = {
  type: 'editor',
  kicker: 'PRACTICE · DICTIONARIES',
  title: 'Canteen bill',
  instructions: 'bill(menu, order) gets a price dictionary and a list of items. Return the total. Skip items that are not on the menu.',
  lang: 'python',
  file: 'canteen.py',
  starter: 'def bill(menu, order):\n    total = 0\n    return total\n',
  tests: [
    {
      call: 'bill({"tea": 10, "muffin": 15}, ["tea", "muffin", "tea"])',
      expect: '35',
    },
    { call: 'bill({"tea": 10}, ["wrap"])', expect: '0' },
    { call: 'bill({"pancake": 30}, [])', expect: '0' },
  ],
  hint: 'for item in order:\n    if item in menu:\n        total += menu[item]',
  solution: 'def bill(menu, order):\n    total = 0\n    for item in order:\n        if item in menu:\n            total += menu[item]\n    return total\n',
};
