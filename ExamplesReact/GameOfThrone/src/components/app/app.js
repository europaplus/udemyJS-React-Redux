import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage";
import gotService from "../../services/gotService"
import {CharacterPage, BooksPage, BooksItem, HousesPage} from "../pages";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './app.css';

export default class App extends Component {
    gotService = new gotService();
    constructor(props) {
        super(props);
        this.state = {
            showRandomChar: true,
            error: false,
        }
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    componentDidCatch(error, errorInfo) {
        console.log('error');
        this.setState({
            error: true,
        })
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar interval={15000}/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <Button color="primary" onClick={this.toggleRandomChar}>Toggle random character</Button>
                            </Col>
                        </Row>
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match = match.params;

                                return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        )
    }
};
