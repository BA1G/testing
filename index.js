let progress = document.getElementById("progress");

let song1 = new Audio("assets/naat-1.mp3");
let song2 = new Audio("assets/naat-2.mp3");
let song3 = new Audio("assets/naat-3.mp3");

const songs = [song1, song2, song3];
const songNames= ["Asma-ul-husna","The way of tears","Taweel-al-shaoq"];
const artistNames= ["Abdullah","Muqeet","Ahmad"];

let songIndex = 0;

songs[songIndex].onloadedmetadata = function () {
  progress.max = songs[songIndex].duration;
  progress.value = songs[songIndex].currentTime;
};

$(".play-pause-btn").on("click", function () {
  if (songs[songIndex].paused) {
    $(".play-pause-icon").attr("src", "assets/pause-icon.png");
    songs[songIndex].play();
  } else {
    $(".play-pause-icon").attr("src", "assets/play-icon.png");
    songs[songIndex].pause();
  }

});

$(".fa-backward").on("click", function () {
  songs[songIndex].pause();
  songIndex--;

  if (songIndex<0) {
   songIndex=songs.length-1; 
  }

  songs[songIndex].play();

  $(".fa-backward").css("color", "red");

  setTimeout(function () {
    $(".fa-backward").css("color", "white");
  }, 150);
});

$(".fa-forward").on("click", function () {
  songs[songIndex].pause();
  songIndex++;

  if (songIndex>songs.length-1) {
    songIndex=0; 
   }

  songs[songIndex].play();

  $(".fa-forward").css("color", "red");

  setTimeout(function () {
    $(".fa-forward").css("color", "white");
  }, 150);
});

$(".fa-repeat").on("click", function () {
  let aud = songs[songIndex];
  aud.onended = function () {
    songs[songIndex].play();
  };

  if (songs[songIndex].paused) {
    songs[songIndex].play();
  }

  $(".fa-repeat").css("color", "black");

  $(".fa-repeat").removeClass("auto-next");
});

$(".fa-shuffle").on("click", function () {
  songs[songIndex].pause();
  songIndex = Math.floor(Math.random() * 3);
  songs[songIndex].play();

  $(".fa-shuffle").css("color", "red");

  setTimeout(function () {
    $(".fa-shuffle").css("color", "white");
  }, 150);
});

// PROGRESS-BAR

if (songs[songIndex].play()) {
  setInterval(() => {
    progress.value = songs[songIndex].currentTime;

    if (songs[songIndex].paused) {
      $(".play-pause-icon").attr("src", "assets/play-icon.png");
    } else {
      $(".play-pause-icon").attr("src", "assets/pause-icon.png");
    }

    if($(".fa-repeat").hasClass("auto-next"))
    {
        let audio= songs[songIndex];
        audio.onended = function() 
          {
              $(".fa-forward").click();
          };
    }

$(".play-header-h3").html(songNames[songIndex]);
$(".play-song-h3").html(songNames[songIndex]);

$(".play-song-p").html(artistNames[songIndex]);


    Time();
  }, 500);
}

progress.onchange = function () {
  songs[songIndex].play();
  songs[songIndex].currentTime = progress.value;
};

// TIME-DURATION-SONG

function Time() {
  // Calculate the time left and the total duration
  let currentMinutes = Math.floor(songs[songIndex].currentTime / 60);
  let currentSeconds = Math.floor(
    songs[songIndex].currentTime - currentMinutes * 60
  );
  let durationMinutes = Math.floor(songs[songIndex].duration / 60);
  let durationSeconds = Math.floor(
    songs[songIndex].duration - durationMinutes * 60
  );

  // Add a zero to the single digit time values
  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }
  if (durationMinutes < 10) {
    durationMinutes = "0" + durationMinutes;
  }

  // Display the updated duration
  var curr_time = currentMinutes + ":" + currentSeconds;
  var total_duration = durationMinutes + ":" + durationSeconds;

  $(".liveTime").html(curr_time);
  $(".durationTime").html(total_duration);
}
