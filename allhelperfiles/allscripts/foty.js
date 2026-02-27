'use strict'
// module.exports ist Nodejs Spezifisch, das geht nicht im Browser
module.exports = foty
//
const SimplePropertyRetriever = { // eslint-disable-line
  // /////////////////////////////////////////////////////////////////////////////
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Enumerability_and_ownership_of_properties
  // Enumerable properties are those properties whose internal enumerable flag is
  //     set to true, which is the default for properties created via simple
  //     assignment or via a property initializer. Properties defined via
  //     Object.defineProperty and such are not enumerable by default.
  //     Most iteration means (such as for...in loops and Object.keys)
  //     only visit enumerable keys.
  // for ... in Das ist ein language statement wie while z.B.
  //     The for...in statement iterates over all enumerable string properties
  //     of an object (ignoring properties keyed by symbols), including
  //     inherited enumerable properties.
  //     enumerable, keine Symbols, aber alle geerbten
  //
  // Object.keys
  // Object.values
  // Object.entries                    enumerable      own      strings
  // Object.getOwnPropertyNames        non+enumerable  own      strings         => array
  // Object.getOwnPropertySymbols      non+enumerable  own      symbols         => array
  // Object.getOwnPropertyDescriptors  non+enumerable  own      strings/symbols => obj
  // Reflect.ownKeys                   non+enumarable  own      strings/symbols
  // for...in                          enumarable      own/inh  strings
  // Object.assign (nach dem ersten)   enumerable      own      strings/symbols
  // Object spread                     enumerable      own      strings/symbols
  //
  getOwnEnumProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, true, false, andSymbols, this._enumerable)
    // Or could use for...in filtered with Object.hasOwn or just this: return Object.keys(obj)
  },
  getOwnNonEnumProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, true, false, andSymbols, this._notEnumerable)
  },
  getOwnProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, true, false, andSymbols, this._enumerableAndNot)
    // Or just use: return Object.getOwnPropertyNames(obj)
  },
  getPrototypeEnumProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, false, true, andSymbols, this._enumerable)
  },
  getPrototypeNonEnumProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, false, true, andSymbols, this._notEnumerable)
  },
  getPrototypeProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, false, true, andSymbols, this._enumerableAndNot)
  },
  getOwnAndPrototypeEnumProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, true, true, andSymbols, this._enumerable)
    // Or could use unfiltered for...in
  },
  getOwnAndPrototypeNonEnumProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, true, true, andSymbols, this._notEnumerable)
  },
  getOwnAndPrototypeEnumAndNonEnumProps (obj, andSymbols = false) {
    return this._getPropertyNames(obj, true, true, andSymbols, this._enumerableAndNot)
  },
  // Private static property checker callbacks
  _enumerable (obj, prop) {
    return Object.prototype.propertyIsEnumerable.call(obj, prop)
  },
  _notEnumerable (obj, prop) {
    return !Object.prototype.propertyIsEnumerable.call(obj, prop)
  },
  _enumerableAndNot (obj, prop) {
    return true
  },
  // Inspired by http://stackoverflow.com/a/8024294/271577
  _getPropertyNames (obj, iterateSelf, iteratePrototype, andSymbols, shouldInclude) {
    const props = []
    do {
      if (iterateSelf) {
        Object.getOwnPropertyNames(obj).forEach((prop) => {
          if (props.indexOf(prop) === -1 && shouldInclude(obj, prop)) {
            props.push(prop)
          }
        })
        if (andSymbols) {
          Object.getOwnPropertySymbols(obj).forEach((prop) => {
            if (props.indexOf(prop) === -1 && shouldInclude(obj, prop)) {
              props.push(prop.toString())
            }
          })
        }
      }
      if (!iteratePrototype) {
        break
      }
      iterateSelf = true
      obj = Object.getPrototypeOf(obj)
    } while (obj)
    return props
  },
}
function log (obj, ind = '') { // eslint-disable-line
  console.log(ind + '{')
  Object.getOwnPropertyNames(obj).forEach((name) => {
    let value = obj[name]
    switch (typeof value) {
      case 'string':
        value = '\'' + value + '\''
        break
      case 'function':
        {
          const fuStr = value.toString()
          let fuName = fuStr.slice(9, fuStr.indexOf('('))
          if (!fuName.length) {
            fuName = name
          } else {
            fuName = fuName.trimEnd()
          }
          value = '[Function: ' + fuName + ']'
        }
        break
    }
    console.log(`${ind}  ${name}: ${value},`)
  })
  console.log(ind + '}')
}

/** User script für Obsidians Templater plugin
 *
 * <h2>Herausforderung der Dokumentation</h2>
 *
 * ganz allgemein in jsdoc gilt, dass jeder Text der vor dem ersten Schlüsselwort
 * steht zum impliziten ersten Schlüsselwort @description gehört.
 *
 * Weiterhin gilt, dass auch Schlüsselworte, die etwas einmaliges bedeuten, wie
 * z.B. @alias mehrmals vorkommen können. Innerhalb eines headers überschreibt
 * das zweite Vorkommen das erste.
 *
 * Verwendet man explizit @description wird die implizite @description überschrieben.
 *
 * jsdoc wurde erfunden, bevor javascript objektorientierte klassen hatte.
 * javascript hatte damals schon das konzept der konstruktorfunktionen.
 * auf diese sind die schlüsselworte @class und @classdesc zugeschnitten.
 *
 * aus diesem grund sind auch @class und @constructor synonyme
 *
 * was über einer class Klasse steht gehört zum @constructor, das
 * Schlüsselwort @constructor ist implizit, es  ist egal, ob es da steht oder nicht.
 * um die class Klasse selbst zu beschreiben braucht man auch hier das
 * schlüsselwort @classdesc
 *
 * was über dem constructor steht gehört zum @constructor, auch hier ist das
 * Schlüsselwort @constructor implizit.
 *
 * Hat man BEIDE ist das kein Syntaxfehler.
 *
 * So muss man zum einen wissen, dass sie sich derart ergänzen, dass Schlüsselworte
 * die in einem fehlen und im anderen vorhanden sind genommen werden, ganz gleich
 * wo sie stehen.
 *
 * Und zum anderen, dass falls ein Schlüsselwort in beiden existiert, nur das von
 * EINEM genommen wird. Das gilt auch für solche, die es mehrfach geben kann, wie
 * z.B. @param oder @example. Alle ihre mehrfachvorkommen werden gewählt, so
 * sie aus dem EINEN sind.
 *
 * Frägt sich, wer ist der EINE? Das unterscheidet sich nach dem Schlüsselwort. Bis
 * jetzt konnte ich feststellen, dass bis auf @param alle anderen aus dem Header
 * der Klasse genommen werden.
 *
 * Anders ausgedrückt: Gibt es header Klasse und header Konstruktor und haben beide
 * die gleichen Einträge, werden alle aus header Klasse genommen, nur @param
 * Einträge werden aus header Konstruktor genommen.
 *
 * Insbesondere überschreibt eine @description in header Konstruktor
 * nicht die @description in header Klasse. Da es unmöglich ist, einen header
 * ohne implizite @description zu erstellen, ist es unmöglich den Konstruktor im header Konstruktor
 * zu beschreiben.
 *
 * <h3>Qualifizierte Pfade</h3>
 *
 * Sobald Code in einem Modul steht, ist es nicht mehr möglich, in einem jsdoc
 * Kommentar auf seine Objekte ohne vorangestelltes 'module:modulname' zuzugreifen.
 * Dies gilt auch für Verweise innerhalb dieses Modules. Auch diese müssen voll
 * qualifiziert sein. Es gibt keine Kurzform.
 *
 * `{@ link XXX}`
 * <= Sobald Datei ein Modul ist, ist das (auch ohne das Leerzeichen) kein Link
 * sondern: {@link FotyError} <br>
 * `{@ link foty}`
 * <= Sobald Datei ein Modul ist, ist das (auch ohne das Leerzeichen) kein Link
 * sondern: {@link foty} <br>
 *
 * Würde ich mittels 'exports.objectname = declaration' exportieren, würde jsdoc
 * 'objectname' als exportiert erkennen. Eine Zuweisung an 'exports' außerhalb der
 * Deklaration erkennt jsdoc nicht automatisch.
 *
 * Die einzige Möglichkeit dies zu umgehen, die nur im Kommentar stattfindet,
 * ist mit '@alias' vor jedem exportierten Object den Namepath zu korrigieren.
 *
 * Um Dokumentation für private Objekte zu erzeugen, muss jsdoc mit der Option
 * '--private' aufgerufen werden. Klassenobjekte die mit Doppelkreuz beginnen,
 * erkennt jsdoc nicht automatisch als private. Das Tag '@private' ist nötig.
 *
 * Ein qualifizierter Zugriff auf das nun dokumentierte private Objekt von einem
 * anderen Dokumentationsblock ist nicht möglich. Mit
 * '@alias module:foty.XXX#privateFunktion' wird ein funktionierender
 * Namepath erstellt.
 *
 * So sind nun folgende Links möglich:
 *
 * {@link module:foty.foty} Static member
 * [foty]{@link module:foty.foty}<br>
 * {@link module:foty~FotyError} Inner member
 * [FotyError]{@link module:foty~FotyError}<br>
 * {@link module:foty.XXX#normaleFunktion} Instance member
 * [XXX#normaleFunktion]{@link module:foty.XXX#normaleFunktion}<br>
 * {@link module:foty.XXX.statischeFunktion} Static member
 * [XXX.statischeFunktion]{@link module:foty.XXX.statischeFunktion}<br>
 * {@link module:foty.XXX."#private"} static member
 * [XXX.#private]{@link module:foty.XXX."#private"}<br>
 *
 * <h3>Literale als Prototyp</h3>
 * Um das gesamte Literal als Klasse zu kennzeichnen, kann man im über der
 * Zuweisung des Literals an eine Variable einen Header mit dem @class
 * Schlüsselwort schreiben. Damit werden die dokumentierten Funktionen innerhalb
 * des Literals als statische Klassen Member erkannt.
 * Um sie alle als Instance Member zu spezifizieren, fügt man vor der öffnenden
 * geschweiften Klammer des Literals ein @lends Schlüsselwort ein, das dies als
 * prototyp kennzeichnet.
 * z.B.  '@lends module:meinModul~meinProto.prototype'
 * Ansonsten müsste man mittels @alias jede einzelne Funktion als Instance Member
 * undefinieren.
 *
 * <h2>Dokumentationsvereinbarungen</h2>
 * <dl class="module">
 * <dt>Kommandozeilenoptionen</dt>
 *   <dd>jsdoc wird mit der Option --private aufgerufen
 *   </dd>
 * <dt>Exportierte Objekte</dt>
 *   <dd>Für alle vom Modul exportierten Objekte wird mittels eines Tag
 *   '@alias' der Namepath korrigiert
 *   </dd>
 * <dt>Kennzeichnung privater Objekte</dt>
 *   <dd>private Objekte, die dokumentiert werden sollen, werden mit dem Tag
 *   '@private' gekennzeichnet, auch wenn ihr Name mit einem Doppelkreuz beginnt.
 *   </dd>
 * <dt>Alias für private dokumentierte Objekte</dt>
 *   <dd>Private dokumentierte Objekte erhalten ein Tag '@alias'
 *   </dd>
 * <dt>Die description von Klassen kommt als @classdesc in den Header</dt>
 *   <dd>Jeder Klassenheader erhält ein Tag @classdec, das die Klasse selbst
 *   beschreibt.
 *   </dd>
 * <dt>Die description von Konstruktoren kommt in die Klasse, nicht den Constructor</dt>
 *   <dd>Das (implizite) Tag '@description' inklusive des zugehörigen Tags
 *   '@mermaid' kommt in den Header der Klasse.
 *   </dd>
 * <dt>@param und @example kommen in den Header des Constructors</dt>
 *   <dd> Die Tags '@param' und '@example' kommen in den Header des Constructors.
 *   </dd>
 * <dt>Literale als Prototpyen erhalten @class, @hideconstructor und @lends</dt>
 *    <dd>
 *    <ul>
 *    <li>In den Klassenheader kommt das Schlüsselwort @class.
 *    </li>
 *    <li>In den Klassenheader kommt das Schlüsselwort @hideconstructor
 *    </li>
 *    <li>Vor die öffnende Literalklammer kommt das Schlüsselwort @lends mit dem
 *    voll qualifiziertem Namen der Klasse, falls dieser ein @alias ist, diesem,
 *    gefolgt von '.prototype'
 *    z.B.  '@lends module:meinModul~meinProto.prototype'
 *    </li>
 *    </ul>
 *    </dd>
 * </dl>
 * <h2>Addenda</h2>
 * <ul>
 *    <li>Zu dokumentierende Objekte dürfen keine zwei Dollar hintereinander
 *    im Namen haben; an manchen Stellen werden sonst von jsdoc die Verweise
 *    auf die Anker nicht richtig erzeugt.
 *    </li>
 * </ul>
 *
 * @module foty
 */
