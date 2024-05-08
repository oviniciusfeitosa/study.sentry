# Sentry

user: <vinciusfesil@gmail.com>
password: xxxxxx

```sh
git clone https://github.com/getsentry/self-hosted
cd self-hosted
./install.sh
cd ..
docker compose up -d
```

- Login <http://localhost:9000/>
- Create Project for react native


- Create expo app

```sh
npx create-expo-app mobile
#npx expo install @sentry/react-native
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