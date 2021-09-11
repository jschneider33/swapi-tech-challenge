import styles from './styles/App.module.css';
import BrowseSpecies from './components/BrowseSpecies';

function App() {
  return (
      <div className='App'>
        <header className={styles.header}>
          <h1 className={styles.title}>SWAPI</h1>
          <p className={styles.subTitle}>Search for a character or select one to learn more</p>
        </header>
        <main>
          <BrowseSpecies />
        </main>
      </div>
  );
}

export default App;