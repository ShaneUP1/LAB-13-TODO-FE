import React, { Component } from 'react'
import request from 'superagent'

export default class Todos extends Component {

    state = {
        todos: [],
        todo: '',
        loading: false
    }

    componentDidMount = async () => {
        await this.fetchTodos()
    }

    fetchTodos = async () => {
        await this.setState({ loading: true });
        const response = await request.get('https://rocky-plains-30100.herokuapp.com/api/todos')
            .set('Authorization', this.props.token)

        await this.setState({ todos: response.body, loading: false })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({ loading: true });

        await request.post('https://rocky-plains-30100.herokuapp.com/api/todos')
            .send({
                todo: this.state.todo,
            })
            .set('Authorization', this.props.token)

        this.setState({ todo: '' })
        await this.fetchTodos();
    }

    handleCompletedClick = async (someId) => {
        await request.put(`https://rocky-plains-30100.herokuapp.com/api/todos/${someId}`)
            .set('Authorization', this.props.token);

        await this.fetchTodos();
    }


    render() {
        return (
            <>
                <section className="todo-list">
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
                                Add
                        </button>
                        </form>
                        {
                            this.state.loading
                                ? 'LOOAAADDDDIIIIINNNNNGGGGGGGG'
                                : this.state.todos.map(todo => <div key={`${todo.todo}${todo.completed}${Math.random()}`} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    todo: {todo.todo}
                                    {
                                        todo.completed ? '' : <button
                                            onClick={() => this.handleCompletedClick(todo.id)}>
                                            Mark as completed
                            </button>
                                    }
                                </div>)
                        }
                    </div>
                </section>
            </>
        )
    }
}
