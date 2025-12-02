import React, { useState } from 'react';

// Consolidated list of Bible quiz questions with difficulty levels
const allQuestions = [
  // Stage 1 (Easy)
  { id: 1, question: "Who was swallowed by a great fish?", options: ["Jonah", "Peter", "Paul", "Moses"], correctAnswer: "Jonah", difficulty: "easy" },
  { id: 2, question: "How many days and nights did it rain during the great flood?", options: ["40 days and 40 nights", "7 days and 7 nights", "10 days and 10 nights", "30 days and 30 nights"], correctAnswer: "40 days and 40 nights", difficulty: "easy" },
  { id: 3, question: "Who was the first king of Israel?", options: ["David", "Solomon", "Saul", "Hezekiah"], correctAnswer: "Saul", difficulty: "easy" },
  { id: 4, question: "In what city was Jesus born?", options: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"], correctAnswer: "Bethlehem", difficulty: "easy" },
  { id: 5, question: "Who built the ark?", options: ["Abraham", "Noah", "Moses", "Jesus"], correctAnswer: "Noah", difficulty: "easy" },
  { id: 6, question: "Who was the mother of Jesus?", options: ["Mary", "Martha", "Elizabeth", "Ruth"], correctAnswer: "Mary", difficulty: "easy" },
  { id: 7, question: "Which book of the Bible comes after Genesis?", options: ["Numbers", "Leviticus", "Exodus", "Deuteronomy"], correctAnswer: "Exodus", difficulty: "easy" },
  { id: 8, question: "Who was Moses' brother?", options: ["Aaron", "Joshua", "Caleb", "Levi"], correctAnswer: "Aaron", difficulty: "easy" },
  { id: 9, question: "Who was Jesus's most famous cousin?", options: ["John the Baptist", "James", "Peter", "Judas"], correctAnswer: "John the Baptist", difficulty: "easy" },
  { id: 10, question: "What did Jesus turn water into at a wedding?", options: ["Wine", "Juice", "Milk", "Honey"], correctAnswer: "Wine", difficulty: "easy" },
  { id: 11, question: "How many disciples did Jesus have?", options: ["10", "12", "14", "7"], correctAnswer: "12", difficulty: "easy" },
  { id: 12, question: "Who was the first man created by God?", options: ["Moses", "Abraham", "Noah", "Adam"], correctAnswer: "Adam", difficulty: "easy" },
  { id: 13, question: "Which mountain did Moses receive the Ten Commandments on?", options: ["Mount Sinai", "Mount Zion", "Mount Hermon", "Mount Moriah"], correctAnswer: "Mount Sinai", difficulty: "easy" },
  { id: 14, question: "What was the name of the garden where Adam and Eve lived?", options: ["Eden", "Gethsemane", "Siloam", "Bethesda"], correctAnswer: "Eden", difficulty: "easy" },
  { id: 15, question: "What animal spoke to Balaam?", options: ["A snake", "A donkey", "A lion", "A goat"], correctAnswer: "A donkey", difficulty: "easy" },

  // Stage 2 (Medium)
  { id: 16, question: "Which disciple betrayed Jesus?", options: ["Peter", "Judas Iscariot", "James", "Thomas"], correctAnswer: "Judas Iscariot", difficulty: "medium" },
  { id: 17, question: "What did David use to defeat Goliath?", options: ["A sword", "A slingshot", "A spear", "His bare hands"], correctAnswer: "A slingshot", difficulty: "medium" },
  { id: 18, question: "How many books are in the New Testament?", options: ["27", "39", "66", "23"], correctAnswer: "27", difficulty: "medium" },
  { id: 19, question: "Who was Moses's brother, who helped him speak to Pharaoh?", options: ["Joshua", "Aaron", "Caleb", "Levi"], correctAnswer: "Aaron", difficulty: "medium" },
  { id: 20, question: "How many days did Jesus fast in the wilderness?", options: ["20", "30", "40", "50"], correctAnswer: "40", difficulty: "medium" },
  { id: 21, question: "Who was thrown into a lion's den?", options: ["Daniel", "Elisha", "Elijah", "Jeremiah"], correctAnswer: "Daniel", difficulty: "medium" },
  { id: 22, question: "Who was the first Christian martyr?", options: ["Peter", "Paul", "Stephen", "James"], correctAnswer: "Stephen", difficulty: "medium" },
  { id: 23, question: "What was the name of the place where Jesus was crucified?", options: ["Galilee", "Calvary", "Bethlehem", "Nazareth"], correctAnswer: "Calvary", difficulty: "medium" },
  { id: 24, question: "Who was sold into slavery by his brothers?", options: ["Benjamin", "Joseph", "Isaac", "Jacob"], correctAnswer: "Joseph", difficulty: "medium" },
  { id: 25, question: "What was the first plague God sent to Egypt?", options: ["Locusts", "Frogs", "Darkness", "Water to blood"], correctAnswer: "Water to blood", difficulty: "medium" },
  { id: 26, question: "Which woman from the Old Testament was known for her loyalty to her mother-in-law, Naomi?", options: ["Esther", "Sarah", "Ruth", "Rebekah"], correctAnswer: "Ruth", difficulty: "medium" },
  { id: 27, question: "What was the name of the river where Jesus was baptized?", options: ["Jordan", "Nile", "Euphrates", "Tigris"], correctAnswer: "Jordan", difficulty: "medium" },
  { id: 28, question: "Who did God make a covenant with, promising that his descendants would be as numerous as the stars?", options: ["Abraham", "Noah", "Moses", "Jacob"], correctAnswer: "Abraham", difficulty: "medium" },
  { id: 29, question: "Which book of the Bible contains the story of Adam and Eve?", options: ["Genesis", "Exodus", "Numbers", "Deuteronomy"], correctAnswer: "Genesis", difficulty: "medium" },
  { id: 30, question: "Who was the tax collector that Jesus called to be a disciple?", options: ["Matthew", "John", "Peter", "Thomas"], correctAnswer: "Matthew", difficulty: "medium" },

  // Stage 3 (Medium to Hard)
  { id: 31, question: "Who was the first person to see the resurrected Jesus?", options: ["Mary Magdalene", "Peter", "John", "Thomas"], correctAnswer: "Mary Magdalene", difficulty: "medium" },
  { id: 32, question: "Which book of the Bible contains the story of Joseph and his coat of many colors?", options: ["Genesis", "Exodus", "Numbers", "Leviticus"], correctAnswer: "Genesis", difficulty: "medium" },
  { id: 33, question: "What was the name of the garden where Jesus prayed before his crucifixion?", options: ["The Garden of Eden", "The Garden of Gethsemane", "The Garden of Gethsemane", "The Garden of Bethesda"], correctAnswer: "The Garden of Gethsemane", difficulty: "hard" },
  { id: 34, question: "Who wrote the book of Revelation?", options: ["Paul", "Peter", "John", "James"], correctAnswer: "John", difficulty: "hard" },
  { id: 35, question: "In the Old Testament, which city's walls fell after the Israelites marched around it?", options: ["Babylon", "Jericho", "Jerusalem", "Gaza"], correctAnswer: "Jericho", difficulty: "hard" },
  { id: 36, question: "Who was the Roman governor who presided over the trial of Jesus?", options: ["Herod Antipas", "Pontius Pilate", "Caesar Augustus", "Tiberius"], correctAnswer: "Pontius Pilate", difficulty: "hard" },
  { id: 37, question: "Who was the Roman centurion who declared, 'Surely this man was the Son of God'?", options: ["Cornelius", "Longinus", "Lucius", "Claudius"], correctAnswer: "Longinus", difficulty: "hard" },
  { id: 38, question: "What was the name of the king who ordered the killing of all male infants in Bethlehem?", options: ["Herod the Great", "King Ahab", "King Solomon", "Pharaoh"], correctAnswer: "Herod the Great", difficulty: "hard" },
  { id: 39, question: "What was Paul's original name?", options: ["Saul", "Stephen", "Barnabas", "Silas"], correctAnswer: "Saul", difficulty: "hard" },
  { id: 40, question: "How many books are in the Old Testament?", options: ["27", "39", "66", "46"], correctAnswer: "39", difficulty: "hard" },
  { id: 41, question: "Which book of the Bible contains the story of the fiery furnace?", options: ["Genesis", "Ezekiel", "Daniel", "Isaiah"], correctAnswer: "Daniel", difficulty: "hard" },
  { id: 42, question: "What was the name of the king of Judah who was the last to rule before the Babylonian captivity?", options: ["Hezekiah", "Josiah", "Zedekiah", "Jehoiachin"], correctAnswer: "Zedekiah", difficulty: "hard" },
  { id: 43, question: "Who was the first person to be raised from the dead by Jesus?", options: ["Lazarus", "Jairus's daughter", "The widow of Nain's son", "Dorcas"], correctAnswer: "Lazarus", difficulty: "hard" },
  { id: 44, question: "What did the prophet Elijah call down from heaven to consume the altar on Mount Carmel?", options: ["Fire", "Water", "Locusts", "Stone"], correctAnswer: "Fire", difficulty: "hard" },
  { id: 45, question: "What was the name of the man who helped Jesus carry the cross?", options: ["Simon of Cyrene", "Joseph of Arimathea", "Nicodemus", "Zacchaeus"], correctAnswer: "Simon of Cyrene", difficulty: "hard" },

  // Stage 4 (Hard)
  { id: 46, question: "Who was the Roman governor who presided over the trial of Jesus?", options: ["Herod Antipas", "Pontius Pilate", "Caesar Augustus", "Tiberius"], correctAnswer: "Pontius Pilate", difficulty: "hard" },
  { id: 47, question: "What is the name of the mountain where Moses received the Ten Commandments?", options: ["Mount of Olives", "Mount Hermon", "Mount Sinai", "Mount Horeb"], correctAnswer: "Mount Sinai", difficulty: "hard" },
  { id: 48, question: "Which judge of Israel was known for his immense strength?", options: ["Gideon", "Samson", "Joshua", "Jephthah"], correctAnswer: "Samson", difficulty: "hard" },
  { id: 49, question: "Who was the author of most of the Psalms?", options: ["Solomon", "David", "Moses", "Asaph"], correctAnswer: "David", difficulty: "hard" },
  { id: 50, question: "What was the name of the king of Judah who was the last to rule before the Babylonian captivity?", options: ["Hezekiah", "Josiah", "Zedekiah", "Jehoiachin"], correctAnswer: "Zedekiah", difficulty: "hard" },
  { id: 51, question: "Which disciple was a tax collector before he followed Jesus?", options: ["Simon Peter", "Matthew", "Andrew", "James"], correctAnswer: "Matthew", difficulty: "hard" },
  { id: 52, question: "How many books are in the Bible in total?", options: ["66", "73", "52", "60"], correctAnswer: "66", difficulty: "hard" },
  { id: 53, question: "What did Jesus say to the paralyzed man he healed?", options: ["'Take up your bed and walk'", "'Go and sin no more'", "'Your faith has made you well'", "'Your sins are forgiven'"], correctAnswer: "'Take up your bed and walk'", difficulty: "hard" },
  { id: 54, question: "Which prophet was taken to heaven in a chariot of fire?", options: ["Elijah", "Elisha", "Isaiah", "Jeremiah"], correctAnswer: "Elijah", difficulty: "hard" },
  { id: 55, question: "What was the name of the city where Paul was heading when he was converted?", options: ["Jerusalem", "Damascus", "Antioch", "Rome"], correctAnswer: "Damascus", difficulty: "hard" },
  { id: 56, question: "Who was the first king of a united Israel?", options: ["Saul", "David", "Solomon", "Samuel"], correctAnswer: "Saul", difficulty: "hard" },
  { id: 57, question: "What did Jesus turn into at the wedding in Cana?", options: ["Water into wine", "Stones into bread", "Wine into water", "Bread into fish"], correctAnswer: "Water into wine", difficulty: "hard" },
  { id: 58, question: "Which book of the Bible contains the phrase 'vanity of vanities'?", options: ["Proverbs", "Ecclesiastes", "Song of Solomon", "Job"], correctAnswer: "Ecclesiastes", difficulty: "hard" },
  { id: 59, question: "What did God send to feed the Israelites in the wilderness?", options: ["Manna", "Bread", "Fruit", "Fish"], correctAnswer: "Manna", difficulty: "hard" },
  { id: 60, question: "Which of the following was NOT one of the 10 plagues of Egypt?", options: ["Boils", "Locusts", "Famine", "Death of the firstborn"], correctAnswer: "Famine", difficulty: "hard" },

  // Stage 5 (Very Hard)
  { id: 61, question: "Who was the high priest of Jerusalem who convened the Sanhedrin trial against Jesus?", options: ["Caiaphas", "Annas", "Gamaliel", "Nicodemus"], correctAnswer: "Caiaphas", difficulty: "hard" },
  { id: 62, question: "Which book of the Bible is also known as the book of the 'Second Law'?", options: ["Numbers", "Leviticus", "Deuteronomy", "Joshua"], correctAnswer: "Deuteronomy", difficulty: "hard" },
  { id: 63, question: "Which prophet was thrown into a lion's den?", options: ["Elisha", "Elijah", "Daniel", "Jeremiah"], correctAnswer: "Daniel", difficulty: "hard" },
  { id: 64, question: "What are the names of Adam and Eve's first two sons?", options: ["Cain and Abel", "Shem and Ham", "Isaac and Ishmael", "Jacob and Esau"], correctAnswer: "Cain and Abel", difficulty: "hard" },
  { id: 65, question: "Who was the first Christian martyr?", options: ["Peter", "Paul", "Stephen", "James"], correctAnswer: "Stephen", difficulty: "hard" },
  { id: 66, question: "What was the name of the man who became a new disciple to replace Judas Iscariot?", options: ["Matthias", "Barnabas", "Silas", "Timothy"], correctAnswer: "Matthias", difficulty: "hard" },
  { id: 67, question: "In the book of Acts, who was the first Gentile convert to Christianity?", options: ["Cornelius", "Lydia", "Timothy", "Titus"], correctAnswer: "Cornelius", difficulty: "hard" },
  { id: 68, question: "Which gospel is not one of the Synoptic Gospels?", options: ["Matthew", "Mark", "Luke", "John"], correctAnswer: "John", difficulty: "hard" },
  { id: 69, question: "Who was the prophet that confronted King David about his sin with Bathsheba?", options: ["Samuel", "Nathan", "Elijah", "Isaiah"], correctAnswer: "Nathan", difficulty: "hard" },
  { id: 70, question: "Which book of the Bible contains the famous 'Hall of Faith' chapter?", options: ["Hebrews", "Romans", "James", "1 Corinthians"], correctAnswer: "Hebrews", difficulty: "hard" },
  { id: 71, question: "Who was the Roman emperor during the time of Jesus' birth?", options: ["Caesar Augustus", "Tiberius", "Nero", "Caligula"], correctAnswer: "Caesar Augustus", difficulty: "hard" },
  { id: 72, question: "What was the name of the high priest who interrogated Peter and John?", options: ["Annas", "Caiaphas", "Gamaliel", "Nicodemus"], correctAnswer: "Annas", difficulty: "hard" },
  { id: 73, question: "Which book of the Bible describes the plagues of Egypt?", options: ["Genesis", "Exodus", "Numbers", "Leviticus"], correctAnswer: "Exodus", difficulty: "hard" },
  { id: 74, question: "What did John the Baptist eat in the wilderness?", options: ["Honey and wild locusts", "Fish and bread", "Manna and water", "Fruit and berries"], correctAnswer: "Honey and wild locusts", difficulty: "hard" },
  { id: 75, question: "Who was the prophet that foretold the coming of Jesus?", options: ["Ezekiel", "Isaiah", "Jeremiah", "Daniel"], correctAnswer: "Isaiah", difficulty: "hard" },
];

// New data for the verse-guessing game
const verseQuestions = [
  // Stage 1 (Easy)
  {
    id: 1, verse: "For God so loved the world, that He gave His only begotten Son, that whoever believes in Him shall not perish, but have eternal life.",
    options: ["John 3:16", "Genesis 1:1", "Matthew 5:3", "Psalm 23:1"],
    correctAnswer: "John 3:16", difficulty: "easy"
  },
  {
    id: 2, verse: "In the beginning God created the heavens and the earth.",
    options: ["Genesis 1:1", "Revelation 21:1", "Isaiah 40:28", "John 1:1"],
    correctAnswer: "Genesis 1:1", difficulty: "easy"
  },
  {
    id: 3, verse: "The Lord is my shepherd; I shall not want.",
    options: ["Jeremiah 29:11", "Psalm 23:1", "Proverbs 3:5", "Philippians 4:13"],
    correctAnswer: "Psalm 23:1", difficulty: "easy"
  },
  {
    id: 4, verse: "I can do all things through Christ who strengthens me.",
    options: ["Romans 8:28", "Hebrews 11:1", "Philippians 4:13", "1 Corinthians 13:4"],
    correctAnswer: "Philippians 4:13", difficulty: "easy"
  },
  {
    id: 5, verse: "Trust in the Lord with all your heart and lean not on your own understanding.",
    options: ["Proverbs 3:5", "Matthew 6:33", "Joshua 1:9", "Psalm 119:105"],
    correctAnswer: "Proverbs 3:5", difficulty: "easy"
  },
  {
    id: 6, verse: "Jesus Christ is the same yesterday and today and forever.",
    options: ["Hebrews 13:8", "John 1:1", "Romans 1:16", "2 Timothy 3:16"],
    correctAnswer: "Hebrews 13:8", difficulty: "easy"
  },
  {
    id: 7, verse: "For where two or three are gathered in my name, there am I among them.",
    options: ["Matthew 18:20", "John 14:6", "Acts 2:42", "Hebrews 10:25"],
    correctAnswer: "Matthew 18:20", difficulty: "easy"
  },
  {
    id: 8, verse: "The light shines in the darkness, and the darkness has not overcome it.",
    options: ["John 1:5", "Psalm 119:105", "Isaiah 9:2", "Romans 13:12"],
    correctAnswer: "John 1:5", difficulty: "easy"
  },
  {
    id: 9, verse: "For by grace you have been saved through faith.",
    options: ["Ephesians 2:8", "Romans 3:28", "Galatians 2:16", "Titus 3:5"],
    correctAnswer: "Ephesians 2:8", difficulty: "easy"
  },
  {
    id: 10, verse: "Come to me, all who labor and are heavy laden, and I will give you rest.",
    options: ["Matthew 11:28", "John 6:35", "Isaiah 40:31", "Psalm 46:1"],
    correctAnswer: "Matthew 11:28", difficulty: "easy"
  },

  // Stage 2 (Medium)
  {
    id: 11, verse: "So God created man in His own image, in the image of God He created him; male and female He created them.",
    options: ["Genesis 1:27", "Genesis 2:7", "Isaiah 43:7", "Psalm 139:14"],
    correctAnswer: "Genesis 1:27", difficulty: "medium"
  },
  {
    id: 12, verse: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.",
    options: ["Ephesians 4:2", "Galatians 5:22-23", "Romans 12:2", "1 Corinthians 13:4"],
    correctAnswer: "Galatians 5:22-23", difficulty: "medium"
  },
  {
    id: 13, verse: "For where two or three are gathered in my name, there am I among them.",
    options: ["Matthew 18:20", "John 14:6", "Acts 2:42", "Hebrews 10:25"],
    correctAnswer: "Matthew 18:20", difficulty: "medium"
  },
  {
    id: 14, verse: "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.",
    options: ["Romans 8:28", "Jeremiah 29:11", "Isaiah 55:8", "Proverbs 16:9"],
    correctAnswer: "Jeremiah 29:11", difficulty: "medium"
  },
  {
    id: 15, verse: "As for me and my household, we will serve the Lord.",
    options: ["1 Corinthians 6:19", "Joshua 24:15", "Psalm 27:1", "Isaiah 41:10"],
    correctAnswer: "Joshua 24:15", difficulty: "medium"
  },
  {
    id: 16, verse: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.",
    options: ["2 Timothy 3:16", "Romans 15:4", "Hebrews 4:12", "1 Thessalonians 2:13"],
    correctAnswer: "2 Timothy 3:16", difficulty: "medium"
  },
  {
    id: 17, verse: "The thief comes only to steal and kill and destroy; I have come that they may have life, and have it to the full.",
    options: ["Matthew 6:25", "John 10:10", "Luke 12:15", "Romans 5:1"],
    correctAnswer: "John 10:10", difficulty: "medium"
  },
  {
    id: 18, verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    options: ["Matthew 6:33", "Luke 12:31", "Romans 14:17", "1 Peter 5:7"],
    correctAnswer: "Matthew 6:33", difficulty: "medium"
  },
  {
    id: 19, verse: "I have stored up your word in my heart, that I might not sin against you.",
    options: ["Psalm 119:11", "Psalm 19:7", "Proverbs 4:23", "James 1:22"],
    correctAnswer: "Psalm 119:11", difficulty: "medium"
  },
  {
    id: 20, verse: "Therefore, go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
    options: ["Matthew 28:19", "Mark 16:15", "Acts 1:8", "Luke 24:47"],
    correctAnswer: "Matthew 28:19", difficulty: "medium"
  },

  // Stage 3 (Hard)
  {
    id: 21, verse: "But speaking the truth in love, we are to grow up in every way into him who is the head, into Christ.",
    options: ["Ephesians 4:15", "Colossians 3:16", "1 John 4:8", "2 Timothy 3:16"],
    correctAnswer: "Ephesians 4:15", difficulty: "hard"
  },
  {
    id: 22, verse: "For we are His workmanship, created in Christ Jesus for good works, which God prepared beforehand that we should walk in them.",
    options: ["Romans 5:8", "Ephesians 2:10", "1 Peter 2:9", "2 Corinthians 5:17"],
    correctAnswer: "Ephesians 2:10", difficulty: "hard"
  },
  {
    id: 23, verse: "He must increase, but I must decrease.",
    options: ["John 3:30", "Matthew 3:11", "Luke 17:10", "John 1:27"],
    correctAnswer: "John 3:30", difficulty: "hard"
  },
  {
    id: 24, verse: "And this is eternal life, that they know you, the only true God, and Jesus Christ whom you have sent.",
    options: ["John 17:3", "Romans 6:23", "Ephesians 1:7", "1 John 5:11"],
    correctAnswer: "John 17:3", difficulty: "hard"
  },
  {
    id: 25, verse: "Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new.",
    options: ["Galatians 2:20", "2 Corinthians 5:17", "Ephesians 4:24", "Romans 6:4"],
    correctAnswer: "2 Corinthians 5:17", difficulty: "hard"
  },
  {
    id: 26, verse: "I have been crucified with Christ and I no longer live, but Christ lives in me.",
    options: ["Galatians 2:20", "Romans 6:6", "Colossians 3:3", "Philippians 1:21"],
    correctAnswer: "Galatians 2:20", difficulty: "hard"
  },
  {
    id: 27, verse: "But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.",
    options: ["James 3:17", "Proverbs 9:10", "1 Corinthians 2:16", "Colossians 2:3"],
    correctAnswer: "James 3:17", difficulty: "hard"
  },
  {
    id: 28, verse: "Be imitators of God, therefore, as dearly loved children and live a life of love, just as Christ loved us and gave himself up for us as a fragrant offering and sacrifice to God.",
    options: ["Ephesians 5:1-2", "Romans 12:1", "1 John 4:7", "Colossians 3:12"],
    correctAnswer: "Ephesians 5:1-2", difficulty: "hard"
  },
  {
    id: 29, verse: "Now faith is confidence in what we hope for and assurance about what we do not see.",
    options: ["Hebrews 11:1", "Romans 10:17", "2 Corinthians 5:7", "James 2:17"],
    correctAnswer: "Hebrews 11:1", difficulty: "hard"
  },
  {
    id: 30, verse: "For where your treasure is, there your heart will be also.",
    options: ["Matthew 6:21", "Luke 12:34", "Proverbs 4:23", "Colossians 3:2"],
    correctAnswer: "Matthew 6:21", difficulty: "hard"
  },
];

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// StartScreen component to begin the quiz
const StartScreen = ({ onStartQuiz, onStartVerseGame }) => (
  <div className="card">
    <h1 className="title">Bible Quiz</h1>
    <p className="subtitle">Test your knowledge of the Bible!</p>
    <button onClick={onStartQuiz} className="button primary-button">
      Start Quiz
    </button>
    <button onClick={onStartVerseGame} className="button secondary-button mt-4">
      Start Verse Challenge
    </button>
  </div>
);

// QuizPage component to display questions and handle answers
const QuizPage = ({ questions, currentQuestionIndex, onAnswer, onRestartQuiz, currentStage, onBackToHome }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (questions.length === 0) {
    return null;
  }
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
    }, 1500);
  };

  const getButtonClass = (option) => {
    if (selectedAnswer === null) {
      return "option-button";
    }
    if (option === currentQuestion.correctAnswer) {
      return "option-button correct-answer";
    }
    if (option === selectedAnswer) {
      return "option-button incorrect-answer";
    }
    return "option-button disabled";
  };

  return (
    <div className="card">
      <h3 className="stage-title">Stage {currentStage}</h3>
      <h2 className="question-text">{currentQuestion.question}</h2>
      <div className="options-grid">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== null}
            className={getButtonClass(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="question-counter">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      <div className="button-group mt-6">
        <button onClick={onRestartQuiz} className="button secondary-button">
          Restart Quiz
        </button>
        <button onClick={onBackToHome} className="button back-button">
          Go Home
        </button>
      </div>
    </div>
  );
};

