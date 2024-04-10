import path from 'path';
import { promises as fs } from 'fs';
import { prefixPath } from './constants';

// TODO: force this to conform to a typescript type
export default {
    subject: 'Confirm Your Account',
    data: {
      email_verification_link: '{{email_verification_link}}',
      first_name: '{{first_name}}'
    },
    templates: {
      txt: fs.readFile(path.join(process.cwd(), prefixPath, 'account_verify.txt'), 'utf8'),
      html: fs.readFile(path.join(process.cwd(), prefixPath, 'account_verify.html'), 'utf8'),
    }
  };
