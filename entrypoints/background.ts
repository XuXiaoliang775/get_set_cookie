
export default defineBackground(() => {
  console.log('Background script is running!');
  console.log('Hello background!', { id: browser.runtime.id });

  // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   if (message.command === "GetCookies") {
  //     chrome.cookies.getAll({ domain: '.joywok.com' }, (cookies) => {
  //       sendResponse({ cookies: cookies });
  //     });
  //     return true; // 这表明你将异步回应消息
  //   }
  // });

});


