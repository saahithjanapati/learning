# Raindrop API Setup

Official docs:
- API overview: https://developer.raindrop.io/
- OAuth and token docs: https://developer.raindrop.io/v1/authentication/token
- Authorized calls: https://developer.raindrop.io/v1/authentication/calls
- Get raindrops: https://developer.raindrop.io/v1/raindrops/multiple
- Collections: https://developer.raindrop.io/v1/collections/methods

## Personal Token Path

Use this when the automation only needs to read your own Raindrop.io account.

1. Open Raindrop App Management:
   - https://app.raindrop.io/settings/integrations
2. Create a new application.
3. Use any local/private redirect URL if prompted, such as `http://localhost:8080/callback`.
4. Open the application settings.
5. Copy the app's Test token.
6. Put it in `.env.local`:

```bash
RAINDROP_ACCESS_TOKEN=your-test-token
RAINDROP_COLLECTION_ID=0
RAINDROP_FETCH_LIMIT=10
```

The Test token is enough for a personal Learning Machine automation. Do not commit `.env.local`.

## Full OAuth App Path

Use this only if the integration needs to work for accounts other than your own.

1. Register a Raindrop application.
2. Save the `Client ID` and `Client Secret`.
3. Configure a redirect URL.
4. Send the user to `https://raindrop.io/oauth/authorize` with `response_type=code`, `client_id`, and `redirect_uri`.
5. Exchange the returned `code` with `POST https://raindrop.io/oauth/access_token`.
6. Store and refresh the returned access token as needed.

For this repo's personal automation, prefer the Test token path.
