import { ClientFunction, Selector } from 'testcafe';
const devServer = require('../../../webpack/devServer');

fixture(`Getting Started`)
// Load the URL your development server runs on.
    .page(`http://localhost:${devServer.port}`);

test('test index', async t => {
});