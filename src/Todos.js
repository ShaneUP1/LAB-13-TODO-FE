import React, { Component } from 'react'
import request from 'superagent'

export default class Todos extends Component {

    state = {
        todos: [],
        todo: '',

    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        const response = await request.get('https://rocky-plains-30100.herokuapp.com/api/todos')
            .set('Authorization', this.props.token)

        this.setState({ todos: response.body })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await request.post('https://rocky-plains-30100.herokuapp.com/api/todos')
            .send({
                todo: this.state.todo,

            })
            .set('Authorization', this.props.token)

        await this.fetchTodos();
    }

    render() {
        return (
            <div>
                Your TODO List:
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Add a new todo:
                        <input
                            value={this.state.todo}
                            onChange={(e) => this.setState({ todo: e.target.value })}
                        />
                    </label>
                    <button>
                        Add it to your list
                        </button>
                </form>
                {
                    Boolean(this.state.todos.length) && this.state.todos.map(todo => <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        todo: {todo.todo}; completed: {todo.completed.toString()}
                    </div>)
                }
            </div>
        )
    }
}
