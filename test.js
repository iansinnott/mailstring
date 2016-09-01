import test from 'ava';
import { isEmpty, buildQueryString, mailTo } from './src';

test('isEmpty', t => {
  t.true(isEmpty({}));
  t.false(isEmpty({ hey: 'there' }));
});

test('buildQueryString', t => {
  t.is(buildQueryString({
    a: 'hey',
    b: 'there',
    c: 'you',
  }), '?a=hey&b=there&c=you');
});

test('mailTo returns a string', t => {
  t.is(typeof mailTo(), 'string');
  t.is(typeof mailTo('mail@example.com'), 'string');
  t.is(typeof mailTo('mail@example.com,funtimes'), 'string');
});

test('mailTo returns a valid mailto string', t => {
  t.is(mailTo('name@email.com'), 'mailto:name@email.com');
  t.is(mailTo('name@email.com,other@example.com'), 'mailto:name@email.com,other@example.com');
});

test('mailTo does not add query params if not passed any', t => {
  const result = mailTo('name@example.com', {});
  t.false(result.includes('?'));
  t.false(result.includes('&'));
});

