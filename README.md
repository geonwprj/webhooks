# Webhook Novel Content Uploader

This project handles webhooks with a "novels" action that retrieves content from a specified URL and uploads it to a GitHub repository.

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your GitHub credentials:
   ```env
   GITHUB_TOKEN=your_github_token_here
   GITHUB_OWNER=your_github_username_here
   GITHUB_REPO=your_repo_name_here
   GITHUB_BRANCH=main
   ```

## Usage

Send a webhook with the following payload:
```json
{
  "action": "novels",
  "params": {
    "url": "https://example.com/novel.txt",
    "filepath": "novels/example.txt"
  }
}
```

## Deployment

### Serverless (Deno/Cloudflare/Vercel)
TBC

### Podman Compose
1. Build and start the container:
   ```bash
   podman-compose up -d
   ```

### Local Installation
1. Install Node.js
2. Start the server:
   ```bash
   node index.js
   ```

## License
MIT