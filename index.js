document.addEventListener("DOMContentLoaded", function() {

  // INIT FUNCTIONS 
  clickOnRadio();
  pauseRadio();

  //  
  function clickOnRadio() {
    const radioItems = document.querySelectorAll('radio-item');
    radioItems.forEach((radio) => {
      radio.addEventListener('click', function(e) {
        const clickedElement = e.target;

        if (!clickedElement.classList.contains('playin')) {
          const clickedUrl = clickedElement.getAttribute('data-url');
          const clickedName = clickedElement.getAttribute('data-name');
          const audioPlayer = document.getElementById('audioPlayer');
          const stopButton = document.querySelector('stop-button');
          const radioName = document.querySelector('.radio-name');
          const radioLabel = document.querySelector('.radio-label');
          const nyanCatImage = document.getElementById('nyancat');
          const playerBar = document.getElementById('player');

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

      radioItems.forEach((item) => {
        item.classList.remove('playin');
      });

      radioName.textContent = "•͡˘㇁•͡˘";
      radioLabel.textContent = "___㇁";
      stopButton.classList.remove('stopin');
      nyanCatImage.src = 'assets/icons/nyancat.png';
      audioPlayer.src = '';
    });
  };
});