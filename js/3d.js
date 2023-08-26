const focusElement = document.querySelector('model-viewer');
const container = document.getElementById('3d');

focusElement.addEventListener('focus', () => {
  // Disable scrolling when the element is in focus
  console.log("Viewer in focus")
  window.onscroll = function () { window.scrollTo(0, 0); };
});

focusElement.addEventListener('blur', () => {
  // Enable scrolling when the element loses focus
  container.style.overflow = 'auto';
});
