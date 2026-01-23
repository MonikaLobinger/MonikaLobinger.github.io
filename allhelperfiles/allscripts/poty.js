module.exports = poty;

//#region PLUGIN CONFIGURATION
xxpoty_configuration = {
  SECTION_NOTETYPES: {
    note: {
      yaml: {__SPEC: {RENDER: false,}, date_created: cbkFmtCreated, },
      show: {__SPEC: {RENDER: true,}, firstline: "firstline",  },
    },
  }
}

poty_configuration = {
SECTION_TRANSLATE: {
    TITLE_NEW_FILE: "Unbenannt"
},
SECTION_NOTETYPES: {
    fueralle: {
        __SPEC: {
            REPEAT: true
        },
        yaml: {
            __SPEC: {
                RENDER: false
            },
            aliases: {
                __SPEC: false,
                DEFAULT: cbkAliasOrt,
                TYPE: "(Array.<String>|Function)"
            },
            borgia: {
                __SPEC: false,
                DEFAULT: "Lucrezia",
                TYPE: "String"
            }
        },
        show: {
            __SPEC: {
                RENDER: true
            },
            firstline: {
                __SPEC: false,
                DEFAULT: "DAS WORT",
                TYPE: "String"
            },
            fugger: {
                __SPEC: false,
                DEFAULT: true,
                TYPE: "Boolean"
            }
        }
    },
    alt: {
      folders: ["alt", "antik"],
      show: {
          lastline: "ALT",
          type: "alt"
      }
      },
      note: {
          marker: "{w}",
          folders: ["temp",],
          show: {
              type: "note"
          }
      }
  }
};
xxpoty_configuration = {
    SECTION_GENERAL: {
        LANGUAGE: "de"
    },
    SECTION_TRANSLATE: {
        TITLE_NEW_FILE: [
            ["en", "Untitled"],
            ["de", "Unbenannt"]
        ]
    },
    SECTION_NOTETYPES: {
        __SPEC: {
            DEFAULT: "note"
        },
        defaults: {
            __SPEC: {
                REPEAT: true
            },
            mocstring: {
                __SPEC: false,
                DEFAULT: "-",
                TYPE: "String"
            },
            schoolyaml: {
                __SPEC: {
                    RENDER: false
                },
                cssclasses: {
                    __SPEC: false,
                    DEFAULT: cbkFmtCssClasses,
                    TYPE: "(Array.<String>|Function)"
                },
                date_created: {
                    __SPEC: false,
                    DEFAULT: cbkFmtCreated,
                    TYPE: "(Date|Function)"
                },
                author: {
                    __SPEC: false,
                    DEFAULT: "Ueberphilosophy",
                    TYPE: "String"
                },
                publish: {
                    __SPEC: false,
                    DEFAULT: true,
                    TYPE: "Boolean"
                },
                tags: {
                    __SPEC: false,
                    DEFAULT: "[]",
                    TYPE: "(String|Array.<String>|Function)"
                }
            },
            schoolshow: {
                __SPEC: {
                    RENDER: true
                },
                type: {
                    __SPEC: false,
                    DEFAULT: cbkNoteType,
                    TYPE: "(String|Function)"
                },
                prevlink: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                nextlink: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                scriptline: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                firstline: {
                    __SPEC: false,
                    DEFAULT: cbkNoteName,
                    TYPE: "(String|Function)"
                },
                sndline: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                thrdline: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                lastline: {
                    __SPEC: false,
                    DEFAULT: cbkFmtLastLine,
                    TYPE: "(String|Function)"
                }
            }
        },
        note: {
            schoolyaml: {},
            schoolshow: {}
        },
        diary: {
            folders: ["Diary"],
            title_date_function: cbkCalcDateTitle,
            title_date_format: "YYYY-MM-DD",
            schoolyaml: {
                publish: false
            },
            schoolshow: {
                prevlink: cbkPrevDateLink,
                nextlink: cbkNextDateLink,
                firstline: cbkNoteName,
                sndline: "## "
            }
        },
        material: {
            folders: ["Materialien"],
            name_prompt: "Titel_der_Vorlesung_Jahr_Institut_Speaker",
            schoolyaml: {
                cssclasses: cbkMaterialCssClasses,
                date_created: cbkMaterialDateCreated,
                publish: cbkMaterialPublish,
                tags: cbkMaterialTags,
                ddckey: cbkMaterialDdcKey,
                media: cbkMaterialMedia,
                author: cbkMaterialAuthor
            },
            schoolshow: {
                scriptline: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```',
                sndline: cbkMaterialSndLine,
                thrdline: cbkMaterialThrdLine,
                fourthline: cbkMaterialFourthLine,
                fifthline: cbkMaterialFifthLine,
                lastline: cbkMaterialLastLine
            }
        },
        autor: {
            folders: ["Autoren"],
            name_prompt: "Autornachname",
            name_end: " Quellen",
            schoolyaml: {
                ddckey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndkey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndlink: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "String"
                },
                tags: cbkAutorTag
            },
            schoolshow: {
                scriptline: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```\n',
                firstline: cbkNoteName,
                sndline: cbkTimeLine
            }
        },
        autorsek: {
            folders: ["Autoren-Sekundaer"],
            name_prompt: "Autornachname",
            name_end: " Sekundaer",
            schoolyaml: {
                cssclasses: "sekundaer",
                tags: cbkAutorTag
            },
            schoolshow: {
                scriptline: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```\n',
                firstline: cbkSekundaerName
            }
        },
        feld: {
            folders: ["Feld"],
            schoolyaml: {
                publish: false
            },
            schoolshow: {
                scriptline: cbkScriptLineFeld,
                firstline: cbkFrstLineFeld,
                sndline: cbkSndLineFeld,
                thrdline: cbkThrdLineFeld,
                lastline: cbkFmtLastLine
            }
        },
        stutiis: {
            folders: ["XXXstutiis"],
            schoolyaml: {
                date_created: "",
                author: "",
                cssclasses: "studies",
                publish: false
            }
        },
        stutiismitschrift: {
            folders: ["XXXstutiis/Mitschriften"],
            marker: "@",
            name_prompt: "Exakter Titel der Veranstaltung: Titel_der_Vorlesung_Jahr_Institut_Speaker",
            schoolyaml: {
                date_created: "",
                author: "",
                cssclasses: "studies",
                publish: false
            },
            schoolshow: {
                firstline: "Mitschrift",
                sndline: cbkSndLineMitschrift,
                thrdline: "## Offen"
            }
        },
        werkstattmitschrift: {
            folders: ["Mitschriften"],
            marker: "@",
            name_prompt: "Exakter Titel der Veranstaltung: Titel_der_Vorlesung_Jahr_Institut_Speaker",
            schoolyaml: {
                cssclasses: "werkstatt",
                publish: false
            },
            schoolshow: {
                firstline: "Mitschrift",
                sndline: cbkSndLineMitschrift,
                thrdline: "## Offen"
            }
        },
        audio: {
            folders: ["Werkstatt"],
            marker: "{a}",
            name_prompt: "OPTIONAL Podcast ODER Reihe - Autornachname - Audiotitel"
        },
        buch: {
            folders: ["Werkstatt"],
            marker: "{b}",
            name_prompt: "Autornachname - Buchtitel",
            title_date_function: cbkAskGoogleForTitle,
            schoolyaml: {
                tags: cbkBookAliasAsTag,
                aliases: cbkBookAlias,
                buchtitel: cbkBuchTitel,
                buchuntertitel: cbkBuchUntertitel,
                buchautor: cbkBuchAutor,
                buchautorv: cbkBuchAutorv,
                buchdatum: cbkBuchDatum,
                buchverlag: cbkBuchVerlag,
                buchseiten: cbkBuchSeiten,
                buchsprache: cbkBuchSprache,
                buchisbn: cbkBuchIsbn,
                buchisbn13: cbkBuchIsbn13,
                buchebook: cbkBuchEbook,
                buchstatus: ["egal"],
                xbuchstatus: ["gelesen", "aktuell", "teilweise", "nochmal", "ungelesen"]
            }
        },
        exzerpt: {
            folders: ["Werkstatt"],
            marker: "$",
            name_prompt: "Autornachname - Buchtitel"
        },
        ort: {
            folders: ["Werkstatt"],
            marker: "&",
            name_prompt: "Ortsname, Land",
            schoolyaml: {
                aliases: cbkFmtOneAlias,
                gndkey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndlink: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "String"
                }
            }
        },
        person: {
            folders: ["Werkstatt"],
            marker: "=",
            name_prompt: "Personnachname, Personvorname OPTIONAL , Geburtsdatum",
            schoolyaml: {
                aliases: cbkFmtOneAliasSwitch,
                gndkey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndlink: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "String"
                }
            },
            schoolshow: {
                pict: "teacher-295387_640-pixabay_2026-01-07.png",
                pict_width: 100,
                firstline: cbkHeaderPerson
            }
        },
        randnotizen: {
            folders: ["Werkstatt", "Buchmitschriften"],
            marker: "@",
            name_prompt: "Autornachname - Buchtitel"
        },
        video: {
            folders: ["Werkstatt"],
            marker: "{v}",
            name_prompt: "OPTIONAL Reihe - OPTIONAL Autornachname - Videotitel"
        },
        web: {
            folders: ["Werkstatt"],
            marker: "{w}",
            name_prompt: "OPTIONAL Autor - Webseitentitel - OPTIONAL Datum"
        },
        zitat: {
            folders: ["Werkstatt"],
            marker: "°",
            name_prompt: "Titel Autornachname"
        },
        zitate: {
            folders: ["Werkstatt"],
            marker: "°°",
            name_prompt: "Titel Autornachname"
        }
    }
};

function cbkAliasPerson(noteName) {
    let aliases = [];
    let name = noteName;
    var count = (noteName.match(/,/g) || []).length;
    if (count > 1) {
        let last_idx = noteName.lastIndexOf(",");
        if (last_idx != -1) {
            name = noteName.slice(0, last_idx)
        }
    }
    let alias = name.replace(/, /g, ",");
    let strArr = alias.split(",");
    alias = strArr[0];
    strArr.shift();
    alias = strArr.join(" ") + " " + alias;
    aliases.push(alias);
    return aliases
}

function cbkAliasOrt(noteName) {
    let aliases = [];
    let alias = noteName.replace(/, /g, ",");
    let strArr = alias.split(",");
    alias = strArr[0];
    strArr.shift();
    alias += "(" + strArr.join(" ") + ")";
    aliases.push(alias);
    return aliases
}

function cbkHeaderPerson(noteName) {
    let header = "";
    let name = noteName;
    var count = (noteName.match(/,/g) || []).length;
    if (count > 1) {
        let last_idx = noteName.lastIndexOf(",");
        if (last_idx != -1) {
            name = noteName.slice(0, last_idx)
        }
    }
    let strArr = name.split(",");
    if (strArr.length > 1) header = strArr[1].trim() + " " + strArr[0].trim();
    else header = name;
    return header
}

function cbkHeaderOrt(noteName) {
    let header = "";
    let name = noteName;
    let strArr = name.split(",");
    if (strArr.length > 1) header = strArr[1].trim() + " " + strArr[0].trim();
    else header = name;
    return header
}

function cbkBookAlias(noteName, noteType, noteSetting, tp, app, computedValues) {
    let alias = computedValues.buchautor.slice(0, 3) + computedValues.buchtitel.slice(0, 3);
    return alias
}

function cbkBookAliasAsTag(noteName, noteType, noteSetting, tp, app, computedValues) {
    let alias = "bookid/" + cbkBookAlias(noteName, noteType, noteSetting, tp, app, computedValues);
    return alias
}

function cbkBuchTitel(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchtitel
}

function cbkBuchUntertitel(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchuntertitel
}

function cbkBuchAutor(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchautor
}

function cbkBuchAutorv(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchautorv
}

function cbkBuchDatum(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchdatum
}

function cbkBuchVerlag(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchverlag
}

function cbkBuchSeiten(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchseiten
}

function cbkBuchSprache(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchsprache
}

function cbkBuchIsbn(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchisbn
}

function cbkBuchIsbn13(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchisbn13
}

function cbkBuchEbook(noteName, noteType, noteSetting, tp, app, computedValues) {
    return computedValues.buchebook
}
async function cbkAskGoogleForTitle(noteName, noteType, noteSetting, tp, app, computedValues) {
    let noteTitle = "";

    function nachname(name) {
        return /[^ ]*$/.exec(name)[0]
    }

    function vorname(name) {
        return name.substring(0, name.lastIndexOf(" "))
    }

    function jahr(datum) {
        let jahr = "";
        if (datum != undefined) {
            jahr = datum.slice(0, 4)
        }
        return jahr
    }
    let maxResults = 20;
    let bookQuery;
    bookQuery = await tp.system.prompt("Angaben um Buch bei Google Books zu suchen 📚🔎");
    if (bookQuery == undefined) {
        console.log("User cancelled");
        return noteTitle
    }
    let url = "https://www.googleapis.com/books/v1/volumes?q=" + bookQuery + "&maxResults=" + maxResults.toString();
    const resp = await fetch(url);
    if (!resp.ok) {
        console.log("Fetch klappte nicht");
        return noteTitle
    }
    let data;
    try {
        data = await resp.json()
    } catch (e) {
        console.log("Json klappte nicht");
        return noteTitle
    }
    let books = data.items;
    let texts = [];
    books.map(function(book) {
        let text = "";
        if (book.saleInfo.isEbook) {
            text = "ebook: "
        } else {
            text = ""
        }
        text += book.volumeInfo.title;
        if (book.volumeInfo.authors != undefined) {
            book.volumeInfo.authors.forEach((a, i) => {
                if (i == 0) {
                    text += " - "
                } else {
                    text += ", "
                }
                text += nachname(a)
            })
        }
        text += " - " + jahr(book.volumeInfo.publishedDate);
        text += " - " + book.volumeInfo.language;
        texts.push(text)
    });
    const choosenbook = await tp.system.suggester(texts, books, true, "Buch wählen");
    if (choosenbook == undefined) {
        console.log("User cancelled");
        return noteTitle
    }
    let title = "";
    let subtitle = "";
    let writer = "N/A";
    let writerv = "";
    let publishedDate = "";
    let publisher = "N/A";
    let description = "";
    let pageCount = "";
    let language = "";
    let isbn = "";
    let isbn13 = "";
    let ebook = "papier";
    title = choosenbook.volumeInfo.title;
    if (choosenbook.volumeInfo.subtitle != undefined) {
        subtitle = choosenbook.volumeInfo.subtitle
    }
    if (choosenbook.volumeInfo.authors != undefined) {
        writer = "";
        writerv = "";
        choosenbook.volumeInfo.authors.forEach((a, i) => {
            if (i > 0) {
                writer += ", ";
                if (writerv !== "") {
                    writerv += ", "
                }
            }
            writer += nachname(a);
            writerv += vorname(a)
        })
    }
    publishedDate = jahr(choosenbook.volumeInfo.publishedDate);
    if (choosenbook.volumeInfo.publisher != undefined) {
        publisher = choosenbook.volumeInfo.publisher
    }
    if (choosenbook.volumeInfo.description != undefined) {
        description = choosenbook.volumeInfo.description
    }
    if (choosenbook.volumeInfo.pageCount != undefined) {
        pageCount = choosenbook.volumeInfo.pageCount
    }
    if (choosenbook.volumeInfo.language != undefined) {
        language = choosenbook.volumeInfo.language
    }
    if (choosenbook.volumeInfo.industryIdentifiers != undefined) {
        if (choosenbook.volumeInfo.industryIdentifiers[0] != undefined) {
            isbn = choosenbook.volumeInfo.industryIdentifiers[0].identifier
        }
        if (choosenbook.volumeInfo.industryIdentifiers[1] != undefined) {
            isbn13 = choosenbook.volumeInfo.industryIdentifiers[1].identifier
        }
    }
    if (choosenbook.saleInfo.isEbook != undefined) {
        if (choosenbook.saleInfo.isEbook == true) {
            ebook = "EBOOK"
        }
    }
    noteTitle = writer + " - " + title + " - " + publishedDate;
    computedValues.buchtitel = title;
    computedValues.buchuntertitel = subtitle;
    computedValues.buchautor = writer;
    computedValues.buchautorv = writerv;
    computedValues.buchdatum = publishedDate;
    computedValues.buchverlag = publisher;
    computedValues.buchseiten = pageCount;
    computedValues.buchsprache = language;
    computedValues.buchisbn = isbn;
    computedValues.buchisbn13 = isbn13;
    computedValues.buchebook = ebook;
    let adaptedTitle = noteTitle.replace(/:/g, " ");
    noteTitle = adaptedTitle.replace(/\//g, "");
    console.log("NOTETITLE: " + noteTitle);
    return noteTitle
}

function isMok(noteName, tp) {
    let answer = false;
    let path = tp.file.path(true);
    let parts = path.split("\\");
    if (parts.length < 2) {
        parts = path.split("/")
    }
    if (parts.length > 1 && parts[parts.length - 2] == noteName) {
        answer = true
    }
    return answer
}

function isCatalog(noteName, noteSetting) {
    let answer = false;
    let mocstring = noteSetting.getValue("mocstring");
    if (noteName.startsWith(mocstring)) {
        answer = true;
        console.log("ist katalog")
    }
    return answer
}

function cbkMaterialCssClasses(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "foldernote";
    else if (isCatalog(noteName, noteSetting)) return "catalog";
    else return cbkFmtCssClasses(noteName, noteType, noteSetting, tp, app)
}

function cbkMaterialDateCreated(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "!no!";
    else return cbkFmtCreated(noteName, noteType, noteSetting, tp, app)
}

function cbkMaterialPublish(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "!no!";
    else return true
}

function cbkMaterialTags(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "MOC";
    else return "[]"
}

function cbkMaterialDdcKey(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "!no!";
    else if (isCatalog(noteName, noteSetting)) return "!no!";
    else return ""
}

function cbkMaterialMedia(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "!no!";
    else if (isCatalog(noteName, noteSetting)) return "!no!";
    else return "video"
}

function cbkMaterialAuthor(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "!no!";
    else return "Ueberphilosophy"
}

function cbkMaterialSndLine(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "% Waypoint %%";
    else if (isCatalog(noteName, noteSetting)) {
        let path = tp.file.path(true);
        let parts = path.split("\\");
        if (parts.length < 2) {
            parts = path.split("/")
        }
        if (parts.length > 1) {
            let heading = "";
            for (let i = 1; i < parts.length; i++) {
                heading += "#"
            }
            return heading + " " + parts[parts.length - 2]
        } else {
            return ""
        }
    } else return "## []()"
}

function cbkMaterialThrdLine(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "";
    else if (isCatalog(noteName, noteSetting)) {
        return '```dataviewjs\nawait dv.executeJs(await dv.io.load("Materialien/catalog.js"));\n```'
    } else return "#speaker/  #wird_fortgesetzt\n"
}

function cbkMaterialFourthLine(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "";
    else if (isCatalog(noteName, noteSetting)) return "";
    else return cbkMitschrift(noteName, noteType, noteSetting, tp, app)
}

function cbkMaterialFifthLine(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "";
    else if (isCatalog(noteName, noteSetting)) return "";
    else return "- []()"
}

function cbkMaterialLastLine(noteName, noteType, noteSetting, tp, app) {
    if (isMok(noteName, tp)) return "";
    else if (isCatalog(noteName, noteSetting)) return "";
    else return cbkFmtLastLine(noteName, noteType, noteSetting, tp, app)
}

function cbkScriptLineFeld(noteName, noteType, noteSetting, tp, app) {
    return ""
}

function cbkFrstLineFeld(noteName, noteType, noteSetting, tp, app) {
    return noteName + " #" + noteName
}

function cbkSndLineFeld(noteName, noteType, noteSetting, tp, app) {
    return "## Zeitliche Einordnung\n![[zeitliche Einordnung]]\n## Quellen\n![[" + noteName + " Quellen]]"
}

function cbkThrdLineFeld(noteName, noteType, noteSetting, tp, app) {
    return "## Adamson\n![[Adamson nnn " + noteName + "]]\n## Weitere"
}

function cbkMitschrift(noteName, noteType, noteSetting, tp, app) {
    return "[[Werkstatt/Mitschriften/@" + noteName + "|Mitschrift]]\n"
}

function cbkFmtLastLine(noteName, noteType, noteSetting, tp, app) {
    let lastline = "## -footnotes";
    let mocstring = noteSetting.getValue("mocstring");
    if (noteName.startsWith(mocstring)) {
        lastline = ""
    }
    return lastline
}

function cbkAutorTag(noteName, noteType, noteSetting, tp, app) {
    return noteName.replace(/ /g, "-")
}

function cbkTimeLine(noteName, noteType, noteSetting, tp, app) {
    return "[[timeline#" + noteName + "|Zeitleiste]]"
}

function cbkSekundaerName(noteName, noteType, noteSetting, tp, app) {
    return noteName + " Sekundaer"
}

function cbkSndLineMitschrift(noteName, noteType, noteSetting, tp, app) {
    return "zu [[" + noteName + "]]"
}

function cbkTest(noteName, noteType, noteSetting, tp, app) {
    return "yyyy"
}

function cbkFmtOneAlias(noteName, noteType, noteSetting, tp, app) {
    let alias = noteName;
    let mocstring = noteSetting.getValue("mocstring");
    if (noteName.startsWith(mocstring)) {
        alias = noteName.slice(mocstring.length)
    }
    alias = alias.replace(/,/g, ` `).replace(/  /g, ` `);
    if (0 == alias.localeCompare(noteName)) {
        alias = ""
    }
    return alias
}

function cbkFmtOneAliasSwitch(noteName, noteType, noteSetting, tp, app) {
    let alias = noteName;
    let mocstring = noteSetting.getValue("mocstring");
    if (noteName.startsWith(mocstring)) {
        alias = noteName.slice(mocstring.length)
    }
    let idx1 = alias.indexOf(",");
    let idx2 = alias.indexOf(",", idx1 + 1);
    if (idx2 < 1) idx2 = alias.length - 1;
    if (idx1 > 0 && idx2 > 0) {
        let part1 = alias.substring(0, idx1);
        let part2 = alias.substring(idx1 + 1, idx2);
        let zwi = "xxxx";
        alias = alias.replace(part1, zwi);
        alias = alias.replace(part2, part1);
        alias = alias.replace(zwi, part2)
    }
    alias = alias.replace(/,/g, ` `).replace(/  /g, ` `);
    if (0 == alias.localeCompare(noteName)) {
        alias = ""
    }
    return alias
}

function findSibling(next, tp, app, noteSetting) {
    function hasDate(fname, dateformat) {
        let matchstring = dateformat;
        matchstring = matchstring.replaceAll("Y", "[0-9]");
        matchstring = matchstring.replaceAll("M", "[0-9]");
        matchstring = matchstring.replaceAll("D", "[0-9]");
        let answer = fname.match(matchstring);
        return answer == null ? false : true
    }
    let dateformat = noteSetting.getValue("title_date_format");
    let currentFile = app.workspace.getActiveFile();
    let currentFileName = currentFile.name;
    let currentFolder = currentFile.parent;
    let currentFolderPath = currentFolder.path;
    text = "";
    let prevFile = null;
    let nextFile = null;
    const siblings = app.vault.getAbstractFileByPath(currentFolderPath).children;
    siblings.forEach(file => {
        if (hasDate(file.name, dateformat) && file.name != currentFileName) {
            if (file.name > currentFileName) {
                if (nextFile == null) {
                    nextFile = file
                } else {
                    if (file.name < nextFile.name) {
                        nextFile = file
                    }
                }
            } else if (file.name < currentFileName) {
                if (prevFile == null) {
                    prevFile = file
                } else {
                    if (file.name > prevFile.name) {
                        prevFile = file
                    }
                }
            }
        }
    });
    let answerFile = next === true ? nextFile : prevFile;
    let answer = "";
    if (answerFile != null) {
        answer = app.fileManager.generateMarkdownLink(answerFile, currentFolderPath + "/")
    } else if (next == true) {
        answer = app.fileManager.generateMarkdownLink(currentFile, currentFolderPath + "/");
        let tomorrow = tp.date.tomorrow(dateformat);
        let today = tp.date.now(dateformat);
        answer = answer.replaceAll(today, tomorrow)
    }
    return answer
}

function cbkCalcDateTitle(noteName, noteType, noteSetting, tp, app) {
    let title_before_date = noteSetting.getValue("title_before_date");
    if (title_before_date == undefined) title_before_date = "";
    let title_date_format = noteSetting.getValue("title_date_format");
    if (title_date_format == undefined) title_date_format = "YY-MM-DD";
    let name = title_before_date + tp.date.now(title_date_format);
    return name
}

function cbkFmtAlias(noteName, noteType, noteSetting, tp, app) {
    let aliases = [];
    let alias = noteName;
    let mocstring = noteSetting.getValue("mocstring");
    if (noteName.startsWith(mocstring)) {
        alias = noteName.slice(mocstring.length)
    }
    alias = alias.replace(/,/g, ` `).replace(/  /g, ` `);
    if (0 != alias.localeCompare(noteName)) {
        aliases.push(alias)
    }
    return aliases
}

function cbkFmtTags(noteName, noteType, noteSetting, tp, app) {
    let tags = [];
    let mocstring = noteSetting.getValue("mocstring");
    let tag_pre = noteSetting.getValue("tag_pre");
    tags.push(tag_pre + noteType.charAt(0).toUpperCase() + noteType.slice(1));
    if (noteName.startsWith(mocstring)) tags.push(tag_pre + "moc");
    return tags
}

function cbkFmtCreated(noteName, noteType, noteSetting, tp, app) {
    let format = noteSetting.getValue("date_created_date_format");
    if (format == "") format = undefined;
    return tp.date.now(format)
}

function cbkFmtCssClasses(noteName, noteType, noteSetting, tp, app) {
    let cssClasses = [];
    cssClasses.push(noteType);
    return cssClasses
}

function cbkNoteType(noteName, noteType, noteSetting, tp, app) {
    return noteType
}

function cbkNoteName(noteName, noteType, noteSetting, tp, app) {
    let mocstring = noteSetting.getValue("mocstring");
    let name_end = "";
    let marker = "";
    if (typeof noteSetting == "object") {
        name_end = noteSetting.getValue("name_end");
        marker = noteSetting.getValue("marker")
    }
    if (name_end == undefined) {
        name_end = ""
    }
    if (marker == undefined) {
        marker = ""
    }
    if (noteName.startsWith(mocstring)) {
        return noteName.slice(mocstring.length)
    } else {
        return noteName
    }
}

function cbkPrevDateLink(noteName, noteType, noteSetting, tp, app) {
    let prevLink = findSibling(false, tp, app, noteSetting);
    let answer = prevLink;
    return answer
}

function cbkNextDateLink(noteName, noteType, noteSetting, tp, app) {
    let nextLink = findSibling(true, tp, app, noteSetting);
    let answer = nextLink;
    return answer
}
//#endregion PLUGIN CONFIGURATION

let user_configuration_original = {
    SECTION_GENERAL: {
        LANGUAGE: "de"
    },
    SECTION_TRANSLATE: {
        NAME_PROMPT: [
            ["en", "Pure Name of Note"],
            ["de", "Name der Notiz (ohne Kenner/Marker)"]
        ],
        TYPE_PROMPT: [
            ["en", "Choose type"],
            ["de", "Typ wählen"]
        ],
        TITLE_NEW_FILE: [
            ["en", "Untitled"],
            ["de", "Unbenannt"]
        ]
    },
    SECTION_DIALOG: {
        TYPE_MAX_ENTRIES: 10
    },
    SECTION_NOTETYPES: {
        __SPEC: {
            DEFAULT: "note"
        },
        defaults: {
            __SPEC: {
                REPEAT: true
            },
            mocstring: {
                __SPEC: false,
                DEFAULT: "_",
                TYPE: "String"
            },
            marker: {
                __SPEC: false,
                DEFAULT: "",
                TYPE: "String"
            },
            name_end: {
                __SPEC: false,
                DEFAULT: "",
                TYPE: "String"
            },
            title_date_function: {
                __SPEC: false,
                DEFAULT: "",
                TYPE: "(String|Function)"
            },
            title_before_date: {
                __SPEC: false,
                DEFAULT: "",
                TYPE: "String"
            },
            title_date_format: {
                __SPEC: false,
                DEFAULT: "YY-MM-DD",
                TYPE: "Date"
            },
            folders: {
                __SPEC: false,
                IGNORE: true,
                DEFAULT: [""],
                TYPE: "(Array.<String>)"
            },
            tag_pre: {
                __SPEC: false,
                DEFAULT: "0/",
                TYPE: "String"
            },
            name_prompt: {
                __SPEC: false,
                DEFAULT: "",
                TYPE: "String"
            },
            create_same_named_file: {
                __SPEC: false,
                DEFAULT: false,
                TYPE: "Boolean"
            },
            date_created_date_format: {
                __SPEC: false,
                DEFAULT: "YYYY-MM-DD",
                TYPE: "Date"
            },
            frontmatter: {
                __SPEC: {
                    RENDER: false
                },
                aliases: {
                    __SPEC: false,
                    DEFAULT: cbkFmtAlias,
                    TYPE: "(Array.<String>|Function)"
                },
                cssclasses: {
                    __SPEC: false,
                    DEFAULT: cbkFmtCssClasses,
                    TYPE: "(Array.<String>|Function)"
                },
                date_created: {
                    __SPEC: false,
                    DEFAULT: cbkFmtCreated,
                    TYPE: "(Date|Function)"
                },
                position: {
                    __SPEC: false,
                    IGNORE: true,
                    TYPE: "Boolean"
                },
                private: {
                    __SPEC: false,
                    DEFAULT: false,
                    TYPE: "Boolean"
                },
                publish: {
                    __SPEC: false,
                    DEFAULT: false,
                    TYPE: "Boolean"
                },
                tags: {
                    __SPEC: false,
                    DEFAULT: cbkFmtTags,
                    TYPE: "(Array.<String>|Function)"
                },
                revised: {
                    __SPEC: false,
                    DEFAULT: true,
                    TYPE: "Boolean"
                }
            },
            page: {
                __SPEC: {
                    RENDER: true
                },
                type: {
                    __SPEC: false,
                    DEFAULT: cbkNoteType,
                    TYPE: "(String|Function)"
                },
                pict: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "String"
                },
                pict_width: {
                    __SPEC: false,
                    DEFAULT: 0,
                    TYPE: "Number"
                },
                prevlink: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                nextlink: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                firstline: {
                    __SPEC: false,
                    DEFAULT: cbkNoteName,
                    TYPE: "(String|Function)"
                },
                lastline: {
                    __SPEC: false,
                    DEFAULT: "## -footnotes",
                    TYPE: "(String|Function)"
                }
            }
        },
        obsidian: {
            folders: ["Obsidian"]
        },
        audio: {
            marker: "{a}",
            folders: ["zwischenreich"],
            name_prompt: "?Podcast/Reihe - Autornachname - Audiotitel ?OPTIONAL /ODER",
            page: {
                pict: "/_/_resources/pexels-foteros-352505_15p.jpg",
                pict_width: 100
            }
        },
        buch: {
            marker: "{b}",
            folders: ["zwischenreich"],
            name_prompt: "Autornachname - Buchtitel",
            page: {
                pict: "/_/_resources/pexels-ekrulila-2203051_22p.jpg",
                pict_width: 100
            }
        },
        exzerpt: {
            marker: "$",
            folders: ["zwischenreich"],
            name_prompt: "Autornachname - Buchtitel"
        },
        mitschrift: {
            marker: "@",
            folders: ["zwischenreich"],
            name_prompt: "Exakter Titel der Veranstaltung: Titel_der_Vorlesung_Jahr_Institut_Speaker"
        },
        ort: {
            marker: "&",
            folders: ["zwischenreich"],
            page: {
                pict: "/_/_resources/pexels-dzeninalukac-1563005_10p.jpg",
                pict_width: 100,
                firstline: cbkHeaderOrt
            },
            name_prompt: "Ortsname, Land",
            frontmatter: {
                aliases: cbkAliasOrt
            }
        },
        person: {
            marker: "=",
            folders: ["zwischenreich"],
            page: {
                pict: "/_/_resources/pexels-lucasandrade-14097235_15p.jpg",
                pict_width: 100,
                firstline: cbkHeaderPerson
            },
            name_prompt: "Personnachname, Personvorname, ?Geburtsdatum ?OPTIONAL",
            frontmatter: {
                aliases: cbkAliasPerson
            }
        },
        randnotizen: {
            marker: "@",
            folders: ["zwischenreich"],
            name_prompt: "Autornachname - Buchtitel"
        },
        video: {
            marker: "{v}",
            folders: ["zwischenreich"],
            page: {
                pict: "/_/_resources/pexels-vladvictoria-2363675_10p.jpg",
                pict_width: 100
            },
            name_prompt: "?Reihe - ?Autornachname - Videotitel ?OPTIONAL"
        },
        web: {
            marker: "{w}",
            folders: ["zwischenreich"],
            page: {
                pict: "/_/_resources/pexels-drector-14023912_10p.jpg",
                pict_width: 100
            },
            name_prompt: "?Autor - Webseitentitel - ?Datum ?OPTIONAL"
        },
        zitat: {
            marker: "°",
            folders: ["zwischenreich"],
            name_prompt: "Titel Autornachname"
        },
        zitate: {
            marker: "°°",
            folders: ["zwischenreich"],
            name_prompt: "Titel Autornachname"
        },
        rezept: {
            frontmatter: {
                extra: "breit"
            },
            folders: ["Rezepte"],
            name_prompt: "Name des Gerichts, das das Kochrezept beschreibt"
        },
        garten: {
            folders: ["Garten", "temp"],
            name_prompt: "Gartenthema"
        },
        pflanze: {
            folders: ["Pflanzen"],
            name_prompt: "Pflanzenname"
        },
        gartentagebuch: {
            title_date_function: cbkCalcDateTitle,
            title_before_date: "Garten ",
            page: {
                prevlink: cbkPrevDateLink,
                nextlink: cbkNextDateLink
            },
            folders: ["Gartentagebuch"]
        },
        lesetagebuch: {
            title_date_function: cbkCalcDateTitle,
            title_before_date: "Lesetagebucheintrag ",
            page: {
                prevlink: cbkPrevDateLink,
                nextlink: cbkNextDateLink,
                firstline: "## ArticleTitle\n[ntvzdf]link\n\n"
            },
            folders: ["Lesetagebuch"]
        },
        unbedacht: {
            date_created_date_format: "dddd, D. MMMM YYYY, H:mm:ss",
            title_date_format: "YY-MM-DD",
            title_date_function: cbkCalcDateTitle,
            title_before_date: "Unbedacht ",
            page: {
                prevlink: cbkPrevDateLink,
                nextlink: cbkNextDateLink
            },
            folders: ["Unbedacht"],
            frontmatter: {
                private: true
            }
        },
        diary: {
            title_date_function: cbkCalcDateTitle,
            title_date_format: "YYYY-MM-DD",
            page: {
                prevlink: cbkPrevDateLink,
                nextlink: cbkNextDateLink
            },
            folders: ["Diary", "temp"],
            frontmatter: {
                private: true
            }
        },
        verwaltung: {
            folders: ["Verwaltung"],
            name_prompt: "Verwaltungsthema",
            frontmatter: {
                private: true
            }
        },
        done: {
            title_date_function: cbkCalcDateTitle,
            title_before_date: "Heute erledigt ",
            page: {
                prevlink: cbkPrevDateLink,
                nextlink: cbkNextDateLink
            },
            folders: ["Done"],
            frontmatter: {
                private: true
            }
        },
        it: {
            folders: ["IT"]
        },
        cookbook: {
            name_end: "_draft",
            folders: ["Cookbook"],
            name_prompt: "Receipe, zuerst wird es als Entwurf erstellt",
            frontmatter: {
                publish: true
            }
        },
        blog: {
            name_end: "_draft",
            folders: ["Blog"],
            name_prompt: "Allgemeiner Blogeintrag, zuerst wird es als Entwurf erstellt",
            frontmatter: {
                publish: true
            }
        },
        software: {
            folders: ["Software"],
            name_prompt: "Name der Software, die beschrieben wird"
        },
        linux: {
            page: {
                pict: "/_/_resources/Linux_mascot_tux_80p.png",
                pict_width: 50
            },
            folders: ["Linux"]
        },
        note: {}
    }
};
user_configuration = user_configuration_original;
let example_configuration1 = {
    SECTION_NOTETYPES: {
        note: {
            marker: "{w}",
            yaml: {
                __SPEC: {
                    RENDER: false
                },
                aliases: cbkAliasOrt,
                borgia: "Lucrezia"
            },
            show: {
                __SPEC: {
                    RENDER: true
                },
                firstline: "DAS WORT",
                fugger: true
            }
        }
    }
};
let example_configuration2 = {
    SECTION_TRANSLATE: {
        TITLE_NEW_FILE: "Unbenannt"
    },
    SECTION_NOTETYPES: {
        fueralle: {
            __SPEC: {
                REPEAT: true
            },
            yaml: {
                __SPEC: {
                    RENDER: false
                },
                aliases: {
                    __SPEC: false,
                    DEFAULT: cbkAliasOrt,
                    TYPE: "(Array.<String>|Function)"
                },
                borgia: {
                    __SPEC: false,
                    DEFAULT: "Lucrezia",
                    TYPE: "String"
                }
            },
            show: {
                __SPEC: {
                    RENDER: true
                },
                firstline: {
                    __SPEC: false,
                    DEFAULT: "DAS WORT",
                    TYPE: "String"
                },
                fugger: {
                    __SPEC: false,
                    DEFAULT: true,
                    TYPE: "Boolean"
                }
            }
        },
        alt: {
            folders: ["alt", "antik"],
            show: {
                lastline: "ALT",
                type: "alt"
            }
        },
        note: {
            marker: "{w}",
            folders: ["temp"],
            show: {
                type: "note"
            }
        }
    }
};
let example_configuration3 = {
    SECTION_TRANSLATE: {
        TITLE_NEW_FILE: "Unbenannt"
    },
    SECTION_NOTETYPES: {
        defaults: {
            __SPEC: {
                REPEAT: true
            },
            yaml: {
                __SPEC: {
                    RENDER: false
                },
                publish: {
                    __SPEC: false,
                    DEFAULT: true,
                    TYPE: "Boolean"
                }
            },
            show: {
                __SPEC: {
                    RENDER: true
                },
                type: {
                    __SPEC: false,
                    DEFAULT: cbkNoteType,
                    TYPE: "(String|Function)"
                },
                firstline: {
                    __SPEC: false,
                    DEFAULT: "First Line",
                    TYPE: "String"
                },
                lastline: {
                    __SPEC: false,
                    DEFAULT: "##Footnotes",
                    TYPE: "String"
                }
            }
        },
        book: {
            folders: ["book"]
        },
        test: {
            folders: ["test"],
            yaml: {
                publish: false
            }
        }
    }
};
let schule_configuration = {
    SECTION_GENERAL: {
        LANGUAGE: "de"
    },
    SECTION_TRANSLATE: {
        TITLE_NEW_FILE: [
            ["en", "Untitled"],
            ["de", "Unbenannt"]
        ]
    },
    SECTION_NOTETYPES: {
        __SPEC: {
            DEFAULT: "note"
        },
        defaults: {
            __SPEC: {
                REPEAT: true
            },
            mocstring: {
                __SPEC: false,
                DEFAULT: "-",
                TYPE: "String"
            },
            schoolyaml: {
                __SPEC: {
                    RENDER: false
                },
                cssclasses: {
                    __SPEC: false,
                    DEFAULT: cbkFmtCssClasses,
                    TYPE: "(Array.<String>|Function)"
                },
                date_created: {
                    __SPEC: false,
                    DEFAULT: cbkFmtCreated,
                    TYPE: "(Date|Function)"
                },
                author: {
                    __SPEC: false,
                    DEFAULT: "Ueberphilosophy",
                    TYPE: "String"
                },
                publish: {
                    __SPEC: false,
                    DEFAULT: true,
                    TYPE: "Boolean"
                },
                tags: {
                    __SPEC: false,
                    DEFAULT: "[]",
                    TYPE: "(String|Array.<String>|Function)"
                }
            },
            schoolshow: {
                __SPEC: {
                    RENDER: true
                },
                type: {
                    __SPEC: false,
                    DEFAULT: cbkNoteType,
                    TYPE: "(String|Function)"
                },
                prevlink: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                nextlink: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                scriptline: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                firstline: {
                    __SPEC: false,
                    DEFAULT: cbkNoteName,
                    TYPE: "(String|Function)"
                },
                sndline: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                thrdline: {
                    __SPEC: false,
                    DEFAULT: "",
                    TYPE: "(String|Function)"
                },
                lastline: {
                    __SPEC: false,
                    DEFAULT: cbkFmtLastLine,
                    TYPE: "(String|Function)"
                }
            }
        },
        note: {
            schoolyaml: {},
            schoolshow: {}
        },
        diary: {
            folders: ["Diary"],
            title_date_function: cbkCalcDateTitle,
            title_date_format: "YYYY-MM-DD",
            schoolyaml: {
                publish: false
            },
            schoolshow: {
                prevlink: cbkPrevDateLink,
                nextlink: cbkNextDateLink,
                firstline: cbkNoteName,
                sndline: "## "
            }
        },
        material: {
            folders: ["Materialien"],
            name_prompt: "Titel_der_Vorlesung_Jahr_Institut_Speaker",
            schoolyaml: {
                cssclasses: cbkMaterialCssClasses,
                date_created: cbkMaterialDateCreated,
                publish: cbkMaterialPublish,
                tags: cbkMaterialTags,
                ddckey: cbkMaterialDdcKey,
                media: cbkMaterialMedia,
                author: cbkMaterialAuthor
            },
            schoolshow: {
                scriptline: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```',
                sndline: cbkMaterialSndLine,
                thrdline: cbkMaterialThrdLine,
                fourthline: cbkMaterialFourthLine,
                fifthline: cbkMaterialFifthLine,
                lastline: cbkMaterialLastLine
            }
        },
        autor: {
            folders: ["Autoren"],
            name_prompt: "Autornachname",
            name_end: " Quellen",
            schoolyaml: {
                ddckey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndkey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndlink: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "String"
                },
                tags: cbkAutorTag
            },
            schoolshow: {
                scriptline: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```\n',
                firstline: cbkNoteName,
                sndline: cbkTimeLine
            }
        },
        autorsek: {
            folders: ["Autoren-Sekundaer"],
            name_prompt: "Autornachname",
            name_end: " Sekundaer",
            schoolyaml: {
                cssclasses: "sekundaer",
                tags: cbkAutorTag
            },
            schoolshow: {
                scriptline: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```\n',
                firstline: cbkSekundaerName
            }
        },
        feld: {
            folders: ["Feld"],
            schoolyaml: {
                publish: false
            },
            schoolshow: {
                scriptline: cbkScriptLineFeld,
                firstline: cbkFrstLineFeld,
                sndline: cbkSndLineFeld,
                thrdline: cbkThrdLineFeld,
                lastline: cbkFmtLastLine
            }
        },
        stutiis: {
            folders: ["XXXstutiis"],
            schoolyaml: {
                date_created: "",
                author: "",
                cssclasses: "studies",
                publish: false
            }
        },
        stutiismitschrift: {
            folders: ["XXXstutiis/Mitschriften"],
            marker: "@",
            name_prompt: "Exakter Titel der Veranstaltung: Titel_der_Vorlesung_Jahr_Institut_Speaker",
            schoolyaml: {
                date_created: "",
                author: "",
                cssclasses: "studies",
                publish: false
            },
            schoolshow: {
                firstline: "Mitschrift",
                sndline: cbkSndLineMitschrift,
                thrdline: "## Offen"
            }
        },
        werkstattmitschrift: {
            folders: ["Mitschriften"],
            marker: "@",
            name_prompt: "Exakter Titel der Veranstaltung: Titel_der_Vorlesung_Jahr_Institut_Speaker",
            schoolyaml: {
                cssclasses: "werkstatt",
                publish: false
            },
            schoolshow: {
                firstline: "Mitschrift",
                sndline: cbkSndLineMitschrift,
                thrdline: "## Offen"
            }
        },
        audio: {
            folders: ["Werkstatt"],
            marker: "{a}",
            name_prompt: "OPTIONAL Podcast ODER Reihe - Autornachname - Audiotitel"
        },
        buch: {
            folders: ["Werkstatt"],
            marker: "{b}",
            name_prompt: "Autornachname - Buchtitel",
            title_date_function: cbkAskGoogleForTitle,
            schoolyaml: {
                tags: cbkBookAliasAsTag,
                aliases: cbkBookAlias,
                buchtitel: cbkBuchTitel,
                buchuntertitel: cbkBuchUntertitel,
                buchautor: cbkBuchAutor,
                buchautorv: cbkBuchAutorv,
                buchdatum: cbkBuchDatum,
                buchverlag: cbkBuchVerlag,
                buchseiten: cbkBuchSeiten,
                buchsprache: cbkBuchSprache,
                buchisbn: cbkBuchIsbn,
                buchisbn13: cbkBuchIsbn13,
                buchebook: cbkBuchEbook,
                buchstatus: ["egal"],
                xbuchstatus: ["gelesen", "aktuell", "teilweise", "nochmal", "ungelesen"]
            }
        },
        exzerpt: {
            folders: ["Werkstatt"],
            marker: "$",
            name_prompt: "Autornachname - Buchtitel"
        },
        ort: {
            folders: ["Werkstatt"],
            marker: "&",
            name_prompt: "Ortsname, Land",
            schoolyaml: {
                aliases: cbkFmtOneAlias,
                gndkey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndlink: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "String"
                }
            }
        },
        person: {
            folders: ["Werkstatt"],
            marker: "=",
            name_prompt: "Personnachname, Personvorname OPTIONAL , Geburtsdatum",
            schoolyaml: {
                aliases: cbkFmtOneAliasSwitch,
                gndkey: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "Number"
                },
                gndlink: {
                    __SPEC: false,
                    VALUE: "",
                    TYPE: "String"
                }
            },
            schoolshow: {
                pict: "teacher-295387_640-pixabay_2026-01-07.png",
                pict_width: 100,
                firstline: cbkHeaderPerson
            }
        },
        randnotizen: {
            folders: ["Werkstatt", "Buchmitschriften"],
            marker: "@",
            name_prompt: "Autornachname - Buchtitel"
        },
        video: {
            folders: ["Werkstatt"],
            marker: "{v}",
            name_prompt: "OPTIONAL Reihe - OPTIONAL Autornachname - Videotitel"
        },
        web: {
            folders: ["Werkstatt"],
            marker: "{w}",
            name_prompt: "OPTIONAL Autor - Webseitentitel - OPTIONAL Datum"
        },
        zitat: {
            folders: ["Werkstatt"],
            marker: "°",
            name_prompt: "Titel Autornachname"
        },
        zitate: {
            folders: ["Werkstatt"],
            marker: "°°",
            name_prompt: "Titel Autornachname"
        }
    }
};
user_configuration = schule_configuration;
var GLOBAL_SYMBOL_COUNTER = 0;
const TYPES_WORKER_KEY = "SECTION_NOTETYPES";
const TYPES_TYPE = "(Number|String|Boolean|Array.<Number>|Array.<String>|Array.<Boolean>|Function)";
const DIALOG_WORKER_KEY = "SECTION_DIALOG";
const DIALOG_TYPE = "(Number|Boolean|Array.<Number>|Array.<Boolean>)";
const LOCALIZATION_WORKER_KEY = "SECTION_TRANSLATE";
const LOCALIZATION_TYPE = "(String|Array.<String>|Array.<Array.<String>>)";
const FALLBACK_LANGUAGE = "en";
const GENERAL_WORKER_KEY = "SECTION_GENERAL";
const GENERAL_TYPE = "(Number|String|Boolean)";
const GLOBAL_ROOT_KEY = "/";
const GLOBAL_SETTING_TYPE = "(Number|String|Boolean|Array.<Number>|Array.<String>|Array.<Boolean>)";
const GLOBAL_BREADCRUMBS_SEPARATOR = " » ";
const GLOBAL__SPEC = "__SPEC";
const GLOBAL_namePartHiddenPropertiesStartWith = "__";
const GLOBAL_RENDER_DEFAULT = undefined;
const GLOBAL_TYPE_DEFAULT = "String";
const GLOBAL_DEFAULT_DEFAULT = "";
const GLOBAL_VALUE_DEFAULT = "";
const GLOBAL_IGNORE_DEFAULT = false;
const GLOBAL_PARSE_DEFAULT = true;
const GLOBAL_INTERNAL_DEFAULT = false;
const GLOBAL_FLAT_DEFAULT = false;
const GLOBAL_LOCAL_DEFAULT = false;
const GLOBAL_ONCE_DEFAULT = false;
const GLOBAL_REPEAT_DEFAULT = false;
const white = "white";
const black = "black";
const cyan = "cyan";
const red = "orange";
const rose = "salmon";
const pink = "pink";
const blue = "deepskyblue";
const yellow = "lightgoldenrodyellow";
const lime = "lime";
const green = "lightgreen";
const gray = "silver";
var DEBUG = false;
var TESTING = false;
var CHECK_ERROR_OUTPUT = false;
if (CHECK_ERROR_OUTPUT) {
    DEBUG = false;
}
var LOG_ESSENCE_CONSTRUCTOR_2_CONSOLE = false;

