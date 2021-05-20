import React from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    Card,
  } from "react-bootstrap";

const SearchBar = (props) => {
    return(
        <Form>
        <Form.Row className="align-items-center">
          <Col xs="auto">
            <Form.Label srOnly>
              Preference
            </Form.Label>
            <Form.Control
              as="select"
              id="inlineFormCustomSelect"
              custom
            >
              <option value="0">Choose...</option>
              <option value="1">Platforms</option>
              <option value="2">Categories</option>
              {/* <option value="3">Hashtags</option> */}
            </Form.Control>
          </Col>
          
          <Col sm={3} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
                Search
            </Form.Label>
            <Form.Control id="inlineFormInputName"  />
        </Col>

          <Col xs="auto" className="my-1">
            <Button type="submit" variant="warning" onClick={props.handleChange}>Submit</Button>
          </Col>
        </Form.Row>
      </Form>
    )
}

export default SearchBar;