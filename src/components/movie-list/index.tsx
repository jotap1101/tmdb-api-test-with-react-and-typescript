import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';
import MovieCard from '../movie-card';
import { Movie } from '@/types/movie';
import { OrbitProgress } from 'react-loading-indicators';

export default function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getMovies = async () => {
        await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie',
            params: {
                api_key: '8bbc7df23fe6f323d37a2b8a77e48dc5',
                language: 'pt-BR',
            }
        }).then((response) => {
            setMovies(response.data.results);

            console.log(response.data.results);
        });

        setIsLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);

    if (isLoading) {
        return (
            <div className="loading-container">
                <OrbitProgress variant="split-disc" dense color="#6046ff" size="medium" text="" textColor="" />
            </div>
        );
    }

    return (
        <ul className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
            
        </ul>
    );
}