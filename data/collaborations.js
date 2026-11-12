/*
  COLLABORATIONS
  Partner institutions and networks shown on the Collaborations page, in the order listed.

    name   Institution name
    place  City and country
    work   One line on the shared work
    url    Optional website link
    contact  Optional collaborating researcher: { name, title, url, photo }
             Entries with a contact are shown as a wider card with the photo.
             Put photos in assets/img/collaborators/.
    links    Optional extra links: [ { text: "…", url: "…" } ]
*/
window.COLLABORATIONS = [
  {
    name: "Tarleton State University (TSU)",
    place: "Stephenville, Texas, United States",
    work: "Observing time on the Tarleton Observatory 0.8 m telescope and access to a computing server for data processing and analysis.",
    contact: {
      name: "Dr. Shaukat Goderya",
      title: "Professor & Planetarium Director",
      url: "https://faculty.tarleton.edu/goderya/",
      photo: "assets/img/collaborators/shaukat-goderya.jpg"
    },
    links: [
      { text: "Tarleton Observatory", url: "https://www.tarleton.edu/observatory/" }
    ]
  },
  {
    name: "Yunnan Astronomical Observatories, Chinese Academy of Sciences",
    place: "Kunming, China",
    work: "Ongoing research collaboration on the photometry and evolution of binary stars, continuing links from Dr. Zubairi’s doctoral research at the observatory."
  },
  {
    name: "American Association of Variable Star Observers (AAVSO)",
    url: "https://www.aavso.org",
    place: "Cambridge, Massachusetts, United States",
    work: "Collaboration and membership. AAVSO membership gives the group access, by observing proposal, to AAVSOnet, a worldwide network of robotic telescopes for multi-filter photometry of variable stars.",
    links: [
      { text: "AAVSOnet robotic telescope network", url: "https://www.aavso.org/aavsonet" }
    ]
  }
];

/*
  SUMMER RESEARCH SCHOOL ANNOUNCEMENTS
  Newest first. Each entry:
    date   "YYYY-MM-DD"
    title  Short headline
    text   One or two sentences
    url, linkText   Optional link, e.g. to a registration form
  Example:
    { date: "2027-03-01", title: "Registration open for Summer Research School 2027",
      text: "The school runs 5–9 July at IST. Apply by 15 April.",
      url: "https://forms.gle/…", linkText: "Register" }
*/
window.SUMMER_SCHOOL = {
  announcements: []
};
