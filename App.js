
import React from 'react';
import {SafeAreaView} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import WebView from 'react-native-webview';

const onMessage = data => {
  alert(data.nativeEvent.data);
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{
          html: `<!DOCTYPE html>
          <html>
          <head>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          </head>
          <body>
          <div id="app-view"></div>
          <script>
              // Constants, env vars
              var pdrHost = "https://recette.pdr.atomai.com"
          
              // A settings object, passed here as global var via window.
              window.schemaEclateSettings = {
                host: pdrHost,
               machineId: 1, // select machine : De Dietrich DTG 210
               // This function would need to come from the host page, or the host mobile app.
               // This is a demo of the callback.
               onAddToBasket: function (pieceCodeDispart, quantity) {
                   const article = {articleId : pieceCodeDispart,quantity : quantity};
                   window.ReactNativeWebView.postMessage(JSON.stringify(article));
               },
                pieceRefFournisseur: "97525064", // auto-select a piece.
              }
          
              // Load the UI into a div using a jQuery utility.
              $('#app-view').load(pdrHost + '/api/v1/partials/search')
          </script>
          </body>
          </html>`,
        }}
        javaScriptEnabled={true}
        cacheEnabled={false}
        setDisplayZoomControls={true}
        onMessage={onMessage}
        scalesPageToFit={true}
      />
    </SafeAreaView>
  );
};

export default App;
