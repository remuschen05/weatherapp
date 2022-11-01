import { Component } from 'react';
import WeatherResults from './WeatherResults';

class ClassWeatherSearch extends Component {
  constructor() {
    super();
    this.state = {
      text: 'not working',
      city: 'testcity',
      state: 'testState',
      showWeather: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Event Handler Methods
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ text: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const regEx = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/;
    const validation = regEx.exec(this.state.text);
    console.log(validation);
    if (!validation || this.state.text === '') {
      alert(
        'Please enter a location in the "City, State" Format. EX: Randolph, MA'
      );
    } else {
      //search users
      this.setState({
        text: '',
        city: validation[1],
        state: validation[2],
        showWeather: true,
      });
      console.log(this.state);
    }
  };
  /////////////////////////////////////////////////
  render() {
    return (
      <div className="border-black border-4 rounded px-2 py-4">
        <div className="grid grid-cols-2 mb-8 gap-8">
          <div>
            <form
              onSubmit={this.handleSubmit}
              className="border border-black border-solid rounded"
            >
              <div>
                <div className="relative">
                  <input
                    type="text"
                    value={this.text}
                    onChange={this.handleChange.bind(this)}
                    className="w-full pr-40 text-black"
                    placeholder="Enter a Location"
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 rounded-l-none w-36 bg-gray-800 text-white bold"
                  >
                    Go
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div></div>
        </div>
        <div className="py-8">
          {this.state.showWeather ? (
            <WeatherResults city={this.state.city} state={this.state.state} />
          ) : (
            <p>Please Enter a Location</p>
          )}
        </div>
      </div>
    );
  }
}

export default ClassWeatherSearch;