// New component for the Verse Quiz
const VerseQuizPage = ({ questions, currentQuestionIndex, onAnswer, onRestartQuiz, onBackToHome, onPreviousStage, currentStage }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (questions.length === 0) {
    return null;
  }
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
    }, 1500);
  };

  const getButtonClass = (option) => {
    if (selectedAnswer === null) {
      return "option-button";
    }
    if (option === currentQuestion.correctAnswer) {
      return "option-button correct-answer";
    }
    if (option === selectedAnswer) {
      return "option-button incorrect-answer";
    }
    return "option-button disabled";
  };

  return (
    <div className="card">
      <h3 className="stage-title">Verse Challenge - Stage {currentStage}</h3>
      <p className="verse-subtitle">Which verse is this?</p>
      <div className="verse-container">
        <p className="verse-text">"{currentQuestion.verse}"</p>
      </div>
      <div className="options-grid">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={selectedAnswer !== null}
            className={getButtonClass(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="question-counter">
        Question {currentQuestionIndex + 1} of {questions.length}
      </div>
      <div className="button-group mt-6">
        {currentStage > 1 && (
          <button onClick={onPreviousStage} className="button back-button">
            Back to Previous Stage
          </button>
        )}
        <button onClick={onRestartQuiz} className="button secondary-button">
          Restart Challenge
        </button>
        <button onClick={onBackToHome} className="button primary-button">
          Go Home
        </button>
      </div>
    </div>
  );
};

// StageResultScreen component to display the result of the stage
const StageResultScreen = ({ gameType, score, totalQuestions, currentStage, onNextStage, onRetryStage, onFinalScore, onPreviousStage, incorrectAnswers, onBackToHome }) => {
  const hasPassed = score >= totalQuestions / 2;
  const isFinalQuizStage = gameType === 'quiz' && currentStage === 5;
  const isFinalVerseStage = gameType === 'verse-game' && currentStage === 3;
  const canGoBack = currentStage > 1;
  const nextStageText = gameType === 'quiz' ? `Continue to Stage ${currentStage + 1}` : `Continue to Verse Stage ${currentStage + 1}`;
  const retryText = gameType === 'quiz' ? `Retry Stage ${currentStage}` : `Retry Verse Stage ${currentStage}`;

  return (
    <div className="card text-center">
      {hasPassed ? (
        <>
          <h2 className="result-title-pass">{gameType === 'quiz' ? `Stage ${currentStage} Complete! 🎉` : `Verse Stage ${currentStage} Complete! 🎉`}</h2>
          <p className="result-score">
            You scored <span className="score-pass">{score}</span> out of {totalQuestions}!
          </p>
          {!isFinalQuizStage && !isFinalVerseStage ? (
            <div className="button-group">
              <button onClick={onNextStage} className="button primary-button">
                {nextStageText}
              </button>
              {canGoBack && (
                <button onClick={onPreviousStage} className="button back-button">
                  Previous Stage
                </button>
              )}
            </div>
          ) : (
            <button onClick={onFinalScore} className="button final-score-button">
              See Final Score
            </button>
          )}
          <button onClick={onBackToHome} className="link-button mt-4">
            Back to Home
          </button>
        </>
      ) : (
        <>
          <h2 className="result-title-fail">Let's try again, you got this! 💪</h2>
          <p className="result-score">
            You scored <span className="score-fail">{score}</span> out of {totalQuestions}.
          </p>
          <p className="text-sm">You need at least 50% to pass this stage.</p>
          <div className="button-group">
            <button onClick={onRetryStage} className="button primary-button">
              {retryText}
            </button>
            {canGoBack && (
              <button onClick={onPreviousStage} className="button back-button">
                Previous Stage
              </button>
            )}
          </div>
          <button onClick={onBackToHome} className="link-button mt-4">
            Back to Home
          </button>
        </>
      )}

      {incorrectAnswers.length > 0 && (
        <div className="incorrect-answers-list">
          <h3 className="list-title">Questions You Got Wrong:</h3>
          {incorrectAnswers.map((item, index) => (
            <div key={index} className="incorrect-answer-item">
              <p className="incorrect-question">Q: {item.question || `Verse: "${item.verse}"`}</p>
              <p className="incorrect-user-answer">Your Answer: <span>{item.userAnswer}</span></p>
              <p className="incorrect-correct-answer">Correct Answer: <span>{item.correctAnswer}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// FinalScoreScreen component to display the final score
const FinalScoreScreen = ({ gameType, totalScore, onPlayAgain, onStartVerseGame, onBackToHome }) => (
  <div className="card text-center">
    {gameType === 'quiz' ? (
      <>
        <h2 className="final-score-title">Quiz Complete! 🎉</h2>
        <p className="final-score-text">
          Your final score is <span className="final-score-value">{totalScore}</span> out of {allQuestions.length}!
        </p>
        <div className="button-group">
          <button onClick={onPlayAgain} className="button primary-button">
            Play Again
          </button>
          <button onClick={onStartVerseGame} className="button secondary-button">
            Play Verse Challenge
          </button>
        </div>
      </>
    ) : (
      <>
        <h2 className="final-score-title">Verse Challenge Complete! 🎉</h2>
        <p className="final-score-text">
          Your final score is <span className="final-score-value">{totalScore}</span> out of {verseQuestions.length}!
        </p>
        <button onClick={onPlayAgain} className="button primary-button">
          Play Again
        </button>
      </>
    )}
    <button onClick={onBackToHome} className="link-button mt-4">
      Back to Home
    </button>
  </div>
);

// Main App component
const App = () => {
  const [quizState, setQuizState] = useState('start');
  const [gameType, setGameType] = useState('quiz');
  const [currentStage, setCurrentStage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stageScore, setStageScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  const getStageQuestions = (type, stage) => {
    if (type === 'quiz') {
      const difficultyMap = { 1: "easy", 2: "medium", 3: "medium", 4: "hard", 5: "hard" };
      const difficulty = difficultyMap[stage] || "easy";
      const stageQuestions = allQuestions.filter(q => q.difficulty === difficulty);
      return shuffleArray(stageQuestions).slice(0, 5);
    } else {
      const difficultyMap = { 1: "easy", 2: "medium", 3: "hard" };
      const difficulty = difficultyMap[stage] || "easy";
      const stageQuestions = verseQuestions.filter(q => q.difficulty === difficulty);
      return shuffleArray(stageQuestions).slice(0, 5);
    }
  };

  const handleStartQuiz = () => {
    setQuizState('quiz');
    setGameType('quiz');
    setCurrentStage(1);
    setQuestions(getStageQuestions('quiz', 1));
    setCurrentQuestionIndex(0);
    setStageScore(0);
    setTotalScore(0);
    setIncorrectAnswers([]);
  };

  const handleStartVerseGame = () => {
    setQuizState('quiz');
    setGameType('verse-game');
    setCurrentStage(1);
    setQuestions(getStageQuestions('verse-game', 1));
    setCurrentQuestionIndex(0);
    setStageScore(0);
    setTotalScore(0);
    setIncorrectAnswers([]);
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setStageScore(prevScore => prevScore + 1);
    } else {
      setIncorrectAnswers(prevAnswers => [...prevAnswers, { ...currentQuestion, userAnswer: answer }]);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizState('stage-result');
    }
  };

  const handleNextStage = () => {
    setTotalScore(prevTotal => prevTotal + stageScore);
    const nextStage = currentStage + 1;
    setCurrentStage(nextStage);
    setCurrentQuestionIndex(0);
    setStageScore(0);
    setIncorrectAnswers([]);
    setQuestions(getStageQuestions(gameType, nextStage));
    setQuizState('quiz');
  };

  const handleRetryStage = () => {
    setCurrentQuestionIndex(0);
    setStageScore(0);
    setIncorrectAnswers([]);
    setQuestions(getStageQuestions(gameType, currentStage));
    setQuizState('quiz');
  };

  const handlePreviousStage = () => {
    if (currentStage > 1) {
      setTotalScore(prevTotal => prevTotal - stageScore);
      const prevStage = currentStage - 1;
      setCurrentStage(prevStage);
      setCurrentQuestionIndex(0);
      setStageScore(0);
      setIncorrectAnswers([]);
      setQuestions(getStageQuestions(gameType, prevStage));
      setQuizState('quiz');
    }
  };

  const handleBackToHome = () => {
    setQuizState('start');
    setGameType('quiz');
    setCurrentStage(1);
    setCurrentQuestionIndex(0);
    setStageScore(0);
    setTotalScore(0);
    setIncorrectAnswers([]);
  };

  return (
    <div className="app-container">
      <style>
        {`
          .app-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: linear-gradient(to bottom right, #e0e7ff, #ede9fe);
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
          }

          .card {
            width: 100%;
            max-width: 36rem;
            padding: 2rem;
            background-color: #fff;
            border-radius: 1.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            text-align: center;
            transition: transform 0.5s ease-in-out;
          }

          .card:hover {
            transform: scale(1.02);
          }

          .title {
            font-size: 3rem;
            font-weight: 800;
            color: #4338ca;
            margin-bottom: 1rem;
            text-align: center;
          }

          .subtitle {
            font-size: 1.25rem;
            color: #4b5563;
            margin-top: 0.5rem;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .button {
            width: 100%;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            font-weight: bold;
            font-size: 1.125rem;
            line-height: 1.75rem;
            transition: all 0.3s ease-in-out;
            transform: scale(1.0);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            border: none;
          }

          .button:hover {
            transform: scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          }

          .button.primary-button {
            background-color: #4f46e5;
            color: #fff;
          }

          .button.primary-button:hover {
            background-color: #4338ca;
          }

          .button.secondary-button {
            background-color: #8b5cf6;
            color: #fff;
          }

          .button.secondary-button:hover {
            background-color: #7c3aed;
          }

          .button.back-button {
            background-color: #9ca3af;
            color: #fff;
          }

          .button.back-button:hover {
            background-color: #6b7280;
          }

          .stage-title {
            font-size: 1.25rem;
            font-weight: bold;
            color: #4f46e5;
            margin-bottom: 0.5rem;
          }

          .question-text {
            font-size: 1.875rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .options-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            width: 100%;
          }

          @media (min-width: 768px) {
            .options-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          .option-button {
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            border: 2px solid #d1d5db;
            font-weight: 500;
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            background-color: #f9fafb;
            color: #374151;
          }

          .option-button:hover {
            background-color: #e0e7ff;
            border-color: #6366f1;
            transform: scale(1.05);
          }

          .option-button.correct-answer {
            background-color: #22c55e;
            border-color: #15803d;
            color: #fff;
          }

          .option-button.incorrect-answer {
            background-color: #ef4444;
            border-color: #b91c1c;
            color: #fff;
          }

          .option-button.disabled {
            background-color: #f3f4f6;
            border-color: #e5e7eb;
            color: #9ca3af;
            cursor: not-allowed;
          }

          .question-counter {
            margin-top: 2rem;
            text-align: center;
            font-size: 1.125rem;
            color: #4b5563;
          }

          .link-button {
            margin-top: 1.5rem;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            color: #4f46e5;
            font-weight: 500;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            background: transparent;
            border: none;
          }

          .link-button:hover {
            color: #312e81;
            background-color: #e0e7ff;
          }

          .verse-subtitle {
            font-size: 1.25rem;
            font-weight: 500;
            color: #4b5563;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .verse-container {
            background-color: #eef2ff;
            padding: 1.5rem;
            border-radius: 0.75rem;
            border: 1px solid #c7d2fe;
            width: 100%;
            margin-bottom: 1.5rem;
          }

          .verse-text {
            font-size: 1.125rem;
            font-style: italic;
            color: #1f2937;
            text-align: center;
          }

          .result-title-pass {
            font-size: 2.25rem;
            font-weight: 800;
            color: #16a34a;
            margin-bottom: 1rem;
          }
          
          .result-title-fail {
            font-size: 2.25rem;
            font-weight: 800;
            color: #dc2626;
            margin-bottom: 1rem;
          }

          .result-score {
            font-size: 1.5rem;
            color: #4b5563;
            margin-bottom: 1.5rem;
          }

          .score-pass {
            color: #16a34a;
            font-weight: bold;
          }

          .score-fail {
            color: #dc2626;
            font-weight: bold;
          }

          .button-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
          }

          @media (min-width: 640px) {
            .button-group {
              flex-direction: row;
              gap: 1rem;
            }
          }

          .button.final-score-button {
            background-color: #16a34a;
          }
          
          .button.final-score-button:hover {
            background-color: #15803d;
          }

          .incorrect-answers-list {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 2px solid #e5e7eb;
            width: 100%;
            text-align: left;
          }

          .list-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 1rem;
          }

          .incorrect-answer-item {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background-color: #fef2f2;
            border-radius: 0.75rem;
            border: 1px solid #fee2e2;
          }

          .incorrect-question {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }

          .incorrect-user-answer, .incorrect-correct-answer {
            color: #dc2626;
            margin-bottom: 0.25rem;
          }

          .incorrect-correct-answer {
            color: #16a34a;
          }

          .incorrect-user-answer span, .incorrect-correct-answer span {
            font-weight: 600;
          }
          
          .final-score-title {
            font-size: 3rem;
            font-weight: 800;
            color: #16a34a;
            margin-bottom: 1rem;
          }
          
          .final-score-text {
            font-size: 1.5rem;
            color: #4b5563;
            margin-bottom: 1.5rem;
          }
          
          .final-score-value {
            color: #16a34a;
            font-weight: bold;
          }
        `}
      </style>
      
      {quizState === 'start' && <StartScreen onStartQuiz={handleStartQuiz} onStartVerseGame={handleStartVerseGame} />}
      {quizState === 'quiz' && gameType === 'quiz' && questions.length > 0 && (
        <QuizPage
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          onRestartQuiz={handleStartQuiz}
          currentStage={currentStage}
        />
      )}
      {quizState === 'quiz' && gameType === 'verse-game' && questions.length > 0 && (
        <VerseQuizPage
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
          onRestartQuiz={handleStartVerseGame}
          onBackToHome={handleBackToHome}
          onPreviousStage={handlePreviousStage}
          currentStage={currentStage}
        />
      )}
      {quizState === 'stage-result' && (
        <StageResultScreen
          gameType={gameType}
          score={stageScore}
          totalQuestions={questions.length}
          currentStage={currentStage}
          onNextStage={handleNextStage}
          onRetryStage={handleRetryStage}
          onFinalScore={() => {
            setTotalScore(prevTotal => prevTotal + stageScore);
            setQuizState('final-score');
          }}
          onPreviousStage={handlePreviousStage}
          incorrectAnswers={incorrectAnswers}
          onBackToHome={handleBackToHome}
        />
      )}
      {quizState === 'final-score' && (
        <FinalScoreScreen
          gameType={gameType}
          totalScore={totalScore}
          onPlayAgain={handleStartQuiz}
          onStartVerseGame={handleStartVerseGame}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
};

export default App;