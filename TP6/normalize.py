
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
    

with open('cinema.json', 'r', encoding="utf-8") as f:
    cinema = json.load(f)
    genres = {}
    cast = {}

    for movie in cinema['filmes']:
        movie['_id'] = crypto.md5(movie['title'].encode()).hexdigest()
        
        genres_list = []
        for genre in movie['genres']:
            genre_id = crypto.md5(genre.encode()).hexdigest()
            genres_list.append({"genre": genre, "_id": genre_id})

            if genre not in genres:
                genres[genre] = {}
                genres[genre]['genre'] = genre
                genres[genre]['_id'] = genre_id
                genres[genre]['movies'] = []
            genres[genre]['movies'].append({"title": movie['title'], "_id": movie['_id']})
        movie['genres'] = genres_list

        valid_actors = []
        for actor in movie['cast']:
            if is_name_valid(actor):
                actor_id = crypto.md5(actor.encode()).hexdigest()
                
                valid_actors.append({"actor": actor, "_id": actor_id})

                if actor not in cast:
                    cast[actor] = {}
                    cast[actor]['actor'] = actor
                    cast[actor]['_id'] = actor_id
                    cast[actor]['films'] = []
                cast[actor]['films'].append({"title": movie['title'], "_id": movie['_id']})

        movie['cast'] = valid_actors

with open('filmes.json', 'w', encoding="utf-8") as f:
    json.dump(cinema['filmes'], f, ensure_ascii=False, indent=4)

with open('generos.json', 'w', encoding="utf-8") as f:
    json.dump(list(genres.values()), f, ensure_ascii=False, indent=4)

with open('atores.json', 'w', encoding="utf-8") as f:
    json.dump(list(cast.values()), f, ensure_ascii=False, indent=4)