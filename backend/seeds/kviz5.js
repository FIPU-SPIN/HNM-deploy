// seeds/kviz5.js

require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz5" });

    console.log("Stari kviz obrisan");

    const kviz = [

      /* ================= INTRO ================= */
      {
        quizId: "kviz5",
        order: 1,
        type: "intro",
        title: "Naglasci u paradigmi",
        text: "U ovom kvizu provjeravamo znanje o naglasnim promjenama u paradigmi hrvatskoga standardnog jezika.",
      },

      /* ================= Q1 ================= */
      {
        quizId: "kviz5",
        order: 2,
        type: "select",
        id: "q1",
        question: "Što se promijenilo u naglasku u deklinaciji imenice stȏl – stòla – stòlovi?",
        options: ["ton", "trajanje", "ton i trajanje", "mjesto"],
        correct: "ton i trajanje",
        lamp: "U paradigmi stȏl – stòla – stòlovi mijenja se i ton (silazni → uzlazni) i trajanje (dugi → kratki), dakle ton i trajanje zajedno.",
      },

      /* ================= Q2 ================= */
      {
        quizId: "kviz5",
        order: 3,
        type: "audio_choice",
        id: "q2",
        question: "Poslušajte izgovor imenice <i>vrijeme</i>, usporedite znakovlje u oblicima te odredite što se promijenilo u paradigmi.<br><br><i>Mislim na vrijéme. Nemam vrȅmena. Druga su vremèna.</i>",
        voices: [
          { label: "Poslušaj.", audio: "/audio/1-6-1.wav.wav" },
        ],
        options: ["ton i trajanje", "mjesto i trajanje", "mjesto, ton i trajanje"],
        correct: "mjesto, ton i trajanje",
        lamp: "U paradigmi imenice <i>vrijeme</i> mijenja se mjesto naglaska, ton i trajanje — dakle sve tri sastavnice naglaska.",
      },

      /* ================= Q3 (jedna stranica: zvuk + dva pitanja) =================
         q3_audio je zaglavlje sa zvukom, q3a i q3b su pitanja s odabirom */
      {
        quizId: "kviz5",
        order: 4,
        type: "audio_select",
        id: "q3_audio",
        question: "Poslušajte imenice <i>novac</i> i <i>ljubav</i> u različitim oblicima.",
        voices: [
          { label: "Poslušaj: novac, ljubav", audio: "/audio/1-6-2.wav.wav" },
        ],
        options: [],
      },

      {
        quizId: "kviz5",
        order: 5,
        type: "select",
        id: "q3a",
        question: "Kojemu tipu pripada imenica <i>novac</i>?",
        options: ["promjenljivi tip", "nepromjenljivi tip"],
        correct: "promjenljivi tip",
        lamp: "<i>nòvac</i> – G jd. <i>nóvca</i> – N mn. <i>nȏvci</i> – G mn. <i>nȍvācā</i>",
      },

      {
        quizId: "kviz5",
        order: 6,
        type: "select",
        id: "q3b",
        question: "Kojemu tipu pripada imenica <i>ljubav</i>?",
        options: ["promjenljivi tip", "nepromjenljivi tip"],
        correct: "nepromjenljivi tip",
        lamp: "<i>ljúbav</i> – G <i>ljúbavi</i> – V <i>ljúbavi</i> – N mn. <i>ljúbavi</i>",
      },

      /* ================= Q4 =================
         Polja se otvaraju jedno po jedno, nakon svakog točnog odgovora */
      {
        quizId: "kviz5",
        order: 7,
        type: "audio_with_input",
        id: "q4",
        question: "Poslušajte izgovor rečenica i ispišite riječi za koje smatrate da su izgovorene s hiperkorektnim naglaskom.",
        voices: [
          { label: "Poslušaj izgovor rečenica", audio: "/audio/1-6-3.wav.wav" },
        ],
        sentences: [
          { prompt: "a) Nemoj mu otvoriti vrata.", parts: 1, correct: "otvoriti" },
          { prompt: "b) Zapuhao je snažan vjetar.", parts: 1, correct: "zapuhao" },
          { prompt: "c) Brod se nasukao na stijene.", parts: 1, correct: "nasukao" },
          { prompt: "d) Nije nas zanimala povijest.", parts: 1, correct: "zanimala" },
        ],
        lamp: "Hiperkorektni naglasci najčešće nastaju na korpusu glagola kod onih govornika koji nisu potpuno svladali standardnu normu pa analogijom pomiču i uzlazne naglaske u paradigmi. Takvi se ostvaraji smatraju pogreškom. Hiperkorektno su izgovorene ove riječi: <i>otvoriti</i>, <i>zapuhao</i>, <i>nasukao</i>, <i>zanimala</i>.",
      },

      /* ================= Q5 ================= */
      {
        quizId: "kviz5",
        order: 8,
        type: "multi-select",
        id: "q5",
        question: "U kojim se oblicima glagola može ostvariti pomicanje naglaska dodavanjem prefiksa?",
        options: ["pȋšēm", "písati", "píši", "písao", "pȋsan"],
        correct: ["pȋšēm", "pȋsan"],
        lamp: "Na prefiks se pomiču samo silazni naglasci — dugosilazni (iza kojega ostaje zanaglasna dužina) i kratkosilazni. To su oblici <i>pȋšēm</i> i <i>pȋsan</i>.",
      },

      /* ================= Q6 ================= */
      {
        quizId: "kviz5",
        order: 9,
        type: "select",
        id: "q6",
        question: "Prema pravilu metatonije odredite koji se naglasak ostvaruje na prethodnom slogu u riječima <i>asistȅnt</i> i <i>dekȃn</i>?",
        options: ["kratkouzlazni", "dugouzlazni"],
        correct: "kratkouzlazni",
        lamp: "Prema pravilu metatonije na prethodnom slogu ostvaruje se kratkouzlazni naglasak (<i>asìstent</i>, <i>dèkān</i>).",
      },

      /* ================= Q7 ================= */
      {
        quizId: "kviz5",
        order: 10,
        type: "select",
        id: "q7",
        question: "Prema pravilu metatonije odredite koji se naglasak ostvaruje pomicanjem na mjesto prednaglasne dužine u riječima <i>trāvȁ</i> i <i>rūkȁ</i>?",
        options: ["kratkouzlazni", "dugouzlazni"],
        correct: "dugouzlazni",
        lamp: "Pomicanjem na mjesto prednaglasne dužine ostvaruje se dugouzlazni naglasak (<i>tráva</i>, <i>rúka</i>).",
      },

      /* ================= Q8 ================= */
      {
        quizId: "kviz5",
        order: 11,
        type: "multi-select",
        id: "q8",
        question: "U kojim riječima ostaje zanaglasna dužina pomicanjem silaznih naglasaka?",
        options: ["asistȅnt", "dekȃn", "kolȃč", "minȉstar", "naprȁviti"],
        correct: ["dekȃn", "kolȃč"],
        lamp: "Zanaglasna dužina ostaje pri pomicanju dugosilaznog naglaska — <i>dekȃn</i> → <i>dèkān</i>, <i>kolȃč</i> → <i>kòlāč</i>. Iza kratkosilaznih naglasaka ne ostaje dužina.",
      },

    ];

    const result = await QuizQuestion.insertMany(kviz);

    console.log("✔ KVIZ 5 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();