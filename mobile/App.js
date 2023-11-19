import React, { useRef, useState } from 'react';
import { SafeAreaView, Button } from "react-native";
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';

const App = () => {
  const webViewRef = useRef(null);

  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    setCanGoBack(navState.canGoBack);
    setCurrentUrl(navState.url);

    // Check if the URL should be opened externally
    if (url && url.startsWith('https://open.spotify.com/playlist/')) {
      Linking.openURL(url);
    }
  };

  const handleOnCompetitionPage = (navState) => {
    if (navState && navState.url && navState.url.startsWith('https://tastemakers.pro/')) {
      console.log('On competition page. Calling handleGoBack.');
      handleGoBack();
    }
  };
  

  const handleGoBack = () => {
    if (webViewRef.current && canGoBack) {
      webViewRef.current.goBack();
    }
  };

  // const handleGoBack = () => {
  //   navigation.goBack();
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://tastemakers.pro' }}
        onNavigationStateChange={handleNavigationStateChange}
      />
      {canGoBack && currentUrl.includes('spotify.com') && (
          <Button title="Go Back" onPress={handleGoBack} />
        )}
      {/* <Button title='Back' onPress={handleGoBack}></Button> */}
    </SafeAreaView>
  );
}

export default App;
