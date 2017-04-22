import request from 'superagent';

import server from '../../src';
import '../../src/config/database';

export default request(server);