var registeredTests = [];

function test(outputObj) {
}




function aut(str, b = "yellow", c = "red") {
    let css = `background:${b};color:${c};font-weight:normal`;
    if (typeof str === "object") {
        let entries = Object.entries(str);
        if (entries.length === 0) {
            console.log(`%c${str}`, css)
        } else {
            entries.forEach(([key, value], idx, arr) => {
                let indent = idx === 0 ? "OBJ{" : "    ";
                if (idx + 1 < arr.length) console.log(`%c${indent}${key}: '${value}'`, css);
                else console.log(`%c${indent}${key}: '${value}'}`, css)
            })
        }
    } else {
        console.log(`%c${str}`, css)
    }
}

function auts(str, ...strs) {
    let b = "yellow";
    let c = "red";
    let css = `background:${b};color:${c};font-weight:normal`;
    while (strs.length > 0) {
        str += ` ${strs.shift()}`
    }
    console.log(`%c${str}`, css)
}

function vaut(vn, v, b = "yellow", c = "red") {
    let str = `${vn}: ${v}`;
    if (typeof v === "object") {
        let entries = Object.entries(v);
        if (entries.length != 0) {
            str = `${vn}: `;
            entries.forEach(([key, value], idx) => {
                let indent = idx === 0 ? "" : "    ";
                str += `${indent}${key}: ${value}`
            })
        }
    }
    let css = `background:${b};color:${c};font-weight:normal`;
    console.log(`%c${str}`, css)
}
class FotyError extends Error {
    static #nl = "\n     ";
    static get nl() {
        return FotyError.#nl
    }
    #caller = "";
    constructor(caller, ...params) {
        super(...params);
        this.name = "Foty Error";
        this.#caller = typeof caller === "string" ? caller : ""
    }
    errOut(YAML, cnt) {
        let prevPad = FotyError.#changePad();
        let nameKey = this.getNameKey(cnt);
        let msgKey = FotyError.getMsgKey(cnt);
        let sepKey = FotyError.getSepKey(cnt);
        if (sepKey != undefined) YAML[sepKey] = "---------------------------------------------------";
        YAML[nameKey] = this.name + " in " + this.#caller;
        YAML[msgKey] = this.message.replace(/(?<!(\n[ ]*))[ ][ ]*/g, " ");
        FotyError.#changePad(prevPad);
        return [msgKey]
    }
    static errOut(e, YAML, cnt) {
        let prevPad = FotyError.#changePad();
        let nameKey = FotyError.getNameKey(cnt);
        let msgKey = FotyError.getMsgKey(cnt);
        let sepKey = FotyError.getSepKey(cnt);
        FotyError.#changePad(prevPad);
        if (sepKey != undefined) YAML[sepKey] = "---------------------------------------------------";
        YAML[nameKey] = e.name;
        YAML[msgKey] = e.message.replace(/(?<!(\n[ ]*))[ ][ ]*/g, " ");
        return msgKey
    }
    getNameKey(cnt) {
        return cnt === undefined || typeof cnt != "number" ? "????" : cnt.pad() + "?"
    }
    static getNameKey(cnt) {
        return cnt === undefined || typeof cnt != "number" ? "????" : cnt.pad() + "?"
    }
    static getMsgKey(cnt) {
        return cnt === undefined || typeof cnt != "number" ? "¨¨¨¨" : cnt.pad() + "¨"
    }
    static getSepKey(cnt) {
        return cnt === undefined || typeof cnt != "number" ? undefined : cnt.pad()
    }
    static #changePad(padIn) {
        let prevPad = Number.prototype.pad;

