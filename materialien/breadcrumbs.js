const foldername = dv.current().file.folder;

function depth(path) { return path.split("/").length; }
const tiefe = depth(foldername);
const crumbs = foldername.split("/");
let trenner = "&thinsp;&rarr;&thinsp;";
let cnt = 0;
let arr=[];
arr.push("[[" + "home" + "]]");
for (let crumb of crumbs) {
  cnt++;
  //console.log(dv.current().file.name + " | Tiefe: " + tiefe + " Cnt: " + cnt + " " +  crumb)
  if(cnt == tiefe && dv.current().file.tags.includes("#MOC")) {
    arr.push(trenner + crumb);
  } else {
    arr.push(trenner + "[[" + crumb + "]]");
  }
}
// Der String "Brotkrumennavigation" wird nicht angezeigt
// Es wird ein bekanntes Element, hier die breadcrumbs Klasse
// benötigt, um das Geschwister selektieren zu können
dv.el("span", "Brotkrumennavigation", {cls: "breadcrumbs"} );
dv.list(arr);
