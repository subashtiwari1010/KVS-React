import React, { Component } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import UserNav from "./UserNav";
import HouseholdData from "./ForAbout/HouseholdData";
import IndividualData from "./ForAbout/IndividualData";
import AnimalData from "./ForAbout/AnimalData";
import TopSection from "./ForAbout/TopSection";
import Axios from "axios";

class About extends Component {

  constructor(props) {
    super(props)

    this.state = {
      display1: true,
      animalData: [],
      personalData: [],
      numberData: 0
    }
  }

  handleClick = () => {
    this.setState({
      display1: true,
      display2: false,
      display3: false
    })
  }

  handleClick1 = () => {
    this.setState({
      display1: false,
      display2: true,
      display3: false
    })
  }

  handleClick2 = () => {
    this.setState({
      display1: false,
      display2: false,
      display3: true
    })
  }

  fetchAnimalData = () => {
    Axios.get('http://139.59.67.104:8019/api/v1/animal_detail/?house_index=' + `${this.state.numberData}`)
      .then(response => {
        this.setState({
          animalData: response.data
        })
      })
  }

  fetchPersonalData = () => {
    Axios.get('http://139.59.67.104:8019/api/v1/family_members/?house_index=' + `${this.state.numberData}`)
      .then(response => {
        this.setState({
          personalData: response.data
        })
      })
  }

  componentWillMount() {
    const { data, ownerName } = this.props.location.state;
    data.map((value) => {
      value.owner_name === ownerName &&
        this.setState({
          ...this.state,
          numberData: JSON.stringify(value.id)
        })
    })
  }

  componentDidMount() {
    this.fetchPersonalData()
    this.fetchAnimalData()
  }

  render() {
    const { data, ownerName } = this.props.location.state;
    return (
      <>
        {data.map((value, i) => {
          if (value.owner_name === ownerName) {
            return (
              <body className="" key={i}>
                <div className="kvs-wrapper">
                  <div className="container-fluid main-wrapper p-0">
                    <div className="flex-wrapper">
                      <TopSection value={value} />
                      <div className="main-content">
                        <header className="main-header">
                          <nav className="navbar">
                            <div className="input-group search">

                            </div>
                            <div className="navbar-right">
                              <UserNav />
                            </div>
                          </nav>
                        </header>
                        <main>
                          <div className="user-info">
                            <div className="user-info-header">
                              <ul>
                                <li className={`${this.state.display1 ? 'user-span18 current' : 'user-span18'}`} onClick={() => this.handleClick()}>Household data</li>
                                <li className={`${this.state.display2 ? 'user-span18 current' : 'user-span18'}`} onClick={() => this.handleClick1()}>Individual data</li>
                                <li className={`${this.state.display3 ? 'user-span18 current' : 'user-span18'}`} onClick={() => this.handleClick2()}>Animal data</li>
                              </ul>
                            </div>
                            <div style={this.state.display1 ? { display: 'block' } : { display: 'none' }}>
                              <HouseholdData value={value} />
                            </div>
                            <div style={this.state.display2 ? { display: 'block' } : { display: 'none' }}>
                              <IndividualData value={value} personalData={this.state.personalData} />
                            </div>
                            <div style={this.state.display3 ? { display: 'block' } : { display: 'none' }}>
                              <AnimalData value={value} animalData={this.state.animalData} />
                            </div>
                          </div>
                        </main>
                      </div>
                    </div>
                  </div>
                </div>
              </body>
            );
          }
        })}
      </>
    );
  }
}

export default About;
