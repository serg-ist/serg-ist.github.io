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