/** XXX class to test jsdoc - wird nicht in jsdoc übernommen
 * @classdesc class XXX description
 * @description constructor XXX description
 * @alias module:foty.XXX
 */
class XXX { // eslint-disable-line
  /**
   * @param {number} indent - Param indent description
   * @example
   * // Beispiel
   * new XXX(12)
   */
  constructor (indent) { console.log(indent) }
  /**
   * @function module:foty.XXX#fakeFunction
   */
  /** normaleFunktion method oneliner */
  normaleFunktion () { console.log('normaleFunktion') }
  /** statischeFunktion method oneliner */
  static statischeFunktion () { console.log('statischeFunktion') }
  /** #private method oneliner
   * @private
   * @alias module:foty.XXX."#private"
   */
  #private () { console.log('#private') }
}
const DEFAULT_LANGUAGE = 'en'
const UNNAMED_FILE = 'Untitled'
const PATH_FACTOR = 10

/** callback to compute YAML value or to compute title
 *
 * Callbacks können verwendet werden, um einen beliebigen YAML Wert zu berechnen.
 *
 * Ausserdem können sie verwendet werden, um den Titel zu bestimmen, dann wird
 * die Funktion in der Property 'title_date_function' einer `noteSetting`
 * gesetzt.
 *
 * @callback FrontmatterCallback
 * @param {String} noteName - Name der Notiz ohne Marker und ohne name_end
 * @param {String} [noteType] - Typ der Notiz
 * @param {Object} [noteSetting] - Objekt mit den Einstellungen für den Typ
 * @param {Object} [tp] - templater object
 * @param {Object} [app] - Obsidian App object
 * @param {Object} [computedValues] - Objekt zum Infoaustausch zwischen Callbacks
 * @returns {(String|Array.<String>)}
 */

/** returns alias array for a place - "place, country" => ["place(country)"]
 *
 * Verwandelt einen Eingabestring der Form "xx, yy[, evtl noch was]" in ein
 * Array aus einem String der Form ["xx(yy evtl noch was)"]
 *
 * Enthält `noteName` kein Komma wird ein leeres Array zurückgegeben.
 *
 * @type {FrontmatterCallback}
 * @param {String} noteName - Name der Notiz in der Form Ort, Land
 * @returns {Array.<String>} ["Ort(Land)"] oder [ ]
 *
 * @example
 * // Ohne Komma
 * cbkAliasOrt('ort')
 * // returns empty array []
 * @example
 * // Mit Komma
 * cbkAliasOrt('ort, land')
 * // returns ['ort(land)']
 * @example
 * // Überflüssige Leerzeichen werden entfernt
 * cbkAliasOrt('ort,     land')
 * // returns ['ort(land)']
 * @example
 * // Weitere Kommata werden wie Leerzeichen behandelt
 * cbkAliasOrt('ort,     land, nochwas')
 * // returns ['ort(land nochwas)']
 */
function cbkAliasOrt (noteName) {
  const aliasArr = []
  if (noteName.indexOf(',') !== -1) {
    const partsArr = noteName.replace(/, */g, ',').split(',')
    const firstPart = partsArr.shift()
    aliasArr.push(firstPart + '(' + partsArr.join(' ') + ')')
  }
  return aliasArr
}

/** returns cssclasses array - "noteTyp" => ["noteTyp"]
 *
 * Gibt ein Array aus dem Argument `noteTyp` zurück
 *
 * @type {FrontmatterCallback}
 * @param {*} unused - unbenutzt
 * @param {String} noteTyp - Typ der Notiz
 * @returns {Array.<String>} ["noteTyp"]
 *
 * @example
 * // egal was
 * cbkFmtCssClasses (undefined, 'egalwas')
 * // returns array ['egalwas']
 */
function cbkFmtCssClasses (unused, noteType) {
  const cssClasses = []
  cssClasses.push(noteType)
  return cssClasses
}

/** returns "## -footnotes" or "" for mocs
 *
 * Gibt einen String zurück, der als letzte Zeile gedacht ist. Wenn die Notiz
 * ein Verzeichnis (moc) ist, wird ein leerer String zurückgegeben.
 *
 * @type {FrontmatterCallback}
 * @param {String} noteName - Name der Notiz ohne Marker und ohne name_end
 * @param {*} unused - unbenutzt
 * @param {Object} noteSetting - Settings
 * @returns {String} "## -footnotes" oder ""
 *
 * @example
 * // Kein Moc
 * cbkFmtLastLine('meine Notiz', 'egalwas', settings)
 * // returns '## -footnotes'
 * @example
 * // Moc, Mocstring ist '-'
 * cbkFmtLastLine('-meine Notiz', 'egalwas', settings)
 * // returns ''
 */
function cbkFmtLastLine (noteName, unused, noteSetting) {
  let lastline = '## -footnotes'
  const mocstring = noteSetting.valueOf('mocstring')
  if (noteName.startsWith(mocstring)) {
    lastline = ''
  }
  return lastline
}

/** returns current date formatted with value of "date_created_date_format"
 *
 * Gibt das aktuelle Datum über den Templater `tp` zurück, falls
 * in `noteSetting`"date_created_date_format" gesetzt ist, in diesem Format,
 * sonst im Default Format des Templateres
 *
 * @type {FrontmatterCallback}
 * @param {*} unused1 - unbenutzt
 * @param {*} unused2 - unbenutzt
 * @param {Object} noteSetting - Settings
 * @param {Object} tp - Templater Object
 * @returns {String} das aktuelle Datum formatiert nach den Vorgaben
 *
 * @example
 * // Default
 * cbkFmtNow(undefined, undefined, noteSetting, tp)
 * // returns '2026-02-27'
 * @example
 * // 'date_created_date_format' ist 'dddd, D. MMMM YYYY, H:mm:ss'
 * cbkFmtNow(undefined, undefined, noteSetting, tp)
 * // returns 'Friday, 27. February 2026 9:12:06'
 */
function cbkFmtNow (unused1, unused2, noteSetting, tp) {
  let format = noteSetting.valueOf('date_created_date_format')
  if (format === '') format = undefined
  return tp.date.now(format)
}

/** returns noteName, for mocs without leading mocstring
 *
 * Gibt den noteName zurück, außer für Verzeichnisse, dort wird der Name ohne
 * den führenden mocstring zurückgegeben
 *
 * @type {FrontmatterCallback}
 * @param {String} noteName - Name der Notiz ohne Marker und ohne name_end
 * @param {*} unused - unbenutzt
 * @param {Object} noteSetting - Settings
 * @returns {String} `noteName` ohne führenden mocstring
 *
 * @example
 * // Kein Moc
 * cbkNoteName('meine Notiz', 'egalwas', settings)
 * // returns 'meine Notiz'
 * @example
 * // Moc, Mocstring ist '-'
 * cbkNoteName('-mein Verzeichnis', 'egalwas', settings)
 * // returns 'mein Verzeichnis'
 */
function cbkNoteName (noteName, unused, noteSetting) {
  let formattedNoteName = noteName
  const mocstring = noteSetting.valueOf('mocstring', '')
  if (noteName.startsWith(mocstring)) {
    formattedNoteName = noteName.slice(mocstring.length)
  }
  return formattedNoteName
}

/** returns 'zu [[`noteName`]]'
 *
 * Gibt einen String zurück, der mit 'zu ' beginnt und mit
 * `noteName` in doppelten eckigen Klammern endet.
 *
 * @type {FrontmatterCallback}
 * @param {String} noteName - Name der Notiz ohne Marker und ohne name_end
 * @returns {String} zu [[`noteName`]]
 *
 * @example
 * cbkSndLineMitschrift('meine Notiz')
 * // returns 'zu [[meine Notiz]]'
 */
