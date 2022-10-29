import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/_app.css';
import { Provider } from 'react-redux';
import '../utils/antDesignStyles.less';
import store from '../redux/store';
import PageLayout from '../modules/Layout';
function App(appProps: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Miniting Website!</title>
        </Head>
        <main className="app">
          <PageLayout appProps={appProps}></PageLayout>
        </main>
      </Provider>
    </>
  );
}

export default App;
