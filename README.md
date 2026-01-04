#   Lernmaterialen online

Sammlung frei verfügbarer Lernmaterialien, eimal Links auf Vorlesungen und hochwertige Podcasts und zum anderen Links auf gemeinfreie Originaltexte. Die Sammlung wird von [github.io](https://monikalobinger.github.io/home.html) gehostet. Die [Obsidian Quellen](https://github.com/MonikaLobinger/Sammlung) sind ein vollständiger Obsidian Vault.
## Sammlung

### Lernmaterialien

Einige Institute oder Einzelpersonen an Universitäten stellen Vorlesungen oder andere qualitativ hochwertige Video- oder Audiodateien, zum Beispiel Podcasts online. Diese sind über das ganze Netz verteilt. Zusätzlich ist besonders auf Youtube eine Einzelvorlesung aus einem Vorlesungszyklus nicht immer leicht zu finden.

[Hier](https://monikalobinger.github.io/materialien/-materialien.html) werden Links auf diese Vorlesungen und Podcasts gesammelt, beginnend mit dem Bereich Philosophie. Jedes Lernmaterial listet die Links auf alle Einzelvorlesungen/-Vorträge einer Veranstaltung auf.

### gemeinfreie Texte

Viele literarische und philosophische Werke, deren Copyright erloschen ist, sind im Volltext umsonst online zu finden. 

[Hier](https://monikalobinger.github.io/materialien/timeline.html) entsteht eine Sammlung von Links auf Originale, die entweder online zu lesen sind, oder als pdf oder ebook heruntergeladen werden können. Auch hier wird mit dem Bereich Philosophie begonnen

### Werkstatt
Der Bereich Werkstatt wird in der lokalen Obsidianversion für eigene Notizen verwendet. Jedes Lernmaterial enthält oben einen Link zu einer Seite "Mitschrift" im Verzeichnis "Werkstatt/Mitschriften". Diese Mitschriften enthalten nochmal die Liste alle Einzelvorträge. In der Webersion macht das wenig Sinn, in der Obsidianversion ist das eine editierbare Notiz, die man als Ausgangspunkt für eigene Notizen zur Veranstaltung und den Einzelvorträgen verwenden kann.

##  Beitrag

Wer beitragen möchte, besonders gerne zu anderen Bereichen, möge bitte mit mir in Verbindung treten. Wir werden dann einen Modus finden.


Technisch sind die Quellen aller Veranstaltungen und auch aller Textsammlungen zu einem Autor Markdown Dateien. 

Eine Möglichkeit wäre daher, vollständige Dateien beizutragen. Wenn eine neue Datei zur Sammlung hinzukommt, wird sie automatisch in die Kataloge und Inhaltsverzeichnisse eingetragen. 

Andere Möglichkeiten können im Austausch entwickelt werden.

### Vorlage Quelle
Man kann sich eine Vorlage z.B. des Namens `Titel_der_Veranstaltung_UniKurzform_SprecherNachname`  erstellen und die variablen Einträge ändern:
```
---
cssclasses: material
date_created: DATUM-DER-FORM-JJJJ-MM-TT
publish: true
tags: []
ddckey: NNN-3-STELLIGE ZIFFER DIE DIE DDC KATEGORIE IST
media:  [audio,video,text] DIE-NICHT-ZUTREFFENDEN-RAUSLÖSCHEN
author: NAME-DES-AUTORS-DIESER-MARKDOWN-SEITE
---
\`\`\`dataviewjs
dv.executeJs(await dv.io.load("Materialien/breadcrumbs.js"));
\`\`\`
## LINK-INS-NETZ-ZUR-THEMENSEITE
#speaker/NAME-DES-SPRECHERS #speaker/EVTL-WEITERER-SPRECHER

[[Werkstatt/Mitschriften/@NAME-DIESER-DATEI|Mitschrift]] 

- LISTE-DER-LINKS-ZU-EINZELVERANSTALTUNGEN

## -footnotes 

```


- DATUM-DER-FORM-JJJJ-MM-TT: Datum der Erstellung der Form 2011-11-22
- NNN-3-STELLIGE ZIFFER DIE DIE DDC KATEGORIE IST: Ein passender [DDC](https://www.dnb.de/DE/Professionell/DDC-Deutsch/DDCUebersichten/ddcUebersichten.html?nn=259498#doc259496bodyText3) Schlüssel
- DIE-NICHT-ZUTREFFENDEN-RAUSLÖSCHEN: Aus [audio,video,text] nur die zutreffenden wählen, die eckigen Klammern und die Kommas zwischen Zutreffenden bleiben bestehen.
- NAME-DES-AUTORS-DIESER-MARKDOWN-SEITE: Der eigene (Netz)name.
- \\\`\\\`\\\`: Sollte in der Vorlage dieser String stehen - daraus die Backslashes entfernen
- LINK-INS-NETZ-ZUR-THEMENSEITE: Link zur Hautseite der Veranstaltung im Netz. Die Beschriftung des Links sollte die Form haben `Titel der Veranstaltung - UniKurzform, SprecherNachname`
- NAME-DES-SPRECHERS: voller Name des Vortragenden mit Bindestrichen, z.B. Nachname-Vorname. Das Wort `#speaker/` bleibt stehen
- EVTL-WEITERER-SPRECHER: Weitere Vortragende mit Bindestrichen, oder den gesamten String inklusive `#speaker/` löschen.
- NAME-DIESER-DATEI: Name dieser Markdown Datei ohne die Endung, z.B. `Titel_der_Veranstaltung_UniKurzform_SprecherNachname`. Der Klammeraffe `@` bleibt stehen.
- LISTE-DER-LINKS-ZU-EINZELVERANSTALTUNGEN: Links zu den Audios/Videos der Einzelveranstaltungen als Liste.