function cbkSndLineMitschrift (noteName) {
  return 'zu [[' + noteName + ']]'
}
/* eslint-disable */
function cbkAliasPerson(noteName) {
  console.log('Unused? Callback AliasPerson')
  let aliases = []
  let name = noteName
  var count = (noteName.match(/,/g) || []).length
  if (count > 1) {
    let last_idx = noteName.lastIndexOf(",")
    if (last_idx != -1) {
      name = noteName.slice(0, last_idx)
    }
  }
  let alias = name.replace(/, /g, ",")
  let strArr = alias.split(",")
  alias = strArr[0]
  strArr.shift()
  alias = strArr.join(" ") + " " + alias
  aliases.push(alias)
  return aliases
}
function cbkHeaderPerson(noteName) {
  console.log('Unused? Callback HeaderPerson')
  let header = ""
  let name = noteName
  var count = (noteName.match(/,/g) || []).length
  if (count > 1) {
    let last_idx = noteName.lastIndexOf(",")
    if (last_idx != -1) {
      name = noteName.slice(0, last_idx)
    }
  }
  let strArr = name.split(",")
  if (strArr.length > 1) header = strArr[1].trim() + " " + strArr[0].trim()
  else header = name
  return header
}
function cbkHeaderOrt(noteName) {
  console.log('Unused? Callback HeaderOrt')
  let header = ""
  let name = noteName
  let strArr = name.split(",")
  if (strArr.length > 1) header = strArr[1].trim() + " " + strArr[0].trim()
  else header = name
  return header
}
function cbkBookAlias(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BookAlias')
  let alias = computedValues.buchautor.slice(0, 3) + computedValues.buchtitel.slice(0, 3)
  return alias
}
function cbkBookAliasAsTag(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BookAliasAsTag')
  let alias = "bookid/" + cbkBookAlias(noteName, noteType, noteSetting, tp, app, computedValues)
  return alias
}
function cbkBuchTitel(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchTitel')
  return computedValues.buchtitel
}
function cbkBuchUntertitel(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchUntertitel')
  return computedValues.buchuntertitel
}
function cbkBuchAutor(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchAutor')
  return computedValues.buchautor
}
function cbkBuchAutorv(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchAutorv')
  return computedValues.buchautorv
}
function cbkBuchDatum(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchDatum')
  return computedValues.buchdatum
}
function cbkBuchVerlag(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchVerlag')
  return computedValues.buchverlag
}
function cbkBuchSeiten(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchSeiten')
  return computedValues.buchseiten
}
function cbkBuchSprache(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchSprache')
  return computedValues.buchsprache
}
function cbkBuchIsbn(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchIsbn')
  return computedValues.buchisbn
}
function cbkBuchIsbn13(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchIsbn13')
  return computedValues.buchisbn13
}
function cbkBuchEbook(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback BuchEbook')
  return computedValues.buchebook
}
async function cbkAskGoogleForTitle(noteName, noteType, noteSetting, tp, app, computedValues) {
  console.log('Unused? Callback AskGoogleForTitle')
  let noteTitle = ""

  function nachname(name) {
    return /[^ ]*$/.exec(name)[0]
  }

  function vorname(name) {
    return name.substring(0, name.lastIndexOf(" "))
  }

  function jahr(datum) {
    let jahr = ""
    if (datum != undefined) {
      jahr = datum.slice(0, 4)
    }
    return jahr
  }
  let maxResults = 20
  let bookQuery
  bookQuery = await tp.system.prompt("Angaben um Buch bei Google Books zu suchen 📚🔎")
  if (bookQuery == undefined) {
    console.log("User cancelled")
    return noteTitle
  }
  let url = "https://www.googleapis.com/books/v1/volumes?q=" + bookQuery + "&maxResults=" + maxResults.toString()
  const resp = await fetch(url)
  if (!resp.ok) {
    console.log("Fetch klappte nicht")
    return noteTitle
  }
  let data
  try {
    data = await resp.json()
  } catch (e) {
    console.log("Json klappte nicht")
    return noteTitle
  }
  let books = data.items
  let texts = []
  books.map(function(book) {
    let text = ""
    if (book.saleInfo.isEbook) {
      text = "ebook: "
    } else {
      text = ""
    }
    text += book.volumeInfo.title
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
    text += " - " + jahr(book.volumeInfo.publishedDate)
    text += " - " + book.volumeInfo.language
    texts.push(text)
  })
  const choosenbook = await tp.system.suggester(texts, books, true, "Buch wählen")
  if (choosenbook == undefined) {
    console.log("User cancelled")
    return noteTitle
  }
  let title = ""
  let subtitle = ""
  let writer = "N/A"
  let writerv = ""
  let publishedDate = ""
  let publisher = "N/A"
  let description = ""
  let pageCount = ""
  let language = ""
  let isbn = ""
  let isbn13 = ""
  let ebook = "papier"
  title = choosenbook.volumeInfo.title
  if (choosenbook.volumeInfo.subtitle != undefined) {
    subtitle = choosenbook.volumeInfo.subtitle
  }
  if (choosenbook.volumeInfo.authors != undefined) {
    writer = ""
    writerv = ""
    choosenbook.volumeInfo.authors.forEach((a, i) => {
      if (i > 0) {
        writer += ", "
        if (writerv !== "") {
          writerv += ", "
        }
      }
      writer += nachname(a)
      writerv += vorname(a)
    })
  }
  publishedDate = jahr(choosenbook.volumeInfo.publishedDate)
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
  noteTitle = writer + " - " + title + " - " + publishedDate
  computedValues.buchtitel = title
  computedValues.buchuntertitel = subtitle
  computedValues.buchautor = writer
  computedValues.buchautorv = writerv
  computedValues.buchdatum = publishedDate
  computedValues.buchverlag = publisher
  computedValues.buchseiten = pageCount
  computedValues.buchsprache = language
  computedValues.buchisbn = isbn
  computedValues.buchisbn13 = isbn13
  computedValues.buchebook = ebook
  let adaptedTitle = noteTitle.replace(/:/g, " ")
  noteTitle = adaptedTitle.replace(/\//g, "")
  return noteTitle
}
function isMok(noteName, tp) {
  let answer = false
  let path = tp.file.path(true)
  let parts = path.split("\\")
  if (parts.length < 2) {
    parts = path.split("/")
  }
  if (parts.length > 1 && parts[parts.length - 2] == noteName) {
    answer = true
  }
  return answer
}
function isCatalog(noteName, noteSetting) {
  let answer = false
  let mocstring = noteSetting.valueOf('mocstring') // getValue
  if (noteName.startsWith(mocstring)) {
    answer = true
  }
  return answer
}
function cbkMaterialCssClasses(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialCssClasses')
  if (isMok(noteName, tp)) return "foldernote"
  else if (isCatalog(noteName, noteSetting)) return "catalog"
  else return cbkFmtCssClasses(noteName, noteType, noteSetting, tp, app)
}
function cbkMaterialDateCreated(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialDateCreated')
  if (isMok(noteName, tp)) return "!no!"
  else return cbkFmtNow(noteName, noteType, noteSetting, tp, app)
}
function cbkMaterialPublish(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialPublish')
  if (isMok(noteName, tp)) return "!no!"
  else return true
}
function cbkMaterialTags(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialTags')
  if (isMok(noteName, tp)) return "MOC"
  else return "[]"
}
function cbkMaterialDdcKey(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialDdcKey')
  if (isMok(noteName, tp)) return "!no!"
  else if (isCatalog(noteName, noteSetting)) return "!no!"
  else return ""
}
function cbkMaterialMedia(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialMedia')
  if (isMok(noteName, tp)) return "!no!"
  else if (isCatalog(noteName, noteSetting)) return "!no!"
  else return "video"
}
function cbkMaterialAuthor(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialAuthor')
  if (isMok(noteName, tp)) return "!no!"
  else return "Ueberphilosophy"
}
function cbkMaterialSndLine(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialSndLine')
  if (isMok(noteName, tp)) return "% Waypoint %%"
  else if (isCatalog(noteName, noteSetting)) {
    let path = tp.file.path(true)
    let parts = path.split("\\")
    if (parts.length < 2) {
      parts = path.split("/")
    }
    if (parts.length > 1) {
      let heading = ""
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
  console.log('Unused? Callback MaterialThrdLine')
  if (isMok(noteName, tp)) return ""
  else if (isCatalog(noteName, noteSetting)) {
    return '```dataviewjs\nawait dv.executeJs(await dv.io.load("Materialien/catalog.js"));\n```'
  } else return "#speaker/  #wird_fortgesetzt\n"
}
function cbkMaterialFourthLine(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialFourthLine')
  if (isMok(noteName, tp)) return ""
  else if (isCatalog(noteName, noteSetting)) return ""
  else return cbkMitschrift(noteName, noteType, noteSetting, tp, app)
}
function cbkMaterialFifthLine(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialFifthLine')
  if (isMok(noteName, tp)) return ""
  else if (isCatalog(noteName, noteSetting)) return ""
  else return "- []()"
}
function cbkMaterialLastLine(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback MaterialLastLine')
  if (isMok(noteName, tp)) return ""
  else if (isCatalog(noteName, noteSetting)) return ""
  else return cbkFmtLastLine(noteName, noteType, noteSetting, tp, app)
}
function cbkScriptLineFeld(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback ScriptLineFeld')
  return ""
}
function cbkFrstLineFeld(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback FrstLineFeld')
  return noteName + " #" + noteName
}
function cbkSndLineFeld(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback SndLineFeld')
  return "## Zeitliche Einordnung\n![[zeitliche Einordnung]]\n## Quellen\n![[" + noteName + " Quellen]]"
}
function cbkThrdLineFeld(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback ThrdLineFeld')
  return "## Adamson\n![[Adamson nnn " + noteName + "]]\n## Weitere"
}
function cbkMitschrift(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback Mitschrift')
  return "[[Werkstatt/Mitschriften/@" + noteName + "|Mitschrift]]\n"
}
function cbkAutorTag(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback AutorTag')
  return noteName.replace(/ /g, "-")
}
function cbkTimeLine(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback TimeLine')
  return "[[timeline#" + noteName + "|Zeitleiste]]"
}
function cbkSekundaerName(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback SekundaerName')
  return noteName + " Sekundaer"
}
function cbkTest(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback Test')
  return "yyyy"
}
function cbkFmtOneAlias(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback FmtOneAlias')
  let alias = noteName
  let mocstring = noteSetting.valueOf('mocstring') // getValue
  if (noteName.startsWith(mocstring)) {
    alias = noteName.slice(mocstring.length)
  }
  alias = alias.replace(/,/g, ` `).replace(/  /g, ` `)
  if (0 == alias.localeCompare(noteName)) {
    alias = ""
  }
  return alias
}
function cbkFmtOneAliasSwitch(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback FmtOneAliasSwitch')
  let alias = noteName
  let mocstring = noteSetting.valueOf('mocstring') // getValue
  if (noteName.startsWith(mocstring)) {
    alias = noteName.slice(mocstring.length)
  }
  let idx1 = alias.indexOf(",")
  let idx2 = alias.indexOf(",", idx1 + 1)
  if (idx2 < 1) idx2 = alias.length - 1
  if (idx1 > 0 && idx2 > 0) {
    let part1 = alias.substring(0, idx1)
    let part2 = alias.substring(idx1 + 1, idx2)
    let zwi = "xxxx"
    alias = alias.replace(part1, zwi)
    alias = alias.replace(part2, part1)
    alias = alias.replace(zwi, part2)
  }
  alias = alias.replace(/,/g, ` `).replace(/  /g, ` `)
  if (0 == alias.localeCompare(noteName)) {
    alias = ""
  }
  return alias
}
function findSibling(next, tp, app, noteSetting) {
  function hasDate(fname, dateformat) {
    let matchstring = dateformat
    matchstring = matchstring.replaceAll("Y", "[0-9]")
    matchstring = matchstring.replaceAll("M", "[0-9]")
    matchstring = matchstring.replaceAll("D", "[0-9]")
    let answer = fname.match(matchstring)
    return answer == null ? false : true
  }
  let dateformat = noteSetting.valueOf('title_date_format') // getValue
  let currentFile = app.workspace.getActiveFile()
  let currentFileName = currentFile.name
  let currentFolder = currentFile.parent
  let currentFolderPath = currentFolder.path
  text = ""
  let prevFile = null
  let nextFile = null
  const siblings = app.vault.getAbstractFileByPath(currentFolderPath).children
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
  })
  let answerFile = next === true ? nextFile : prevFile
  let answer = ""
  if (answerFile != null) {
    answer = app.fileManager.generateMarkdownLink(answerFile, currentFolderPath + "/")
  } else if (next == true) {
    answer = app.fileManager.generateMarkdownLink(currentFile, currentFolderPath + "/")
    let tomorrow = tp.date.tomorrow(dateformat)
    let today = tp.date.now(dateformat)
    answer = answer.replaceAll(today, tomorrow)
  }
  return answer
}
function cbkCalcDateTitle(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback CalcDateTitle')
  let title_before_date = noteSetting.valueOf('title_before_date') // getValue
  if (title_before_date == undefined) title_before_date = ""
  let title_date_format = noteSetting.valueOf('title_date_format') // getValue
  if (title_date_format == undefined) title_date_format = "YY-MM-DD"
  let name = title_before_date + tp.date.now(title_date_format)
  return name
}
function cbkFmtAlias(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback FmtAlias')
  let aliases = []
  let alias = noteName
  let mocstring = noteSetting.valueOf('mocstring') // getValue
  if (noteName.startsWith(mocstring)) {
    alias = noteName.slice(mocstring.length)
  }
  alias = alias.replace(/,/g, ` `).replace(/  /g, ` `)
  if (0 != alias.localeCompare(noteName)) {
    aliases.push(alias)
  }
  return aliases
}
function cbkFmtTags(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback FmtTags')
  let tags = []
  let mocstring = noteSetting.valueOf('mocstring') // getValue
  let tag_pre = noteSetting.valueOf('tag_pre') // getValue
  tags.push(tag_pre + noteType.charAt(0).toUpperCase() + noteType.slice(1))
  if (noteName.startsWith(mocstring)) tags.push(tag_pre + "moc")
  return tags
}
function cbkPrevDateLink(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback PrevDateLink')
  let prevLink = findSibling(false, tp, app, noteSetting)
  let answer = prevLink
  return answer
}
function cbkNextDateLink(noteName, noteType, noteSetting, tp, app) {
  console.log('Unused? Callback NextDateLink')
  let nextLink = findSibling(true, tp, app, noteSetting)
  let answer = nextLink
  return answer
}
/* eslint-enable */

/** The built in Object object
 * @external Object
 * @see {@link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object|Object}
 */
/** The built in Error object
 * @external Error
 * @see {@link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error|Error}
 */
/** The external templater api object
 * @external templater
 * @see {@link https://silentvoid13.github.io/Templater/internal-functions/overview.html|templater api}
 */
/** The external obsidian app object
 * @external app
 * @see {@link https://docs.obsidian.md/Reference/TypeScript+API/App|obsidian app}
 */

/** FotyError
 * @classdesc Base class for all Errors of [foty]{@link module:foty}
 *
 * Gibt formatierte Fehlermeldungen aus.
 * @description  Creates an Error with a formatted multiline message
 *
 * Erzeugt aus den ersten 5 Argumenten eine formatierte Fehlermeldung, die
 * die Eigenschaft 'message' der Basisklasse 'Error' als Wert erhält.
 *
 * Weitere Argumente im Rest-Parameter `errorArgs` werden dem
 * 'Error'-Constructor unverändert übergeben.
 *
 * @mermaid
 * ---
 * config:
 *   theme: base
 *   layout: elk
 *   class:
 *     hideEmptyMembersBox: true
 * ---
 *  classDiagram
 *      class Error:::extern
 *      link Error "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error"
 *      FotyError <|-- Error
 *      classDef default fill:#0D5E4E,color:#e6ffe6, stroke:xxx, stroke-width:2px
 *      classDef extern fill:#bababa
 * @alias module:foty~FotyError
 * @augments external:Error
 */
class FotyError extends Error {
  /**
   * @param {?number} nameLen - intendentation for 2nd and following lines
   * @param {?Object} callingEnv - Object out of which this Errof is thrown
   * @param {?string} callingEnv._$_protoName - identifier for throwing environment
   * @param {?function} caller - function, which throws the error
   * @param {?string} callerArgs - Arguments for 'caller'
   * @param {?(string|Array.<string>)} message - specific error message
   * @param {...*} errorArgs - further arguments for Error Constructor
   * @example
   * // Ohne Argumente
   * new FotyError()
   * // FotyError:
   * //    Beim Aufruf aus undefined.undefined()
   * @example
   * // Fehlermeldung als String
   * new FotyError(7, null, null, null, 'line')
   * // FotyError: line
   * //    Beim Aufruf aus null.null()
   * @example
   * // Fehlermeldung als Array
   * new FotyError(9, null, null, null, ['line1', 'line2'])
   * // FotyError: line1
   * //            line2
   * //    Beim Aufruf aus null.null()
   * @example
   * // Alle Parameter nach dem 5. gehen unverändert an den Error Constructor
   * new FotyError(9, null, null, null, ['line1', 'line2'],
   * {
   *   cause: { code: "NonInteger", values: [2, 'hh'] },
   * })
   * // FotyError: line1
   * //            line2
   * //    Beim Aufruf aus null.null()
   * @example
   * // Fünf Argumente gesetzt, iThrow ist Funktion, env = { _$_protoName: 'THROWING_ENV' }
   * new FotyError(9, env, iThrow, 'arg1, arg2, -203', ['line1', 'line2'])
   * // FotyError: line1
   * //            line2
   * //    Beim Aufruf aus THROWING_ENV.iThrow(arg1, arg2, -203)
   */
  constructor (nameLen, callingEnv, caller, callerArgs, ...errorArgs) {
    if (errorArgs && Array.isArray(errorArgs[0])) {
      let errorStr = errorArgs[0][0]
      const spaces = ' '.repeat(nameLen + 2)
      for (let i = 1; i < errorArgs[0].length; i++) {
        errorStr += '\n'
        errorStr += spaces
        errorStr += errorArgs[0][i]
      }
      errorArgs[0] = errorStr
    }
    const name = 'FotyError'
    super(...errorArgs)
    this.name = name
    this.message += '\n   Beim Aufruf aus '
    this.message += callingEnv ? callingEnv._$_protoName ?? 'UNBEKANNT' : callingEnv
    this.message += '.'
    this.message += caller ? caller.name ?? 'UNBEKANNT' : caller
    this.message += '(' + (callerArgs ?? '') + ')'
  }
}

/** LiteralError
 * @classdesc
 * Error thrown on wrong configuration literal.
 *
 * Dieser Fehler wird ausgelöst, falls das Literal nicht als configuration
 * gelesen werden kann.
 *
 * @description Creates an error thrown on wrong literal.
 *
 * Erzeugt einen LiteralError
 *
 * @mermaid
 * ---
 * config:
 *   theme: base
 *   layout: elk
 *   class:
 *     hideEmptyMembersBox: true
 * ---
 *  classDiagram
 *      class Error:::extern
 *      class FotyError
 *      link Error "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error"
 *      link FotyError "{@link module-foty.FotyError.html}"
 *      FotyError <|-- Error
 *      LiteralError <|-- FotyError
 *      classDef default fill:#0D5E4E,color:#e6ffe6, stroke:xxx, stroke-width:2px
 *      classDef extern fill:#bababa
 * @alias module:foty~LiteralError
 * @augments module:foty~FotyError
 */
class LiteralError extends FotyError {
  /**
   * @param {?Object} callingEnv - Object out of which this Errof is thrown
   * @param {?string} callingEnv._$_protoName - identifier for throwing environment
   * @param {?function} caller - function, which throws the error
   * @param {?string} callerArgs - Arguments for 'caller'
   * @param {?(string|Array.<string>)} message - specific error message
   * @param {...*} errorArgs - further Arguments for Error Constructor
   * @example
   * // Ohne Argumente
   * new LiteralError()
   * // LiteralError:
   * //    Beim Aufruf aus null.undefined()
   * @example
   * // Fehlermeldung als String
   * new LiteralError(null, null, null, 'Aline')
   * // LiteralError: Aline
   * //    Beim Aufruf aus null.null()
   * @example
   * // Fehlermeldung als Array
   * new LiteralError(null, null, null, ['lineA', 'lineB'])
   * // LiteralError: lineA
   * //               lineB
   * //    Beim Aufruf aus null.null()
   * @example
   * // Alle Parameter nach dem 4. gehen unverändert an den Error Constructor
   * new LiteralError(null, null, null, ['lineA', 'lineB'],
   * {
   *   cause: { code: "NonInteger", values: [2, 'hh'] },
   * })
   * // LiteralError: lineA
   * //               lineB
   * //    Beim Aufruf aus null.null()
   * @example
   * // Vier Argumente gesetzt, iThrow ist Funktion, env = { _$_protoName: 'THROWING_ENV' }
   * new LiteralError(env, iThrow, 'arg1, arg2, -203', ['lineA', 'lineB'])
   * // LiteralError: lineA
   * //               lineB
   * //    Beim Aufruf aus THROWING_ENV.iThrow(arg1, arg2, -203)
   */
  constructor (callingEnv, caller, callerArgs, ...errorArgs) {
    const name = 'LiteralError'
    super(name.length, callingEnv, caller, callerArgs, ...errorArgs)
    this.name = name
  }
}

/** InitializationError
 * @classdesc
 * Error thrown if calling noninitialized configuration or section
 *
 * Dieser Fehler wird ausgelöst, falls eine Funktion einer configuration oder
 * einer section aufgerufen wird, bevor diese initialisiert wurde.
 *
 * @description Creates an error thrown if object is accessed without being initialized.
 *
 * Erzeugt einen InitializationError
 *
 * @mermaid
 * ---
 * config:
 *   theme: base
 *   layout: elk
 *   class:
 *     hideEmptyMembersBox: true
 * ---
 *  classDiagram
 *      class Error:::extern
 *      class FotyError
 *      link Error "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error"
 *      link FotyError "{@link module-foty.FotyError.html}"
 *      FotyError <|-- Error
 *      InitializationError <|-- FotyError
 *      classDef default fill:#0D5E4E,color:#e6ffe6, stroke:xxx, stroke-width:2px
 *      classDef extern fill:#bababa
 * @alias module:foty~InitializationError
 * @augments module:foty~FotyError
 */
class InitializationError extends FotyError {
  /**
   * @param {?Object} callingEnv - Object out of which this Errof is thrown
   * @param {?string} callingEnv._$_protoName - identifier for throwing environment
   * @param {?function} caller - function, which throws the error
   * @param {?string} callerArgs - Arguments for 'caller'
   * @param {?(string|Array.<string>)} message - specific error message
   * @param {...*} errorArgs - further Arguments for Error Constructor
   * @example
   * // Ohne Argumente
   * new InitializationError()
   * // InitializationError:
   * //    Beim Aufruf aus null.undefined()
   * @example
   * // Fehlermeldung als String
   * new InitializationError(null, null, null, 'Aline')
   * // InitializationError: Aline
   * //    Beim Aufruf aus null.null()
   * @example
   * // Fehlermeldung als Array
   * new InitializationError(null, null, null, ['lineA', 'lineB'])
   * // InitializationError: lineA
   * //                      lineB
   * //    Beim Aufruf aus null.null()
   * @example
   * // Alle Parameter nach dem 4. gehen unverändert an den Error Constructor
   * new InitializationError(null, null, null, ['lineA', 'lineB'],
   * {
   *   cause: { code: "NonInteger", values: [2, 'hh'] },
   * })
   * // InitializationError: lineA
   * //                      lineB
   * //    Beim Aufruf aus null.null()
   * @example
   * // Vier Argumente gesetzt, iThrow ist Funktion, env = { _$_protoName: 'THROWING_ENV' }
   * new InitializationError(env, iThrow, 'arg1, arg2, -203', ['lineA', 'lineB'])
   * // InitializationError: lineA
   * //                      lineB
   * //    Beim Aufruf aus THROWING_ENV.iThrow(arg1, arg2, -203)
   */
  constructor (callingEnv, caller, callerArgs, ...errorArgs) {
    const name = 'InitializationError'
    super(name.length, callingEnv, caller, callerArgs, ...errorArgs)
    this.name = name
  }
}

/** AccessError
 * @classdesc
 * Error thrown when acessing configuration or section with wrong arguments.
 *
 * Dieser Fehler wird ausgelöst, falls eine Funktion einer configuration oder
 * einer section mit Argumenten aufgerufen wird, die dafür nicht geeignet sind.
 *
 * @description Creates an error thrown when arguments are wrong.
 *
 * Erzeugt einen AccessError
 *
 * @mermaid
 * ---
 * config:
 *   theme: base
 *   layout: elk
 *   class:
 *     hideEmptyMembersBox: true
 * ---
 *  classDiagram
 *      class Error:::extern
 *      class FotyError
 *      link Error "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Error"
 *      link FotyError "{@link module-foty.FotyError.html}"
 *      FotyError <|-- Error
 *      AccessError <|-- FotyError
 *      classDef default fill:#0D5E4E,color:#e6ffe6, stroke:xxx, stroke-width:2px
 *      classDef extern fill:#bababa
 * @alias module:foty~AccessError
 * @augments module:foty~FotyError
 */
class AccessError extends FotyError {
  /**
   * @param {?Object} callingEnv - Object out of which this Errof is thrown
   * @param {?string} callingEnv._$_protoName - identifier for throwing environment
   * @param {?function} caller - function, which throws the error
   * @param {?string} callerArgs - Arguments for 'caller'
   * @param {?(string|Array.<string>)} message - specific error message
   * @param {...*} errorArgs - further Arguments for Error Constructor
   * @example
   * // Ohne Argumente
   * new AccessError()
   * // AccessError:
   * //    Beim Aufruf aus null.undefined()
   * @example
   * // Fehlermeldung als String
   * new AccessError(null, null, null, 'Aline')
   * // AccessError: Aline
   * //    Beim Aufruf aus null.null()
   * @example
   * // Fehlermeldung als Array
   * new AccessError(null, null, null, ['lineA', 'lineB'])
   * // AccessError: lineA
   * //              lineB
   * //    Beim Aufruf aus null.null()
   * @example
   * // Alle Parameter nach dem 4. gehen unverändert an den Error Constructor
   * new AccessError(null, null, null, ['lineA', 'lineB'],
   * {
   *   cause: { code: "NonInteger", values: [2, 'hh'] },
   * })
   * // AccessError: lineA
   * //              lineB
   * //    Beim Aufruf aus null.null()
   * @example
   * // Vier Argumente gesetzt, iThrow ist Funktion, env = { _$_protoName: 'THROWING_ENV' }
   * new AccessError(env, iThrow, 'arg1, arg2, -203', ['lineA', 'lineB'])
   * // AccessError: lineA
   * //              lineB
   * //    Beim Aufruf aus THROWING_ENV.iThrow(arg1, arg2, -203)
   */
  constructor (callingEnv, caller, callerArgs, ...errorArgs) {
    const name = 'AccessError'
    super(name.length, callingEnv, caller, callerArgs, ...errorArgs)
    this.name = name
  }
}

/** configuration
 * @description
 * This is a description of the configuration class constructor function.
 *
 * Wegen @hideconstructor wird kein Constructor dokumentiert.
 * @class
 * @hideconstructor
 *
 * @classdesc full foty configuration object
 *
 * Diese Klasse enthält die gesamte foty Konfiguration, alle vier Sektionen.
 *
 * Es gibt keinen Constructor, und doch ist das Ganze eine Klasse. Die Objekte
 * werden nicht mit new erzeugt. Die Instanzen werden über Literale beim Lesen
 * des Javascript Scripts erzeugt. Mittels des Prototypsetters '__proto__' wird
 * dem aus einem Literal neu erzeugten Objekt die Klasse zugewiesen. So ist es
 * tatsächlich eine zur Laufzeit erzeugte Instanz dieser Klasse. Es kann mehrere
 * Instanzen geben.
 *
 * Ich könnte einen Konstruktor schreiben, der ein Literal als Argument bekommt
 * - was ja dann schon ein Objekt ist, wenn er es verarbeitet. DeepCopy? Vielleicht
 * später. Im Moment brauche ich keinen Konstruktor. Wenn eine andere Art der
 * Konfigurationserstellung da ist, z.B. wenn poty fertig ist und verwendet wird,
 * dann brauche ich tatsächlich einen Konstruktor.
 *
 * Im Prinzip läuft das umgekehrt wie ein Konstruktor - es gibt ein Objekt und
 * dem wird die Klasse reingehängt. Bei einem klassischen Konstruktor würde die
 * Klasse ein Objekt erzeugen.
 *
 * @mermaid
 * ---
 * config:
 *   theme: base
 *   layout: elk
 *   class:
 *     hideEmptyMembersBox: true
 * ---
 *  classDiagram
 *      class Object:::extern
 *      class configuration
 *      link Object "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/"
 *      configuration <|--Object
 *      classDef default fill:#0D5E4E,color:#e6ffe6, stroke:xxx, stroke-width:2px
 *      classDef extern fill:#bababa
 * @alias module:foty~configuration
 * @augments external:Object
 */
const configuration =
/** @lends module:foty~configuration.prototype */
{
  _$_protoName: 'configuration',
  knownSections: [
    'SECTION_GENERAL',
    'SECTION_TRANSLATE',
    'SECTION_DIALOG',
    'SECTION_NOTETYPES',
  ],
  _$_instance: false,

  /** configuration.throwIfNotUsable: Throws error if proto is not usable.
   *
   * Jede öffentliche Methode dieser Klasse ruft diese Methode als erstes auf,
   * um zu garantieren, dass mit der Ausführung fortgefahren werden kann.
   * Wenn die Instanz nicht initialisiert ist oder wenn das Literal nicht
   * korrekt war, löst diese Methode eine Ausnahme in Form eines
   * [FotyError]{@link module-foty.FotyError.html}s aus.
   * @private
   * @param {?function} callingFunction - function, which throws the error
   * @param {...*} args - Arguments of `callingFunction`
   * @throws [InitializationError]{@link module:foty~InitializationError}
   * setting is not initalized
   * @throws [LiteralError]{@link module:foty~LiteralError}
   * literal has wrong format
   */
  z_$_throwIfNotUsable: function (callingFunction, ...args) {
    let error
    const callingFunctionArgs = args.join(', ')
    if (!this._$_instance) {
      error = new InitializationError(this, callingFunction, callingFunctionArgs,
        'Zugriff vor Initialisierung'
      )
    } else if (!this._$_instance.usableConfiguration) {
      error = new LiteralError(this, callingFunction, callingFunctionArgs,
        'Das ist kein gültiges configuration object'
      )
    }
    if (error) {
      throw (error)
    }
  },
  /** configuration.init: initializes from literal before first use
   *
   * Diese Funktion macht nichts, falls das Objekt bereits initialisiert ist.
   *
   * Ansonsten erzeugt sie aus knownSections diejenigen, die fehlen. Falls von
   * den vorhandenen Properties eine keine [section]{@link module:foty~section}
   * ist, sie aber den Schlüssel einer knownProperty hat, wird ihr der section
   * Prototyp mit Object.setPrototype zugewiesen. Falls sie nicht den Namen einer
   * knownProperty hat, wird eine Ausnahme ausgelöst.
   *
   * Am Ende wird für jede Eigenschaft deren
   * [init]{@link module:foty~section#_$_init}
   * Funktion aufgerufen.
   * @throws [LiteralError]{@link module:foty~LiteralError}
   * literal has wrong format
   */
  _$_init: function () {
    if (this._$_instance) return
    this.knownSections.forEach((sectionKey) => {
      if (!this[sectionKey]) {
        this[sectionKey] = { __proto__: section, } // add property (enumerable)
      }
    })
    this._$_instance = { usableConfiguration: false, } // add property (enumerable)
    for (const [key, value] of Object.entries(this)) {
      if (key.startsWith('_$_')) {
        continue
      }
      if (value._$_protoName !== 'section') {
        if (this.knownSections.includes(key)) {
          Object.setPrototypeOf(value, section)
        } else {
          throw (new LiteralError(
            this,
            this._$_init,
            Array.prototype.join.call(arguments, ', '),
            [
              'Das Objekt enthält auf oberster Ebene',
              'wenigstens einen Eintrag der keine section ist',
            ]
          ))
        }
      }
      value._$_init(key)
    }
    this._$_instance.usableConfiguration = true
  },
  /** configuration:sections: returns array of section values
   *
   * Gibt alle Sektionen zurück
   * @returns {Array.<section>} all [section]{@link module:foty~section} values
   * @throws [InitializationError]{@link module:foty~InitializationError}
   * configuration is not initalized
   */
  _$_sections: function () {
    this.z_$_throwIfNotUsable(this._$_sections)
    const sections = []
    for (const [key, value] of Object.entries(this)) {
      if (!key.startsWith('_$_') &&
        !key.startsWith('z_$_')) {
        sections.push(value)
      }
    }
    return sections
  },
  /** configuration:section returns value for section `name`
   * @param {string} name - name of section to be returned
   * @returns {section} [section]{@link module:foty~section}
   * @throws [InitializationError]{@link module:foty~InitializationError}
   * configuration is not initalized
   * @throws [AccessError]{@link module:foty~AccessError}
   * no section with specified name
   */
  _$_section: function (name) {
    this.z_$_throwIfNotUsable(this._$_section, name)
    if (this[name] === undefined) {
      throw (new AccessError(
        this,
        this._$_section,
        Array.prototype.join.call(arguments, ', '),
        'Die section existiert nicht'
      ))
    }
    return this[name]
  },
}
const SECTION_GENERAL = {
  _$_specialName: 'SECTION_GENERAL',
}
const SECTION_TRANSLATE = { // specialization
  _$_specialName: 'SECTION_TRANSLATE',
  valueOf: function (path, lang = DEFAULT_LANGUAGE, fallback) {
    let result = this._$_valueOf(path + '.VALUE')
    let value
    const defaultLang = DEFAULT_LANGUAGE
    if (Array.isArray(result)) {
      if (result.length && !Array.isArray(result[0])) {
        if (result[0] === lang) {
          value = result[1]
        } else if (result[0] === defaultLang && fallback === undefined) {
          fallback = result[1]
        }
        if (fallback === undefined) {
          fallback = result[1]
        }
      } else {
        for (const langPair of result) {
          if (langPair[0] === lang) {
            value = langPair[1]
            break
          }
          if (langPair[0] === defaultLang && fallback === undefined) {
            fallback = langPair[1]
          }
        }
        if (fallback === undefined && result.length) {
          fallback = result[0][1]
        }
      }
      value = value ?? fallback
    } else {
      result = this._$_valueOf(path)
      value = result ? result.toString() : fallback ?? ''
    }
    return value
  },

}
const SECTION_DIALOG = { // specialization
  _$_specialName: 'SECTION_DIALOG',
}
const SECTION_NOTETYPES = { // specialization
  _$_specialName: 'SECTION_NOTETYPES',
  showEntries: function () {
    const spaces = ' '.repeat(7)
    console.log(`${spaces}Name: ${this._$_instance.name}`)
    for (const key of Object.keys(this)) {
      if (!key.startsWith('_$_')) {
        console.log(`${spaces}${key}`)
      }
    }
  },
  returnHello: function () {
    let result = 'hello OVERRIDEN: ' + this._$_instance.name
    result += ' ' + Object.keys(arguments).map(([k]) => k)
    const proto = Object.getPrototypeOf(this)
    result += ' | ' + proto._$_returnHello.apply(this, arguments)
    result += ' | ' + proto._$_returnHello.call(this, 'a', 'b')
    return result
  },
}
const specializations = {
  SECTION_GENERAL,
  SECTION_TRANSLATE,
  SECTION_DIALOG,
  SECTION_NOTETYPES,
}

/** section
 * There is no constructor. Instances are created from literal.
 *
 * Wegen @hideconstructor wird kein Constructor dokumentiert.
 * @class
 * @hideconstructor
 *
 * @classdesc
 * A single section, which will have a specialization
 *
 * Es gibt keinen Constructor, und doch ist das Ganze eine Klasse. Die Objekte
 * werden nicht mit new erzeugt. Die Instanzen werden über Literale beim Lesen
 * des Javascript Scripts erzeugt und dieses Object `section` wird ihnen über den
 * Prototype-Setter '__proto__' als Prototyp zugewiesen.
 *
 * Um es unwahrscheinlicher zu machen, dass Eigenschaften des Literals
 * Eigenschaften dieses Prototypes überschreiben, beginnen dessen Eigenschaften
 * mit dem Kenner '_$_'.
 *
 * Da es von der Syntax her keine Klasse ist, können private member nicht mit
 * einem Doppelkreuz gekennzeichnet werden. Private Eigenschaften beginnen mit
 * dem Kenner '_$_'
 *
 * @mermaid
 * ---
 * config:
 *   theme: base
 *   layout: elk
 *   class:
 *     hideEmptyMembersBox: true
 * ---
 *  classDiagram
 *      class Object:::extern
 *      class section
 *      link Object "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/"
 *      section <|--Object
 *      classDef default fill:#0D5E4E,color:#e6ffe6, stroke:xxx, stroke-width:2px
 *      classDef extern fill:#bababa
 * @alias module:foty~section
 * @augments external:Object
 */
const section =
/** @lends module:foty~section.prototype */
{
  _$_protoName: 'section',
  _$_instance: false,

  /** section.throwIfNotusable: Throws an error if proto is not usable.
   *
   * Jede öffentliche Methode dieser Klasse ruft diese Methode als erstes auf,
   * um zu garantieren, dass mit der Ausführung fortgefahren werden kann.
   * Wenn die Instanz nicht initialisiert ist oder wenn das Literal nicht
   * korrekt war, löst diese Methode eine Ausnahme in Form eines
   * [FotyError]{@link module-foty.FotyError.html}s aus.
   * @param {?function} callingFunction - function, which throws the error
   * @param {...*} args - Arguments of `callingFunction`
   * @private
   * @throws [InitializationError]{@link module:foty~InitializationError}
   * setting is not initalized
   * @throws [LiteralError]{@link module:foty~LiteralError}
   * literal has wrong format
   */
  _$_throwIfNotUsable: function (callingFunction, ...args) {
    let error
    const callingFunctionArgs = args.join(', ')
    if (!this._$_instance) {
      error = new InitializationError(this, callingFunction, callingFunctionArgs,
        'Zugriff vor Initialisierung'
      )
    } else if (!this._$_instance.specialization) {
      error = new LiteralError(this, callingFunction, callingFunctionArgs,
        'specialization ist nicht vorhanden'
      )
    }
    if (error) {
      throw (error)
    }
  },

  /** section.init: initializes from literal before first use.
   *
   * Diese Funktion macht nichts, falls das Objekt bereits initialisiert ist.
   *
   * Ansonsten sucht sie die namensgleiche spezialisation und weist sie zu.
   * Falls keine spezialisation gefunden wird, wird eine Ausnahme ausgelöst.
   * @param {string} name - name of section
   * @throws [LiteralError]{@link module:foty~LiteralError}
   * literal has wrong format
   */
  _$_deepCopy: function (parent, name, src) {
    if (typeof src === 'object') {
      if (parent[name] === undefined) parent[name] = {}
      for (const [key, value] of Object.entries(src)) {
        section._$_deepCopy(parent[name], key, value)
      }
    } else {
      if (parent[name] === undefined) parent[name] = src
    }
  },
  _$_init: function (name) {
    if (this._$_instance) return
    const spec = specializations[name]
    if (!spec) {
      throw (new LiteralError(
        this, this._$_init, Array.prototype.join.call(arguments, ', '),
        'Es kann kein section specialization für ' + name + ' gefunden werden'
      ))
    }
    let repeatedDefaults
    for (const [key, value] of Object.entries(this)) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        continue
      }
      if (value.REPEAT) {
        delete value.REPEAT
        if (!repeatedDefaults) {
          repeatedDefaults = value
          delete this[key]
          continue
        }
      }
      // Laut Spezifikation wird das REPEAT Objekt nur für die nachfolgenden
      // verwendet
      if (repeatedDefaults) {
        for (const [defkey, defvalue] of Object.entries(repeatedDefaults)) {
          section._$_deepCopy(value, defkey, defvalue)
        }
      }
    }
    const stack = [{ obj: this, path: '', }]
    while (stack.length > 0) {
      const current = stack.pop()
      if (!current.obj[Symbol.iterator]) {
        Object.defineProperty(  // add property (non enumarable)
          current.obj, Symbol.iterator, { value: this.generator }
        )
      }
      if (!current.obj._$_PATH) {
        Object.defineProperty( // add property (non enumarable)
          current.obj, '_$_PATH', { value: current.path.slice(1) }
        )
      }
      if (!current.obj._$_valueOfDescendants) {
        Object.defineProperty( // add property (non enumarable)
          current.obj, 'valueOf', { value: this._$_valueOfDescendants }
        )
      }
      for (const [key, value] of Object.entries(current.obj)) {
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          const obj = { obj: value, path: current.path + '.' + key, }
          stack.push(obj)
        }
      }
    }
    Object.defineProperty( // add property (non enumarable)
      this, '_$_instance', { value: { } }
    )
    this._$_instance.specialization = specializations[name]
    this._$_instance.name = name
  },

  /** section.generator* iterates */
  generator: function * () {
    // return this._$_generator()
    const entries = Object.entries(this)
    let index = 0
    while (index < entries.length) {
      const [key, value] = entries[index++]
      if (key.startsWith('_$_')) {
        ;
      } else if (typeof value === 'object' && value !== null && value.IGNORE) {
        ;
      } else {
        // console.log('ITERATOR: ' + key)
        // console.log(value)
        yield { key, test: index, path: value._$_PATH }
      }
    }
  },

  /** section._$_ decorates */
  _$_: function (fu) {
    if (this._$_throwIfNotUsable) this._$_throwIfNotUsable(fu)
    return Object.hasOwn(this._$_instance.specialization, fu.name)
      ? this._$_instance.specialization[fu.name].apply(this, arguments[1])
      : this['_$_' + fu.name].apply(this, arguments[1])
  },

  /** section.showEntries: logs section to console
   *
   * gibt die Section auf die Konsole aus. Es werden der Name der Sektion
   * ausgegeben und alle Schlüssel, die nicht zum Prototyp gehören.
   * @throws [InitializationError]{@link module:foty~InitializationError}
   * setting is not initalized
   */
  showEntries: function () { return this._$_(this.showEntries, arguments) },
  _$_showEntries: function () {
    const spaces = '.'.repeat(7)
    console.log(`${spaces}Name: ${this._$_instance.name}`)
    for (const key of Object.keys(this)) {
      if (!key.startsWith('_$_')) {
        console.log(`${spaces}${key}`)
      }
    }
  },

  /** section.collectIf: returns obj with all keyToCollect == expected values */
  collectIf: function () { return this._$_(this.collectIf, arguments) },
  _$_collectIf: function (part, keyToCollect, expected) {
    const collection = {}
    for (const [key, value] of Object.entries(part)) {
      if (value.VALUE !== undefined && value.DEFAULT === undefined) {
        if (!value.IGNORE &&
          value[keyToCollect] !== undefined &&
          value[keyToCollect] === expected) {
          collection[key] = value.VALUE
        }
      } else {
        if (typeof value === 'object' && value !== null) {
          Object.assign(collection, this.collectIf(value, keyToCollect, expected))
        }
      }
    }
    return collection
  },

  /** section.getFrontmatterYAML: returns obj with all RENDER == false values */
  getFrontmatterYAML: function () { return this._$_(this.getFrontmatterYAML, arguments) },
  _$_getFrontmatterYAML: function (path) {
    const part = Object.keys(arguments).length ? this._$_at(path) : this._$_at()
    const frontmatterYAML = this._$_collectIf(part, 'RENDER', false)
    return frontmatterYAML
  },

  /** section.getRenderYAML: returns obj with all RENDER == true values */
  getRenderYAML: function () { return this._$_(this.getRenderYAML, arguments) },
  _$_getRenderYAML: function (path) {
    const part = Object.keys(arguments).length ? this._$_at(path) : this._$_at()
    const renderYAML = this._$_collectIf(part, 'RENDER', true)
    return renderYAML
  },

  /** section.at: returns obj at path */
  at: function () { return this._$_(this.at, arguments) },
  _$_at: function (path) {
    let part = this
    // Ohne Argumente: this
    // Fall Argument String: Objekt am Argument als Pfad oder undefined
    // Sonst Argument
    if (Object.keys(arguments).length) {
      if (typeof path === 'string') {
        const pathparts = path.split('.')
        for (let i = 0; i < pathparts.length; i++) {
          if (typeof part === 'object' && part !== null) {
            part = part[pathparts[i]]
          } else {
            part = undefined
            break
          }
        }
      } else {
        part = path
      }
    }
    return part
  },

  /** section.valueOf: returns VALUE or value */
  valueOf: function () { return this._$_(this.valueOf, arguments) },
  _$_valueOf: function (path, defaultValue) {
    const result = Object.keys(arguments).length ? this._$_at(path) : this._$_at()
    let ign = false
    let value = result
    if (typeof result === 'object' && result !== null) {
      ign = result.IGNORE ?? false
      value = result.DEFAULT
      if (typeof result.VALUE !== 'undefined') {
        value = result.VALUE
      }
      if (typeof value === 'undefined') {
        value = result
      }
    }
    if (typeof value === 'undefined') {
      value = defaultValue
    }
    return ign ? null : value
  },
  _$_valueOfDescendants: function (key, defVal) {
    return this[key] ?? defVal
  },

  /** section.returnHello: returns string, used for testing specializations */
  returnHello: function () { return this._$_(this.returnHello, arguments) },
  _$_returnHello: function () {
    let result = 'hello FROM PROTO: ' + this._$_instance.name
    result += ' ' + Object.keys(arguments).map(([k]) => k)
    return result
  },
}

