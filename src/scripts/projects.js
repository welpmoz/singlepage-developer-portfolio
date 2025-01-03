const handleFocus = (wrapper) => {
  wrapper.style.opacity = 1;
};

const handleBlur = (wrapper) => {
  wrapper.style.opacity = 0;
};

document.querySelectorAll('.project').forEach((projectElement) => {
  const myLinks = projectElement.querySelector('div.project__links');
  myLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('focus', (e) => handleFocus(myLinks));
    link.addEventListener('blur', (e) => handleBlur(myLinks));
  });
});
