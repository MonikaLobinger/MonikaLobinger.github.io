#!/usr/bin/env python3
import shutil
import json
import sys
import pprint
from pathlib import Path


def modify(file):
    "Modify JSON"
    path = Path(file)
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    iterate(data["webpages"])
    iterate(data["fileInfo"])

    tmp = path.with_suffix(".json.tmp")
    with tmp.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    tmp.replace(path)

def iterate(json_obj):
    for fullfilename, value in json_obj.items():
        if isinstance(value, dict):
            for key, v in value.items():
                if key=="backlinks":
                    korrigiere_backlinks(fullfilename, v)

def korrigiere_backlinks(fullfilename, backlinks):
    """
    Entfernt alle privaten Backlinks.
    Für die öffentliche Site.
      Backlinks auf zuhoeren kommen eigentlich vom Elternverzeichnis

      Manche Backlinks kommen von xxxstutiis und sollten eigentlich von werkstatt
      kommen. Diese umbenennen. Falls sie nun doppelt sind, einen löschen.

      Was jetzt noch an xxxstutiis ist, das muss alles weg

      Im Verzeichnis Werkstatt liegen Mitschriften, die aber ohne selbst
      erstellten Inhalt sind. Die einzigen Backlinks, die so eine Datei enthalten
      kann, sind welche von Materialien.
      Eine Ausnahme ist Adamson

      Materialien kann nur Backlinks von Mitschriften haben und, was vlt
      noch benötigt wird, Backlinks von anderen Veranstaltungen in Materialien.

      Materialien verlinkt nur möglicherweise auf sich selbst und auf Werkstatt.
      Werkstatt im öffentlichen Modus verlinkt nur auf Materialien. Das bedeutet:
      Backlinks in allen anderen Verzeichnissen von diesen beiden Verzeichnissen
      gibt es nicht.
    """
    for idx, backlink in enumerate(backlinks.copy()):
        if backlink.startswith("werkstatt/mitschriften/zuhoeren/@"):
            backlinks[idx]=backlink.replace("/zuhoeren", "")

    for idx, backlink in enumerate(backlinks.copy()):
        if backlink.startswith("xxxstutiis/mitschriften/@") \
        or backlink.startswith("xxxstutiis/mitschriften/-@"):
            if backlink.replace("xxxstutiis", "werkstatt") in backlinks:
                backlinks.remove(backlink)
            else:
                backlinks[idx]=backlink.replace("xxxstutiis", "werkstatt")

    for idx, backlink in enumerate(backlinks.copy()):
        if backlink.startswith("xxxstutiis") and backlink in backlinks:
            backlinks.remove(backlink)

    if fullfilename.startswith("werkstatt/mitschriften/-@history_of_philosophy_without_any_gaps_adamson."):
        for idx, backlink in enumerate(backlinks.copy()):
            if not backlink.startswith("werkstatt/mitschriften/adamson/@adamson-001-") \
            and not backlink.startswith("werkstatt/mitschriften/adamson/@adamson-002-") \
            and not backlink.startswith("materialien/") and backlink in backlinks:
                backlinks.remove(backlink)
    elif fullfilename.startswith("werkstatt/mitschriften/adamson/@adamson-"):
        for idx, backlink in enumerate(backlinks.copy()):
            if not backlink.startswith("werkstatt/mitschriften/-@history_of_philosophy_without_any_gaps_adamson.") \
            and not backlink.startswith("materialien/") and backlink in backlinks:
                backlinks.remove(backlink)
    elif fullfilename.startswith("werkstatt/"):
        for idx, backlink in enumerate(backlinks.copy()):
            if not backlink.startswith("materialien/") and backlink in backlinks:
                backlinks.remove(backlink)
    elif fullfilename.startswith("materialien/timeline.") \
    or fullfilename.startswith("materialien/ddcklassen."):
        for idx, backlink in enumerate(backlinks.copy()):
            if not backlink.startswith("materialien/") and backlink in backlinks:
                backlinks.remove(backlink)
    elif fullfilename.startswith("materialien/"):
        for idx, backlink in enumerate(backlinks.copy()):
            if not backlink.startswith("werkstatt/mitschriften/@") \
            and not backlink.startswith("werkstatt/mitschriften/-@") \
            and not backlink.startswith("materialien/") and backlink in backlinks:
                backlinks.remove(backlink)
    else: # allhelperfiles/ zusaetze/
        for idx, backlink in enumerate(backlinks.copy()):
            if backlink.startswith("werkstatt/") \
            or backlink.startswith("materialien/") and backlink in backlinks:
                backlinks.remove(backlink)


file_in="site-lib/metadata.json"

modify(file_in)
