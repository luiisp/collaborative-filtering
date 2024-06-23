from flask import Flask, request, jsonify, render_template
import os
import dotenv

dotenv.load_dotenv()

SERVER_PORT = os.getenv('SERVER_PORT', 8000)
API_VERSION = os.getenv('API_VERSION', 'development')
API_PATH = f'/api/{API_VERSION}'


app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html', api=API_PATH)

@app.route(f'{API_PATH}/movies/random', methods=['POST'])
def process_data():
    data = request.get_json()
    response = {'message': 'ok'}
    return jsonify(response)

if __name__ == '__main__':
    print({
        'SERVER_PORT': SERVER_PORT,
        'API_VERSION': API_VERSION,
        'API_PATH': API_PATH,
    })
    app.run(debug=True, port=int(SERVER_PORT))
   