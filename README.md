# News Aggregator App

Welcome to the News Aggregator app! This app fetches news from three different APIs
- NewsAPI 
- The Guardian API
- The New York Times 

and aggregates them into a unified news feed.

## What the App Does

The News Aggregator app provides the following features:

- **News Aggregation:** Fetches and consolidates news articles from NewsAPI, The Guardian API, and The New York Times API.

- **Development Mode:** Run the app in development mode to make changes and test new features.

- **Testing:** Utilizes Jest for testing to ensure the reliability of the app.

- **Deployment:** Easily deploy the app using Docker and Docker Compose.

## How to Run in Development Mode

To run the app in development mode, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/news-aggregator.git

2. **run App in development mode :**

   ```bash
   yarn 

   yarn dev

3. **Run Tests :**

   ```bash
   yarn test

4. **Run on production mode :**

   ```bash
   yarn preview
## OR:

### 1. Pull the Docker Image

Pull the News Aggregator Docker image from Docker Hub:

```bash
docker pull vidahdyti/news-aggregator:1
docker run -p 4173:4173 vidahdyti/news-aggregator:1
```
