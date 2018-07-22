import React, { Component, Fragment } from 'react';
import './App.css';
import { StylaLogo } from './StylaLogo';
import {HotTable} from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import flatten from 'lodash/flatten';
import compact from 'lodash/compact';
import shuffle from 'lodash/shuffle';
import chunk from 'lodash/chunk';
import mysteryLogo from './mystery.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        people :
            [
                [''],
            ],
        view: 'default',
        groupSize: 4,
        nOfGroups: 6,
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
        let peopleChunks = {};

        const { people } = this.state;
        const flattenedPeople = compact(flatten(people));

        if (this.state.nOfGroups * this.state.groupSize < flattenedPeople.length )
        {
            const randomizedPeople = shuffle(flattenedPeople);
            peopleChunks = chunk(randomizedPeople, this.state.groupSize);
        }
        else {
            const nOfIterations = Math.floor((this.state.nOfGroups * this.state.groupSize) / flattenedPeople.length) + 1;
            const safeBlockSize = Math.floor(flattenedPeople.length / this.state.groupSize);

            let i = 0;
            let tempArr = [];
            while (i < nOfIterations) {
                const tempRandomizedPeople = shuffle(flattenedPeople);
                const tempPeopleChunks = chunk(tempRandomizedPeople, this.state.groupSize);
                const usableTempPeopleChunks = tempPeopleChunks.slice(0, safeBlockSize);

                tempArr.push(usableTempPeopleChunks);
                i++;
            }
            peopleChunks = flatten(tempArr);
        }

        const requiredChunks = peopleChunks.slice(0, this.state.nOfGroups);

        this.setState({
            generatedGroups: requiredChunks,
        })
    }

    onChangeHandler = (e) =>
    {
        switch(e.target.name)
        {
            case 'groupSize':
                this.setState({
                    groupSize: e.target.value,
                })
                break;
            case 'nOfGroups':
                this.setState({
                    nOfGroups: e.target.value,
                })
                break;
            default:
                // do nothing
        }
    }

    render() {
        return (
            <div className='App'>
                <div className='topbar'>
                    <div className='logoContainer'>
                        <StylaLogo color="#efefef" />
                    </div>
                    <div className='topActions'>
                    { this.state.view === 'default' &&
                        <a className='topRightLink' onClick={(e)=>this.goToPeopleView(e)}>Edit people list</a>
                    }
                    { this.state.view === 'list' &&
                        <a className='topRightLink' onClick={(e)=>this.savePeople(e)}>Back to generator</a>
                    }
                    </div>
                </div>

                <div className='container'>
                    { this.state.view === 'default' &&
                    <Fragment>
                        <img alt='Mystery Machine' className='mysteryLogo' src={ mysteryLogo } />

                        <div className='formBlocks'>
                            <div className='formBlock'>
                                <label>Group Size</label>
                                <input type='number' onChange={(e)=>this.onChangeHandler(e)} name='groupSize' value={ this.state.groupSize } />
                            </div>

                            <div className='formBlock'>
                                <label>N. of groups to generate</label>
                                <input type='number' onChange={(e)=>this.onChangeHandler(e)} name='nOfGroups' value={ this.state.nOfGroups } />
                            </div>

                            <div className='formBlock'>
                                <button onClick={(e)=>this.generate(e)} >Generate!</button>
                            </div>
                        </div>


                        { this.state.generatedGroups.length > 0 &&
                            <div className='groupsContainer'>
                                {this.state.generatedGroups.map((group, index) => (
                                    <div className='singleGroup' key={ index }>
                                        <span className='groupTitle'>Group { index + 1 }</span>
                                        <ul>
                                            {group.map((name, nameIndex) => (
                                                <li key={ nameIndex }>{ name }</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
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
                        </Fragment>
                    }
                </div>

            </div>
        );
    }
}

export default App;
