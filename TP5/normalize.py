
import json
import hashlib as crypto

def is_name_valid(name):
    if not name or not isinstance(name, str):
        return False
    
    name = name.strip()
    if not name:
        return False
    if not name[0].isalpha() or name[0].islower(): #1ºcaracter pertence ao alfabeto e é maiusculo
        return False
    if len(name)<2 or name[1]==' ':
        return False
    return True
    

with open('data/cinema.json', 'r', encoding="utf-8") as f:
    cinema = json.load(f)
    genres = {}
    cast = {}

    for movie in cinema['filmes']:
        movie['id'] = crypto.md5(movie['title'].encode()).hexdigest()
        for genre in movie['genres']:
            if genre not in genres:
                genres[genre] = {}
                genres[genre]['genre'] = genre
                genres[genre]['movies'] = []
            genres[genre]['movies'].append({"title": movie['title'], "id": movie['id']})

        valid_actors = []
        for actor in movie['cast']:
            if is_name_valid(actor):
                valid_actors.append(actor)

                if actor not in cast:
                    cast[actor] = {}
                    cast[actor]['actor'] = actor
                    cast[actor]['movies'] = []
                cast[actor]['movies'].append({"title": movie['title'], "id": movie['id']})

        movie['cast'] = valid_actors

with open('data/cinema_normalized.json', 'w', encoding="utf-8") as f:
    json.dump({
        "filmes": cinema['filmes'],
        "genres": list(genres.values()),
        "cast": list(cast.values())
    }, f, indent=4, ensure_ascii=False)