### Migration Fix for WebSocketManager

Encountered an issue with Cloudflare API deployments where a previously exported Durable Object class (`WebSocketManager`) was deleted from the codebase but its deletion was not specified in a `wrangler.json` migration. This resulted in the deployment failing.

Fixed by adding a `delete-class` migration:
```json
  "migrations": [
    {
      "tag": "v1",
      "deleted_classes": [
        "WebSocketManager"
      ]
    }
  ]
```
This serves as a reminder to always ensure proper migrations are specified when renaming or removing a Durable Object class in Cloudflare Workers to prevent failing deploys.
