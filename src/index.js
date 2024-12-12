import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dom from 'react-dom/client';
import "./index.css";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://www.omdbapi.com/', {
        params: { s: searchTerm, apikey: '66bce79b' }
      });
      setMovies(response.data.Search);
    } catch (error) {
      setError('Błąd podczas pobierania filmów');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchMovies();
  };

  return (
    <div className="App">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Wpisz tytuł filmu"
      />
      <button onClick={handleSearch}>Szukaj</button>

      {loading && <p>Ładowanie...</p>}
      {error && <p>{error}</p>}
      
      {movies.length > 0 && (
        <div className="movie-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
}

const root = dom.createRoot(document.getElementById("root"));
root.render(<><App/></>)
