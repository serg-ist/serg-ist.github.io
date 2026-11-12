# Photos of group members

Put member photos in this folder, then point to them from `data/people.js`.

**Format:** JPG, portrait orientation, ideally 800 × 1000 pixels (a 4:5 ratio). Photos with other shapes still work; they are cropped to fill the frame, so keep the face near the centre.

**File size:** under 300 KB if possible, so the People page loads quickly on mobile data. Free tools such as squoosh.app can shrink a photo without visible loss.

**File name:** lowercase, words separated by hyphens, no spaces. For example `ayesha-khan.jpg`.

**Then** in `data/people.js` set that person's photo line to:

    photo: "assets/img/people/ayesha-khan.jpg",

The professor's photo is expected at `assets/img/people/ahmed-waqas-zubairi.jpg`. Until a photo is uploaded, the site shows the person's initials instead.

Only publish a photo with the person's permission.
