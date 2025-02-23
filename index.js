/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';
// import { polyfill as polyfillEncoding } from 'react-native-polyfill-globals/src/encoding';
// import { polyfill as polyfillReadableStream } from 'react-native-polyfill-globals/src/readable-stream';
// import { polyfill as polyfillFetch } from 'react-native-polyfill-globals/src/fetch';

// polyfillReadableStream();
// polyfillEncoding();
// polyfillFetch();

AppRegistry.registerComponent(appName, () => App);