class DialogError extends Error {
  constructor (message, ...params) {
    super(message, ...params)
    this.name = 'DialogError'
  }

  toString () {
    return ' °°' + this.constructor.name + ' ' + this.name
  }
}
/** Templater
 * @classdesc connects configuration and Obsidian templater
 *
 * Diese Klasse verbindet die Konfiguration mit dem templater. Sie führt alle
 * Aktionen aus, den den Templater involvieren.
 *
 * @description Creates a Templater instance
 * @mermaid
 * ---
 * config:
 *   theme: base
 *   layout: elk
 *   class:
 *     hideEmptyMembersBox: true
 * ---
 *  classDiagram
 *      class Object:::extern
 *      link Object "https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object"
 *      Templater <|-- Object
 *      classDef default fill:#0D5E4E,color:#e6ffe6, stroke:xxx, stroke-width:2px
 *      classDef extern fill:#bababa
 * @alias module:foty.Templater
 * @augments external:Object
*/
class Templater {
  #tp
  #app
  #gen
  #loc
  #dlg
  #typ
  #initialized = false
  #fileTitle // Name of file (with marker and name_end)
  #notename  // Name of note (without marker and name_end)
  #isNewNote
  #obsidianLanguage
  #cfgName
  #cfg
  #cfgComputedValues
  get notetype () {
    return this.#cfgName
  }