        function pad(size = 3) {
            var s = String(this);
            while (s.length < size) s = "0" + s;
            return s
        }
        Number.prototype.pad = padIn === undefined ? pad : padIn;
        return prevPad
    }
}
const NL = FotyError.nl;
class SettingError extends FotyError {
    usrMsg = "";
    constructor(caller, usrMsg, ...params) {
        super(caller, ...params);
        this.name = "Setting Error";
        this.usrMsg = usrMsg === undefined ? "" : usrMsg
    }
    errOut(YAML, cnt) {
        cnt = cnt === undefined ? 0 : cnt;
        let msgKey = super.errOut(YAML, cnt);
        if (this.usrMsg.length > 0) YAML[msgKey] += NL + this.usrMsg.replace(/(?<!(\n[ ]*))[ ][ ]*/g, " ")
    }
    getNameKey(cnt) {
        return cnt === undefined ? "_ERR" : cnt.pad(4)
    }
}


function cbkIsObjectNotNullNotArray(v, gene) {
    return typeof v === "object" && v != undefined && !Array.isArray(v)
}

function cbkIsNull(v, gene) {
    return typeof v === "object" && v == undefined && v !== undefined
}

function cbkIsArray(v, gene) {
    return typeof v === "object" && Array.isArray(v)
}

