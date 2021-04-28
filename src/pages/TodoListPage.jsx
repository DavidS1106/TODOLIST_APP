import React from 'react';
import '../App.css';
import { Container } from 'react-bootstrap';
import  TodosContainer  from '../components/TodosContainer';
function TodoListPage() {
      
    return (
        <div>
            <Container>
                <TodosContainer/>
            </Container>
        </div>
    );
}

export default TodoListPage