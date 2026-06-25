export const portfolioData = {
  header: {
    name: "Vojtěch Stehlík",
    title: "Fullstack Vývojář & Softwarový Inženýr",
  },
  about: {
    text: "Mým cílem je doručovat kompletně dotažené projekty s důrazem na funkčnost, estetiku a otevřenou komunikaci. Rád se učím nové věci a pomáhám s celkovou realizací tak, aby byl výsledek pro klienta bez starostí a na co nejvyšší úrovni."
  },
  experience: [
    {
      id: 1,
      period: "5/2025 - 6/2026",
      company: "ServerZone, s.r.o.",
      role: "Fullstack Developer",
      description: "Tvorba REST API systémů převážně v jazyce PHP, návrh databázových schémat, řešení problému vyhledávání chráněného obsahu v audiovizuálních materiálech, práce na unixových systémech."
    }
  ],
  education: [
    {
      id: 1,
      period: "9/2022 - 6/2026",
      school: "FIT ČVUT",
      degree: "Obor: Softwarové inženýrství",
      title: "Dosažený titul: Bc.",
      subjects: [
        { abbr: "SWI", name: "Softwarové inženýrství", desc: "Návrh, modelování a řízení vývoje softwarových systémů" },
        { abbr: "KAB", name: "Kryptografie a bezpečnost", desc: "Základy šifrování, síťové bezpečnosti a ochrana dat" },
        { abbr: "IDO", name: "Úvod do Dev Ops", desc: "Základy DevOps praktik a nástrojů (Docker, Kubernetes, CI/CD)" },
        { abbr: "PA1", name: "Programování a algoritmizace 1", desc: "Programování v C" },
        { abbr: "PA2", name: "Programování a algoritmizace 2", desc: "Programování v C++" },
        { abbr: "TJV", name: "Technologie v Javě", desc: "Široké zaměření na Spring Boot" },
        { abbr: "PJV", name: "Programování v Javě", desc: "Programování v jazyce Java" },
        { abbr: "KOM", name: "Konceptuální modelování", desc: "Návrh konceptuálních a databázových modelů" },
        { abbr: "GIT", name: "Systém Git", desc: "Pokročilá správa verzí a týmová spolupráce" },
        { abbr: "AG1", name: "Algoritmy a grafy 1", desc: "Teoretická informatika, algoritmy, grafy, dynamické programování" },
        { abbr: "UOS", name: "Úvod do operačních systémů", desc: "Spíše práce s Linuxem a principy OS" },
        { abbr: "CS", name: "C# a .NET", desc: "Programování v C# a platforma .NET" },
        { abbr: "PHP", name: "Webové aplikace", desc: "Tvorba backendu a dynamických webových systémů v PHP" },
        { abbr: "KOT", name: "Vývoj v Kotlinu", desc: "Programování v jazyce Kotlin" }
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Bandportal.cz",
      description: "Kompletní platforma pro hudebníky a umělce, pro pořádání akcí. Jako technologický stack jsem zvolil kombinaci frameworků Ktor (Kotlin) + React (Type Script). Pro data byla zvolena databáze PostgreSQL.",
      technologies: ["React", "Kotlin", "Ktor", "Type Script", "Docker", "REST API", "OAuth", "UX"],
      image: "/project1.png",
      link: "https://bandportal.cz/"
    },
    {
      id: 2,
      title: "Content Id",
      description: "Návrh řešení pro detekci chráněného obsahu v audiovizuálních dílech. Projekt zahrnoval návrh algoritmu pro rychlé vyhledání podobných videí k danému vzorku, ale i řešení ukládání výsledků, nebo práci s RabbitMQ pro rozložení zátěže na více serverů.",
      technologies: ["PHP", "pgvector", "ffmpeg", "MySQL", "RabbitMQ"],
      image: "/project2.jpg",
      link: null
    },
    {
      id: 3,
      title: "Kapelní web 1vishmusic.com",
      description: "Jeden z menších projektů, moderní responzibilní webové stránky pro kapelu 1VISH.",
      technologies: ["Vue.js", "Type Script", "Kotlin"],
      image: "/project3.jpg",
      link: "https://1vishmusic.com/"
    }
  ],
  skills: [
    "Kotlin", "Java", "Spring Boot", "React", "PHP", "SQL", "HTML", "Graphic Design"
  ],
  services: [
    {
      id: 1,
      title: "Webový Vývoj",
      description: "Tvorba moderních, rychlých a responzivních webových aplikací na míru, od návrhu REST API a databáze až po vyladěný frontend."
    },
    {
      id: 2,
      title: "Fotografie",
      description: "Profesionální focení portrétů, produktů nebo událostí. Zachycení jedinečné atmosféry a emocí skrz objektiv."
    }
  ],
  contact: {
    email: "stehliik.vojtech@gmail.com",
    linkedin: "https://linkedin.com/",
    github: "https://github.com/VixikHD/"
  }
};
