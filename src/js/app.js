import svg4everybody from 'svg4everybody';
import 'bootstrap/js/dist/dropdown';
import 'popper.js';
import './common';
import { BODY, NO_TOUCH } from './constants';
import { isTouch } from './utils';


svg4everybody();

if (!isTouch()) BODY.addClass(NO_TOUCH);
