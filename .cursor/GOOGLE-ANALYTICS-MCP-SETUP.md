# Google Analytics MCP setup

The [Google Analytics MCP](https://github.com/googleanalytics/google-analytics-mcp) is configured in `.cursor/mcp.json`. Finish setup so Cursor can talk to your GA property.

## 1. Install pipx and the server

```bash
# Install pipx if needed: brew install pipx && pipx ensurepath
pipx run analytics-mcp
```

(First run may install the package; you can cancel after it starts.)

## 2. Google Cloud

1. Open [Google Cloud Console](https://console.cloud.google.com) and create or select a project.
2. **Enable APIs**: APIs & Services → Enable APIs → enable:
   - **Google Analytics Admin API**
   - **Google Analytics Data API**
3. **OAuth client**: APIs & Services → Credentials → Create Credentials → OAuth client ID (Desktop or Web).
4. **Application Default Credentials** (use the JSON key path or ADC path you get from this step):

```bash
gcloud auth application-default login \
  --scopes https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/cloud-platform \
  --client-id-file=YOUR_CLIENT_JSON_FILE
```

When it finishes it prints something like: `Credentials saved to file: /path/to/credentials.json`. Use that path in step 3.

## 3. Edit `.cursor/mcp.json`

Replace the placeholders in `env`:

- **GOOGLE_APPLICATION_CREDENTIALS**: Full path to the credentials JSON (from step 2).
- **GOOGLE_PROJECT_ID**: Your Google Cloud project ID (e.g. from the Cloud Console URL).

Example:

```json
"env": {
  "GOOGLE_APPLICATION_CREDENTIALS": "/Users/you/.config/gcloud/application_default_credentials.json",
  "GOOGLE_PROJECT_ID": "my-ga-project-123"
}
```

## 4. Restart Cursor

Restart Cursor so it picks up the MCP. The server will then be available (e.g. for reports and property details).

**Note:** This MCP is not Runlayer-managed; it runs locally via pipx and your Google credentials.
