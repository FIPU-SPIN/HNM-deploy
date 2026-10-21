require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz2" });
    console.log("Stari kviz obrisan");

    const kviz = [
      {
        quizId: "kviz2",
        order: 1,
        type: "intro",
        title: "Govorna riječ",
        image: "/assets/images/kviz_govorna.png",
        text: "U ovome kvizu određujemo klitike i granice govorne riječi.",
      },
      {
        quizId: "kviz2",
        order: 2,
        type: "select",
        id: "q1",
        title: "Izgovorite sljedeću rečenicu naglas i odgonetnite s koliko ste je naglasaka izgovorili?",
        question: "Ne da mi se nositi kišobran u školu.",
        options: ["4", "6", "8"],
        correct: "4",
        lamp: "Rečenica se čita s četiri naglaska, tj. četiri su sloga istaknuta pri njezinu izgovoru: <b>Ne</b> da mi se <b>no</b>siti <b>ki</b>šobran u <b>ško</b>lu. Iz toga proizlazi da u govoru nije svaka pisana riječ naglašena.",
      },
      {
        quizId: "kviz2",
        order: 3,
        type: "select",
        id: "q2",
        question: "Kako se nazivaju sve riječi bez naglaska?",
        options: ["klitike", "enklitike", "proklitike"],
        correct: "klitike",
        lamp: "Sve riječi bez naglaska nazivaju se klitike. One se dijele na enklitike (zanaglasnice) i proklitike (prednaglasnice).",
      },
      {
        quizId: "kviz2",
        order: 4,
        type: "segment-input",
        id: "q3",
        question: "Ispišite govorne riječi pazeći na položaj prednaglasnica (proklitika).",
        sentences: [
          { prompt: "Sova sjedi na grani.", parts: 3, correct: ["sova", "sjedi", "na grani"] },
          { prompt: "Gledaju ježa kraj puta.", parts: 3, correct: ["gledaju", "ježa", "kraj puta"] },
          { prompt: "Idem onamo umjesto njega.", parts: 3, correct: ["idem", "onamo", "umjesto njega"] },
          { prompt: "Nije ispunio ni to.", parts: 3, correct: ["nije", "ispunio", "ni to"] },
          { prompt: "Ne putujem na more sutra.", parts: 3, correct: ["ne putujem", "na more", "sutra"] },
        ],
      },
      {
        quizId: "kviz2",
        order: 5,
        type: "segment-input",
        id: "q4",
        question: "Ispišite govorne riječi pazeći na položaj zanaglasnica (enklitika).",
        sentences: [
          { prompt: "Molim te, nemoj kasniti.", parts: 3, correct: ["molim te", "nemoj", "kasniti"] },
          { prompt: "Nisam Vas još upoznao.", parts: 3, correct: ["nisam vas", "još", "upoznao"] },
          { prompt: "Čitao sam im knjigu navečer.", parts: 3, correct: ["čitao sam im", "knjigu", "navečer"] },
          { prompt: "Spavao bih danas duže.", parts: 3, correct: ["spavao bih", "danas", "duže"] },
          { prompt: "Hoćeš li kolač i za njega?", parts: 3, correct: ["hoćeš li", "kolač", "i za njega"] },
        ],
      },
      {
        quizId: "kviz2",
        order: 6,
        type: "segment-input",
        id: "q5",
        question: "Ispišite govorne riječi s prednaglasnicama (proklitikama) i sa zanaglasnicama (enklitikama).",
        sentences: [
          { prompt: "Pogledao me i nasmiješio se radosno.", parts: 3, correct: ["pogledao me", "i nasmiješio se", "radosno"] },
          { prompt: "Rekao je da stiže danas.", parts: 3, correct: ["rekao je", "da stiže", "danas"] },
          { prompt: "Reče da će doći rano.", parts: 3, correct: ["reče", "da će doći", "rano"] },
          { prompt: "Pitam, ali ne odgovara odmah.", parts: 3, correct: ["pitam", "ali ne odgovara", "odmah"] },
          { prompt: "Ti i ja smo par.", parts: 3, correct: ["ti", "i ja smo", "par"] },
        ],
      },
      {
        quizId: "kviz2",
        order: 7,
        type: "multi-select",
        id: "q6",
        question: "Koje su rečenice pogrešno podijeljene na govorne riječi?",
        options: [
          "Priča se | da puno | uči.",
          "Ja | i ti, | kao | pas | i mačka.",
          "On pa | ja.",
          "Ne želim | još trčati | kraj mora.",
          "Ne, | nije me | ni pozdravio.",
          "I ja sam | pročitao.",
          "Nije ju ni | pozdravila.",
        ],
        correct: ["On pa | ja.", "Ne želim | još trčati | kraj mora.", "Nije ju ni | pozdravila."],
        lamp: "U rastavljanju riječi na nenaglasnice, klitike, važno je upamtiti da su prilozi naglasnice (kao, još) te da je negacija pomoćnih glagola naglasnica, tonička riječ (nisam, neću i sl.).",
      },
      {
        quizId: "kviz2",
        order: 8,
        type: "multi-select",
        id: "q7",
        question: "Odaberite kategorije riječi koje su najčešće prednaglasnice:",
        options: [
          "jednosložni prijedlozi",
          "veznici",
          "nenaglašeni oblici zamjenica",
          "nenaglašeni oblici glagola biti i htjeti",
          "<em>čestica ne</em>",
          "<em>čestica li</em>",
        ],
        correct: ["jednosložni prijedlozi", "veznici", "<em>čestica ne</em>"],
        lamp: "Sve nenaglasnice mogu biti naglašene kada želimo što istaknuti jer tada imaju rečenični naglasak (tj. pojačan izgovor u rečenici jer je ta riječ važna za razumijevanje poruke): Lì je čèstica. Àko ôn i nè bi dòšao, tí bì. Kàvu bèz šèćera, mòlìm. Enklitike su: ćû, ćêš, ćê/ćê, ćêmo, ćête, ćê/ćê.",
      },
      {
        quizId: "kviz2",
        order: 9,
        type: "multi-select",
        id: "q8",
        question: "Odaberite od ponuđenih riječi one koje mogu biti i naglasnice i nenaglasnice ovisno o kontekstu.",
        options: [
          "sunce", "joj", "sam", "bih", "li", "miš", "mu", "ja", "nj", "mi", "da", "se", "ti", "rt", "trava", "uh", "za", "ću", "ne", "on", "zar", "ćeš", "je", "pa", "kiša"
        ],
        correct: ["joj", "sam", "bih", "mu", "mi", "da", "ti", "ne", "je", "pa"],
        lamp: "Neke se riječi mogu javiti i kao naglasnice (toničke) i kao nenaglasnice (atoničke) ovisno o kontekstu: joj – uzvik i zamjenica, sam – zamjenički pridjev i nenaglašeni oblik glagola biti, bih – samostalni aorist i pomoćni glagol u kondicionalu, mu – uzvik i zamjenica, mi – nominativ i dativ zamjenice, da i pa – kao veznik u nekim priručnicima je klitika, a u nekima nije, a može biti i čestica, ti – nominativ i dativ zamjenice, ne – čestica pojačanoga poricanja i čestica uz glagol za negaciju; je – može biti i naglasnica ako dolazi bez glavnoga glagola u 3. licu jednine.",
      },
      {
        quizId: "kviz2",
        order: 10,
        type: "segment-input",
        id: "q9",
        question: "Razvrstajte nenaglasnice. U prvo polje upišite prednaglasnicu, a u drugo zanaglasnicu.",
        sentences: [
          { prompt: "Samo je prošao kraj njih.", parts: 2, correct: ["kraj", "je"], labels: ["Prednaglasnica", "Zanaglasnica"] },
          { prompt: "Nisu ih našli u kući.", parts: 2, correct: ["u", "ih"], labels: ["Prednaglasnica", "Zanaglasnica"] },
          { prompt: "Često smo u šumi.", parts: 2, correct: ["u", "smo"], labels: ["Prednaglasnica", "Zanaglasnica"] },
          { prompt: "To je za tri dana.", parts: 2, correct: ["za", "je"], labels: ["Prednaglasnica", "Zanaglasnica"] },
          { prompt: "Ići će sa mnom.", parts: 2, correct: ["sa", "će"], labels: ["Prednaglasnica", "Zanaglasnica"] },
          { prompt: "Razgovara sam sa sobom.", parts: 2, correct: ["sa", "sam"], labels: ["Prednaglasnica", "Zanaglasnica"] },
        ],
      },
            /* ================= Q10 ================= */
      {
        quizId: "kviz2",
        order: 11,
        type: "audio_pairs",
        id: "q10",
        question: "U kojem je primjeru svakog para naglasak pomaknut na proklitiku? (Poslušajte parove)",
        voices: [
          { label: "na more", audio: "/audio/z11_a.wav" },
          { label: "na more", audio: "/audio/z11_b.wav" },
          { label: "u grad", audio: "/audio/z12_a.wav" },
          { label: "u grad", audio: "/audio/z12_b.wav" },
          { label: "na vlak", audio: "/audio/z13_a.wav" },
          { label: "na vlak", audio: "/audio/z13_b.wav" },
          { label: "u dvoje", audio: "/audio/z14_a.wav" },
          { label: "u dvoje", audio: "/audio/z14_b.wav" },
        ],
        // točni su samo zapisi koji završavaju na _b
        correct: [
          "/audio/z11_b.wav",
          "/audio/z12_b.wav",
          "/audio/z13_b.wav",
          "/audio/z14_b.wav",
        ],
        lamp: "Naglasak je pomaknut na proklitiku u drugom primjeru svakog para.",
      },
      {
        quizId: "kviz2",
        order: 12,
        type: "audio_choice",
        id: "q11",
        question: "U kojim se govornim riječima može ostvariti pomicanje naglaska?",
        options: ["na ulici", "u petak", "za mene", "na krovu", "ne sjedim", "ne sjedam"],
        correct: ["na ulici", "za mene", "ne sjedam"],
        lamp: "U okviru govorne riječi pomiče se samo silazni naglasak.",
      },
      {
        quizId: "kviz2",
        order: 13,
        type: "audio_choice",
        id: "q12",
        question: "Poslušajte izgovor s pomicanjem naglaska. Odredite koje je oslabljeno.",
        voices: [
          { label: "Poslušaj izgovor", audio: "/audio/1-5-2.wav" },
        ],
        options: [
          "a) nà môre, ù gråd, nà vlåk, ù dvoje",
          "b) ù kući, nè znâm, nì jå",
        ],
        correct: "b) ù kući, nè znâm, nì jå",
        lamp: "Oslabljeno je ono pomicanje kada se na proklitici ostvaruje uzlazni naglasak.",
      },
      {
        quizId: "kviz2",
        order: 14,
        type: "multi-select",
        id: "q13",
        question: "Odredite gdje pomicanje naglaska nije obvezno u standardu.",
        options: [
          "Idemo na vlak.",
          "Stavi sve preda me.",
          "Razgovara sam sa sobom.",
          "Mislim da ga ne voli.",
          "Pitali su za njih.",
        ],
        correct: ["Idemo na vlak.", "Pitali su za njih."],
        lamp: "U standardu je danas obvezno samo na negaciju glagola, u instrumentalu zamjenice ja s prijedlogom sa, zatim uz oblike nenaglašenih oblika zamjenica poput: prèdà me, ùzà te, ùzà se, pòdà nj; zá me, ná te, ná se, pò nj, zà nj.",
      },
    ];

    const result = await QuizQuestion.insertMany(kviz);
    console.log("✔ KVIZ 2 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();