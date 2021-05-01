import React, { useState, useContext } from 'react';
import { Button, Form,Table, ListGroup, Modal, Row, Col, Container } from 'react-bootstrap';

const TodosForm = (props) => {

    const [isEditingNeeded, setEditing] = useState(false);
    const [todoId, setTodoId] = useState(0);
    const [idsToDeleteDict, setDict]=useState({});

    function popupEdit(id){
      setEditing(true);
      setTodoId(id);
    }

    function addIdForDeleting(id){
      if(idsToDeleteDict[id]===undefined){
        idsToDeleteDict[id]=true;
      }
      else{
        idsToDeleteDict[id]=!idsToDeleteDict[id];
      }
      setDict(idsToDeleteDict);
    }
    function convertDictToArray(){
      let array=[];
      for (const [key, value] of Object.entries(idsToDeleteDict)) {
        if(value===true){
          array.push(key);
        }
       
      }
      
      return array;
    }
    return (
      <div>
        <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th colSpan="4"> <h4> Todos ({props.todos.length})</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4">
              <Form onSubmit={props.add}>
                  <Container fluid>
                    <Row>
                      <Col md={10}>                
                        <Form.Group controlId="todosForm">
                          <Form.Control name="addText" type="text" placeholder="Enter todo here" />
                        </Form.Group>
                      </Col>
                      <Col> 
                        <Button variant="primary" type="submit">
                          Submit
                        </Button>
                      </Col>    
                    </Row>
                  </Container>
              </Form>
            </td>
          </tr>
              
              {
                props.todos.map((item,i) => {
                                    return (
                                          <tr key={i}>
                                                <td colSpan="4">
                                                <Container fluid>
                                                  <Row>
                                                    <Col>
                                                      <input name="todoChecked"  type="checkbox" checked={idsToDeleteDict[i]} onChange={() => addIdForDeleting(item.id)} />
                                                    </Col>
                                                    <Col md={8}>
                                                      {item.toDo}
                                                    </Col>
                                                    <Col md={1}>
                                                      <Button variant="success" onClick={() => popupEdit(item.id)}>Edit</Button>
                                                    </Col>                                               
                                                    <Col >
                                                      <Button variant="danger" onClick={() => props.delete([item.id])}>Delete</Button>
                                                    </Col>
                                                </Row> 
                                              </Container>
                                              </td>
                                          </tr>
                                    );
                                })
              }
            </tbody>
          </Table>
        <Button variant="danger" onClick={() => props.delete(convertDictToArray())}>Delete selection</Button>
                                                  
        <Modal show={isEditingNeeded}  onHide={() => setEditing(false)}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={props.update(todoId)}>
                <Form.Group controlId="editForm">
                 <Form.Control name="editText" type="text" placeholder="Edit todo here" ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Edit
                </Button>
              </Form>  
            </Modal.Body>
        </Modal>               
      </div>
    )
  }
  
  export default TodosForm;