# 🦠 Collaborative Filtering

## 📚 What is this project?
This project is an implementation of a movie recommendation system based on user preferences using **Collaborative Filtering**. The system was developed in Python and uses the Pandas library for data manipulation and calculations.

### 🤔 What is Collaborative Filtering?
Collaborative Filtering is a technique for recommending items based on the opinions of many users. The idea is that if user A liked item X and user B liked item Y, and user A and B have similar tastes, then user A will probably like item Y and user B will probably like item X.

#### Who uses it?
- Netflix
- Amazon
- Spotify
- and more...

**Learn more about CF [in this video](https://www.youtube.com/watch?v=n3RKsY2H-NE)**

## 📦 Usage

1. **Clone the repository:**
```bash
git clone https://github.com/luiisp/collaborative-filtering
```

2. **Navigate to the folder:**
```bash
cd collaborative-filtering
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Create a .env file to store your environment variables:**
> See the example in the [.env.example file](.env.example)
```env
APIVERSION = "v1"
SERVERPORT = 8000
API_KEY = 1234567890
```
**Replace the API_KEY with your API key from [OMDb API](https://www.omdbapi.com/)**

5. **Start the server:**
```bash
python main.py
```

**Done! 🚀**. Go to   [localhost:8000](http://localhost:8000/)


## Authors
- 🧷 **[Pedro Luis](https://github.com/luiisp/)**