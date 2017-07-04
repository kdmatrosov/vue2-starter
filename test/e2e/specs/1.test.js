import { ClientFunction, Selector } from 'testcafe';
const devServer = require('../../../webpack/devServer');

fixture(`Getting Started`)
// Load the URL your development server runs on.
    .page(`http://localhost:${devServer.port}/#/404`);

test('test 404', async t => {
    await t.click('button');
    const getLocation = ClientFunction(() => document.location.href);
    await t.expect(getLocation()).notContains('/#/404');
    await t.click('h1');
});