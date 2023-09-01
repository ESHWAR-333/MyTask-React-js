import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {list: [], input: '', type: 'HEALTH', active: ''}

  submitTheForm = e => {
    e.preventDefault()
    const {input, type} = this.state
    if (input.length !== 0) {
      const listItem = {
        id: uuid(),
        input,
        type,
      }
      this.setState(prevState => ({
        list: [...prevState.list, listItem],
        input: '',
        type: 'HEALTH',
      }))
    }
  }

  onClickRemoveFilter = () => {
    this.setState({active: ''})
  }

  onClickFilter = e => {
    this.setState({active: e.target.id})
  }

  onChangeText = e => {
    this.setState({input: e.target.value})
  }

  onChangeOption = e => {
    this.setState({type: e.target.value})
  }

  render() {
    const {input, type, list, active} = this.state
    console.log(list)
    const updatedData =
      active === '' ? list : list.filter(each => each.type === active)

    return (
      <div className="main-container">
        <div className="left-container">
          <h1 className="left-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.submitTheForm}>
            <div className="item-container">
              <label htmlFor="task" className="label-name">
                Task
              </label>
              <input
                className="input-container"
                placeholder="Enter the task here"
                type="text"
                id="task"
                value={input}
                onChange={this.onChangeText}
              />
            </div>
            <div className="item-container">
              <label htmlFor="tags" className="label-name">
                Tags
              </label>
              <select
                id="tags"
                className="input-container"
                onChange={this.onChangeOption}
                value={type}
              >
                {tagsList.map(each => (
                  <option key={each.optionId} value={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="submit-button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="right-heading">Tags</h1>
          <ul className="tagList-container">
            {tagsList.map(each =>
              each.optionId === active ? (
                <li key={each.optionId}>
                  <button
                    type="button"
                    className="tag-item active-tab"
                    onClick={this.onClickRemoveFilter}
                    id={each.optionId}
                  >
                    {each.displayText}
                  </button>
                </li>
              ) : (
                <li key={each.optionId}>
                  <button
                    type="button"
                    className="tag-item"
                    onClick={this.onClickFilter}
                    id={each.optionId}
                  >
                    {each.displayText}
                  </button>
                </li>
              ),
            )}
          </ul>
          <h1 className="right-heading">Tasks</h1>
          {list.length === 0 ? (
            <div className="list-container">
              <p className="error-msg">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="list-main-container">
              {updatedData.map(each => (
                <li className="list-item" key={each.id}>
                  <p className="item-name">{each.input}</p>
                  <p className="item-type">{each.type}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
