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

    leere_description(data["webpages"])

    tmp = path.with_suffix(".json.tmp")
    with tmp.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    tmp.replace(path)

def leere_description(files):
    for key in list(files.keys()):
        files[key]["description"]="ABCDEFGHIJKLMNOPQRSTUVWYYZ"



file_in="site-lib/metadata.json"

verkleinere(file_in)
