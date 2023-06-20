import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Container, Row, Col, Card} from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';

class searchField extends Component {
    render() {
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder={this.props.placeholder}
                    aria-label={this.props.label}
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Button variant="outline-secondary"><AiOutlineSearch /></Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
export default searchField;