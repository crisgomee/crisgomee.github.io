function postTweet() {
  const tweetText = document.getElementById('tweetText').value.trim();
  const tweetImage = document.getElementById('tweetImage').files[0];
  const tweetFeed = document.getElementById('tweetFeed');

  if (!tweetText && !tweetImage) {
    alert("Please enter text or upload an image.");
    return;
  }

  const tweet = document.createElement('div');
  tweet.className = 'tweet';

  const timestamp = new Date().toLocaleString();
  tweet.innerHTML = `<p>${tweetText}</p><small>${timestamp}</small>`;

  if (tweetImage) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result;
      tweet.appendChild(img);
    };
    reader.readAsDataURL(tweetImage);
  }

  tweetFeed.prepend(tweet);

  // Clear inputs
  document.getElementById('tweetText').value = '';
  document.getElementById('tweetImage').value = '';
}

//SlideShow
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  const total = document.querySelectorAll('.slide').length;

  currentSlide = index % total;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(() => {
  showSlide(currentSlide + 1);
}, 3000);

window.onload = () => {
  showSlide(0);
};

