// delay.js
function delayMessage(message, delayMs) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delayMs);
  });
}

module.exports = delayMessage;
