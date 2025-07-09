import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Movie from './Movie';
import "./css/App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ?
          (
            <div className="loader" >
              <span className="loader_text">Loading...</span>
            </div>
          )
          :
          (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  summary={movie.summary}
                  title={movie.title}
                  poster={movie.medium_cover_image}
                  genres={movie.genres} />
              ))}
            </div>
          )}
      </section>)
  }

  getMovies = async () => {
    const { data: { data: { movies } } } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    console.log(movies);
    this.setState({ movies, isLoading: false });
  }
  componentDidMount() {
    this.getMovies();
  }

}

export default App;