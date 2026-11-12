/*
  SOFTWARE AND PIPELINES
  Tools developed by group members, shown on the Software page in the order listed.
  To add one, copy a { ... } block and edit it:

    name         Name of the tool
    repo         Link to its GitHub repository
    summary      One or two sentences on what it does
    features     Short list of what it can do (4–8 items)
    stack        Main language and libraries, as one line
    license      e.g. "MIT"
    developers   Names in order
    screenshot   Optional image in assets/img/software/ (about 1400 px wide, JPG)
*/
window.SOFTWARE = [
  {
    name: "TESS Stellar Analysis Suite",
    repo: "https://github.com/Jiqbal-astro/tess-stellar-analysis-suite",
    summary: "A desktop application that retrieves TESS light curves from a TIC ID and takes them through a complete first-pass time-series analysis, from light-curve extraction with eleanor to periodograms, transit screening, flare detection and export.",
    features: [
      "TESS light curves from a TIC ID, for one or all sectors",
      "Detrending, quality filtering and sigma clipping",
      "Lomb–Scargle periodograms with false-alarm probabilities",
      "BLS transit screening with an odd/even depth test",
      "Phase folding, linked to the BLS result",
      "Flare detection with amplitudes, durations and equivalent durations",
      "Stellar rotation and activity analysis",
      "Export to CSV, FITS, JSON and publication-ready plots"
    ],
    stack: "Python 3.11, Tkinter, eleanor, Lightkurve",
    license: "MIT",
    developers: ["Javed Iqbal", "Dr. Ahmed Waqas Zubairi", "Dr. Shaukat Goderya"],
    screenshot: "assets/img/software/tess-stellar-analysis-suite.jpg"
  }
];
