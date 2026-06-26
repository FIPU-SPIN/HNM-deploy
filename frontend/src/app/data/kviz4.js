const kviz4 = [
    {
      type: "intro",
      title: "Naglasni inventar",
      image: "/assets/images/Inventar.png",
    },

    /* --- 1. --- */ 
    {
        type: "audio",
        title: "Poslušajte ponuđene riječi i odaberite one koje imaju kratki naglasak.",
        id: "q1a",
        voices: ["máčak", "mȁčka", "mȃjka", "măndărínă"],
    },

    {
        type: "multi-select",
        id: "q1b",
        question: "Koje riječi imaju kratki naglasak?",
        options: ["máčak", "mȁčka", "mȃjka", "măndărínă"],
        correct: [1],
    },


    /* --- 2. --- */ 
  
    {
        type: "match",
        id: "q2",
        question: "Povežite naglašenu riječ s vrstom naglaska.",
        left: ["kȉša", "sȗnce", "tráva", "ròsa"],
        right: [
            "kratkouzlazni",
            "dugouzlazni",
            "kratkosilazni",
            "dugosilazni"
        ],
        correct: {
            0: 2,
            1: 3,
            2: 1,
            3: 0
        }
    },

    /* --- 3. ---*/ 

    {
        type: "match",
        id: "q3",
        question: "Povežite ustaljene znakove za naglaske s nazivljem.",

        left: [
            "kratkosilazni naglasak",
            "udarni naglasak",
            "dugosilazni naglasak",
            "dugouzlazni naglasak",
            "kratkouzlazni naglasak",
            "prednaglasna dužina",
            "zanaglasna dužina",
            "akut",
            "kračina"
        ],

        right: [
            "ȃ",
            "á",
            "a̍",
            "à",
            "ȁ",
            "ã",
            "ă",
            "ȁā",
            "āȁ"
        ],

        correct: {
            0: 4, // kratkosilazni → ȁ
            1: 2, // udarni → a̍
            2: 0, // dugosilazni → ȃ
            3: 1, // dugouzlazni → á
            4: 3, // kratkouzlazni → à
            5: 8, // prednaglasna dužina → āȁ
            6: 7, // zanaglasna dužina → ȁā
            7: 5, // akut → ã
            8: 6  // kračina → ă
        }
        },

    /* --- 4. --- */ 
    {
        type: "select",
        id: "q4",
        question:
            "Koji je točan način obilježavanja IPA znakovljem kod sljedećih riječi (màšta, vȁtra, láva, bȃjka)?",

        options: [
            "mâšta / vâtra / lâva / bâjka",
            "măšta / vătra / lăva / băjka",
            "mâ:šta / vâ:tra / lâ:va / bâ:jka",
            "mă:šta / vă:tra / lă:va / bă:jka"
        ],

        correct: "mâ:šta / vâ:tra / lâ:va / bâ:jka"
    },

    /* --- 5. --- */ 
    {
        type: "multi-select",
        id: "q5",
        question: "Promotrite sliku i odredite koje su riječi, prema kretanju tona, izgovorene uzlaznim naglascima.",
        image: "/assets/images/Ton.png",
        options: ["more", "glava", "dobar", "danas"],
        correct: [1, 3]
    },

    /* --- 6. --- */ 
     {
        type: "multi-select",
        id: "q6",
        question: "Promotrite trajanje naglašenoga vokala na slici i odredite koje su riječi izgovorene dugim naglascima.",
        image: "/assets/images/Ton.png",
        options: ["more", "glava", "dobar", "danas"],
        correct: [0, 1]
    },

    /* --- 7. ---  */ 
    
      {
        type: "match",
        id: "q7",
        question: "Potražite riječ 'čovjek' kako je naglašena na Hrvatskome jezičnom portalu (HJP), a kako u Školskome rječniku hrvatskoga jezika (ŠRHJ) i povežite odgovore.",
        left: [
            "Hrvatski jezični portal (HJP)",
            "Školski rječnik hrvatskoga jezika (ŠRHJ)"
        ],
        right: [
            "čȍvjek",
            "čòvjek"
        ],
        correct: {
            0: 0, 
            1: 1 
        }
    },

    {
      type: "feedback",
      title: "🎉 Čestitamo! 🎉",
      message: "Uspješno ste riješili kviz!",
      details: "Vaši odgovori su pohranjeni. Hvala vam što ste sudjelovali u istraživanju naglasaka hrvatskoga jezika.",
      buttonText: "Pogledaj svoje odgovore",
    }
  ];

  export default kviz4;
