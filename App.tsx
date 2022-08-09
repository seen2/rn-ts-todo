import Navigations from "./src/navigations";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from "./src/redux/store";
import { Provider } from 'react-redux';



const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Navigations />
      </PersistGate>
    </Provider>
  );
};

export default App;
