/*
  PUBLICATIONS
  Each { ... } block is one paper. The page sorts them by year automatically,
  so new papers can be added anywhere in the list.

    year      Publication year (number, no quotes)
    title     Paper title
    authors   List of authors in the published order
    journal   Journal name, or "arXiv preprint"
    volume, article, pages   Optional; use whichever the journal gives
    doi       DOI only, without "https://doi.org/"  e.g. "10.1016/j.newast.2024.102250"
    arxiv     arXiv ID only, e.g. "2406.05664"
    ads       NASA ADS bibcode, e.g. "2024NewA..11102250Z"
    url       Optional publisher page, when there is no DOI
    ssrn      Optional SSRN preprint ID, e.g. "4399219" (shown as a link, not a separate entry)
    pdf       Optional link to a PDF you are allowed to share
    type      "Journal article", "Preprint", "Conference proceedings", "Thesis", …

  The entries below follow Dr. Zubairi's Google Scholar profile and were checked
  against the journals, NASA ADS and arXiv. SSRN preprints of published papers are
  attached to the published entry with `ssrn` rather than listed twice.
*/
window.PUBLICATIONS = [
  {
    year: 2024,
    title: "A photometric study of a total-eclipse contact binary V458 Mon",
    authors: ["Ahmed Waqas Zubairi", "Ergang Zhao", "Jiajia He", "Fuxing Li", "Liying Zhu", "Azizbek Matekov"],
    journal: "New Astronomy",
    volume: "111",
    article: "102250",
    doi: "10.1016/j.newast.2024.102250",
    ads: "2024NewA..11102250Z",
    ssrn: "4810990",
    type: "Journal article"
  },
  {
    year: 2024,
    title: "Multi-color and TESS photometric investigation of four low mass-ratio contact binary systems",
    authors: ["Ahmed Waqas Zubairi", "Ergang Zhao", "Shengbang Qian", "Xiao Zhou", "Eduardo Fernández-Lajús"],
    journal: "arXiv preprint",
    arxiv: "2406.05664",
    type: "Preprint"
  },
  {
    year: 2024,
    title: "Photometric search for short-period Jupiter-size exoplanets in open clusters NGC 884 and NGC 869",
    authors: ["Javed Iqbal", "Shaukat Goderya", "Fazeel Mahmood Khan"],
    journal: "Open European Journal on Variable Stars",
    article: "0256",
    doi: "10.5817/OEJV2024-0256",
    pdf: "https://oejv.physics.muni.cz/issues/oejv_0256.pdf",
    type: "Journal article"
  },
  {
    year: 2023,
    title: "Long-term photometric behavior and orbital period variations in the supersoft X-ray source V617 Sgr",
    authors: ["Lei Zang", "Ergang Zhao", "Eduardo Fernández-Lajús", "Ahmed Waqas Zubairi", "Nopphadon Sarotsakulchai"],
    journal: "New Astronomy",
    volume: "103",
    article: "102054",
    url: "https://linkinghub.elsevier.com/retrieve/pii/S1384107623000556",
    ssrn: "4399219",
    type: "Journal article"
  },
  {
    year: 2023,
    title: "A study of ten early-type contact binary stars in the Small Magellanic Cloud",
    authors: ["Chu-Qi Wu", "Fu-Xing Li", "Sheng-Bang Qian", "Jia Zhang", "Nopphadon Sarotsakulchai", "Ahmed Waqas Zubairi", "Azizbek Matekov"],
    journal: "Publications of the Astronomical Society of the Pacific",
    volume: "135",
    article: "094202",
    doi: "10.1088/1538-3873/acf8f9",
    type: "Journal article"
  },
  {
    year: 2023,
    title: "BVRcIc light curves, period and spectroscopic study of a low mass-ratio contact binary HV Aqr",
    authors: ["Ahmed Waqas Zubairi", "Xiao Zhou", "Eduardo Fernández Lajús", "Liying Zhu", "Wenping Liao", "Boonrucksar Soonthornthum", "Bin Zhang", "Nopphadon Sarotsakulchai"],
    journal: "New Astronomy",
    volume: "100",
    article: "101989",
    ads: "2023NewA..10001989Z",
    type: "Journal article"
  },
  {
    year: 2019,
    title: "Photometric study of contact binary star MW And",
    authors: ["Ahmed Waqas Zubairi", "Shaukat Goderya", "Fazeel Mahmood Khan"],
    journal: "New Astronomy",
    volume: "66",
    pages: "68–73",
    doi: "10.1016/j.newast.2018.08.002",
    arxiv: "1808.06585",
    type: "Journal article"
  }
];

/*
  CONFERENCE PRESENTATIONS AND POSTERS
  Shown in their own section on the Publications page, newest first.
  The section stays hidden until this list has at least one entry.

    year      Year of the conference (number, no quotes)
    title     Title of the poster or talk
    authors   Authors in order, as for papers
    event     Conference or meeting name
    location  City, country (or "Online")
    date      Optional, e.g. "15–19 July 2025"
    type      "Poster", "Oral talk" or "Invited talk"
    pdf       Optional poster PDF, e.g. "assets/posters/iqbal-2025-poster.pdf"
              (upload the PDF into assets/posters/ first)
    url       Optional link to the conference page or abstract
    links     Optional extra links: [ { text: "…", url: "…" } ]

  Example (copy, remove the // at the start of each line, and edit):
  // {
  //   year: 2025,
  //   title: "Flares on rapidly rotating M dwarfs in young open clusters",
  //   authors: ["Javed Iqbal", "Ahmed Waqas Zubairi"],
  //   event: "Name of the conference",
  //   location: "Islamabad, Pakistan",
  //   date: "15–19 July 2025",
  //   type: "Poster",
  //   pdf: "assets/posters/iqbal-2025-poster.pdf",
  //   url: "https://conference-website"
  // },
*/
window.PRESENTATIONS = [
  {
    year: 2026,
    title: "AI-enabled open cluster membership analysis: integrating machine learning with Tarleton telescope data",
    authors: ["Shaukat Goderya", "Javed Iqbal"],
    event: "Texas A&M Artificial Intelligence Research and Innovation Meeting, Faculty AI Research Discovery Gallery",
    date: "5–6 October 2026",
    type: "Poster",
    pdf: "assets/posters/goderya-iqbal-2026-ai-cluster-membership-poster.pdf"
  },
  {
    year: 2024,
    title: "Photometry and transit modelling of exoplanet TOI 2109b",
    authors: ["Javed Iqbal", "Shaukat Goderya"],
    event: "2024 Sagan Summer Workshop, NASA Exoplanet Science Institute",
    location: "Caltech, Pasadena, United States",
    date: "22–26 July 2024",
    type: "Poster",
    pdf: "assets/posters/iqbal-2024-sagan-toi2109b-poster.pdf",
    url: "https://nexsci.caltech.edu/workshop/2024/",
    links: [
      { text: "Poster on the workshop website", url: "https://nexsci.caltech.edu/workshop/2024/posters/Poster_JavedIqbal_49.pdf" }
    ]
  },
  {
    year: 2024,
    title: "Determination of the parameters of open clusters NGC 884 and NGC 869 using Gaia EDR3",
    authors: ["Javed Iqbal", "Shaukat Goderya", "M. Yüksek"],
    event: "International Conference on Relativistic Astrophysics and Cosmology (ICRAC-2024)",
    location: "COMSATS University Islamabad, Lahore Campus, Pakistan",
    date: "1–2 February 2024",
    type: "Poster",
    pdf: "assets/posters/iqbal-2024-icrac-ngc884-ngc869-gaia-poster.pdf"
  }
];
