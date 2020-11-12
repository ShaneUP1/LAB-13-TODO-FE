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
        const { body } = await request.get('https://rocky-plains-30100.herokuapp.com/api/todos')
            .set('Authorization', this.props.token)

        await this.setState({ todos: body, loading: false })
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
        const { todo, todos, loading } = this.state
        return (
            <>
                <section className="todo-list">
                    <div>
                        <h1>Your TODO List</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Add a new todo:
                        <input
                                    value={todo}
                                    onChange={(e) => this.setState({ todo: e.target.value })}
                                />
                            </label>
                            <button>
                                Add
                        </button>
                        </form>
                        {
                            loading
                                ? 'LOOAAADDDDIIIIINNNNNGGGGGGGG'
                                : todos.map(todo => <div key={`${todo.todo}${todo.completed}${Math.random()}`} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                    todo: {todo.todo}
                                    {
                                        todo.completed ? '' : <button className='done-button'
                                            onClick={() => this.handleCompletedClick(todo.id)}>
                                            Done!
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
