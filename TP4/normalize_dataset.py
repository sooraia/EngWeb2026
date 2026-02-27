

import json


with open("data/emd.json", "r", encoding="utf-8") as f:
    data = json.load(f)
    object = {}
    object["emd"] = data
    for emd in data:
        emd['id'] = emd.pop("_id")
        emd.pop("index")
        emd['primeiro_nome'] = emd["nome"]["primeiro"]
        emd['sobrenome'] = emd["nome"]["último"]
        emd.pop("nome")

with open("data/emd_normalized.json", "w", encoding="utf-8") as f:
    json.dump(object, f, indent=1, ensure_ascii=False)