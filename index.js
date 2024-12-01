document.addEventListener("DOMContentLoaded", function() {

  // INIT FUNCTIONS 
  playRadio();
  stopRadio();
  filterRadioStations();

  //  LOGIC
  function playRadio() {
    const radioStations = document.querySelectorAll('radio-item');
    radioStations.forEach((radio) => {
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
          const filterList = document.querySelector('filter-list');

          radioStations.forEach((item) => {
            item.classList.remove('playin');
          });

          audioPlayer.src = clickedUrl;
          audioPlayer.play();
          // playerBar.classList.add('popup');
          radioName.textContent = clickedName;
          radioLabel.textContent = "Radio";
          stopButton.classList.add('stopin');
          clickedElement.classList.add('playin');
          // nyanCatImage.src = 'assets/icons/nyancat.gif';
          audioNavigator(clickedName,"r.a.d.i.o",radioCover);
          filterList.classList.add('playin-some-stuff');
          document.title = '♫♪.♪♫.♪♫ Now playing: ' + clickedName + ' radio station ♪♫.♫♪.♫♪';
        }
      });

    });
  };

  function stopRadio() {
    const stopButton = document.querySelector('stop-button');
    stopButton.addEventListener('click', function(e) {
      const audioPlayer = document.getElementById('audioPlayer');
      const radioStations = document.querySelectorAll('radio-item');
      const stopButton = document.querySelector('stop-button');
      const radioName = document.querySelector('.radio-name');
      const radioLabel = document.querySelector('.radio-label');
      const nyanCatImage = document.getElementById('nyancat');
      const pageBody = document.querySelector('#page-body');
      const filterList = document.querySelector('filter-list');

      radioStations.forEach((item) => {
        item.classList.remove('playin');
      });

      radioName.textContent = "Play That";
      radioLabel.textContent = "Funky Music";
      stopButton.classList.remove('stopin');
      // nyanCatImage.src = 'assets/icons/nyancat.png';
      audioPlayer.src = '';
      pageBody.classList.remove('show-playin', 'show-favs');
      filterList.classList.remove('playin-some-stuff');
      document.title = '.░C░.░P░.░8░.░.░.░P░.░A░.░4░.░I░.░O░.';
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
        document.querySelector('.radio-name').textContent = "Play That";
        document.querySelector('.radio-label').textContent = "Funky Music";
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

      const filterList = document.querySelector('filter-list');
      if (filterList.classList.contains('playin-some-stuff')) {
        const playingRadioStation = document.querySelector('.playin');
        const positionFromTopOfScrollableDiv = playingRadioStation.offsetTop;
        const listOfRadios = document.querySelector('.list-of-radios');
        listOfRadios.scrollTop = positionFromTopOfScrollableDiv - 80;
      }
    });
  }
});