  /** Templater.constructor
   * @param {configuration} setting - the
   * [configuration]{@link module:foty~configuration} literal to use
   * @param {templater} tp - the [templater]{@link external:tsemplater} api
   * @param {app} app - the obsidian [app]{@link external:app} class
   */
  constructor (setting, tp, app) {
    const proto = Object.getPrototypeOf(userConfiguration)
    if (proto !== configuration) {
      throw (new LiteralError(
        this, this.constructor, Array.prototype.join.call(arguments, ', '),
        'Das erste Argument ist kein gültiges configuration literal'
      ))
    }
    if (!tp || !tp.date || !tp.file || !tp.system) {
      throw (new InitializationError(
        this, this.constructor, Array.prototype.join.call(arguments, ', '),
        'Das zweite Argument ist keine templater API '
      ))
    }
    if (!app || !app.workspace || !app.vault || !app.fileManager) {
      throw (new InitializationError(
        this, this.constructor, Array.prototype.join.call(arguments, ', '),
        'Das dritte Argument ist keine Obsidian API '
      ))
    }
    setting._$_init()
    this.#tp = tp
    this.#app = app
    this.#gen = setting._$_section('SECTION_GENERAL')
    this.#loc = setting._$_section('SECTION_TRANSLATE')
    this.#dlg = setting._$_section('SECTION_DIALOG')
    this.#typ = setting._$_section('SECTION_NOTETYPES')
  }

