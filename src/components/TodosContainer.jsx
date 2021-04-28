import React from 'react';
import axios from 'axios';
import '../App.css';
import TodosForm from './TodosForm';
class TodosContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          todos:[], 
        };
        this.updateTodo = this.updateTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.getallTodos = this.getallTodos.bind(this);
      }


    componentDidMount() {

        this.getallTodos();     
    }

    getallTodos(){
        let items=[];
        axios.get('http://localhost:8080/todos/all')
        .then(result =>{
            for(let i=0;i<result.data.length;i++){
                items.push(result.data[i]);
            }
            this.setState({ todos: items });
            
        })
        .catch(error =>{
            console.log("error: "+error);
        });
    }
    addTodo(e){
        axios.post('http://localhost:8080/todos/create', {toDo:e.target.addText.value})
        .then(result =>{
            
            this.getallTodos();
        })
        .catch(error =>{
            console.log("error: "+error);
        });
    }
    updateTodo= param=>e=>{
        axios.put('http://localhost:8080/todos/update', {id:param, toDo:e.target.editText.value})
        .then(result =>{
            
        })
        .catch(error =>{
            console.log("error: "+error);
        });
    }
    deleteTodo(idTab){
        for(let i=0;i<idTab.length;i++){
            axios.delete('http://localhost:8080/todos/delete/'+idTab[i])
            .then(result =>{
                
                this.getallTodos();
            })
            .catch(error =>{
                console.log("error: "+error);
            });
        }
    }
    
    render() {
      return (
          <div>
              <TodosForm todos={this.state.todos} add={this.addTodo} update={ this.updateTodo} delete={this.deleteTodo} setId={this.setId}/>
          </div>
      );
    }
  }
export default TodosContainer;