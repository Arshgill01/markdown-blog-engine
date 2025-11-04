import './App.css';
import PostList from './Components/PostList';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { SinglePost } from './Components/SinglePost';
import { StaticPage } from './Components/StaticPage';
import ThemeContext from './Context/ThemeContext';
import { useContext } from 'react';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <Header />
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:slug" element={<SinglePost />} />
        <Route
          path="/about"
          element={(
            <StaticPage title="About">
              <p>
                Markdown Blog Engine is a simple demo that renders markdown posts shipped
                with the app bundle. Use the theme toggle in the header to switch between
                light and dark modes and enjoy reading!
              </p>
            </StaticPage>
          )}
        />
        <Route
          path="/contact"
          element={(
            <StaticPage title="Contact">
              <p>
                Questions or feedback? Drop a note at
                {" "}
                <a href="mailto:hello@example.com">hello@example.com</a>
                .
              </p>
            </StaticPage>
          )}
        />
        <Route
          path="/privacy"
          element={(
            <StaticPage title="Privacy Policy">
              <p>
                This sample project does not collect personal data. Feel free to customize
                this copy to match your production requirements.
              </p>
            </StaticPage>
          )}
        />
        <Route
          path="/terms"
          element={(
            <StaticPage title="Terms of Service">
              <p>
                Use this demo at your own discretion. Replace this text with legally binding
                terms before shipping to users.
              </p>
            </StaticPage>
          )}
        />
        <Route
          path="*"
          element={(
            <StaticPage title="Page Not Found">
              <p>The page you were looking for does not exist. Try one of the links above.</p>
            </StaticPage>
          )}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
