const kviz2 = [
    {
  type: "intro",
  title: "Moja govorna riječ",
  image: "/assets/images/kviz_govorna.png",
  text: "U ovom kvizu istražujemo govorne riječi, naglaske i klitike kroz praktične primjere."
},

      
    /* --- 1. --- */ 
    {
      type: "info",
      title: "Izgovorite sljedeću rečenicu naglas i odgonetnite s koliko ste je naglasaka izgovorili?",
      id: "q1",
      text:"Ne da mi se nositi kišobran u školu",
      lamp: "Rečenica se čita s četiri naglaska, tj. četiri su sloga istaknuta pri njezinu izgovoru: Ne da mi se nositi kišobran u školu. ili Ne da mi se nositi kišobran u školu. Iz toga proizlazi da u govoru nije svaka pisana riječ naglašena.",
    },


    /* --- 2. --- */ 
    {
      type: "select",
      id: "q2",
      question:
        " Kako se nazivaju sve riječi bez naglaska?",
      options: ["klitike", "enklitike", "proklitike"],
        },


    /* --- 3. --- */ 
    {
        type: "segment-input",
        id: "q3",
        question: "Odvojite govorne riječi s prednaglasnicama (proklitikama).",
        sentences: [
        {
        prompt: "Sova sjedi na grani.",
        parts: 3
        },
        {
        prompt: "Gledaju ježa kraj puta.",
        parts: 3
        },
        {
        prompt: "Idem onamo umjesto njega.",
        parts: 3
        },
        {
        prompt: "Nije ispunio ni to obećanje.",
        parts: 4
        },
        {
        prompt: "Ne putujem često.",
        parts: 2
        }
    ]
    },


    /* --- 4. --- */ 
    {
        type: "segment-input",
        id: "q4",
        question: "Odvojite govorne riječi sa zanaglasnicama (enklitikama).",
        sentences: [
            {
            prompt: "Molim te, nemoj kasniti.",
            parts: 3
            },
            {
            prompt: "Nisam Vas prepoznao.",
            parts: 2
            },
            {
            prompt: "Čitao sam knjigu.",
            parts: 2
            },
            {
            prompt: "Spavao bih danas duže.",
            parts: 3
            },
            {
            prompt: "Hoćeš li kolač?",
            parts: 2
            }
        ]
        
    },


    /* --- 5. --- */
        {
            type: "segment-input",
            id: "q5",
            question: "Odvojite govorne riječi sa zanaglasnicama (enklitikama) i prednaglasnicama (proklitikama).",
            sentences: [
                {
                prompt: "Pogledao me i nasmiješio se.",
                parts: 3
                },
                {
                prompt: "Rekao je da stiže.",
                parts: 2
                },
                {
                prompt: "Reče da će doći.",
                parts: 2
                },
                {
                prompt: "Pitam, ali ne odgovara.",
                parts: 2
                },
                {
                prompt: "Ti i ja smo kao pas i mačka.",
                parts: 5
                }
            ]
        },


    /* --- 6. --- */
        {
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
                "Nije ju | pozdravila."
            ],
            correct: [2, 3, 6],
            lamp: "U rastavljanju riječi na nenaglasnice, klitike, važno je upamtiti da su prilozi naglasnice (kao, još) te da je negacija pomoćnih glagola naglasnica, tonička riječ (nisam, neću i sl.)",
        },

    
    /* --- 7. --- */
        
        {
            type: "multi-select",
            id: "q7",
            question: "Zaokružite kategorije riječi koje su najčešće prednaglasnice:",
            options: [
                "a) jednosložni prijedlozi",
                "b) veznici",
                "c) zamjenice",
                "d) glagolski oblici",
                "e) čestica ne",
                "f) čestica li"
            ],
            correct: [0, 1, 4],
            lamp: "Sve nenaglasnice mogu biti naglašene kada želimo što istaknuti jer tada imaju rečenični naglasak (tj. pojačan izgovor u rečenici jer je ta riječ važna za razumijevanje poruke): Lȉ je čèstica. Ȁko ȏn i nè bi dòšao, tȋ bȉ. Kàvu bȅz šèćera, mȍlīm. Enklìtike su: ćȕ, ćȅš, ćȅ/ćȇ, ćȅmo, ćȅte, ćȅ/ćȇ.",
            },
            
        
    /* --- 8. --- */
        {
            type: "group-sort",
            id: "q8",
            question: "Razvrstajte riječi u skupine",
            groups: {
                a: "Naglasnice",
                b: "Nenaglasnice",
                c: "Ovisno o kontekstu"
            },
            items: [
                "sunce","joj","sam","bih","li","miš","mu","ja","nj","mi",
                "da","se","ti","rt","trava","uh","za","ću","ne","on","zar",
                "ćeš","je","pa","kiša"
            ]
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

  export default kviz2;
