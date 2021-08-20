//dependencies
import React from 'react';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { Link} from 'react-router-dom';


function Home(props) {
    
    const {searchedMovies, setSearchedMovies, searchInput, setSearchInput} = props;
    // console.log("searchedMovies",searchedMovies);
    // console.log("searchInput",searchInput);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (!searchInput.search) {
          window.alert("Enter search value");
          return false;
        }
    
        try {
          const url = `https://www.omdbapi.com/?apikey=97b43746&s=${searchInput.search}&type=${searchInput.type}&y=${searchInput.year}`;
          const response = await fetch(url);//searchInput);
    
          if (!response.ok) {
            throw new Error('something went wrong!');
          }

    
          const data = await response.json();
          const items = data.Search;

          if (!items) {
            window.alert('There is no results!');
            return false;
          }
          const movieData = items.map((movie) => ({
            title: movie.Title,
            type: movie.Type,
            year: movie.Year,
            imdbID: movie.imdbID,
            image: movie.Poster,
          }));

          setSearchedMovies(movieData);
        } catch (err) {
          console.error(err);
        }
      };

      const handleChange = async (event) => {

        const temp = {
          search: searchInput.search,
          type: searchInput.type,
          year: searchInput.year,
        };
        if(event.target.name === 'searchInput') {
          temp.search = event.target.value;
        }
        if(event.target.name === 'typeInput') {
          temp.type = event.target.value;
        }
        if(event.target.name === 'yearInput') {
          temp.year = event.target.value;
        }
        console.log(temp);
        setSearchInput(temp);
      }

return (	
  <div>
    <div className='text-light bg-dark py-5'>
        <Container >
            <h1>Search for Movie!</h1>
            <Form onSubmit={handleFormSubmit}>
                <Row className='m-2'>
                    <Col xs={12} md={8}>
                      <Form.Control
                        name='searchInput'
                        defaultValue={searchInput.search}
                        onChange={handleChange}
                        type='text'
                        size='lg'
                        placeholder='Search for a movie'
                      />
                    </Col>
                  </Row>

                  <Row className='m-2'>
                    <Col xs={12} md={8}>
                      <Form.Select
                        onChange={handleChange}
                        name='typeInput'
                        size='lg'
                        placeholder='Search for a movie'
                        defaultValue={searchInput.type}
                      >
                        <option value="">Select type</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row className='m-2'>
                    <Col xs={12} md={8}>
                      <Form.Control
                        name='yearInput'
                        defaultValue={searchInput.year}
                        onChange={handleChange}
                        type='text'
                        size='lg'
                        placeholder='Enter a year'
                      />
                    </Col>
                  </Row>
                  <Row className='m-2'>
                    <Col xs={12} md={8}>
                      <Button type='submit' variant='success' size='lg'>
                        Search
                      </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    </div>
    <Container className='my-4'>
      <h2>
        {searchedMovies.length
          ? `Viewing ${searchedMovies.length} results:`
          : 'Search for a Movie to begin'}
      </h2>
      <Row xs={1} md={2} xl= {5} className="g-4"> 
        {searchedMovies.map((movie) => {
          return (
            <Col key={movie.imdbID}>
              <Card key={movie.imdbID} border='dark'>
                {movie.image ? (
                  <Card.Img src={movie.image} alt={`The image for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    Type: {movie.type} 
                  </Card.Text>
                  <Card.Text>
                    Year: {movie.year}
                  </Card.Text>
                  <Link to={movie.imdbID} className="btn btn-primary">Show Details!</Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  </div>
)}

export default Home;

