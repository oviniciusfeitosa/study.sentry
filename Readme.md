# Sentry

## Steps

```sh
git clone https://github.com/getsentry/self-hosted
cd self-hosted
./install.sh
docker compose up -d
#user: <user@gmail.com>
#password: xxxxxx
```

- Log in to the Sentry interface: <http://localhost:9000/>
- Back to root folder: `cd ..`
- (Optional)Create expo app

  ```sh
  npx create-expo-app mobile
  cd mobile
  npx expo install @sentry/react-native
  npx @sentry/wizard@latest -s -i reactNative
    #yes
    #self-hosted
    #http://localhost:9000
    #yes
  ```

  - Configuring `@sentry/react-native` can be done through the config plugin. Add the plugin to your project's app config file:

  ```app.json
  {
    "expo": {
      "plugins": [
        [
          "@sentry/react-native/expo",
          {
            "organization": "sentry org slug, or use the `SENTRY_ORG` environment variable",
            "project": "sentry project name, or use the `SENTRY_PROJECT` environment variable"
          }
        ]
      ]
    }
  }
  ```

  - metro.config.js

  ```
  // This replaces `const { getDefaultConfig } = require('expo/metro-config');`
  const { getSentryExpoConfig } = require('@sentry/react-native/metro');

  // This replaces `const config = getDefaultConfig(__dirname);`
  const config = getSentryExpoConfig(__dirname);

  module.exports = config;
  ```
