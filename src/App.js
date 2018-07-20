import React, { Component, Fragment } from 'react';
import './App.css';
import {HotTable} from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import flatten from 'lodash/flatten';
import compact from 'lodash/compact';
import shuffle from 'lodash/shuffle';
import chunk from 'lodash/chunk';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        people :
            [
                [''],
            ],
        view: 'default',
        generatedGroups: {}
        }
    }

    savePeople = (e) =>
    {
        this.setState({
            people : this.refs.mysterytable.hotInstance.getData(),
            view: 'default'
        })
    }

    goToPeopleView = (e) =>
    {
        this.setState({
            view: 'list'
        })
    }

    generate = (e) =>
    {
        const { people } = this.state;
        const flattenedPeople = compact(flatten(people));
        const randomizedPeople = shuffle(flattenedPeople);
        const peopleChunks = chunk(randomizedPeople, 4);

        this.setState({
            generatedGroups: peopleChunks,
        })
    }

    render() {
        return (
            <div className='App'>
            <button onClick={(e)=>this.goToPeopleView(e)}>Edit people list</button>
            <h1>Mystery Lunch Draw</h1>

            <div className='container'>
                { this.state.view === 'default' &&
                <Fragment>
                    <label>Group Size</label>
                    <select defaultValue='4' >
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                    </select>

                    <label>N. of weeks to generate</label>
                    <select defaultValue='6'>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>

                    <button onClick={(e)=>this.generate(e)} >Generate!</button>


                    { this.state.generatedGroups.length > 0 &&
                        <Fragment>
                            {this.state.generatedGroups.map(group => (
                                <div key={ group }>
                                    <ul>
                                        {group.map(name => (
                                            <li key={ name }>{ name }</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </Fragment>
                    }

                </Fragment>
                }
                { this.state.view === 'list' &&
                    <Fragment>
                        <div className='tableContainer'>
                            <HotTable
                                data={this.state.people}
                                rowHeaders={false}
                                minSpareRows={1}
                                colHeaders={ ['People Names'] }
                                stretchH="all"
                                ref='mysterytable'
                            />
                        </div>

                        <button onClick={(e)=>this.savePeople(e)}>
                            Save people list
                        </button>
                    </Fragment>
                }
            </div>

            </div>
        );
    }
}

export default App;
