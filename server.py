from flask import Flask, request, jsonify, render_template
from cf.main import get_random_movie_ids
import os
import dotenv

dotenv.load_dotenv()

SERVER_PORT = os.getenv('SERVER_PORT', 8000)
API_VERSION = os.getenv('API_VERSION', 'development')
API_PATH = f'/api/{API_VERSION}'
API_KEY = os.getenv('API_KEY', 'development')


app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html', api=API_PATH, key=API_KEY) 

@app.route(f'{API_PATH}/movies/random', methods=['GET'])
def process_data():
    count = request.args.get('count', 3, type=int)
    return jsonify(get_random_movie_ids(count))

@app.route(f'{API_PATH}/movies/get-recommends', methods=['POST'])
def get_recommends():
    ids = request.json['ids']
    print(ids)
    return jsonify(get_random_movie_ids(3))

    
if __name__ == '__main__':
    print({
        'SERVER_PORT': SERVER_PORT,
        'API_VERSION': API_VERSION,
        'API_PATH': API_PATH,
    })
    app.run(debug=True, port=int(SERVER_PORT))
   