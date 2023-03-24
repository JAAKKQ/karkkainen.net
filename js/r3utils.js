const emailInfos = document.querySelectorAll('.email-info');
const prevButton = document.querySelector('#prev');

const nextButton = document.querySelector('#next');

let currentIndex = 0;

function showEmailInfo(index) {
  emailInfos.forEach(info => info.classList.remove('active'));
  emailInfos[index].classList.add('active');
}

showEmailInfo(currentIndex);

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= emailInfos.length) {
    currentIndex = 0;
  }
  showEmailInfo(currentIndex);
});

prevButton.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = emailInfos.length - 1;
  }
  showEmailInfo(currentIndex);
});
