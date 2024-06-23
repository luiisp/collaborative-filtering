from surprise import Dataset, get_dataset_dir
import random
data = Dataset.load_builtin('ml-100k')
movies_info = {}


dataset_dir = get_dataset_dir()
movies_file = dataset_dir + '/ml-100k/ml-100k/u.item'


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