  #initialize () {
    if (this.#initialized) {
      return
    }
    this.#fileTitle = this.#tp.file.title
    let lang = null
    if (typeof window !== 'undefined') { // running in obsidian or browser
      // https://forum.obsidian.md/t/a-way-to-get-obsidian-s-currently-set-language/17829/5
      lang = window.localStorage.getItem('language')
    }
    this.#obsidianLanguage = lang ?? DEFAULT_LANGUAGE
    this.#initialized = true
  }

  /** Templater:test To test private functions
   */
  async test (funa) {
    if (funa === 'isInit') {
      return this.#initialized
    } else if (funa === 'init') {
      this.#initialize()
      return {
        tp: this.#tp,
        app: this.#app,
        gen: this.#gen,
        loc: this.#loc,
        dlg: this.#dlg,
        typ: this.#typ,
        initialized: this.#initialized
      }
    } else if (funa === 'isNewNote') {
      return this.#isNewNote
    } else if (funa === 'fileTitle') {
      return this.#fileTitle
    } else if (funa === 'cfgName') {
      return this.#cfgName
    } else if (funa === 'cfg') {
      return this.#cfg
    } else if (funa === 'notename') {
      return this.#notename
    } else if (funa === 'computeIsNewNote') {
      this.#initialize()
      this.#computeIsNewNote()
      return this.#isNewNote
    } else if (funa === 'findType') {
      this.#initialize()
      this.#computeIsNewNote()
      await this.#findType()
      return [this.#cfgName, this.#cfg]
    } else if (funa === 'findName') {
      this.#initialize()
      this.#computeIsNewNote()
      await this.#findType()
      await this.#findName()
      return this.#notename
    } else if (funa === 'rename') {
      this.#initialize()
      this.#computeIsNewNote()
      await this.#findType()
      await this.#findName()
      await this.#rename()
    } else if (funa === 'defaultTypeName') {
      this.#initialize()
      this.#computeIsNewNote()
      return this.#_$_defaultTypeName()
    } else if (funa === 'typesFromFolder') {
      this.#initialize()
      this.#computeIsNewNote()
      this.#_$_defaultTypeName()
      return this.#_$_typesFromFolder()
    } else if (funa === 'typesFromMarker') {
      this.#initialize()
      this.#computeIsNewNote()
      this.#_$_defaultTypeName()
      const [folderTypes, withoutFolderTypes] = this.#_$_typesFromFolder()
      const markerTypes = this.#_$_typesFromMarker(folderTypes, withoutFolderTypes)
      return markerTypes
    }
  }

  /* Templater:applyFunctions
   */
  applyFunctions (vals) {
    for (const [key, value] of Object.entries(vals)) {
      if (typeof value === 'function') {
        vals[key] = value(this.#notename, this.#cfgName, this.#cfg,
          this.#tp, this.#app, this.#cfgComputedValues)
      }
    }
  }

  /* Templater:doTheWork executes the process logic
   */
  async doTheWork () {
    this.#initialize()
    try {
      this.#computeIsNewNote()
      await this.#findType()
      await this.#findName()
      await this.#rename()
    } catch (e) {
      if (e instanceof FotyError) {
        throw e
      } else {
        throw e
      }
    }
  }

  /** Templater.computeIsNewNote Checks, whether current file starts with Untitled in current language
   */
  #computeIsNewNote () {
    const untitle = this.#loc.valueOf(
      'TITLE_NEW_FILE', this.#obsidianLanguage, UNNAMED_FILE
    )
    this.#isNewNote = this.#fileTitle.startsWith(untitle)
  }

  /** Templater.findType setzt this.#cfgName und this.#cfg
   */
  async #findType () {
    const [folderTypes, withoutFolderTypes] = this.#_$_typesFromFolder()
    const markerTypes = this.#isNewNote
      ? []
      : this.#_$_typesFromMarker(folderTypes, withoutFolderTypes)
    const types = markerTypes.length ? markerTypes : folderTypes
    // const types = markerTypes.length ? markerTypes : [...folderTypes, ...withoutFolderTypes]

    const prompt = this.#loc.valueOf(
      'TYPE_PROMPT', this.#obsidianLanguage, 'Choose Type'
    )
    const maxEntries = this.#dlg.valueOf('TYPE_MAX_ENTRIES', 10)
    this.#cfgName = this.#_$_defaultTypeName()

    try {
      if (types.length) {
        this.#cfgName = types.length === 1
          ? types[0]
          : await this.#tp.system.suggester(
            types, types, true, prompt, maxEntries
          )
      }
    } catch (e) {
      throw new DialogError('"Choose Type" Dialog cancelled')
    }
    this.#cfg = this.#typ.at(this.#cfgName)
  }

  /** Templater.findName setzt this.#notename und this.#cfgComputedValues
   */
  async #findName () {
    this.#notename = ''
    let breadcrumbs = this.#cfgName + '.'
    breadcrumbs += this.#isNewNote
      ? 'title_date_function'
      : 'marker'
    const value = this.#typ.valueOf(breadcrumbs, '')
    this.#cfgComputedValues = {}
    this.#notename = typeof value === 'function'
      ? await value(this.#notename, this.#cfgName, this.#cfg,
        this.#tp, this.#app, this.#cfgComputedValues)
      : this.#isNewNote
        ? ''
        : this.#fileTitle.startsWith(value)
          ? this.#fileTitle.slice(value.length)
          : this.#fileTitle
    while (!this.#notename.length) {
      const defprompt = this.#loc.valueOf(
        'NAME_PROMPT', this.#obsidianLanguage, 'Pure Name of Note'
      )
      breadcrumbs = this.#cfgName + '.name_prompt'
      const prompt = this.#typ.valueOf(breadcrumbs, undefined) ?? defprompt
      try {
        this.#notename = await this.#tp.system.prompt(prompt, '', true)
      } catch (e) {
        throw new DialogError('Choose Notename Dialog cancelled')
      }
    }
  }

  /** Templater.rename benennt die Obisidan note um
   */
  async #rename () {
    try {
      let path = this.#tp.file.path(true)
      path = path.slice(0, path.lastIndexOf('/'))
      if (path.length) path += '/'
      let breadcrumbs = this.#cfgName + '.' + 'marker'
      const marker = this.#typ.valueOf(breadcrumbs, '')
      breadcrumbs = this.#cfgName + '.' + 'name_end'
      const nameend = this.#typ.valueOf(breadcrumbs, '')
      breadcrumbs = this.#cfgName + '.' + 'create_same_named_file'
      const createDupl = this.#typ.valueOf(breadcrumbs, false)
      let newname = marker + this.#notename + nameend
      if (createDupl) {
        let num = 0
        while (await this.#tp.file.exists(path + newname + '.md')) {
          newname = marker + this.#notename + nameend + ++num
        }
      }
      await this.#tp.file.rename(newname)
    } catch (e) {
      this.#tp.system.prompt('Renaming not possible or supported',
        'ABORT\n        Renaming not possible or supported in this folder\n        Press ESCAPE or any key',
        false,
        true)
      throw new DialogError('Renaming not possible or supported')
    }
  }

  #_$_typesFromFolder () {
    const ALLFOLDERS = -1
    const types = {
      goodTypes: [],
      allFolderTypes: [],
      addType: function (type, weight) {
        if (weight === ALLFOLDERS) {
          this.allFolderTypes.push(type)
        } else if (this._$_goodWeights.some(d => d > weight)) {
          ;
        } else {
          for (let idx = this.goodTypes.length - 1; idx >= 0; idx--) {
            if (weight > this._$_goodWeights[idx]) {
              this._$_remove(idx)
            }
          }
          this._$_add(type, weight)
        }
      },
      _$_goodWeights: [],
      _$_add: function (type, weight) {
        this.goodTypes.push(type)
        this._$_goodWeights.push(weight)
      },
      _$_remove: function (idx) {
        this.goodTypes.splice(idx, 1)
        this._$_goodWeights.splice(idx, 1)
      }
    }
    const path = this.#tp.file.path(true)
    for (const entry of this.#typ) {
      if (!entry.path) {
        continue
      }
      let folders = this.#typ.valueOf(entry.key + '.folders')
      if (!folders) {
        types.addType(entry.key, ALLFOLDERS)
        continue
      }
      if (!Array.isArray(folders)) folders = [folders.toString()]
      let found = false
      let weight = 0
      folders.forEach(folder => {
        const idx = path.indexOf(folder)
        if (idx > -1) {
          let pw = path.slice(0, idx).split('/').length
          pw += (folder.split('/').length - 1) * PATH_FACTOR
          weight = pw > weight ? pw : weight
          found = true
        }
      })
      if (found) {
        types.addType(entry.key, weight)
      }
    }
    return [types.goodTypes, types.allFolderTypes]
  }

  #_$_typesFromMarker (folderTypes, withoutFolderTypes) {
    const markerTypes = []
    const noMarker = []
    // const types = [...folderTypes, ...withoutFolderTypes]
    const types = folderTypes.length ? folderTypes : withoutFolderTypes
    for (const entry of this.#typ) {
      if (!types.includes(entry.key)) continue
      const marker = this.#typ.valueOf(entry.key + '.marker', '')
      if (marker.length) {
        if (this.#fileTitle.startsWith(marker)) {
          markerTypes.push(entry.key)
        }
      } else {
        noMarker.push(entry.key)
      }
    }
    return markerTypes.length ? markerTypes : noMarker
  }

  #_$_defaultTypeName () {
    let defName = this.#typ['DEFAULT']
    if (defName === undefined || defName === '' || !this.#typ.at(defName)) {
      for (const entry of this.#typ) {
        defName = entry.key
        if (typeof this.#typ.at(defName) === 'object') {
          break
        }
      }
    }
    if (defName === undefined || defName === '') {
      defName = 'note'
    }
    return defName
  }
}

