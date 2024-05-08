import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from 'expo';

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
Sentry.init({
  dsn: "http://fc87ef3ba381edf1f6745ebe994671bf@localhost:9000/2",
  tracesSampleRate: 1.0,
  debug: true,
  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      // enableNativeFramesTracking: !isRunningInExpoGo(),
    }),
  ],
});

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        title="teste"
        onPress={() => {
          throw new Error("My first Sentry error!");
        }}
      ></Button>
    </View>
  );
}

export default Sentry.wrap(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
