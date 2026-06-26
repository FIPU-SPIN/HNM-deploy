const kviz3 = [
  {
    type: "intro",
    title: "Naglasci u paradigmi",
    image: "/assets/images/Naglasci_u_paradigmi.png",
  },

  /* --- 1 --- */
  {
    type: "select",
    id: "q1",
    question:
      "Što se promijenilo u naglasku u deklinaciji imenice stȏl - stòla - stòlovi?",
    options: ["ton", "trajanje", "ton i trajanje", "mjesto"],
    correct: "ton i trajanje",
  },

  /* --- 2 --- */
  {
    type: "select",
    id: "q2",
    question:
      "Poslušajte izgovor imenice vrijeme, usporedite znakovlje u oblicima te odredite što se promijenilo u paradigmi. Zvuk 1.6.1.",
    text: "Mislim na vrijéme. Nemam vrȅmena. Druga su vremèna.",
    options: ["ton i trajanje", "mjesto i trajanje", "mjesto, ton i trajanje"],
    correct: "mjesto, ton i trajanje",
  },

  /* --- 3 --- */
  {
    type: "multi-select",
    id: "q3",
    question:
      "Poslušajte imenice novac i ljubav u različitim oblicima te odredite je li riječ o promjenljivome ili nepromjenljivome tipu.",
    options: [
      "novac – promjenljivi tip",
      "novac – nepromjenljivi tip",
      "ljubav – promjenljivi tip",
      "ljubav – nepromjenljivi tip"
    ],
    correct: [0, 3]
  },

  /* --- 4 --- */
  {
    type: "input",
    id: "q4",
    question:
      "Poslušajte izgovor rečenica. Ispišite riječi za koje smatrate da su izgovorene s hiperkorektnim naglaskom. Zvuk 1.6.3.",
    text:
      "Nemoj mu otvoriti vrata.\nZapuhao je snažan vjetar.\nBrod se nasukao na stijene.\nNije nas zanimala povijest.",
    lamp: "Hiperkorektni naglasci najčešće nastaju na korpusu glagola, a događaju se kod onih govornika koji nisu potpuno svladali standardnu normu pa analogijom pomiču i uzlazne naglaske u paradigmi. Takvi se ostvaraji smatraju pogreškom. ",
    },

  /* --- 5 --- */
    {
    type: "multi-select",
    id: "q5",
    question:
      "U kojim se oblicima glagola može ostvariti pomicanje dodavanjem prefiksa?",
    options: ["pȋšēm", "písati", "píši", "písao", "pȋsan"],
    correct: [0, 4],
    lamp:"Na prefiks se pomiču samo silazni naglasci, dugosilazni, iza kojega ostaje zanaglasna dužina, i kratkosilazni.",
  },

  /* --- 6 --- */
  {
    type: "select",
    id: "q6",
    question:
      "Prema pravilu metatonije odredite koji se naglasak ostvaruje na prethodnom slogu u (primjerice u riječima asistȅnt, dekȃn):",
    options: ["kratkouzlazni", "dugouzlazni"],
    correct: "kratkouzlazni"
  },

  /* --- 7 --- */
  {
    type: "select",
    id: "q7",
    question:
      "Prema pravilu metatonije odredite koji se naglasak ostvarujem pomicanjem na mjesto prednaglasne dužine (primjerice u riječima trāvȁ, rūkȁ):",
    options: ["kratkouzlazni", "dugouzlazni"],
    correct: "dugouzlazni"
  },

  /* --- 8 --- */
  {
    type: "multi-select",
    id: "q8",
    question:
      "U kojim riječima ostaje zanaglasna dužina pomicanjem silaznih naglasaka?",
    options: [
      "asistȅnt",
      "dekȃn",
      "kolȃč",
      "minȉstar",
      "naprȁviti"
    ],
    correct: [1, 2]
  },

  /* --- feedback --- */
  {
        type: "feedback",
        title: "🎉 Čestitamo! 🎉",
        message: "Uspješno ste riješili kviz!",
        details: "Vaši odgovori su pohranjeni. Hvala vam što ste sudjelovali u istraživanju naglasaka hrvatskoga jezika.",
        buttonText: "Pogledaj svoje odgovore",
  }
];

export default kviz3;