import { API_URL } from "@/app/lib/api";
const kviz1 = [
    {
      type: "intro",
      title: "Koji je moj naglasni sustav?",
      image: "/assets/images/karta-narjecja.png",
      text:
        "Odredite narječje koje je obilježilo Vaš govor. Pronađite na karti mjesto Vašega najdužega boravka i školovanja. Uzmite u obzir i podrijetlo roditelja/staratelja.",
      note:
        "Plava = čakavsko | Zelena = kajkavsko | Žuta = štokavsko",
    },

    /* --- 1. --- */ 
    {
      type: "select",
      id: "q1a",
      question:
        "Mjesto u kojemu sam najduže boravio/boravila pripada ______ narječju. ",
      options: ["kajkavskom", "čakavskom", "štokavskom"],
    },

    {
      type: "select",
      id: "q1b",
      question:
        "Govor mojih roditelja/staratelja pripada ______ narječju.",
      options: ["istom", "različitom"],
    },

    /* --- 2. --- */ 
    {
      type: "select",
      title: "Odredi regiju koja je obilježila Vaš govor. ",
      id: "q2",
      question:
        "Moje mjesto najdužega boravka pripada _________________ regiji.",
      options: ["zapadnoj", "sjevernoj", "južnoj", "istočnoj"],
      lamp: "Ovisno o podrijetlu roditelja/staratelja, migracijama i obrazovanju, Vaš se naglasni sustav može razlikovati od regionalnog. Tada je sustav miješani ili prijelazni.",
    },

    /* --- 3. ---*/ 
    {
      type: "audio",
      title: "Poslušajte rečenice Ponovo je zasjalo sunce. Nakon kiše pojavi se duga.",
      voices: ["govornik 1", "govornik 2", "govornica 3", "govornica 4"],
    },

    {
      type: "select",
      id: "q3",
      question:
        "Možete li prepoznati iz koje regije dolaze govornici?",
      options: ["sjeverna", "zapadna", "južna", "istočna"],
      lamp:
        "Govornici koje ste čuli u prethodnom primjeru pročitali su rečenice napisane na standardnom hrvatskom jeziku, a ipak čujemo da je govornik 1 iz zapadne Hrvatske, negdje s područja Istre (područje čakavskih dijalekata), da je govornik 2 iz središnje/sjeverne Hrvatske, iz Zagreba ili okolice (područje kajkavskih dijalekata), da je govornica 3 iz istočne Hrvatske, iz Osijeka (područje štokavskih dijalekata) i da je govornica 4 iz južne Hrvatske, iz Dalmacije (područje štokavskih i čakavskih dijalekata). Kod govornice 4 prema nekim govornim obilježjima možemo prepoznati ne samo širu regiju već i da potječe iz Dubrovnika. Govornici iz Dubrovnika i Osijeka u govoru imaju četiri naglaska, a govornici iz Pule i Zagreba najčešće jedan.",
    },

    /* --- 4. --- */ 
    {
      type: "audio",
      title: "Poslušajte izgovor riječi kiša, sunce, trava, rosa, pamtiti, napisati, mjesec, slikar, mornar, seljak kod dvaju govornika hrvatskoga jezika. Razmislite i odgovorite: je li Vaš govor, kada se trudite izgovarati standardno, sličniji govoru prvoga ili drugoga govornika?",
      voices: ["govornik 1", "govornik 2"],
    },

    {
      type: "select",
      id: "q4",
      question:
        "Moj je naglasni sustav sličniji ____________.",
      options: ["govorniku 1", "govorniku 2"],
      lamp:
        "Prvi govornik, spiker, riječi je izgovorio standardno, s četiri naglaska i gdje je potrebno sa zanaglasnom dužinom. Drugi govornik, porijeklom iz Pule, riječi je izgovorio s jednim udarnim naglaskom, bez razlike u trajanju dugih i kratkih naglasaka, bez razlike u tonu uzlaznih i silaznih naglasaka te bez zanaglasne dužine. U nekim se riječima drugi govornik razlikuje od prvoga i po izgovoru mjesta naglaska",
    },

    /* --- 5. --- */ 
    {
      type: "select",
      title: "Ako je Vaš izgovor sličniji prvome govorniku, vjerojatno je Vaš naglasni sustav VISINSKI, a ako je sličniji drugome, onda je Vaš naglasni sustav vjerojatno UDARNI. Postoje i sustavi u kojemu su značajke i jednoga i drugoga, nastale dodirom dvaju sustava (često migracijama govornika) pa se takav sustav ponegdje naziva prijelazni ili miješani.",
      id: "q5",
      question: "Moj je naglasni sustav __________.",
      options: ["udarni", "visinski", "miješani", "prijelazni"],
      lamp: "Na području štokavskoga narječja ostvaruje se primarno visinski naglasni sustav, a na području čakavskoga i kajkavskoga narječja visinski i udarni naglasni sustav. Kada analiziramo urbanolekte većih gradova na području čakavskoga narječja zapadne Hrvatske i na području kajkavskoga narječja sjeverne Hrvatske, čujemo pretežno udarni naglasni sustav.",
      
      zvukovi: [
        { label: "Primjer 1 (1-1-2a)", url: `${API_URL}/1-1-2a.wav` },
        { label: "Primjer 2 (1-1-2b)", url: `${API_URL}/1-1-2b.wav` },
        { label: "Primjer 3 (1-1-2c)", url: `${API_URL}/1-1-2c.wav` },
        { label: "Primjer 4 (1-1-2d)", url: `${API_URL}/1-1-2d.wav` }
      ]
    },

    /* --- 6. --- */ 
    {
      type: "audio",
      title: "Poslušajte izgovor rečenica Ovo je naglasni priručnik. \"Nakon kiše pojavi se duga.\" dviju govornica iz visinskoga naglasnog sustava i dviju govornica iz udarnoga sustava.",
      voices: ["govornica iz Osijeka", "govornica iz Splita", "govornica iz Rijeke", "govornica iz Pule"],
    },

    {
      type: "select",
      id: "q6",
      question:
        "Koji izgovor pripada visinskom naglasnom sustavu, tj. čuje se uzlazni ton (obratite pozornost na riječi priručnik i duga)?",
      options: ["Osijek", "Split", "Rijeka", "Pula"],
      lamp:
        "U govoru govornica iz Osijeka i Splita čuju se uzlazni naglasci, primjerice u riječima priručnik i duga, a kod govornica iz Rijeke i Pule sve su riječi izgovorene jednim, udarnim naglaskom. Ako ste prethodno odgovorili da je Vaš naglasni sustav udarni, tada je Vaš izgovor sličniji govornicama iz Rijeke i Pule, a ako ste odgovorili da je Vaš izgovor visinski, tada je Vaš izgovor sličniji govornicama iz Osijeka ili Splita s obzirom na naglasak riječi.",
    },

    /* --- 7. ---  */ 
    {
      type: "audio",
      title: "Poslušajte rečenicu Na Hrvatskoj televiziji govornik na dijalektu objašnjava recept kako napraviti dobar kolač. u tri različita izgovora. ",
      voices: ["izgovor 1", "izgovor 2", "izgovor 3"],
      lamp: "Sve rečenice u prethodnoj vježbi izgovorio je spiker. Izgovor 1 oprimjeruje govor s naglascima i dužinama koji su propisani u normativnim priručnicima te ilustrira visoki varijetet. Izgovor 2 oprimjeruje govor s ponešto izmijenjenim raspodjelnim pravilima i gotovo dokinutom zanaglasnom dužinom te ilustrira neutralni (prihvatljiv i prihvaćen) varijetet. Izgovor 3 oprimjeruje govor s udarnim naglaskom i mjestima naglaska kojima ilustriramo niski varijetet.",
    },
    
    {
      type: "select",
      id: "q7_1",
      question: "Koji od triju izgovora smatrate „običnim”, „češćim”?",
      options: ["1", "2", "3"],
      correct: "2",
      lamp: "Ovi primjeri ilustriraju varijetetnost standarda. I Vaš će se izgovor vjerojatno razlikovati ovisno o komunikacijskoj situaciji, mjestu na kojemu govorite. Izgovor 2 smatra se neutralnijim, običnijim standardom, s obzirom na mjesto naglaska, u sociofonetskim istraživanjima.",
    },
    {
      type: "select",
      id: "q7_2",
      question: "Koji izgovor percipirate kao „visoki stil”,„naučen”, „akademski”, „biraniji stil”?",
      options: ["1", "2", "3"],
      lamp:"Iako se Izgovor 1 smatra visokim i biranijim stilom, mnogi ga danas doživljaju zastarjelim ili regionalno obilježenim (ovisno o podrijetlu i dobi onoga tko procjenjuje izgovore). Ovaj bi izgovor mogao biti najbliži onima iz južne regije (zbog izgovora posuđenice televizija).",
    },
    {
      type: "select",
      id: "q7_3",
      question: "Koji izgovor smatrate „razgovornim”, „zagrebačkim” ili specifičnim za neki drugi lokalni govor, ali ne biste očekivali, primjerice, od nastavnika hrvatskoga jezika ili spikera na Hrvatskoj radioteleviziji da tako govore? ________?",
      options: ["1", "2", "3"],
      correct: "3",
      lamp:"Ako ste takvim procijenili izgovor 3, to znači da ste tijekom školovanja stekli temeljna znanja o značajkama standardnoga izgovora te da ih možete prepoznavati.",
    },
    {
      type: "select",
      id: "q7_4",
      question: "Je li Vaš govor sličniji prvom, drugom ili trećem izgovoru?",
      options: ["1", "2", "3"],
      lamp:"Ako je Vaš govor najsličniji izgovoru 3, ponovno ste potvrdili da je Vaš naglasni sustav udarni, a ako je Vaš odgovor izgovor 1 ili 2, potvrdili ste da je Vaš naglasni sustav visinski ili miješani/prijelazni. Za detaljniju analizu Vašega naglasnog sutava potrebno je testirati i percepciju (izgovor), a to činimo naknadno, u aplikaciji Izgovaram.",
    },

  ];

export default kviz1;