let userConfiguration
const exampleLiteral1 = {
  // If prototype is not set to configuration here in this literal
  // the code will not work
  __proto__: configuration,
  SECTION_TRANSLATE: {
    TITLE_NEW_FILE: {
      VALUE: [
        ['en', 'Untitled'],
        ['de', 'Unbenannt'],
      ],
    },
  },
  SECTION_NOTETYPES: {
    // If prototype is not set to section in this literal using __proto__
    // it will be set during runtime (for known section names)
    // by calling Object.setPrototypeOf()
    // This is slow in current engines and may introduce strange behaviour
    __proto__: section,
    note: {
      marker: { VALUE: '{w}', },
      aliases: { VALUE: cbkAliasOrt, RENDER: false, },
      borgia: { VALUE: 'Lucrezia ', RENDER: false, },
      firstline: { VALUE: 'DAS WORT', RENDER: true, },
      fugger: { VALUE: true, RENDER: true, },
    },
  },
}
userConfiguration = exampleLiteral1
const exampleLiteral2 = {
  __proto__: configuration,
  SECTION_TRANSLATE: {
    __proto__: section,
    TITLE_NEW_FILE: { VALUE: 'Unbenannt', },
  },
  SECTION_NOTETYPES: {
    __proto__: section,
    fueralle: {
      REPEAT: true,
      aliases: { RENDER: false, VALUE: cbkAliasOrt, TYPE: '(Array.<String>|Function)', },
      borgia: { RENDER: false, VALUE: 'Lucrezia', TYPE: 'String', },
      firstline: { RENDER: true, VALUE: 'DAS WORT', TYPE: 'String', },
      fugger: { RENDER: true, VALUE: true, TYPE: 'Boolean', },
    },
    alt: {
      folders: { VALUE: ['alt', 'antik'], },
      lastline: { RENDER: true, VALUE: 'ALT', },
      type: { RENDER: true, VALUE: 'alt' },
    },
    note: {
      marker: { VALUE: '{w}', },
      folders: { VALUE: ['temp'], },
      type: { RENDER: true, VALUE: 'note', },
    }
  }
}
userConfiguration = exampleLiteral2
const exampleLiteral3 = {
}
userConfiguration = exampleLiteral3
const schuleLiteral = {
  __proto__: configuration,
  SECTION_TRANSLATE: {
    __proto__: section,
    TITLE_NEW_FILE: {
      VALUE: [
        ['en', 'Untitled'],
        ['de', 'Unbenannt'],
      ],
    },
  },
  SECTION_NOTETYPES: {
    __proto__: section,
    DEFAULT: 'note',
    defaults: {
      REPEAT: true,
      mocstring: { VALUE: '-', TYPE: 'String', },
      cssclasses: { RENDER: false, VALUE: cbkFmtCssClasses, TYPE: '(Array.<String>|Function)', },
      date_created: { RENDER: false, VALUE: cbkFmtNow, TYPE: '(Date|Function)', },
      author: { RENDER: false, VALUE: 'Ueberphilosophy', TYPE: 'String', },
      publish: { RENDER: false, VALUE: true, TYPE: 'Boolean', },
      tags: { RENDER: false, VALUE: '[]', TYPE: '(String|Array.<String>|Function)', },
      prevlink: { RENDER: true, VALUE: '', TYPE: '(String|Function)', },
      nextlink: { RENDER: true, VALUE: '', TYPE: '(String|Function)', },
      scriptline: { RENDER: true, VALUE: '', TYPE: '(String|Function)', },
      firstline: { RENDER: true, VALUE: cbkNoteName, TYPE: '(String|Function)', },
      sndline: { RENDER: true, VALUE: '', TYPE: '(String|Function)', },
      thrdline: { RENDER: true, VALUE: '', TYPE: '(String|Function)', },
      lastline: { RENDER: true, VALUE: cbkFmtLastLine, TYPE: '(String|Function)', },
    },
    note: {},
    diary: {
      folders: { VALUE: ['Diary'], },
      title_date_function: { VALUE: cbkCalcDateTitle, },
      title_date_format: { VALUE: 'YYYY-MM-DD', },
      publish: { VALUE: false, },
      prevlink: { VALUE: cbkPrevDateLink, },
      nextlink: { VALUE: cbkNextDateLink, },
      sndline: { VALUE: '## ', },
    },
    material: {
      folders: { VALUE: ['Materialien'], },
      name_prompt: { VALUE: 'Titel_der_Vorlesung_Jahr_Institut_Speaker', },
      cssclasses: { VALUE: cbkMaterialCssClasses, },
      date_created: { VALUE: cbkMaterialDateCreated, },
      author: { VALUE: cbkMaterialAuthor, },
      publish: { VALUE: cbkMaterialPublish, },
      tags: { VALUE: cbkMaterialTags, },
      ddckey: { RENDER: false, VALUE: cbkMaterialDdcKey, },
      media: { RENDER: false, VALUE: cbkMaterialMedia, },
      scriptline: { VALUE: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```', },
      sndline: { VALUE: cbkMaterialSndLine, },
      thrdline: { VALUE: cbkMaterialThrdLine, },
      fourthline: { RENDER: true, VALUE: cbkMaterialFourthLine, },
      fifthline: { RENDER: true, VALUE: cbkMaterialFifthLine, },
      lastline: { VALUE: cbkMaterialLastLine, },
    },
    autor: {
      folders: { VALUE: ['Autoren'], },
      name_prompt: { VALUE: 'Autornachname', },
      name_end: { VALUE: ' Quellen', },
      gndkey: { RENDER: false, VALUE: '', TYPE: 'Number', },
      gndlink: { RENDER: false, VALUE: '', TYPE: 'String', },
      tags: { VALUE: cbkAutorTag, },
      scriptline: { VALUE: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```\n', },
      sndline: { VALUE: cbkTimeLine, },
    },
    autorsek: {
      folders: { VALUE: ['Autoren-Sekundaer'], },
      name_prompt: { VALUE: 'Autornachname', },
      name_end: { VALUE: ' Sekundaer', },
      cssclasses: { VALUE: 'sekundaer', },
      tags: { VALUE: cbkAutorTag, },
      scriptline: { VALUE: '```dataviewjs\ndv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));\n```\n', },
      firstline: { VALUE: cbkSekundaerName, },
    },
    feld: {
      folders: { VALUE: ['Feld'], },
      publish: { VALUE: false, },
      scriptline: { VALUE: cbkScriptLineFeld, },
      firstline: { VALUE: cbkFrstLineFeld, },
      sndline: { VALUE: cbkSndLineFeld, },
      thrdline: { VALUE: cbkThrdLineFeld, },
      lastline: { VALUE: cbkFmtLastLine, },
    },
    stutiis: {
      folders: { VALUE: ['XXXstutiis'], },
      date_created: { VALUE: '', },
      author: { VALUE: '', },
      cssclasses: { VALUE: 'studies', },
      publish: { VALUE: false, },
    },
    stutiismitschrift: {
      folders: { VALUE: ['XXXstutiis/Mitschriften'], },
      marker: { VALUE: '@', },
      name_prompt: { VALUE: 'Exakter Titel der Veranstaltung: Titel_der_Vorlesung_Jahr_Institut_Speaker', },
      date_created: { VALUE: '', },
      author: { VALUE: '', },
      cssclasses: { VALUE: 'studies', },
      publish: { VALUE: false, },
      firstline: { VALUE: 'Mitschrift', },
      sndline: { VALUE: cbkSndLineMitschrift, },
      thrdline: { VALUE: '## Offen', },
    },
    werkstattmitschrift: {
      folders: { VALUE: ['Mitschriften'], },
      marker: { VALUE: '@', },
      name_prompt: { VALUE: 'Exakter Titel der Veranstaltung: Titel_der_Vorlesung_Jahr_Institut_Speaker', },
      // /* schule_public */ date_created: { VALUE: '', },
      // /* schule_public */ author: { VALUE: '', },
      // /* schule_public */ cssclasses: { VALUE: 'studies', },
      /* schule_privat */ cssclasses: { VALUE: 'werkstatt', },
      publish: { VALUE: false, },
      firstline: { VALUE: 'Mitschrift', },
      sndline: { VALUE: cbkSndLineMitschrift, },
      thrdline: { VALUE: '## Offen', },
    },
    audio: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '{a}', },
      name_prompt: { VALUE: 'OPTIONAL Podcast ODER Reihe - Autornachname - Audiotitel', },
    },
    buch: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '{b}', },
      name_prompt: { VALUE: 'Autornachname - Buchtitel', },
      title_date_function: { VALUE: cbkAskGoogleForTitle, },
      tags: { VALUE: cbkBookAliasAsTag, },
      aliases: { RENDER: false, VALUE: cbkBookAlias, },
      buchtitel: { RENDER: false, VALUE: cbkBuchTitel, },
      buchuntertitel: { RENDER: false, VALUE: cbkBuchUntertitel, },
      buchautor: { RENDER: false, VALUE: cbkBuchAutor, },
      buchautorv: { RENDER: false, VALUE: cbkBuchAutorv, },
      buchdatum: { RENDER: false, VALUE: cbkBuchDatum, },
      buchverlag: { RENDER: false, VALUE: cbkBuchVerlag, },
      buchseiten: { RENDER: false, VALUE: cbkBuchSeiten, },
      buchsprache: { RENDER: false, VALUE: cbkBuchSprache, },
      buchisbn: { RENDER: false, VALUE: cbkBuchIsbn, },
      buchisbn13: { RENDER: false, VALUE: cbkBuchIsbn13, },
      buchebook: { RENDER: false, VALUE: cbkBuchEbook, },
      buchstatus: { RENDER: false, VALUE: ['egal'], },
      xbuchstatus: { RENDER: false, VALUE: ['gelesen', 'aktuell', 'teilweise', 'nochmal', 'ungelesen'], },
    },
    exzerpt: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '$', },
      name_prompt: { VALUE: 'Autornachname - Buchtitel', },
    },
    ort: {
      folders: ['Werkstatt'],
      marker: '&',
      name_prompt: 'Ortsname, Land',
      aliases: { VALUE: cbkFmtOneAlias, },
      gndkey: { RENDER: false, VALUE: '', TYPE: 'Number', },
      gndlink: { RENDER: false, VALUE: '', TYPE: 'String', },
    },
    person: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '=', },
      name_prompt: { VALUE: 'Personnachname, Personvorname OPTIONAL , Geburtsdatum', },
      aliases: { VALUE: cbkFmtOneAliasSwitch, },
      gndkey: { RENDER: false, VALUE: '', TYPE: 'Number', },
      gndlink: { RENDER: false, VALUE: '', TYPE: 'String', },
      pict: { RENDER: true, VALUE: 'teacher-295387_640-pixabay_2026-01-07.png', },
      pict_width: { RENDER: true, VALUE: 100, },
      firstline: { VALUE: cbkHeaderPerson, },
    },
    randnotizen: {
      folders: { VALUE: ['Werkstatt', 'Buchmitschriften'], },
      marker: { VALUE: '@', },
      name_prompt: { VALUE: 'Autornachname - Buchtitel', },
    },
    video: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '{v}', },
      name_prompt: { VALUE: 'OPTIONAL Reihe - OPTIONAL Autornachname - Videotitel', },
    },
    web: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '{w}', },
      name_prompt: { VALUE: 'OPTIONAL Autor - Webseitentitel - OPTIONAL Datum', },
    },
    zitat: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '°', },
      name_prompt: { VALUE: 'Titel Autornachname', },
    },
    zitate: {
      folders: { VALUE: ['Werkstatt'], },
      marker: { VALUE: '°°', },
      name_prompt: { VALUE: 'Titel Autornachname', },
    },
  },
}
userConfiguration = schuleLiteral
// userConfiguration = exampleLiteral1

