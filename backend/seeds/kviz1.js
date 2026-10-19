require("dotenv").config();

const mongoose = require("mongoose");
const QuizQuestion = require("../quiz_models");

async function run() {
  try {
    console.log("Spajanje na Mongo...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo spojen ✔");

    await QuizQuestion.deleteMany({ quizId: "kviz1" });
    console.log("Stari kviz obrisan");

    const kviz = [
      /* ================= INTRO ================= */
      {
        quizId: "kviz1",
        order: 1,
        type: "intro",
        title: "Koji je moj naglasni sustav?",
        image: "/assets/images/karta-narjecja.png",
        text: "Odredite narječje koje je obilježilo Vaš govor. Pronađite na karti mjesto Vašega najdužeg boravka i školovanja.",
        note: "čakavsko narječje = zelena boja; kajkavsko narječje = plava boja; štokavsko narječje = žuta boja",
      },

      /* ================= Q1A ================= */
      {
        quizId: "kviz1",
        order: 2,
        type: "select",
        id: "q1a",
        question:
          "Mjesto u kojemu sam najduže boravio/boravila pripada ______ narječju.",
        options: ["kajkavskom", "čakavskom", "štokavskom"],
        correct: null,
        lamp:
          "Kajkavsko – sjever, čakavsko – zapad i jug, štokavsko – istok i jug.",
      },

      /* ================= Q1B ================= */
      {
        quizId: "kviz1",
        order: 3,
        type: "select",
        id: "q1b",
        question:
          "Govor mojih roditelja/staratelja pripada ______ narječju.",
        options: ["istom", "različitom"],
        correct: null,
        lamp: "Ako je različito, Vaš naglasni sustav može biti mješovit.",
      },

      /* ================= Q2 ================= */
      {
        quizId: "kviz1",
        order: 4,
        type: "select",
        id: "q2",
        question:
          "Moje mjesto najdužega boravka pripada _________________ regiji.",
        options: ["zapadnoj", "sjevernoj", "južnoj", "istočnoj"],
        correct: null,
        lamp:
          "U zapadnoj regiji dominantno je čakavsko narječje te udarni naglasni sustav urbanih sredina i visinski naglasni sustav mjesnih govora. U sjevernoj regiji dominantno je kajkavsko narječje te udarni naglasni sustav urbanih sredina i visinski naglasni sustav mjesnih govora. U istočnoj regiji dominantno je štokavsko narječje te visinski naglasni sustav. U južnoj regiji dominantno je štokavsko narječje koje je u kontaktu s čakavskim te visinski naglasni sustav. Ovisno o podrijetlu Vaših roditelja ili staratelja, o migracijama tijekom života, o stupnju obrazovanja ili opsegu obrazovanja u smislu izgovorne norme, Vaš se naglasni sustav može dijelom i razlikovati od onoga koji je specifičan za regiju iz koje dolazite. Tada je Vaš polazni sustav miješani ili prijelazni.",
      },

      /* ================= Q3a ================= */
      {
        quizId: "kviz1",
        order: 5,
        type: "audio_select",
        id: "q3a",
        question:
          "Poslušajte rečenice Ponovo je zasjalo sunce. Nakon kiše pojavi se duga. Iz koje regije dolazi govornik 1?",
        voices: [{ label: "Poslušaj govornika 1", audio: "/audio/1-1-2a.wav" }],
        options: [
          "sjeverna Hrvatska",
          "zapadna Hrvatska",
          "južna Hrvatska",
          "istočna Hrvatska",
        ],
        correct: "zapadna Hrvatska",
        lamp: "Govornik 1 dolazi iz zapadne Hrvatske (Pula).",
      },

      /* ================= Q3b ================= */
      {
        quizId: "kviz1",
        order: 6,
        type: "audio_select",
        id: "q3b",
        question:
          "Poslušajte rečenice Ponovo je zasjalo sunce. Nakon kiše pojavi se duga. Iz koje regije dolazi govornik 2?",
        voices: [{ label: "Poslušaj govornika 2", audio: "/audio/1-1-2b.wav" }],
        options: [
          "sjeverna Hrvatska",
          "zapadna Hrvatska",
          "južna Hrvatska",
          "istočna Hrvatska",
        ],
        correct: "sjeverna Hrvatska",
        lamp: "Govornik 2 dolazi iz sjeverne Hrvatske (Zagreb).",
      },

      /* ================= Q3c ================= */
      {
        quizId: "kviz1",
        order: 7,
        type: "audio_select",
        id: "q3c",
        question:
          "Poslušajte rečenice Ponovo je zasjalo sunce. Nakon kiše pojavi se duga. Iz koje regije dolazi govornica 3?",
        voices: [{ label: "Poslušaj govornicu 3", audio: "/audio/1-1-2c.wav" }],
        options: [
          "sjeverna Hrvatska",
          "zapadna Hrvatska",
          "južna Hrvatska",
          "istočna Hrvatska",
        ],
        correct: "istočna Hrvatska",
        lamp: "Govornica 3 dolazi iz istočne Hrvatske (Osijek).",
      },

      /* ================= Q3d ================= */
      {
        quizId: "kviz1",
        order: 8,
        type: "audio_select",
        id: "q3d",
        question:
          "Poslušajte rečenice Ponovo je zasjalo sunce. Nakon kiše pojavi se duga. Iz koje regije dolazi govornica 4?",
        voices: [{ label: "Poslušaj govornicu 4", audio: "/audio/1-1-2d.wav" }],
        options: [
          "sjeverna Hrvatska",
          "zapadna Hrvatska",
          "južna Hrvatska",
          "istočna Hrvatska",
        ],
        correct: "južna Hrvatska",
        lamp:
          "Govornica 4 dolazi iz južne Hrvatske (Dubrovnik). Govornici iz Dubrovnika i Osijeka u govoru imaju četiri naglaska, a govornici iz Pule i Zagreba najčešće jedan.",
      },

      /* ================= Q4 ================= */
      {
        quizId: "kviz1",
        order: 9,
        type: "audio_select",
        id: "q4",
        question:
          "Je li Vaš govor, kada se trudite izgovarati standardno, sličniji govorniku 1 ili govorniku 2?",
        voices: [
          { label: "Govornik 1", audio: "/audio/1-1-4a.wav" },
          { label: "Govornik 2", audio: "/audio/1-1-4b.wav" },
        ],
        options: ["Govorniku 1", "Govorniku 2"],
        correct: null,
        lamp:
          "Prvi govornik, spiker, riječi je izgovorio standardno, s četiri naglaska i gdje je potrebno sa zanaglasnom dužinom. Drugi govornik, porijeklom iz Pule, riječi je izgovorio s jednim udarnim naglaskom, bez razlike u trajanju dugih i kratkih naglasaka, bez razlike u tonu uzlaznih i silaznih naglasaka te bez zanaglasne dužine. U nekim se riječima drugi govornik razlikuje od prvoga i po izgovoru mjesta naglaska.",
      },

      /* ================= Q5 ================= */
      {
        quizId: "kviz1",
        order: 10,
        type: "audio_select",
        id: "q5",
        question:
          "Poslušajte primjere i na sljedećoj stranici kviza odredite svoj naglasni sustav.",
        voices: [
          { label: "Primjer 1", audio: "/audio/1-1-2a.wav" },
          { label: "Primjer 2", audio: "/audio/1-1-2b.wav" },
          { label: "Primjer 3", audio: "/audio/1-1-2c.wav" },
          { label: "Primjer 4", audio: "/audio/1-1-2d.wav" },
        ],
        options: [],
      },

      /* ================= Q5.1 ================= */
      {
        quizId: "kviz1",
        order: 11,
        type: "select",
        id: "q5_1",
        question: "Moj je naglasni sustav __________.",
        options: ["udarni", "visinski", "miješani"],
        correct: null,
        lamp:
          "Na području štokavskoga narječja ostvaruje se primarno visinski naglasni sustav, a na području čakavskoga i kajkavskoga narječja visinski i udarni naglasni sustav. Kada analiziramo urbanolekte većih gradova na području čakavskoga narječja zapadne Hrvatske i na području kajkavskoga narječja, sjeverne Hrvatske, čujemo pretežito udarni naglasni sustav.",
      },

      /* ================= Q6 ================= */
      {
        quizId: "kviz1",
        order: 12,
        type: "audio_select",
        id: "q6",
        question:
          "Poslušajte izgovor rečenica Ovo je naglasni priručnik. Nakon kiše pojavi se duga. dviju govornica iz visinskoga naglasnog sustava i dviju govornica iz udarnoga sustava.",
        voices: [
          { label: "Osijek", audio: "/audio/1-1-5a.wav" },
          { label: "Split", audio: "/audio/1-1-5b.wav" },
          { label: "Rijeka", audio: "/audio/1-1-5c.wav" },
          { label: "Pula", audio: "/audio/1-1-5d.wav" },
        ],
        options: [],
      },

      /* ================= Q6.1 ================= */
      {
        quizId: "kviz1",
        order: 13,
        type: "multi-select",
        id: "q6_1",
        question: "U kojim se gradovima govori visinskim naglasnim sustavom?",
        options: ["Osijek", "Split", "Rijeka", "Pula"],
        correct: ["Osijek", "Split"],
        lamp:
          "U govoru govornica iz Osijeka i Splita čuju se uzlazni naglasci, primjerice u riječima priručnik i duga, a kod govornica iz Rijeke i Pule sve su riječi izgovorene jednim, udarnim naglaskom. Ako ste prethodno odgovorili da je Vaš naglasni sustav udarni, tada je Vaš izgovor sličniji govornicama iz Rijeke i Pule, a ako ste odgovorili da je Vaš izgovor visinski, tada je Vaš izgovor sličniji govornicama iz Osijeka ili Splita s obzirom na naglasak riječi.",
      },

      /* ================= Q7 ================= */
      {
        quizId: "kviz1",
        order: 14,
        type: "audio_select",
        id: "q7",
        question: "Poslušajte tri izgovora iste rečenice.",
        voices: [
          { label: "Izgovor 1", audio: "/audio/1-1-6a.wav" },
          { label: "Izgovor 2", audio: "/audio/1-1-6b.wav" },
          { label: "Izgovor 3", audio: "/audio/1-1-6c.wav" },
        ],
        options: [],
      },

      /* ================= Q7.1 ================= */
      {
        quizId: "kviz1",
        order: 15,
        type: "select",
        id: "q7_1",
        question:
          "Koji od triju izgovora smatrate 'običnim', 'češćim'?",
        options: ["1", "2", "3"],
        correct: "2",
        lamp:
          "Sve rečenice u prethodnoj vježbi izgovorila je spikerica. Izgovor 1 oprimjeruje govor s naglascima i dužinama koji su propisani u normativnim priručnicima te ilustrira visoki varijetet. Izgovor 2 oprimjeruje govor s ponešto izmijenjenim raspodjelnim pravilima i gotovo dokinutom zanaglasnom dužinom te ilustrira neutralni (prihvatljiv i prihvaćen) varijetet. Izgovor 3 oprimjeruje govor s udarnim naglaskom i mjestima naglaska kojima ilustriramo niski varijetet. I Vaš će se izgovor vjerojatno razlikovati ovisno o komunikacijskoj situaciji, mjestu na kojemu govorite. Izgovor 2 smatra se neutralnijim, običnijim standardom, s obzirom na mjesto naglaska, u sociofonetskim istraživanjima.",
      },

      /* ================= Q7.2 ================= */
      {
        quizId: "kviz1",
        order: 16,
        type: "select",
        id: "q7_2",
        question:
          "Koji izgovor percipirate kao 'visoki stil', 'naučen', 'akademski'?",
        options: ["1", "2", "3"],
        correct: "1",
        lamp:
          "Iako se Izgovor 1 smatra visokim i biranijim stilom, mnoga ga danas doživljavaju zastarjelim ili regionalno obilježenim (ovisno o podrijetlu i dobi onoga tko procjenjuje izgovore). Ovaj bi izgovor mogao biti najbliži onima iz južne regije (zbog izgovora posuđenice televizija).",
      },

      /* ================= Q7.3 ================= */
      {
        quizId: "kviz1",
        order: 17,
        type: "select",
        id: "q7_3",
        question: "Koji izgovor smatrate 'razgovornim', 'zagrebačkim'?",
        options: ["1", "2", "3"],
        correct: "3",
        lamp:
          "Ako ste takvim procijenili izgovor 3, to znači da ste tijekom školovanja stekli temeljna znanja o značajkama standardnoga izgovora te da možete prepoznavati izgovor koji nije normiran.",
      },

      /* ================= Q7.4 ================= */
      {
        quizId: "kviz1",
        order: 18,
        type: "select",
        id: "q7_4",
        question: "Je li Vaš govor sličniji prvom, drugom ili trećem izgovoru?",
        options: ["1", "2", "3"],
        correct: null,
        lamp:
          "Ako je Vaš govor najsličniji izgovoru 3, ponovno ste potvrdili da je Vaš naglasni sustav udarni, a ako je Vaš odgovor izgovor 1 ili 2, potvrdili ste da je Vaš naglasni sustav visinski ili miješani/prijelazni. Za detaljniju analizu Vašega naglasnog sutava potrebno je testirati i percepciju (izgovor), a to činimo naknadno, u aplikaciji Izgovaram.",
      },
    ];

    const result = await QuizQuestion.insertMany(kviz);
    console.log("✔ KVIZ 1 UBACEN:", result.length, "pitanja");
  } catch (err) {
    console.error("Greška:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Mongo connection closed");
  }
}

run();