function cbkInstanceOf(v, gene) {
    return v instanceof gene.ident
}

function cbkTypeOf(v, gene) {
    return typeof v === gene.ident
}

function cbkTypeOfLc(v, gene) {
    return typeof v === gene.ident.toLowerCase()
}

function cbkIsDate(v, gene) {
    return typeof v === "string"
}
class Gene {
    #cbk;
    #ident;
    get ident() {
        return this.#ident
    }
    constructor(ident, cbk) {
        if (cbk != undefined && typeof cbk != "function") throw new TypeError(`function 'Gene.constructor'${NL}2nd parameter '${cbk}' is not of type 'Function'`);
        this.#ident = ident;
        this.#cbk = cbk === undefined ? cbkTypeOf : cbk
      }
    is(v) {
        return this.#cbk(v, this)
      }
}
class GenePool {
    #genes = {};
    #defaultCallback = cbkInstanceOf;
    constructor(...params) {
        console.log("             new GenePool")
        if (params.length > 0 && typeof params[0] === "function") this.#defaultCallback = params.shift();
        while (params.length > 0) this.addGene(params.shift(), this.#defaultCallback)
      }
    addGene(ident, cbk) {
        if (this.#genes[ident] === undefined) this.#genes[ident] = new Gene(ident, cbk === undefined ? this.#defaultCallback : cbk);
        return this.#genes[ident]
      }
    hasGene(ident) {
        return this.#genes[ident] != undefined
      }
    length() {
        return Object.keys(this.#genes).length
      }
    isA(v, ident) {
        if (GenePool.isCompoundOr(ident)) {
            let ids = ident.slice(1, -1).split("|");
            return ids.some(id => this.isA(v, id), this)
        } else if (GenePool.isCompoundArr(ident)) {
            if (!Array.isArray(v)) return false;
            let innerIdent = ident.slice("Array.<".length, -1);
            return v.every(innerV => this.isA(innerV, innerIdent), this)
        } else {
            if (!this.hasGene(ident)) return false;
            return this.#genes[ident].is(v)
        }
      }
    toDisplayString() {
        return "°°°" + this.constructor.name
      }
    static isCompoundOr(id) {
        let answ = false;
        if (typeof id === "string") {
            if (id.startsWith("(") && id.endsWith(")")) answ = true
        }
        return answ
      }
    static isCompoundArr(id) {
        let answ = false;
        if (typeof id === "string") {
            if (id.startsWith("Array.<") && id.endsWith(">")) answ = true
        }
        return answ
      }
}
class Essence extends GenePool {
    static #DEFAULT_HARDCODED_SPEC_KEY = "_S_P_E_C_";
    #specificationPool = new GenePool;
    #SPEC_KEY = Essence.#DEFAULT_HARDCODED_SPEC_KEY;
    #skipped = [];
    get specificationPool() {
        return this.#specificationPool
      }
    get SPEC_KEY() {
        return this.#SPEC_KEY
      }
    get skipped() {
        return this.#skipped
      }
    get ROOT() {
        return this[Essence.#pre + "ROOT"]
      }
    get RENDER() {
        return this[Essence.#pre + "RENDER"]
      }
    get TYPE() {
        return this[Essence.#pre + "TYPE"]
      }
    get DEFAULT() {
        return this[Essence.#pre + "DEFAULT"]
      }
    get VALUE() {
        return this[Essence.#pre + "VALUE"]
      }
    get IGNORE() {
        return this[Essence.#pre + "IGNORE"]
      }
    get PARSE() {
        return this[Essence.#pre + "PARSE"]
      }
    get INTERNAL() {
        return this[Essence.#pre + "INTERNAL"]
      }
    get FLAT() {
        return this[Essence.#pre + "FLAT"]
      }
    get LOCAL() {
        return this[Essence.#pre + "LOCAL"]
      }
    get ONCE() {
        return this[Essence.#pre + "ONCE"]
      }
    get REPEAT() {
        return this[Essence.#pre + "REPEAT"]
      }
    static #pre = GLOBAL_namePartHiddenPropertiesStartWith;
      static #RENDER_DEFT = GLOBAL_RENDER_DEFAULT;
      static #TYPE_DEFT = GLOBAL_TYPE_DEFAULT;
      static #DEFAULT_DEFT = GLOBAL_DEFAULT_DEFAULT;
      static #VALUE_DEFT = GLOBAL_VALUE_DEFAULT;
      static #IGNORE_DEFT = GLOBAL_IGNORE_DEFAULT;
      static #PARSE_DEFT = GLOBAL_PARSE_DEFAULT;
      static #INTERNAL_DEFT = GLOBAL_INTERNAL_DEFAULT;
      static #FLAT_DEFT = GLOBAL_FLAT_DEFAULT;
      static #LOCAL_DEFT = GLOBAL_LOCAL_DEFAULT;
      static #ONCE_DEFT = GLOBAL_ONCE_DEFAULT;
      static #REPEAT_DEFT = GLOBAL_REPEAT_DEFAULT;
    constructor(spec_key = Essence.#DEFAULT_HARDCODED_SPEC_KEY) {
        //console.log("           new Essence")
        super();
        this.#SPEC_KEY = spec_key;
        this.addGene(Object);
        this.addGene(Gene);
        this.addGene(GenePool);
        this.addGene(Essence)
      }
    parse(literal, parent, name) {
        if (parent != undefined && !this.isA(parent, GenePool)) throw new TypeError(`function 'Essence.parse'${NL}2nd parameter '${parent}' is not of type 'GenePool'`);
        if (literal != undefined && typeof literal != "object") throw new TypeError(`function 'Essence.parse'${NL}1st parameter '${literal}' is not of type 'Object'`);
        let un;
        let p = parent;
        let specLit = {};
        if (literal != un) specLit = literal[this.#SPEC_KEY];
        if (typeof specLit == "boolean") {
            specLit = literal;
            specLit["FLAT"] = true
        }
        if (specLit === un) specLit = {};
        if (specLit["PARSE"] === false) return;

        function changeToHiddenProp(me, lit, specL, key, type, p, def, val, name) {
            let v;
            if (val != undefined) v = val;
            else {
                let given = specL[key];
                delete specL[key];
                if (!me.#validateOrInform(given, type, key)) given = undefined;
                v = given != undefined ? given : p != undefined ? p[key] : def
            }
            Object.defineProperty(me, Essence.#pre + key, {
                value: v,
                writable: false,
                configurable: false,
                enumerable: false
            });
            try {
                Object.defineProperty(lit, Essence.#pre + key, {
                    value: v,
                    writable: false,
                    configurable: false,
                    enumerable: false
                })
            } catch (e) {
                let col = undefined;
                if (lit != undefined && Essence.getINTERNAL(lit)) col = red;
                if (!TESTING && !col && !CHECK_ERROR_OUTPUT) {
                    vaut(name, e, col);
                    throw e
                }
            }
        }
        let hide = changeToHiddenProp;
        let l = literal;
        let s = specLit;
        let n = name;
        hide(this, l, s, "ROOT", "Boolean", p, un, parent == un, n);
        hide(this, l, s, "RENDER", "Boolean", p, Essence.#RENDER_DEFT, un, n);
        hide(this, l, s, "TYPE", "String", p, Essence.#TYPE_DEFT, un, n);
        hide(this, l, s, "IGNORE", "Boolean", p, Essence.#IGNORE_DEFT, un, n);
        hide(this, l, s, "PARSE", "Boolean", p, Essence.#PARSE_DEFT, un, n);
        hide(this, l, s, "INTERNAL", "Boolean", p, Essence.#INTERNAL_DEFT, un, n);
        hide(this, l, s, "FLAT", "Boolean", un, Essence.#FLAT_DEFT, un, n);
        hide(this, l, s, "LOCAL", "Boolean", p, Essence.#LOCAL_DEFT, un, n);
        hide(this, l, s, "ONCE", "Boolean", un, Essence.#ONCE_DEFT, un, n);
        hide(this, l, s, "REPEAT", "Boolean", un, Essence.#REPEAT_DEFT, un, n);
        hide(this, l, s, "DEFAULT", this.TYPE, un, Essence.#DEFAULT_DEFT, un, n);
        hide(this, l, s, "VALUE", this.TYPE, un, Essence.#VALUE_DEFT, un, n);
        if (literal != un) delete literal[this.#SPEC_KEY];
      }
    #validateOrInform(value, type, name) {
        let ok = value === undefined || this.#specificationPool.isA(value, type);
        if (!ok) {
            let errObj = {};
            errObj.name = name;
            errObj.value = value;
            errObj.expectedType = type;
            this.#skipped.push(errObj)
        }
        return ok
      }
    static doParse(literal) {
        let answ = true;
        if (typeof literal == "object" && literal != null) {
            let spec = literal["__SPEC"];
            if (typeof spec == "object" && spec != null) {
                if (spec["PARSE"] !== undefined) answ = spec["PARSE"] !== false
            }
        }
        return answ
      }
    static getROOT(lit) {
        return lit[Essence.#pre + "ROOT"]
      }
    static getRENDER(lit) {
        return lit[Essence.#pre + "RENDER"]
      }
    static getTYPE(lit) {
        return lit[Essence.#pre + "TYPE"]
      }
    static getDEFAULT(lit) {
        return lit[Essence.#pre + "DEFAULT"]
      }
    static getVALUE(lit) {
        return lit[Essence.#pre + "VALUE"]
      }
    static getIGNORE(lit) {
        return lit[Essence.#pre + "IGNORE"]
      }
    static getPARSE(lit) {
        return lit[Essence.#pre + "PARSE"]
      }
    static getINTERNAL(lit) {
        return lit[Essence.#pre + "INTERNAL"]
      }
    static getFLAT(lit) {
        return lit[Essence.#pre + "FLAT"]
      }
    static getLOCAL(lit) {
        return lit[Essence.#pre + "LOCAL"]
      }
    static getONCE(lit) {
        return lit[Essence.#pre + "ONCE"]
      }
    static getREPEAT(lit) {
        return lit[Essence.#pre + "REPEAT"]
      }
}
class AEssence extends Essence {
    static #SPEC_KEY = GLOBAL__SPEC;
    static get SPEC_KEY() {
        return AEssence.#SPEC_KEY
      }
    constructor(literal, parent, name) {
        //console.log("         new AEssence")
        super(AEssence.#SPEC_KEY);
        if (parent != undefined && !this.isA(parent, GenePool)) throw new TypeError(`function 'AEssence.constructor'${NL}2nd parameter '${parent}' is not of type 'GenePool'`);
        if (literal != undefined && typeof literal != "object") throw new TypeError(`function 'AEssence.constructor'${NL}1st parameter '${literal}' is not of type 'Object'`);
        this.addGene(AEssence);
        this.specificationPool.addGene("String", cbkTypeOfLc);
        this.specificationPool.addGene("Number", cbkTypeOfLc);
        this.specificationPool.addGene("Boolean", cbkTypeOfLc);
        this.specificationPool.addGene("Function", cbkTypeOfLc);
        this.specificationPool.addGene("Object", cbkTypeOfLc);
        this.specificationPool.addGene("Date", cbkIsDate);
        this.parse(literal, parent, typeof name == "symbol" ? "_Symbol_" + GLOBAL_SYMBOL_COUNTER++ : name)
      }
}
class BreadCrumbs extends AEssence {
    static sep = GLOBAL_BREADCRUMBS_SEPARATOR;
    #name;
    #parent;
    #literal;
    get literal() {
        return this.#literal
      }
    get parent() {
        return this.#parent
      }
    get name() {
        return this.#name
      }
    get root() {
        return this.ROOT ? this : this.parent.root
      }
    constructor(literal, name, parent) {
        console.log("       new Breadcrumbs")
        super(literal, parent, typeof name == "symbol" ? "_Symbol_" + GLOBAL_SYMBOL_COUNTER++ : name);
            this.addGene(BreadCrumbs);
            this.addGene("undefined", cbkTypeOf);
            this.addGene("null", cbkIsNull);
            this.addGene("boolean", cbkTypeOf);
            this.addGene("number", cbkTypeOf);
            this.addGene("bigint", cbkTypeOf);
            this.addGene("string", cbkTypeOf);
            this.addGene("symbol", cbkTypeOf);
            this.addGene("function", cbkTypeOf);
            this.addGene("date", cbkIsDate);
            this.addGene("object", cbkIsObjectNotNullNotArray);
            this.addGene("array", cbkIsArray);
        if (!this.isA(parent, "undefined")) this.throwIfNotOfType(parent, "parent", BreadCrumbs);
        this.#parent = parent;
        this.throwIfUndefined(name, "name");
        this.throwIfNotOfType(name, "name", "(string|symbol)");
        if (typeof name === "symbol") this.#name = "_Symbol_" + GLOBAL_SYMBOL_COUNTER++;
        else this.#name = name;
        if (!this.isA(literal, "undefined")) this.throwIfNotOfType(literal, "literal", "object");
        this.#literal = literal;
        if (this.skipped.length) {
            let str = `Breadcrumbs: ${this.toBreadcrumbs()}
            Not all specification values had been correct. Wrong values
            are skipped and parents setting or hardcoded default is used.
            Skipped values are: `;
            this.skipped.forEach(skip => {
                str += "\nName: " + skip.name;
                str += ", value: " + skip.value;
                str += ", expected type: " + skip.expectedType
            });
            console.log(str)
        }
      }
    toDisplayString() {
        if (typeof this.#name === "string") return "°°°" + this.constructor.name + " " + this.#name;
        else if (typeof this.#name === "symbol") return "°°°" + this.constructor.name + " " + "_Symbol_" + GLOBAL_SYMBOL_COUNTER++
      }
    toBreadcrumbs() {
        let breadcrumbs = "";
        let sep = "";
        if (!this.isA(this.#parent, "undefined")) {
            if (this.isA(this.#parent, BreadCrumbs)) breadcrumbs += this.#parent.toBreadcrumbs();
            else breadcrumbs += "(" + this.#parent + ")";
            sep = BreadCrumbs.sep
        }
        breadcrumbs += sep + this.#name;
        return breadcrumbs
      }
    throwIfUndefined(val, vName, fuName = "constructor", msg = "is undefined", usrMsg = "") {
        if (typeof vName != "string") vName = "";
        if (typeof fuName != "string") fuName = "";
        if (typeof msg != "string") msg = "is undefined";
        if (typeof usrMsg != "string") usrMsg = "";
        if (this.isA(val, "undefined")) throw new SettingError(`${this.constructor.name}.${fuName}`, usrMsg, `Path: ${this.toBreadcrumbs()}${NL}'${vName}' ${msg}`)
      }
    throwIfNotOfType(val, vName, type, fuName = "constructor", msg = "is not of type", usrMsg = "") {
        let typeStr = this.isA(type, Object) ? type.toString().split(" ")[1] : type;
        if (typeof vName != "string") vName = "";
        if (typeof fuName != "string") fuName = "";
        if (typeof msg != "string") msg = " is not of type";
        if (typeof usrMsg != "string") usrMsg = "";
        if (!this.isA(val, type)) throw new SettingError(`${this.constructor.name}.${fuName}`, usrMsg, `Path: ${this.toBreadcrumbs()}${NL}'${vName}' '${val}' ${msg} '${typeStr}'`)
      }
}
class Setting extends BreadCrumbs {
    static #ROOT_KEY = GLOBAL_ROOT_KEY;
    static #globalType = GLOBAL_SETTING_TYPE;
    #workersTypeForChildren;
    static #workers = {};
    #works = {};
    #children = {};
    static set worker(workerClass) {
        Setting.#workers[workerClass.workerKey] = workerClass
      }
    get workersTypeForChildren() {
        return this.#workersTypeForChildren
      }
    set workersTypeForChildren(type) {
        this.#workersTypeForChildren = type
      }
    get children() {
        return this.#children
      }
    static deepCopy(literal) {
      let newLiteral
      let type = typeof(literal)
      if(type === "object") {
        if(literal === null) {
          type = "null"
        } else if (Array.isArray(literal)) {
          type = "array"
        }
      }
      if(type !== "object") {
        switch(type) {
        case "array":
          newLiteral = [];
          literal.forEach(ele => {
              newLiteral.push(Setting.deepCopy(ele))
          });
          break
        case "function":
        case "symbol":
        case "null":
        case "undefined":
        case "boolean":
        case "number":
        case "bigint":
        case "string":
          newLiteral = literal
          break
        case "object":
          throw new TypeError("Dies kann nicht passieren")
          break
        default:
          throw new TypeError("Dies kann nur passieren, wenn JavaScript weitere Typen erhält")
          break
        }
      } else {
        newLiteral = {}
        if(Object.keys(Object.getOwnPropertyDescriptors(literal)).length !==
          Object.keys(literal).length) {
          ;//vaut("Setting:deepCopy",  "literal has Symbol properties", green, black)
        }
        for (const [k, v] of Object.entries(literal)) {
          newLiteral[k] = Setting.deepCopy(v)
        }
      }
      return newLiteral
    }
    constructor(literal, key = undefined, parent = undefined, add2parent = false) {
        vaut("    NEW SETTING", key, "yellow", black)
        super(literal, key === undefined ? Setting.#ROOT_KEY : key, parent);
        this.addGene(Setting);
        this.throwIfUndefined(literal, "literal");
        if (!this.isA(parent, "undefined")) this.throwIfNotOfType(parent, "parent", Setting);
        if (!this.ROOT) this.#workersTypeForChildren = this.parent.workersTypeForChildren;
        if (add2parent && !this.ROOT) this.parent.children[key] = this;
        this.#parse();
        vaut("    ENDE NEW SETTING, es folgt literal", key, "yellow", black)
        console.log(Setting.deepCopy(literal))
    }
    #parse() {
      let un;
        console.log("    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Setting #parse: " + this.ROOT)
        let type = !this.ROOT && this.parent.workersTypeForChildren !== undefined ?
                 this.parent.workersTypeForChildren :
                 Setting.#globalType;
        for (const [childkey, childval] of Object.entries(this.literal)) {
            if (!AEssence.doParse(childval)) continue;
            if (Setting.#isWorkerKey(childkey)) {
                this.#works[childkey] = new Setting.#workers[childkey](childval, childkey, this)
            } else if (this.isA(childval, "object")) {
                let aEss = this.#essenceOfAtom(this.literal, childkey, type);
                if (aEss != un) this.#children[childkey] = aEss;
                else this.#children[childkey] = new Setting(childval, childkey, this)
            } else {
                let litAtom = {
                    VALUE: this.literal[childkey],
                    __SPEC: true
                };
                this.literal[childkey] = litAtom;
                this.#children[childkey] = this.#essenceOfAtom(this.literal, childkey, type)
            }
         }
         console.log("    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Ende Setting #parse: " + this.ROOT)
        }
    #essenceOfAtom(literal, key, type) {
      if (typeof literal != "object") return undefined;
        let aEss = undefined;
        let specLit = literal[key][AEssence.SPEC_KEY];
        if (typeof specLit == "boolean") {
            if (specLit == true && typeof type == "string" && literal[key]["TYPE"] == undefined) literal[key]["TYPE"] = type;
            aEss = new AEssence(literal[key], this, key);
            literal[key] = aEss.VALUE
        }
        return aEss
        }
    iterator() {} [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                let keys = Object.keys(this.#children);
                if (index < keys.length) return {
                    value: [keys[index], this.#children[keys[index++]]],
                    done: false
                };
                else return {
                    done: true
                }
            }
        }
      }
    has(key) {
        if (typeof key == "string") {
            let subKeys = key.split(".");
            if (subKeys.length > 1) {
                if (this.#works[subKeys[0]] !== undefined) return this.#works[subKeys.shift()].has(subKeys.join("."));
                else if (this.#children[subKeys[0]] !== undefined && this.isA(this.#children[subKeys[0]], Setting)) return this.#children[subKeys.shift()].has(subKeys.join("."));
                else return false
            }
        }
        if (this.#works[key]) return true;
        else if (this.#children[key]) return true;
        else return false
      }
    at(key) {
        if (typeof key == "string") {
            let subKeys = key.split(".");
            if (subKeys.length > 1) {
                if (this.#works[subKeys[0]] !== undefined) return this.#works[subKeys.shift()].at(subKeys.join("."));
                if (this.#children[subKeys[0]] !== undefined) return this.#children[subKeys.shift()].at(subKeys.join("."))
            }
        }
        if (this.#works[key]) return this.#works[key];
        else return this.#children[key]
      }
    getValue(key, ...params) {
        let works_and_subkeys = this.#getWorks(key);
        if (works_and_subkeys !== undefined) {
            if (params === undefined) return works_and_subkeys[0].getValue(works_and_subkeys[1]);
            else return works_and_subkeys[0].getValue(works_and_subkeys[1], ...params)
        } else {
            if (this.at(key) !== undefined) return this.at(key).VALUE
        }
      }
    #getWorks(key) {
        let answ;
        if (typeof key == "string") {
            let subKeys = key.split(".");
            let workerKey = subKeys.length > 1 ? subKeys[0] : key;
            if (this.#works[workerKey] !== undefined) {
                answ = [];
                answ.push(this.#works[workerKey]);
                subKeys.shift();
                answ.push(subKeys.join("."))
            }
        }
        return answ
      }
    toPlainString(indent = "\n") {
        let plainString = "";
        let sectionKeys = Object.keys(this.#works);
        for (const key in this.#works) {
            if (this.#works.hasOwnProperty(key)) {
                plainString += indent + key + ": ";
                plainString += "{";
                plainString += this.#works[key].toPlainString(indent + "  ");
                plainString += indent + "}";
                plainString += ","
            }
        }
        for (const [key, value] of this) {
            plainString += indent + key + ": ";
            if (value.FLAT) {
                plainString += Setting.valueString(value.VALUE)
            } else {
                plainString += "{";
                plainString += value.toPlainString(indent + "  ");
                plainString += indent + "}"
            }
            plainString += ","
        }
        return plainString
      }
    static valueString(value) {
        let valueString = "";
        if (typeof value === "function") {
            valueString += value.name
        } else if (typeof value === "string") {
            valueString += '"' + value + '"'
        } else if (typeof value === "boolean") {
            valueString += value
        } else if (Array.isArray(value)) {
            valueString += "[";
            value.forEach(ele => {
                valueString += Setting.valueString(ele);
                valueString += ","
            });
            valueString += "]"
        } else {
            valueString += value
        }
        return valueString
      }
    getFrontmatterYAML() {
        let frontmatterYAML = {};
        for (const [key, value] of this) {
            if (value.FLAT) {
                if (value.RENDER != undefined && !value.RENDER && !value.IGNORE) 
                  frontmatterYAML[key] = value.VALUE
            } else {
                Object.assign(frontmatterYAML, value.getFrontmatterYAML())
            }
        }
        return frontmatterYAML
      }
    getRenderYAML() {
        let renderYAML = {};
        for (const [key, value] of Object.entries(this.#children)) {
            if (value.FLAT) {
                if (value.RENDER && !value.IGNORE) renderYAML[key] = value.VALUE
            } else Object.assign(renderYAML, value.getRenderYAML())
        }
        return renderYAML
      }
    getGeneralYAML() {
        let generalYAML = {};
        for (const [key, value] of this) {
            if (value.FLAT) {
                if (value.RENDER == undefined && !value.IGNORE) generalYAML[key] = value.VALUE
            } else {
                Object.assign(generalYAML, value.getGeneralYAML())
            }
        }
        return generalYAML
      }
    showVALUES(depth) {
        let indent = "";
        for (let d = depth; d > 0; d--) indent += "    ";
        for (const [key, value] of this) {
            if (typeof value.VALUE == "function") {
                vaut(indent + key + ".VALUE", "FUNCTION")
            } else {
                vaut(indent + key, value.VALUE)
            }
            if (value.isA(value, Setting)) value.showVALUES(depth + 1)
        }
      }
    showVALUE_DEFAULT(depth) {
        let indent = "";
        for (let d = depth; d > 0; d--) indent += "    ";
        for (const [key, value] of Object.entries(this.#children)) {
            if (typeof value.VALUE == "function") vaut(indent + key + ".VALUE", "FUNCTION");
            else if (typeof value.VALUE != "string" || value.VALUE.length > 0) vaut(indent + key + ".VALUE", value.VALUE);
            if (typeof value.DEFAULT != "string" || value.DEFAULT.length > 0) vaut(indent + key + ".DEFAULT", value.DEFAULT);
            if (typeof value.VALUE == "string" && value.VALUE.length == 0 && typeof value.DEFAULT == "string" && value.DEFAULT.length == 0) vaut(indent + key + ".DEFAULT|VALUE", "-----");
            if (value.isA(value, Setting)) {
                value.showVALUE_DEFAULT(depth + 1)
            }
        }
      }
    showWhatGoesOut(depth) {
        let indent = "";
        if (depth == 0) vaut("RENDER|IGNORE|REPEAT|FLAT", "KEY:VALUE:DEFAULT");
        for (let d = depth; d > 0; d--) indent += "    ";
        for (const [key, value] of this) {
            let render = value.RENDER + "|";
            let ignore = value.IGNORE + "|";
            let repeat = value.REPEAT + "|";
            let flat = value.FLAT;
            let val = value.VALUE;
            let def = value.DEFAULT;
            if (typeof value.VALUE == "function") val = "FUNCTION";
            if (typeof value.DEFAULT == "function") def = "FUNCTION";
            vaut(indent + render + ignore + repeat + flat, key + ":" + val + ":" + def);
            if (value.isA(value, Setting)) value.showWhatGoesOut(depth + 1)
        }
      }
    static #isWorkerKey(key) {
        return Setting.#workers[key] !== undefined
      }
}
class GeneralWorker extends Setting {
    static #KEY = GENERAL_WORKER_KEY;
    static #localType = GENERAL_TYPE;
    static get workerKey() {
        return GeneralWorker.#KEY
      }
    constructor(literal, key, parent) {
        vaut("new GENERALWORKER", key)
        console.log(Setting.deepCopy(literal))
        parent.workersTypeForChildren = GeneralWorker.#localType;
        super(literal, key, parent);
        this.addGene(GeneralWorker);
        this.throwIfUndefined(parent, "parent");
        this.throwIfUndefined(key, "key")
      }
    getValue(key, fallback) {
        let atom = this.at(key);
        let value;
        if (atom !== undefined) {
            value = atom.VALUE
        } else {
            value = fallback
        }
        return value
      }
}
Setting.worker = GeneralWorker;
class LocalizationWorker extends Setting {
    static #KEY = LOCALIZATION_WORKER_KEY;
    static #localType = LOCALIZATION_TYPE;
    #defaultLang = FALLBACK_LANGUAGE;
    static get workerKey() {
        return LocalizationWorker.#KEY
    }
    set defaultLang(lang) {
        if (typeof lang == "string") this.#defaultLang = lang
    }
    constructor(literal, key, parent) {
        vaut("new LOCALIZATIONWORKER",key)
        console.log(Setting.deepCopy(literal))
        parent.workersTypeForChildren = LocalizationWorker.#localType;
        super(literal, key, parent);
        this.addGene(LocalizationWorker);
        this.throwIfUndefined(parent, "parent");
        this.throwIfUndefined(key, "key");
        if (this.root.at(GENERAL_WORKER_KEY) != undefined) this.#defaultLang = this.root.at(GENERAL_WORKER_KEY).getValue("LANGUAGE", FALLBACK_LANGUAGE)
    }
    getValue(key, fallbackIn, language) {
        let atom = this.at(key);
        if (atom != undefined && Array.isArray(atom.VALUE)) {
            let lang = language == undefined ? this.#defaultLang : language;
            let fallback = fallbackIn;
            for (const langPair of atom.VALUE) {
                if (Array.isArray(langPair) && langPair.length > 1) {
                    if (langPair[0] == lang) {
                        return langPair[1]
                    }
                    if (fallback == undefined) fallback = langPair[1];
                    if (langPair[0] == this.#defaultLang) fallback = langPair[1]
                } else break
            }
            if (fallback != undefined) return fallback;
            if (atom.VALUE.length > 1) return atom.VALUE[1]
        }
        if (atom != undefined) return atom.VALUE
    }
}
Setting.worker = LocalizationWorker;
class DialogWorker extends Setting {
    static #KEY = DIALOG_WORKER_KEY;
    static #localType = DIALOG_TYPE;
    static get workerKey() {
        return DialogWorker.#KEY
    }
    constructor(literal, key, parent) {
        vaut("new DIALOGWORKER", key)
        console.log(Setting.deepCopy(literal))
        parent.workersTypeForChildren = DialogWorker.#localType;
        super(literal, key, parent);
        this.addGene(DialogWorker);
        this.throwIfUndefined(parent, "parent");
        this.throwIfUndefined(key, "key")
    }
}
Setting.worker = DialogWorker;
class TypesWorker extends Setting {
    static #KEY = TYPES_WORKER_KEY;
    static #localType = TYPES_TYPE;
    static get workerKey() {
        return TypesWorker.#KEY
    }
    static #plainStaticString = "";
    #plainString = "";
    constructor(literal, key, parent) {
        vaut("NEW TYPESWORKER",key)
        console.log(Setting.deepCopy(literal))
        parent.workersTypeForChildren = TypesWorker.#localType;
        TypesWorker.#toPlainString(literal);
        TypesWorker.#cpRepeatedDefaults(literal);
        super(literal, key, parent);
        this.#plainString = TypesWorker.#plainStaticString;
        TypesWorker.#plainStaticString = "";
        this.addGene(TypesWorker);
        this.throwIfUndefined(parent, "parent");
        this.throwIfUndefined(key, "key");
      }
    static #toPlainString(literal, indent = "\n  ") {
        let indentToUse = indent;
        for (const [key, value] of Object.entries(literal)) {
            if (key == AEssence.SPEC_KEY) {
                indentToUse = " "
            }
            TypesWorker.#plainStaticString += indentToUse + key + ": ";
            if (typeof value != "object" ||
                Object.getOwnPropertyNames(value).length === 0 ||
                Array.isArray(value)) {
                TypesWorker.#plainStaticString += Setting.valueString(value)
            } else {
                TypesWorker.#plainStaticString += "{";
                TypesWorker.#toPlainString(value, indentToUse + "  ");
                TypesWorker.#plainStaticString += indentToUse + "}"
            }
            TypesWorker.#plainStaticString += ",";
            if (key == AEssence.SPEC_KEY) {
                indentToUse = indent
            }
        }
      }
    static #cpRepeatedDefaults(literal) {
        if (typeof literal != "object" || literal == null) return;
        let defaults;
        let defaultskey;
        for (const [key, value] of Object.entries(literal)) {
            if (value[AEssence.SPEC_KEY] != undefined && value[AEssence.SPEC_KEY].REPEAT == true && value[AEssence.SPEC_KEY].IGNORE != true) {
                defaults = value;
                defaultskey = key;
                value[AEssence.SPEC_KEY].REPEAT = undefined;
                break
            }
        }
        if (defaults != undefined) {
            for (const [key, value] of Object.entries(literal)) {
                if (key == AEssence.SPEC_KEY || key == defaultskey) continue;
                for (const [defkey, defvalue] of Object.entries(defaults)) {
                    TypesWorker.#deepCopy(defvalue, value, defkey, key, 0)
                }
            }
            delete literal[defaultskey]
        }
      }
    static #deepCopy(what, to, name, toname, depth) {
        if (typeof what != "object") {
            if (to[name] === undefined) {
                to[name] = what
            }
        } else if (typeof what[AEssence.SPEC_KEY] == "boolean") {
            if (to[name] === undefined) {
                to[name] = {};
                let defaultval;
                for (const [newkey, newvalue] of Object.entries(what)) {
                    to[name][newkey] = newvalue;
                    if (newkey === "DEFAULT") {
                        defaultval = newvalue
                    }
                }
                if (to[name]["VALUE"] === undefined) {
                    to[name]["VALUE"] = defaultval
                }
                to[name][AEssence.SPEC_KEY] = true
            }
        } else {
            if (to[name] === undefined) {
                to[name] = {}
            }
            for (const [whatkey, whatvalue] of Object.entries(what)) {
                TypesWorker.#deepCopy(whatvalue, to[name], whatkey, name, depth + 1)
            }
        }
      }
    toPlainString(indent) {
        return this.#plainString
      }
    getValue(key, fallback) {
        let atom = this.at(key);
        let value;
        if (atom !== undefined) {
            value = atom.VALUE
        } else {
            value = fallback
        }
        return value
      }
}
Setting.worker = TypesWorker;
class DialogError extends Error {
    constructor(message, ...params) {
        super(message, ...params);
        this.name = "DialogError"
    }
    toString() {
        return " °°" + this.constructor.name + " " + this.name
    }
}
class Templater {
    #tp;
    #app;
    #gen;
    #loc;
    #dlg;
    #typ;
    #cfgname;
    #cfg;
    #cfgComputedValues = {};
    #isNew = false;
    #filetitle;
    #notename;
    get notetype() {
        return this.#cfgname
    }
    constructor(setting, tp, app) {
        this.#tp = tp;
        this.#app = app;
        this.#gen = setting.at(GENERAL_WORKER_KEY);
        this.#loc = setting.at(LOCALIZATION_WORKER_KEY);
        this.#dlg = setting.at(DIALOG_WORKER_KEY);
        this.#typ = setting.at(TYPES_WORKER_KEY);
        if (this.#gen == undefined) this.#gen = new GeneralWorker({}, GENERAL_WORKER_KEY, setting);
        if (this.#loc == undefined) this.#loc = new LocalizationWorker({}, LOCALIZATION_WORKER_KEY, setting);
        if (this.#dlg == undefined) this.#dlg = new DialogWorker({}, DIALOG_WORKER_KEY, setting);
        if (this.#typ == undefined) this.#typ = new TypesWorker({}, TYPES_WORKER_KEY, setting);
        this.#filetitle = this.#tp.file.title
    }
    async doTheWork() {
        try {
            this.#checkIsNewNote();
            await this.#findType();
            await this.#findName();
            await this.#rename()
        } catch (e) {
            throw e
        }
    }
    applyFunctions(vals) {
        for (let [key, value] of Object.entries(vals)) {
            if (typeof value == "function") {
                vals[key] = value(this.#notename, this.#cfgname, this.#cfg, this.#tp, this.#app, this.#cfgComputedValues)
            }
        }
    }
    #checkIsNewNote() {
        let answer = false;
        let lang_array = [FALLBACK_LANGUAGE];
        let new_titles_array = [];
        let lang = this.#gen.getValue("LANGUAGE", FALLBACK_LANGUAGE);
        if (0 != lang.localeCompare(FALLBACK_LANGUAGE)) {
            lang_array.push(lang)
        }
        lang_array.forEach(lang => {
            let title = this.#loc.getValue("TITLE_NEW_FILE", "", lang);
            if (title == undefined) title = "Untitled";
            if (title.length > 0) {
                new_titles_array.push(title)
            }
        });
        new_titles_array.some(prefix => {
            this.#isNew = this.#filetitle.startsWith(prefix) ? true : false;
            return this.#isNew
        })
    }
    async #findType() {
        let types_f = [];
        let types_m = [];
        let types_wrong_folder = [];

        function typesFromFolder(me) {
            let noteWithPath = me.#tp.file.path(true);
            let pathParts = noteWithPath.split("\\");
            if (pathParts.length < 2) {
                pathParts = noteWithPath.split("/")
            }
            pathParts.pop();
            let depthArr = [];
            for (const [key, value] of me.#typ) {
                let folders = me.#typ.getValue(key + ".folders");
                if (folders == undefined) continue;
                if (typeof folders == "string") {
                    let f = String(folders);
                    folders = [f]
                }
                let containssubpaths = folders.some(f => {
                    let hasdelimiter = f.includes("\\");
                    if (!hasdelimiter) {
                        hasdelimiter = f.includes("/")
                    }
                    return hasdelimiter
                });
                let depth = 0;
                let answer = false;
                if (containssubpaths) {
                    folders.some(folder => {
                        let factor = 0;
                        let idx = -1;
                        if (folder.includes("\\") || folder.includes("/")) {
                            idx = noteWithPath.lastIndexOf(folder);
                            factor = (folder.match(/\//g) || []).length;
                            if (factor == 0) {
                                factor = (folder.match(/\\/g) || []).length
                            }
                        }
                        if (idx > -1) {
                            depth = factor * 100 + idx;
                            answer = true;
                            console.log(folders[0] + " " + depth + " " + noteWithPath)
                        }
                    })
                }
                if (answer == false) {
                    answer = pathParts.some(part => {
                        depth++;
                        return folders.some(folder => {
                            if (0 == part.localeCompare(folder)) {
                                return true
                            }
                        })
                    })
                }
                if (answer == true) {
                    if (depthArr.some(d => d > depth)) {
                        answer = false
                    } else {
                        if (depthArr.some(d => depth > d)) {
                            for (let i = 0; i < depthArr.length; i++) {
                                if (depth > depthArr[i]) {
                                    types_wrong_folder.push(types_f[i]);
                                    types_f.splice(i, 1);
                                    depthArr.splice(i--, 1)
                                }
                            }
                        }
                        types_f.push(key);
                        depthArr.push(depth)
                    }
                }
                if (answer == false) {
                    types_wrong_folder.push(key)
                }
            }
        }

        function typesFromMarker(me) {
            let type = undefined;
            let noMarker = [];
            let markerlen = 0;
            let typelen = 0;
            for (const [key, value] of me.#typ) {
                if (value.IGNORE) continue;
                if (types_f.length > 0 && !types_f.includes(key)) continue;
                if (types_wrong_folder.length > 0 && types_wrong_folder.includes(key)) continue;
                let marker = me.#typ.getValue(key + ".marker");
                markerlen = marker === undefined ? 0 : marker.length;
                if (markerlen == 0) {
                    noMarker.push(key)
                } else {
                    if (me.#filetitle.startsWith(marker)) {
                        if (markerlen > typelen) {
                            typelen = markerlen;
                            type = key
                        }
                    }
                }
            }
            if (type != undefined) {
                types_m.push(type)
            } else {
                types_m = [...noMarker]
            }
        }

        function defaultTypeName(me) {
            let defaulttypename = me.#typ.DEFAULT;
            if (defaulttypename == undefined || defaulttypename == "") {
                for (const [key, value] of me.#typ) {
                    if (value.IGNORE) continue;
                    defaulttypename = key;
                    break
                }
            }
            if (defaulttypename == undefined) {
                defaulttypename = "note"
            }
            return defaulttypename
        }
        let defaulttypename = defaultTypeName(this);
        typesFromFolder(this);
        if (!this.#isNew) {
            typesFromMarker(this)
        }
        let type_prompt = this.#loc.getValue("TYPE_PROMPT", "Choose Type");
        if (type_prompt == undefined) type_prompt = "Choose Type";
        let type_max_entries = this.#dlg.getValue("TYPE_MAX_ENTRIES", 10);
        try {
            if (types_m.length > 1) {
                this.#cfgname = await this.#tp.system.suggester(types_m, types_m, true, type_prompt, type_max_entries)
            } else if (types_f.length > 1) {
                this.#cfgname = await this.#tp.system.suggester(types_f, types_f, true, type_prompt, type_max_entries)
            } else {
                this.#cfgname = types_m.length > 0 ? types_m[0] : types_f.length > 0 ? types_f[0] : defaulttypename
            }
        } catch (e) {
            throw new DialogError("Choose Value Dialog cancelled")
        }
        this.#cfg = this.#typ.at(this.#cfgname);
        if (this.#cfg == undefined) this.#cfg = this.#typ
    }
    async #findName() {
        this.#notename = "";
        if (!this.#isNew) {
            let marker = this.#cfg.getValue("marker", "");
            if (marker != undefined)
                if (this.#filetitle.startsWith(marker)) this.#notename = this.#filetitle.substring(marker.length);
                else this.#notename = this.#filetitle;
            else this.#notename = this.#filetitle
        } else {
            let fu = this.#cfg.getValue("title_date_function", undefined);
            if (typeof fu == "function") {
                this.#notename = await fu(this.#notename, this.#cfgname, this.#cfg, this.#tp, this.#app, this.#cfgComputedValues)
            }
        }
        if (this.#notename == "") {
            let defprompt = this.#loc.getValue("NAME_PROMPT", "Pure Name of Note");
            if (defprompt == undefined) defprompt = "Pure Name of Note";
            let prompt = this.#cfg.getValue("name_prompt");
            if (prompt == undefined || prompt.length == 0) {
                prompt = defprompt
            }
            try {
                this.#notename = await this.#tp.system.prompt(prompt, "", true)
            } catch (e) {
                throw new DialogError("Choose Notename Dialog cancelled")
              }
        }
    }
    async #rename() {
        function purepath(value) {
            let delimiter = "/";
            let substrings = value.split(delimiter);
            if (substrings.length < 2) {
                delimiter = "\\";
                substrings = value.split(delimiter)
            }
            return substrings.length === 1 ? "" : substrings.slice(0, -1).join(delimiter) + delimiter
        }
        try {
            if (this.#notename.length > 0) {
                let marker = this.#cfg.getValue("marker", "");
                if (marker == undefined) marker = "";
                let name_end = this.#cfg.getValue("name_end", "");
                if (name_end == undefined) name_end = "";
                let newname = marker + this.#notename + name_end;
                let path = purepath(this.#tp.file.path(true));
                let purenewname = String(newname);
                let num = 0;
                if (await this.#tp.file.exists(path + newname + ".md")) {
                    let create_dupl = this.#cfg.getValue("create_same_named_file", false);
                    if (create_dupl == undefined) create_dupl = false;
                    if (create_dupl == true) {
                        while (await this.#tp.file.exists(path + newname + ".md")) {
                            newname = purenewname + " " + ++num
                        }
                    }
                }
                await this.#tp.file.rename(newname)
            }
        } catch (e) {
            this.#tp.system.prompt("Renaming not possible or supported", "ABORT\n        Renaming not possible or supported in this folder\n        Press ESCAPE or any key", false, true);
            throw new DialogError("Renaming not possible or supported")
          }
    }
}
async function poty(tp, app) {
    let checkErrorOutputYAML = {};
    let testYAML = {};
    let frontmatterYAML = {};
    let renderYAML = {
        ____: ""
    };
    let dbgYAML = {};
    if (CHECK_ERROR_OUTPUT) {
        return checkErrorOutputYAML
    }
    test(testYAML);
    try {
        let lit = poty_configuration;
        let cp = Setting.deepCopy(poty_configuration)
        console.log(cp)
        //await new Promise(r => setTimeout(r, 2000));
        let setting = new Setting(lit, undefined, undefined);
        let templ = new Templater(setting, tp, app);
        await templ.doTheWork();
        let notetype = templ.notetype;
        let noteCfg = setting.at("SECTION_NOTETYPES." + notetype);
        frontmatterYAML = setting.getFrontmatterYAML();
        if (noteCfg != undefined) Object.assign(frontmatterYAML, noteCfg.getFrontmatterYAML());
        if (noteCfg != undefined) Object.assign(renderYAML, setting.getRenderYAML(), noteCfg.getRenderYAML());
        templ.applyFunctions(frontmatterYAML);
        templ.applyFunctions(renderYAML)
    } catch (e) {
        if (e instanceof FotyError) {
            let errYAML = {};
            e.errOut(errYAML);
            return errYAML
        } else if (e instanceof DialogError) {
            return {
                CANCELLED: true
            }
        } else {
            aut("RETHROWING");
            throw e
        }
    }
    if (!DEBUG) dbgYAML = undefined;
    return Object.assign({}, frontmatterYAML, dbgYAML, testYAML, renderYAML)
}
function giveMe() {
  let xx = new Setting(poty_configuration, undefined, undefined)
  vaut("EXPERIMENTE", "aus poty.js", blue, white)
  console.log(xx.toDisplayString())
  vaut("-----------", "-----------", blue, white)
  return xx
}
