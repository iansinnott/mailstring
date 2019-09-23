declare module 'mailstring' {
  interface MailStringOptions {
    cc?: string;
    bcc?: string;
    subject?: string;
    body?: string;
  }

  export function mailTo(email: string, options?: MailStringOptions): string;
}
