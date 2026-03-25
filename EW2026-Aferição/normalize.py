
import json

with open('dataset_reparacoes_old.json', 'r', encoding="utf-8") as f:
    data = json.load(f)
    reparacoes = data['reparacoes']

    for reparacao in reparacoes:
        reparacao['_id'] = str(reparacao['nif'])

with open('reparacoes.json', 'w', encoding="utf-8") as f:
    json.dump(reparacoes, f, ensure_ascii=False, indent=4)