/**
 * @alias module:foty.foty
 */
async function foty(tp, app, testConfiguration) { // eslint-disable-line
  let frontmatterYAML = null
  let renderYAML = null
  frontmatterYAML = {}
  renderYAML = {
    ____: ''
  }
  try {
    const templ = testConfiguration
      ? new Templater(testConfiguration, tp, app)
      : new Templater(userConfiguration, tp, app)
    await templ.doTheWork()
    const notetype = templ.notetype
    const typ = userConfiguration._$_section('SECTION_NOTETYPES')
    Object.assign(frontmatterYAML, typ.getFrontmatterYAML(notetype))
    Object.assign(renderYAML, typ.getRenderYAML(notetype))
    templ.applyFunctions(frontmatterYAML)
    templ.applyFunctions(renderYAML)
  } catch (e) {
    if (e instanceof FotyError) {
      throw e
    } else if (e instanceof DialogError) {
      return {
        CANCELLED: true
      }
    } else {
      throw e
    }
  }
  return Object.assign({}, frontmatterYAML, renderYAML)
}

/* eslint-disable */
/* // BEGIN PRODUCTION minus
  const moment = require('moment')
  const tp = {
    date: {
      now: function (formatstr) {
        const format = formatstr ?? 'YYYY-MM-DD'
        return moment().format(format)
      }
    },
    file: {
      title: 'Untitled',
      path: function () { return 'dir1/Buecher/subdir/filename.md' },
      exists: async function () { return Promise.resolve(false) },
      rename: async function () { return Promise.resolve(true) },
    },
    system: {
      suggester: async function (li) { return Promise.resolve(li[1]) },
      prompt: async function () { return Promise.resolve('NewNoteName') },
    }
  }
  const app = {
    workspace: {
      getActiveFile: function () { },
    },
    vault: {
      getAbstractFileBypath: function () { },
    },
    fileManager: {
      generateMarkdownLink: function () { },
    },
  }
  foty(tp, app)

  module.exports = {
    AccessError,
    LiteralError,
    InitializationError,
    FotyError,
    cbkAliasOrt,
    cbkFmtCssClasses,
    cbkFmtLastLine,
    cbkFmtNow,
    cbkNoteName,
    cbkSndLineMitschrift,
    configuration,
    SECTION_GENERAL,
    SECTION_TRANSLATE,
    SECTION_DIALOG,
    SECTION_NOTETYPES,
    section,
    specializations,
    Templater,
    foty,
    schuleLiteral,
    tp,
    app,
  }
*/ // END PRODUCTION minus
