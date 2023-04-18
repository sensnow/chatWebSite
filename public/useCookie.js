const { app, session } = require('electron');

/**
 * electron15 后，跨域cookie无法携带，
 * 以下为解决办法
 */
function useCookie() {
  app.whenReady().then(() => {
    const filter = { urls: ['https://*/*'] };
    session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
      if (details.responseHeaders && details.responseHeaders['set-cookie']) {
        for (let i = 0; i < details.responseHeaders['set-cookie'].length; i++) {
          details.responseHeaders['set-cookie'][i] += ';SameSite=None;Secure';
        }
      }
      callback({ responseHeaders: details.responseHeaders });
    });
  });
}

module.exports = {
  useCookie,
};