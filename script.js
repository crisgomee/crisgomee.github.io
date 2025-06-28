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

//Extract Tweets from JSON
fetch('tweets.json')
  .then(res => res.json())
  .then(data => {
    const tweetFeed = document.getElementById('tweetFeed');
    tweetFeed.innerHTML = ''; // Clear existing tweets

    data.forEach(tweet => {
      const tweetDiv = document.createElement('div');
      tweetDiv.className = 'tweet';

      tweetDiv.innerHTML = `
        <small>${tweet.user}</small>
        <p>${tweet.message}</p>
        ${tweet.img ? `<img src="${tweet.img}" />` : ''}
        <small>${tweet.date}</small>
      `;

      tweetFeed.appendChild(tweetDiv);
    });
  });

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

