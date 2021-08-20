//dependencies
import React, {useState,useEffect} from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link} from 'react-router-dom';


function Details(props) {
    const movieID = props.match.params.movieID;
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        const url = `https://www.omdbapi.com/?apikey=97b43746&i=${movieID}`;

        const getMovieDetails = async () => {
        
            try {
                const response = await fetch(url);//searchInput);
        
                if (response.ok) {
                    const data = await response.json();
                    setMovieDetails(data);
                    console.log(data);
                }

            } catch (err) {
            console.error(err);
            }
        };
        getMovieDetails();
    },[movieID]);


return (	
    <div>
        <div className='text-light bg-dark py-5'>
            <Container >
                <Link to="/" className="btn-lg btn-dark">{'<--Back'}</Link>
                <h1>Movie Details</h1>
            </Container>
        </div>
        <Container className='my-4 h5'>
            {movieDetails?
            <Card style={{width:'600px'}} border='dark'>
            {movieDetails.Poster ? (
                <Card.Img src={movieDetails.Poster} alt={`The image for ${movieDetails.Title}`} variant='top' />
            ) : null}
                <Card.Title className='m-2 h3'>{movieDetails.Title}</Card.Title>

                <Card.Body className="m-3">
                    {/* <Card.Text> */}
                    <p>Type: {movieDetails.Type} </p>
                    <p>Year: {movieDetails.Year}</p>
                    <p>Released: {movieDetails.Released}</p>
                    <p>Genre: {movieDetails.Genre}</p>
                    {movieDetails.Ratings ?
                    <div>
                        Ratings:
                        <ul>
                            {movieDetails.Ratings.map((rate)=> {return(
                                <li key={rate.Source} className='m-4'>{rate.Source} : {rate.Value}</li>
                            )})}
                        </ul>
                    </div>
                    : 'No ratings'}
                    {/* </Card.Text> */}
                    
                </Card.Body>
            </Card>
            :
            <></>}
        </Container>
    </div>
)}

export default Details;

