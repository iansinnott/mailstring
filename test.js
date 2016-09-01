import test from 'ava';
import { isEmpty, buildQueryString, mailTo } from './src';

const multilineBody = `
Dear so and so,

This is a nice multiline message. It contains more than one paragraph.

Pretty slick, eh?

- Person
`.trim();

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

test('address can be empty', t => {
  t.is(mailTo(''), 'mailto:');
  t.is(mailTo('', {
    cc: 'other@email.com',
    bcc: 'fun@email.com',
    subject: 'hello',
    body: 'something',
  }), 'mailto:?cc=other@email.com&bcc=fun@email.com&subject=hello&body=something');
});

test('mailTo does not add query params if not passed any', t => {
  const href = mailTo('name@example.com', {});
  t.false(href.includes('?'));
  t.false(href.includes('&'));
});

test('mailTo accepts params', t => {
  t.is(mailTo('name@email.com', {
    cc: 'other@email.com',
  }), 'mailto:name@email.com?cc=other@email.com');
  t.is(mailTo('name@email.com', {
    cc: 'other@email.com',
    bcc: 'fun@email.com',
    subject: 'hello',
    body: 'something',
  }), 'mailto:name@email.com?cc=other@email.com&bcc=fun@email.com&subject=hello&body=something');
});

test('mailTo does not include params with falsy values', t => {
  t.is(mailTo('name@email.com', {
    cc: 'other@email.com',
    bcc: undefined,
    subject: undefined,
    body: undefined,
  }), 'mailto:name@email.com?cc=other@email.com');
});

test('mailTo run sencodeURIcomponents on values but not cc or bcc', t => {
  const href = mailTo('ian@example.com', {
    cc:'first@example.com,second@example.com',
    bcc:'third@example.com',
    subject:'Nice to meet you',
    body: multilineBody,
  });
  t.is(href, 'mailto:ian@example.com?cc=first@example.com,second@example.com&bcc=third@example.com&subject=Nice%20to%20meet%20you&body=Dear%20so%20and%20so%2C%0A%0AThis%20is%20a%20nice%20multiline%20message.%20It%20contains%20more%20than%20one%20paragraph.%0A%0APretty%20slick%2C%20eh%3F%0A%0A-%20Person')
});
