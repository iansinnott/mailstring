import React from 'react';
import { render } from 'react-dom';

import { MailToLink } from '../../dist/react';

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

render(<App />, document.querySelector('#root'));
