import path from 'path';
import { promises as fs } from 'fs';
import { prefixPath } from './constants';

// TODO: force this to conform to a typescript type
export default {
    subject: 'Your password was changed',
    data: {
      'first_name': '{{first_name}}'
    },
    templates: {
      txt: fs.readFile(path.join(process.cwd(), prefixPath, 'change_password.txt'), 'utf8'),
      html: fs.readFile(path.join(process.cwd(), prefixPath, 'change_password.html'), 'utf8'),
    }
  };
