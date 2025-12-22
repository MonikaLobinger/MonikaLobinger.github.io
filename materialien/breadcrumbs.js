const foldername = dv.current().file.folder;

function depth(path) { return path.split("/").length; }
const tiefe = depth(foldername);
const crumbs = foldername.split("/");
let trenner = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
let cnt = 0;
dv.el("span", "[[" + "home" + "]] " + trenner, { cls: "breadcrumbs"} );
for (let crumb of crumbs) {
  cnt++;
  if(cnt == tiefe && dv.current().file.tags.includes("#MOC"))
    dv.el("span", crumb, {cls: "breadcrumbs"} );
  else if(cnt == tiefe)
    dv.el("span", "[[" + crumb + "]] ", { cls: "breadcrumbs"} );
  else
    dv.el("span", "[[" + crumb + "]] " + trenner, { cls: "breadcrumbs"} );
}
