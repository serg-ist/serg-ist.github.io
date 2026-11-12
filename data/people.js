/*
  PEOPLE
  This file controls everything on the People page and the members row on the home page.

  `members` is one list of everyone in the group, shown four to a row in the order below
  (keep PhD students first, then MS, BS, then interns). To add a person, copy one { ... }
  block and edit it:
    name         Full name
    role         "PhD student", "MS student", "BS student" or "Research intern"
    affiliation  Optional second line, e.g. a home university for visiting interns
    area         One sentence on their research, about 15–25 words
    photo        e.g. "assets/img/people/full-name.jpg" (see the README in that folder).
                 Use "" if there is no photo yet; the site shows their initials instead.
    website      Optional personal page

  When someone graduates, move their entry to `alumni` and update their role,
  e.g. role: "MS 2026", affiliation: "Now PhD student at …".
*/
window.PEOPLE = {
  pi: {
    name: "Dr. Ahmed Waqas Zubairi",
    title: "Assistant Professor",
    role: "Principal investigator",
    institute: "Space Science Department, Institute of Space Technology, Islamabad",
    photo: "assets/img/people/ahmed-waqas-zubairi.jpg",
    email: "ahmed.zubairi@ist.edu.pk",
    bio: [
      "Dr. Ahmed Waqas Zubairi is Assistant Professor in the Space Science Department at the Institute of Space Technology, Islamabad, where he leads the Variable Stars and Exoplanet Astrophysics Research Group. He received his PhD from Yunnan Astronomical Observatories, University of Chinese Academy of Sciences, China.",
      "His research interests span photometric and spectroscopic data analysis of variable stars, with a particular focus on deep, low mass-ratio contact binaries.",
      "The group is extending this photometric expertise to transiting exoplanets, to flares on cool, magnetically active stars, and to machine learning for stellar cluster membership analysis."
    ],
    education: [
      "PhD, Yunnan Astronomical Observatories, Kunming, and University of Chinese Academy of Sciences, Beijing, China"
    ],
    specialisation: [
      "Photometry of eclipsing binary stars",
      "Variable stars",
      "Evolution of binary stellar systems"
    ]
  },

  members: [
    {
      name: "Adnan Ashraf",
      role: "PhD student",
      area: "Celestial mechanics and observational astronomy applied to the orbits of natural celestial bodies, building on a background in spacecraft astrodynamics.",
      photo: "assets/img/people/adnan-ashraf.jpg"
    },
    {
      name: "Javed Iqbal",
      role: "PhD student",
      area: "Exoplanet detection, atmospheric characterisation and habitability.",
      photo: "assets/img/people/javed-iqbal.jpg",
      website: "https://jiqbal-astro.github.io"
    },
    {
      name: "Ayesha Noor",
      role: "MS student",
      area: "Evolution of low mass-ratio contact binaries, using TESS light curves and PHOEBE modelling to derive their physical and orbital parameters.",
      photo: ""
    },
    {
      name: "Zainab Abbasi",
      role: "MS student",
      area: "Orbital period changes in eclipsing binaries, traced with TESS eclipse timings and O–C diagrams to reveal mass transfer, magnetic braking or third bodies.",
      photo: "assets/img/people/zainab-abbasi.jpg"
    },
    {
      name: "Syeda Naima Rizvi",
      role: "BS student",
      area: "Exoplanet detection, stellar and planetary characterisation, and machine learning for star-cluster analysis with Gaia data.",
      photo: "assets/img/people/syeda-naima-rizvi.jpg"
    },
    {
      name: "Hasnain Ahmad",
      role: "Research intern",
      affiliation: "M2 Space Sciences, University of Orléans, France",
      area: "Exoplanet characterisation, atmospheric spectroscopy and transit photometry, alongside Geant4 simulations of biosignatures at CEMHTI (CNRS).",
      photo: "assets/img/people/hasnain-ahmad.jpg"
    },
    {
      name: "Riza Siddiqui",
      role: "Research intern",
      affiliation: "MS Physics, NED University of Engineering and Technology, Karachi",
      area: "Flares on rapidly rotating M dwarfs in star clusters: the rotation–activity relation, supersaturation and convective structure.",
      photo: "assets/img/people/riza-siddiqui.jpg"
    }
  ],

  // Former members; the section appears automatically once this list has entries.
  alumni: []
};
