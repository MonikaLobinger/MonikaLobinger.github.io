#!/usr/bin/env python3
import shutil
import json
import sys
import pprint
from pathlib import Path


def verkleinere(file):
    "Verkleinere JSON"
    path = Path(file)
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    iterate(data)

    tmp = path.with_suffix(".json.tmp")
    with tmp.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    tmp.replace(path)

def iterate(data):
    clear_list(data["shownInTree"])
    clear_list(data["attachments"])
    clear_list(data["allFiles"])
    clear_dict(data["webpages"])
    clear_dict(data["fileInfo"])
    clear_Dict(data["sourceToTarget"])
    leere_description(data["webpages"])


def clear_list(files):
    for idx, file in enumerate(files.copy()):
        if file.startswith("allhelperfiles/allresources/private/") \
        or file.startswith("werkstatt/mitschriften/zuhoeren/") \
        or file.startswith("xxxstutiis") \
        or file.startswith("zzzzzz2") \
        and file in files:
            #print(file)
            files.remove(file)
        if file.startswith("werkstatt/") \
        and not file.startswith("werkstatt/mitschriften/") and file in files:
            #print(file)
            files.remove(file)

def clear_dict(files):
    for key in list(files.keys()):
        if key.startswith("allhelperfiles/allresources/private/") \
        or key.startswith("werkstatt/mitschriften/zuhoeren/") \
        or key.startswith("xxxstutiis/") \
        or key.startswith("zzzzzz2/"):
            #print(key)
            del files[key]
        else:
            pass
        if key.startswith("werkstatt/") \
        and not key.startswith("werkstatt/mitschriften/"):
            #print(key)
            del files[key]

def clear_Dict(files):
    for key in list(files.keys()):
        if key.startswith("allhelperfiles/allresources/private/") \
        or key.startswith("Werkstatt/Mitschriften/ZuHoeren/") \
        or key.startswith("XXXstutiis/") \
        or key.startswith("ZZZZZZ2/"):
            #print(key)
            del files[key]
        else:
            pass
        if key.startswith("Werkstatt/") \
        and not key.startswith("Werkstatt/Mitschriften/"):
            #print(key)
            del files[key]

def leere_description(files):
    for key in list(files.keys()):
        files[key]["description"]="ABCYYZ"


file_in="site-lib/metadata.json"

verkleinere(file_in)
