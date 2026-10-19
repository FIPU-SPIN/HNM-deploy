// seeds/kviz4.js

require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz4" });
    console.log("Stari kviz obrisan");

    const kviz = [
      /* ================= INTRO ================= */
      {
        quizId: "kviz4",
        order: 1,
        type: "intro",
        title: "Naglasni inventar",
        image: "/assets/images/inventar_kviz1.png",
        text: "U ovom kvizu provjeravamo znanje o naglasnom inventaru hrvatskoga standardnog jezika.",
      },

      /* ================= Q1 ================= */
      {
        quizId: "kviz4",
        order: 2,
        type: "audio_select",
        id: "q1",
        question: "Od ponuđenih riječi odaberite onu koja ima kratki naglasak.",
        voices: [
          { label: "máčak", audio: "/audio/z10_a.wav" },
          { label: "mȁčka", audio: "/audio/z10_b.wav" },
          { label: "mājka", audio: "/audio/z10_c.wav" },
          { label: "măndărínă", audio: "/audio/z10_d.wav" },
        ],
        options: ["máčak", "mȁčka", "mājka", "măndărínă"],
        correct: "mȁčka",
        lamp:
          "Točan odgovor je mȁčka. Kratki naglasak je kratkosilazni (ȁ).",
      },

      /* ================= Q2a ================= */
      {
        quizId: "kviz4",
        order: 3,
        type: "select",
        id: "q2a",
        question: "Koji naglasak ima riječ kȉša?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "kratkosilazni",
        lamp: "Kȉša ima kratkosilazni naglasak.",
      },

      /* ================= Q2b ================= */
      {
        quizId: "kviz4",
        order: 4,
        type: "select",
        id: "q2b",
        question: "Koji naglasak ima riječ sȗnce?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "dugosilazni",
        lamp: "Sȗnce ima dugosilazni naglasak.",
      },

      /* ================= Q2c ================= */
      {
        quizId: "kviz4",
        order: 5,
        type: "select",
        id: "q2c",
        question: "Koji naglasak ima riječ tráva?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "dugouzlazni",
        lamp: "Tráva ima dugouzlazni naglasak.",
      },

      /* ================= Q2d ================= */
      {
        quizId: "kviz4",
        order: 6,
        type: "select",
        id: "q2d",
        question: "Koji naglasak ima riječ ròsa?",
        options: ["kratkosilazni", "dugosilazni", "kratkouzlazni", "dugouzlazni"],
        correct: "kratkouzlazni",
        lamp: "Ròsa ima kratkouzlazni naglasak.",
      },

      /* ================= Q3a ================= */
      {
        quizId: "kviz4",
        order: 7,
        type: "select",
        id: "q3a",
        question: "Koji znak označava kratkosilazni naglasak?",
        options: ["ȁ", "ȃ", "à", "á", "a̍", "ã", "ă"],
        correct: "ȁ",
        lamp: "Kratkosilazni naglasak se označava znakom ȁ.",
      },

      /* ================= Q3b ================= */
      {
        quizId: "kviz4",
        order: 8,
        type: "select",
        id: "q3b",
        question: "Koji znak označava udarni naglasak?",
        options: ["ȁ", "ȃ", "à", "á", "a̍", "ã", "ă"],
        correct: "a̍",
        lamp: "Udarni naglasak se označava znakom a̍.",
      },

      /* ================= Q3c ================= */
      {
        quizId: "kviz4",
        order: 9,
        type: "select",
        id: "q3c",
        question: "Koji znak označava dugosilazni naglasak?",
        options: ["ȁ", "ȃ", "à", "á", "a̍", "ã", "ă"],
        correct: "ȃ",
        lamp: "Dugosilazni naglasak se označava znakom ȃ.",
      },

      /* ================= Q3d ================= */
      {
        quizId: "kviz4",
        order: 10,
        type: "select",
        id: "q3d",
        question: "Koji znak označava dugouzlazni naglasak?",
        options: ["ȁ", "ȃ", "à", "á", "a̍", "ã", "ă"],
        correct: "á",
        lamp: "Dugouzlazni naglasak se označava znakom á.",
      },

      /* ================= Q3e ================= */
      {
        quizId: "kviz4",
        order: 11,
        type: "select",
        id: "q3e",
        question: "Koji znak označava kratkouzlazni naglasak?",
        options: ["ȁ", "ȃ", "à", "á", "a̍", "ã", "ă"],
        correct: "à",
        lamp: "Kratkouzlazni naglasak se označava znakom à.",
      },

      /* ================= Q3f ================= */
      {
        quizId: "kviz4",
        order: 12,
        type: "select",
        id: "q3f",
        question: "Koji znak označava akut?",
        options: ["ȁ", "ȃ", "à", "á", "a̍", "ã", "ă"],
        correct: "ã",
        lamp: "Akut se označava znakom ã.",
      },

      /* ================= Q3g ================= */
      {
        quizId: "kviz4",
        order: 13,
        type: "select",
        id: "q3g",
        question: "Koji znak označava kračinu?",
        options: ["ȁ", "ȃ", "à", "á", "a̍", "ã", "ă"],
        correct: "ă",
        lamp: "Kračina se označava znakom ă.",
      },

      /* ================= Q4 - IPA za sve riječi ================= */
      {
        quizId: "kviz4",
        order: 14,
        type: "select",
        id: "q4_masta",
        question: "Koji je točan IPA zapis za riječ mȁšta?",
        options: ["mȁšta", "mâšta", "măšta", "mâ:šta", "mă:šta"],
        correct: "mâ:šta",
        lamp: "IPA zapis za mȁšta je mâ:šta.",
      },
      {
        quizId: "kviz4",
        order: 15,
        type: "select",
        id: "q4_vatra",
        question: "Koji je točan IPA zapis za riječ vȁtra?",
        options: ["vȁtra", "vâtra", "vătra", "vâ:tra", "vă:tra"],
        correct: "vâ:tra",
        lamp: "IPA zapis za vȁtra je vâ:tra.",
      },
      {
        quizId: "kviz4",
        order: 16,
        type: "select",
        id: "q4_lava",
        question: "Koji je točan IPA zapis za riječ láva?",
        options: ["láva", "lâva", "lăva", "lâ:va", "lă:va"],
        correct: "lâ:va",
        lamp: "IPA zapis za láva je lâ:va.",
      },
      {
        quizId: "kviz4",
        order: 17,
        type: "select",
        id: "q4_bajka",
        question: "Koji je točan IPA zapis za riječ bȃjka?",
        options: ["bȃjka", "bâjka", "băjka", "bâ:jka", "bă:jka"],
        correct: "bâ:jka",
        lamp: "IPA zapis za bȃjka je bâ:jka.",
      },

      /* ================= Q5 ================= */
      {
        quizId: "kviz4",
        order: 18,
        type: "multi-select",
        id: "q5",
        question:
          "Koje su riječi, prema kretanju tona, izgovorene uzlaznim naglascima? (vidi sliku)",
        image: "/assets/images/Ton.png",
        options: ["more", "glava", "dobar", "danas"],
        correct: ["glava", "danas"],
        lamp: "Glava i danas izgovorene su uzlaznim naglascima.",
      },

      /* ================= Q6 ================= */
      {
        quizId: "kviz4",
        order: 19,
        type: "multi-select",
        id: "q6",
        question: "Koje su riječi izgovorene dugim naglascima? (vidi sliku)",
        image: "/assets/images/Ton.png",
        options: ["more", "glava", "dobar", "danas"],
        correct: ["more", "glava"],
        lamp: "More i glava izgovorene su dugim naglascima.",
      },

      /* ================= Q7a ================= */
      {
        quizId: "kviz4",
        order: 20,
        type: "select",
        id: "q7a",
        question:
          "Kako je naglašena riječ čovjek na Hrvatskome jezičnom portalu (HJP)?",
        options: ["čȍvjek", "čòvjek"],
        correct: "čȍvjek",
        lamp: "HJP bilježi čȍvjek (silazni naglasak).",
      },

      /* ================= Q7b ================= */
      {
        quizId: "kviz4",
        order: 21,
        type: "select",
        id: "q7b",
        question:
          "Kako je naglašena riječ čovjek u Školskome rječniku hrvatskoga jezika (ŠRHJ)?",
        options: ["čȍvjek", "čòvjek"],
        correct: "čòvjek",
        lamp:
          "ŠRHJ bilježi čòvjek (uzlazni naglasak). Danas je uzusno i normativno čòvjek. U različitim priručnicima možete pronaći različite leksičke naglaske riječi, no to nije neobična pojava jer se uzimaju u obzir i uzusni naglasci ili oni koji su u određenome vremenu smatrani sustavnijima.",
      },
    ];

    const result = await QuizQuestion.insertMany(kviz);
    console.log("✔ KVIZ 4 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();