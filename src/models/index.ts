import { ReduxModel } from '../common/store';

const context = require.context('./', true, /\.(js|ts)$/);
export default context.keys().filter(item => item !== './index.ts').map(key => context(key));