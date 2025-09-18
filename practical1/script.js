const votes = {
  JavaScript: 0,
  Python: 0,
  "c++": 0
};

function vote(language) {
  votes[language]++;
  updateVotes();
}

function updateVotes() {
  for (let lang in votes) {
    document.getElementById(`${lang}-count`).textContent = votes[lang];
  }
}

setInterval(() => {
  const languages = Object.keys(votes);
  const randomLang = languages[Math.floor(Math.random() * languages.length)];
  votes[randomLang]++;
  updateVotes();
}, 5000);