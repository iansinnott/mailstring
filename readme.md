# Mailstring

[![Build Status](https://img.shields.io/circleci/project/iansinnott/mailstring.svg)](https://circleci.com/gh/iansinnott/mailstring)
[![react-string-replace.js on NPM](https://img.shields.io/npm/v/mailstring.svg)](https://www.npmjs.com/package/mailstring)

> Generate `mailto:` strings for fun and profit

## Install

```
$ npm install --save mailstring
```


## Usage

**ES6**

```js
import { mailTo } from 'mailstring';

mailTo('name@email.com');
// => 'mailto:name@email.com'

mailTo('name@email.com,other@example.com');
// => 'mailto:name@email.com,other@example.com';

mailTo('name@email.com', {
  cc: 'other@email.com',
  bcc: 'fun@email.com',
  subject: 'hello',
  body: 'something',
});
// => 'mailto:name@email.com?cc=other@email.com&bcc=fun@email.com&subject=hello&body=something';
```

**CommonJS / Node**

```js
const mailTo = require('mailstring').mailTo;
```

## API

**NOTE:** The `mailto:` API only allows you to set defaults in a new email window. The user can manually change any of the values you provide once the email window has opened.

### mailTo(address, [options])

#### address

Type: `string`

Email address or list of email addresses to prepopulate when the user clicks the link. Multiple email addresses should be comma-separated.

#### options

##### cc

Type: `string`

Email address(es) to add to the CC field in the email window.

##### bcc

Type: `string`

Email address(es) to add to the BCC field in the email window.

##### subject

Type: `string`

Subject to prepopulate in the email window. Special characters will be escaped using `encodeURIComponent`.

##### body

Type: `string`

Email body to prepopulate in the email window. Special characters will be escaped using `encodeURIComponent`. The `body` may contain multiple paragraphs separated by newlines, however, not every email client supports this. For example, in my testing newlines are supported fine in Apple Mail but not in Nylas N1. Just keep this in mind and if in doubt test out your link in the client of your choice.

### `mailstring/react`

Mailstring also exports a React component for your convenience if using React. Don't worry, React is not bundled with mailstring so you will not bloat your codebase by simply requiring the `mailTo` function, and if you do wish to use the React component you will need React installed as a peerDependency.

#### Usage

See the [example/](./example) directory for the full example.

```js
import React from 'react';
import { render } from 'react-dom';

// Import the React Component
import { MailToLink } from 'mailstring/react';

const body = `
Dear so and so,

This is a nice multiline message. It contains more than one paragraph.

Pretty slick, eh?

- Person
`.trim();

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <h1>Hey there</h1>
        <MailToLink
          to='ian@example.com'
          cc='first@example.com,second@example.com'
          bcc='third@example.com'
          subject='Nice to meet you'
          body={body}
        >
          Email Me
        </MailToLink>
      </div>
    );
  }
}
```

## TODO

- [ ] Do not package React with the `mailstring/react` component
- [ ] Test MailToLink using enzyme
- [ ] Document MailToLink

## License

MIT © [Ian Sinnott](https://www.iansinnott.com)
