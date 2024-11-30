document.addEventListener("DOMContentLoaded", function() {

  // INIT FUNCTIONS 
  clickOnRadio();
  pauseRadio();
  filterRadioStations();

  //  LOGIC
  function clickOnRadio() {
    const radioItems = document.querySelectorAll('radio-item');
    radioItems.forEach((radio) => {
      radio.addEventListener('click', function(e) {
        const clickedElement = e.target;

        if (!document.getElementById('page-body').classList.contains('show-playin') && !clickedElement.classList.contains('playin')) {
          const clickedUrl = clickedElement.getAttribute('data-url');
          const clickedName = clickedElement.getAttribute('data-name');
          const audioPlayer = document.getElementById('audioPlayer');
          const stopButton = document.querySelector('stop-button');
          const radioName = document.querySelector('.radio-name');
          const radioLabel = document.querySelector('.radio-label');
          const nyanCatImage = document.getElementById('nyancat');
          const playerBar = document.getElementById('player');
          const radioCover = clickedElement.getAttribute('data-cover');

          radioItems.forEach((item) => {
            item.classList.remove('playin');
          });

          audioPlayer.src = clickedUrl;
          audioPlayer.play();
          playerBar.classList.add('popup');
          radioName.textContent = clickedName;
          radioLabel.textContent = "Radio";
          stopButton.classList.add('stopin');
          clickedElement.classList.add('playin');
          nyanCatImage.src = 'assets/icons/nyancat.gif';
          audioNavigator(clickedName,"r.a.d.i.o",radioCover)
        }
      });

    });
  };

  function pauseRadio() {
    const pauseButton = document.querySelector('stop-button');
    pauseButton.addEventListener('click', function(e) {
      const audioPlayer = document.getElementById('audioPlayer');
      const radioItems = document.querySelectorAll('radio-item');
      const stopButton = document.querySelector('stop-button');
      const radioName = document.querySelector('.radio-name');
      const radioLabel = document.querySelector('.radio-label');
      const nyanCatImage = document.getElementById('nyancat');
      const pageBody = document.querySelector('#page-body');


      radioItems.forEach((item) => {
        item.classList.remove('playin');
      });

      radioName.textContent = "•͡˘㇁•͡˘";
      radioLabel.textContent = "___㇁";
      stopButton.classList.remove('stopin');
      nyanCatImage.src = 'assets/icons/nyancat.png';
      audioPlayer.src = '';
      pageBody.classList.remove('show-playin', 'show-favs');
    });
  };

  function audioNavigator(title,artist,cover) {
    if ('mediaSession' in navigator) {

      navigator.mediaSession.metadata = new MediaMetadata({
        title: title,
        artist: artist,
        artwork: [
          { src: cover, sizes: '96x96',   type: 'image/png' },
          { src: cover, sizes: '128x128', type: 'image/png' },
          { src: cover, sizes: '192x192', type: 'image/png' },
          { src: cover, sizes: '256x256', type: 'image/png' },
          { src: cover, sizes: '384x384', type: 'image/png' },
          { src: cover, sizes: '512x512', type: 'image/png' },
        ]
      });

      navigator.mediaSession.setActionHandler('play', function() {
        document.getElementById('audioPlayer').play();
      });

      navigator.mediaSession.setActionHandler('pause', function() {
        document.getElementById('audioPlayer').pause();
      });

      navigator.mediaSession.setActionHandler('stop', function() {
        document.querySelectorAll('radio-item').forEach((item) => {
          item.classList.remove('playin');
        });
        document.querySelector('.radio-name').textContent = "•͡˘㇁•͡˘";
        document.querySelector('.radio-label').textContent = "___㇁ .♫. .♫. .♫. .♫.";
        document.querySelector('stop-button').classList.remove('stopin');
        document.getElementById('nyancat').src = 'assets/icons/nyancat.png';
        document.getElementById('audioPlayer').src = '';
      });
    }
  };

  function filterRadioStations () {
    const playinFilter = document.querySelector('.filter-playin');
    //const favsFilter = document.querySelector('.show-favs');
    const allFilter = document.querySelector('.filter-all');
    const pageBody = document.querySelector('#page-body');

    playinFilter.addEventListener('click', function(e) {
      pageBody.classList.add('show-playin');
      pageBody.classList.remove('show-favs');
    });

    // favsFilter.addEventListener('click', function(e) {
    //   pageBody.classList.add('show-favs');
    //   pageBody.classList.remove('show-playin');
    // });

    allFilter.addEventListener('click', function(e) {
      pageBody.classList.remove('show-playin', 'show-favs');
    });
  }
});