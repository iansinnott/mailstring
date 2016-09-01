import React, { PropTypes } from 'react';

import { mailTo } from './mailTo.js';

export default class MailToLink extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    cc: PropTypes.string,
    bcc: PropTypes.string,
    subject: PropTypes.string,
    body: PropTypes.string,
  };
  render() {
    const {
      to,
      cc,
      bcc,
      subject,
      body,
      ...props,
    } = this.props;

    return (
      <a href={mailTo(to, { cc, bcc, subject, body })} {...props} />
    );
  }
}

