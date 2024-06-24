# 🦠 Collaborative Filtering
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/luiisp/collaborative-filtering/blob/main/readme.en.md)
> [!IMPORTANT]\
> **Speak in English? [Access Readme.md in English](https://github.com/luiisp/collaborative-filtering/blob/main/readme.en.md)**



## 📚 Oque é este projeto?
Esse projeto é uma implementação de um sistema de recomendação de filmes baseado nos gostos do usuario utilizando **Collaborative Filtering**.

> [!IMPORTANT]\
> **O dataset utilizado nesse projeto é o [ml-100k coletado do MovieLens (Released 4/1998) pela Universidade de Minnesota](https://grouplens.org/datasets/movielens/100k/).**



### ⌨️ Tecnologias
- Python
- JS
- Flask
- Surprise


### 🤔 Oque é Colaborative Filter?
O Collaborative Filtering é uma técnica de recomendação de itens que é baseada na opinião de muitos usuários. A ideia é que se um usuário A gostou de um item X e um usuário B gostou de um item Y, e o usuário A e B têm gostos semelhantes, então o usuário A provavelmente gostará do item Y e o usuário B provavelmente gostará do item X.

#### Quem usa?
- Netflix
- Amazon
- Spotify
- and more...

**Aprenda mais sobre CF [neste video](https://www.youtube.com/watch?v=n3RKsY2H-NE)**

## 📦 Usage

1. **Clone o repositório:**
```bash
git clone https://github.com/luiisp/collaborative-filtering
```

2. **Entre na pasta:**
```bash
cd collaborative-filtering
```

3. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

4. **Crie um arquivo .env para guardar suas variavéis de ambiente:**
> Veja o exemplo no arquivo [.env.example](.env.example)
```env
APIVERSION = "v1"
SERVERPORT = 8000
API_KEY = 1234567890
```
**Substitua a API_KEY pela sua chave da api  [OMDb API](https://www.omdbapi.com/)**

5. **Inicie o servidor:**
```bash
python main.py
```

**Done! 🚀**. Entre em   [localhost:8000](http://localhost:8000/)


## Authors
- 🧷 **[Pedro Luis](https://github.com/luiisp/)**