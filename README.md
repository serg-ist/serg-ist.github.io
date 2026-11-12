# Star and Exoplanet Research Group (SERG) website

Website of the Star and Exoplanet Research Group (SERG), Institute of Space Technology, Islamabad, led by Dr. Ahmed Waqas Zubairi.

It is a plain HTML, CSS and JavaScript site with no build step, hosted free on GitHub Pages. Almost everything members need to change lives in the `data/` folder, so nobody has to touch the page layouts to add a student or a paper.

## Folder layout

```
index.html            Home
research.html         Research areas
people.html           PI, research group members, alumni
publications.html     Publication list with search
collaborations.html   Partner institutions
opportunities.html    Internships and supervision
summer-school.html    Summer Research School programme and announcements
contact.html          Contact form
404.html              "Page not found"
data/
  site.js             Group name, email, contact-form setting
  people.js           Everyone on the People page
  publications.js     Every paper on the Publications page
  collaborations.js   Partner institutions + Summer Research School announcements
assets/
  css/style.css       Colours, fonts, layout
  js/main.js          Displays the data (normally no need to edit)
  img/people/         Member photos (see the README inside)
```

## Publish on GitHub Pages

1. Create a GitHub account (or an organisation for the group, e.g. `serg-ist`) at github.com.
2. Create a new **public** repository. For the address `https://serg-ist.github.io/`, name the repository exactly `serg-ist.github.io`. Any other name gives an address like `https://serg-ist.github.io/website/`.
3. Upload the contents of this folder (not the folder itself) with **Add file → Upload files**, then **Commit changes**. `index.html` must sit at the top level of the repository.
4. Open **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, select branch **main** and folder **/ (root)**, and save.
5. After a minute or two the site address appears at the top of that Settings page.

Every later change you commit is published automatically within a few minutes.

To preview locally before uploading, double-click `index.html`; the site works straight from your computer.

## Everyday updates

All edits can be made in the browser: open the file on GitHub, click the pencil icon, edit, then **Commit changes**. Keep the quotation marks, commas and brackets exactly as in the existing entries; a missing comma is the most common reason a section stops showing.

**Add a student or intern.** Upload their photo into `assets/img/people/`, then copy an existing entry in `data/people.js` into the right list (`graduate`, `undergraduate`, `interns` or `alumni`) and fill in name, role, research area and photo path. Delete the example entries marked `placeholder: true` as real members are added.

**Add a publication.** Copy an entry in `data/publications.js` and fill it in. The list sorts itself by year. Add new members' surnames to `highlightAuthors` in `data/site.js` so their names appear in bold.

**Post a Summer Research School announcement.** Add an entry to `announcements` at the bottom of `data/collaborations.js`.

**Change the group name or contact email.** Edit `data/site.js`.

## Before going live: please check

- **Spelling of the professor's name.** The site uses *Ahmed* Waqas Zubairi, matching his published papers and Google Scholar. If he prefers *Ahmad*, search and replace it in `data/people.js` and `contact.html`.
- **Group name.** "Star and Exoplanet Research Group (SERG)" is the working name; change `groupName` in `data/site.js` and the text in the `<title>` tags if he prefers another.
- **Professor's photo.** Upload as `assets/img/people/ahmed-waqas-zubairi.jpg`.
- **Publications.** Four papers are included and were checked against NASA ADS, ScienceDirect and arXiv. Add the rest from Google Scholar.

## Contact form

GitHub Pages cannot send email by itself, so the form works in one of two ways.

**Without setup:** if only `email` is set in `data/site.js`, pressing *Send message* opens the visitor's own email app with the message filled in.

**With Formspree (recommended):** messages are delivered straight to your inbox without the visitor leaving the page.

1. Sign up free at formspree.io using the official group email.
2. Create a new form; Formspree shows an endpoint like `https://formspree.io/f/abcdwxyz`.
3. Paste it as `formEndpoint` in `data/site.js` and commit.
4. Send yourself a test message from the live site and confirm it in Formspree when asked.

The free plan covers 50 messages a month. The form includes a hidden spam trap field.

## Changing the look

Colours and fonts are defined once at the top of `assets/css/style.css` under `:root`. The fonts (Spectral and IBM Plex Sans) load from Google Fonts.

## Optional: custom domain

If IST provides a subdomain such as `sarg.ist.edu.pk`, add it under **Settings → Pages → Custom domain** and ask the IST IT team to create a CNAME record pointing to `<your-account>.github.io`.
