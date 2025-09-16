export function addLanguageChangeListener(callback) {
  window.addEventListener('app-language', callback);
}

export function removeLanguageChangeListener(callback) {
  window.removeEventListener('app-language', callback);
}
