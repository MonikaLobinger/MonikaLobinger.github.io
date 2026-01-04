const laenge_der_ueberschrift = 70;
const eval_foldername = `"${dv.current().file.folder}"`;
const foldername = dv.current().file.folder;

function depth(path) { return path.split("/").length; }
const tiefe = depth(foldername);
function filelink(file,noteText) {
  let fllink = "";
  let regex = /## \[.*\]/;
  let found = noteText.match(regex);
  let headerName = file.path;
  if (found != null) {
    headerName = found[0].slice(4,-1).slice(0,laenge_der_ueberschrift);
  } else {
    regex = /## .*/;
    found = noteText.match(regex);
    if (found != null) {
      headerName = found[0].slice(3).slice(0,laenge_der_ueberschrift);
    }
  }
  fllink = "[[" + file.path + "|" + headerName + "]]"
  return fllink;
}
function ddclink(ddc) {
  let ddclink = "";
  if (ddc != null) {
    ddclink = "[[DDCKlassen#" + ddc + "|" + ddc + "]]"
  }
  return ddclink;
}
function media(m) {
  return m ? typeof m === 'string' ? m : m.join(", ") : "";
}
const pages = await Promise.all(
    dv.pages(eval_foldername)
    .where(p =>
      (p.file.name.substring(0,1) != "-") &&
      (!p.file.path.includes("Autoren")) &&
      (p.file.name != "timeline") &&
      (p.file.name != "DDCKlassen") &&
      (!p.file.tags.includes("#MOC")) &&
      (depth(p.file.folder)>=tiefe)
     )
   .map(async (page) => {
      const content = await dv.io.load(page.file.path);
      return {
         fl: filelink(page.file, content),
         ddckey: page.ddckey,
         ddc: ddclink(page.ddckey),
         mstr: media(page.media)
      };
   })
);
dv.table(["Einträge: ", "Ddc", "Medien"], pages
  .sort((a, b) => a.ddckey - b.ddckey)
  .map(p => [
    p.fl,
    p.ddc,
    p.mstr
  ])
);
/*
```dataview
LIST
WHERE file.folder = this.file.folder
WHERE cssclasses = "material"
```

``` dataview
TABLE WITHOUT ID Eintrag,  Ddc,  Medium
SORT ddckey
WHERE file.folder = this.file.folder
WHERE file.frontmatter.cssclasses = "material"
FLATTEN "[[" + file.path + "|" + truncate(file.name, 50) + "]]" AS Eintrag
FLATTEN "[[DDCKlassen#" + display(ddckey) +"|" + display(ddckey) + "]]" AS Ddc
FLATTEN display(media) AS Medium
```
*/
