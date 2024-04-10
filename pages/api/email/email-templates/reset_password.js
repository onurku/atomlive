import path from 'path';
import { promises as fs } from 'fs';
import { prefixPath } from './constants';

// TODO: force this to conform to a typescript type
export default {
    subject: 'Reset Password',
    data: {
      'first_name': '{{first_name}}',
      'reset_password_link': '{{reset_password_link}}'
    },
    templates: {
      txt: fs.readFile(path.join(process.cwd(), prefixPath, 'reset_password.txt'), 'utf8'),
      html: fs.readFile(path.join(process.cwd(), prefixPath, 'reset_password.html'), 'utf8'),
    }
  };

