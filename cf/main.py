"""
© 2024 Pedro Luis Dias
This code is licensed under MIT license (see LICENSE for details)
https://github.com/luiisp/collaborative-filtering
"""
from surprise import Dataset, Reader, KNNBasic, get_dataset_dir
from surprise.model_selection import train_test_split
from collections import defaultdict
import random
import pandas as pd

data = Dataset.load_builtin('ml-100k')

movies_info = {}

dataset_dir = get_dataset_dir()
movies_file = dataset_dir + '/ml-100k/ml-100k/u.item'
df = pd.DataFrame(data.raw_ratings, columns=['user', 'item', 'rating', 'timestamp']) # rating df 


with open(movies_file, 'r', encoding='ISO-8859-1') as f:
    for line in f:
        parts = line.split('|')
        movie_id = int(parts[0])
        movie_title = parts[1]
        release_date = parts[2]
        movies_info[movie_id] = {
            'id': movie_id,
            'title': movie_title,
            'release_date': release_date
        }


get_movie_info = lambda movie_id: movies_info.get(movie_id, None)


def get_random_movie_ids(n=3):
    index = random.sample(list(movies_info.keys()), n)
    return_obj = {}
    for i in index:
        re = get_movie_info(i)
        if i is None:
            continue
        return_obj[i] = re
    return return_obj

def recommend_movies_by_stars(ratings: dict, user_id: str = '999999'):
    for movie_id, rating in ratings:
        df = df.append({'user': user_id, 'item': movie_id, 'rating': rating, 'timestamp': 0}, ignore_index=True)

    reader = Reader(rating_scale=(1, 5))
    new_data = Dataset.load_from_df(df[['user', 'item', 'rating']], reader)

    trainset = new_data.build_full_trainset()
    algo = KNNBasic()
    algo.fit(trainset)

    predictions = []
    for movie_id in trainset.all_items():
        if trainset.to_raw_iid(movie_id) not in [str(m[0]) for m in ratings]:
            predictions.append((movie_id, algo.predict(user_id, trainset.to_raw_iid(movie_id)).est))

    predictions.sort(key=lambda x: x[1], reverse=True)
    recommended_movie_ids = [trainset.to_raw_iid(pred[0]) for pred in predictions[:5]]

    return_obj = {}
    for rmid in recommended_movie_ids:
        re = get_movie_info(rmid)
        if re is None:
            continue
        return_obj[rmid] = re
    return return_obj # return movie infos (title, date, etc...)
