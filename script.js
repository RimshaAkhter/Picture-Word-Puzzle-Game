$(document).ready(function () {
  const puzzles = [
    { img: 'nishan.jpg', answer: 'NISHANEHAIDER', comment: 'Nishan-e-Haider – Highest military award of Pakistan' },
    { img: 'JF-17.jpg', answer: 'THUNDER', comment: 'JF-17 Thunder – Pakistan ka fighter jet' },
    { img: 'images.jpg', answer: 'F16', comment: 'F-16 Fighting Falcon – PAF ke fleet ka mashhoor jet' },
    { img: 'logo.jpg', answer: 'PAFLOGO', comment: 'PAF Logo – Official insignia of Pakistan Air Force' },
    { img: 'hassan.jpg', answer: 'HASSAN', comment: 'Squadron Leader Hassan Siddiqui – PAF pilot who shot down Indian jet on 27 Feb 2019' },
    { img: 'Air.jpg', answer: 'MARSHAL', comment: 'Air Chief Marshal – PAF ka highest rank' },
    { img: 'pis.jpg', answer: 'PISTOL', comment: 'Sidearm – PAF pilots ka emergency defense weapon' },
    { img: 'sh.jpg', answer: 'SHAHEEN', comment: 'Shaheen – PAF aerobatics team showing aerial excellence' },
    { img: 'pakistan.jpg', answer: 'PAKISTANFLAG', comment: 'Pakistan Flag – Green and white with crescent/star' },
    { img: 'bd.jpg', answer: 'BADSHAHI', comment: 'Badshahi Mosque – Lahore ki mashhoor masjid' },
    { img: 'qd.jpg', answer: 'QUAIDEAZAM', comment: 'Quaid-e-Azam – Founder of Pakistan' },
    { img: 'Zarab.jpg', answer: 'ZARBEAZB', comment: 'Zarb-e-Azb – Missile system' }
  ];

  let current = 0;
  let correct = 0;
  let wrong = 0;
  let username = "";

  $('#startGameBtn').click(function () {
    username = $('#username').val().trim();
    if (username) {
      $('#nameInputForm').hide();
      $('#gameArea').show();
      showPuzzle(current);
    } else {
      alert("Please enter your name!");
    }
  });

  function showPuzzle(index) {
    if (index >= puzzles.length) return showFinal();

    const puzzle = puzzles[index];
    const shuffled = shuffle(puzzle.answer);

    let letterButtons = '';
    for (let ch of shuffled) {
      letterButtons += `<button class="btn btn-outline-info letter-btn m-1">${ch}</button>`;
    }

    let html = `
      <div class="card p-3">
        <img src="${puzzle.img}" class="card-img-top" alt="Puzzle Image">
        <div class="card-body">
          <div id="answerBox" class="answer-box mb-3"></div>
          <div id="letterButtons" class="mb-3">${letterButtons}</div>


          <button id="submitBtn" class="btn custom-btn">Check Answer</button>



          <div class="result mt-2" id="result"></div>
          <p class="mt-3 text-muted"><em>${puzzle.comment}</em></p>
        </div>
      </div>
    `;

    $('#gameArea').html(html);

    let userAnswer = '';
    $('.letter-btn').click(function () {
      const letter = $(this).text();
      userAnswer += letter;
      $('#answerBox').append(`<span class="letter-slot">${letter}</span>`);
      $(this).hide();
    });

    $('#submitBtn').click(() => {
      if (userAnswer.toUpperCase() === puzzle.answer.toUpperCase()) {
        $('#result').text('✅ You are Right!').css('color', 'lightgreen');
        correct++;
      } else {
        $('#result').text('❌ Wrong Guess!').css('color', 'salmon');
        wrong++;
      }
      setTimeout(() => {
        current++;
        if (current < puzzles.length) {
          showPuzzle(current);
        } else {
          showFinal();
        }
      }, 1500);
    });
  }

  function showFinal() {
    let stars = '';
    let message = '';

    if (correct === puzzles.length) {
      stars = '🏆 ⭐⭐⭐';
      message = '🎉 You are doing Excellent! Trophy Unlocked!';
    } else if (correct >= 9) {
      stars = '⭐⭐';
      message = '👍 Good Job!';
    } else {
      stars = '';
      message = 'Better luck next time! You can do it!';
    }

    $('#gameArea').html(`
      <div class="card text-center p-4 final-result" style="background-color: #1b263b; color: white;">
        <h2 class="mb-3">${stars}</h2>
        <h4 class="mb-3">Well done, ${username}!</h4>
        <p class="mb-2">${message}</p>
        <p class="mb-4">Correct: ${correct} | Wrong: ${wrong}</p>
        <button class="btn btn-primary" onclick="location.reload()">Play Again</button>
      </div>
    `);
  }

  function shuffle(word) {
    return word.split('').sort(() => 0.5 - Math.random()).join('');
  }
});








