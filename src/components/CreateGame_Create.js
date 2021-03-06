import React from 'react';
import { graphql, gql } from 'react-apollo'
import { Link } from 'react-router-dom'

class CreateGame_Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '', 
            SubGenre: '', 
            Type: 'Boardgame', 
            Score: 'Points', 
            lowscore: false, 
            continueScoring: false, 
            MaxPlayers: 0
        };
    }
    
    _createGame = async () => {
        const gameName = this.state.Name
        const subGenre = this.state.SubGenre
        const gameType = this.state.Type
        const score = this.state.Score
        const lowScore = this.state.lowscore
        const continueScore = this.state.continueScoring
        const maxPlayers = this.state.MaxPlayers
        var result = await this.props.createNewGame({
            variables: {
                name: gameName,
                subGenre,
                typeGame: gameType,
                score: score,
                lowScore,
                continueScore,
                maxPlayers
            }
        })
        console.log(result)
        this.props.history.push(`/CreateGame`)
    }

    render() {
        return (
        <div>
            <form onSubmit={() => {
                this._createGame
                this.props.history.push(`/CreateGame`)
                }}>
                <br/>
                <label>
                    Name:
                    <input type="text" required value={this.state.Name} 
                        onChange={(event) => 
                            this.setState({Name: event.target.value})
                        } 
                    />
                </label>
                <br/>
                <br/>
                <label>
                    Sub Genre:
                    <input type="text" required value={this.state.SubGenre} 
                        onChange={(event) =>
                            this.setState({SubGenre: event.target.value})
                        }
                    />
                 </label>
                <br/>
                <br/>
                <label>
                    Type Of Game:
                    <select value={this.state.GameType} 
                        onChange={(event) =>
                            this.setState({Type: event.target.value})
                        }>
                        <option value="CardGame">Card Game</option>
                        <option value="Boardgame">Boardgame</option>
                        <option value="RPG">RPG</option>
                    </select>
                </label>
                <br/>
                <br/>
                <label>
                    Type Of Scoring:
                    <select value={this.state.Score}
                        onChange={(event) =>
                            this.setState({Score: event.target.value})
                        }>
                        <option value="Money">Money</option>
                        <option value="Points">Points</option>
                        <option value="Rounds">Rounds</option>
                        <option value="Moves">Moves</option>
                    </select>
                </label>
                <br/>
                <br/>
                <label>
                    Max Players:
                    <input type="text" required value={this.state.MaxPlayers} 
                        onChange={(event)=> 
                            this.setState({MaxPlayers: Number(event.target.value)})
                        }
                    />
                 </label>
                <br/>
                <br/>
                <label>
                    Continous Scoring:
                    <input id="ContinousScoring" type="checkbox" 
                        onChange={(e) => 
                            this.setState({continueScoring: !this.state.lowscore.value})
                        }
                    />
                </label>
                <br/>
                <br/>
                <label>
                    Low-Score Wins:
                    <input id="LowScoreWins" type="checkbox" 
                        onChange={(e) => 
                            this.setState({lowscore: !this.state.lowscore.value})
                        }
                    />
                </label>
                <br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
        );
    }
}

const Create_New_Game = gql`
mutation CreateNewGame($name: String!, $subGenre: String!, $typeGame: String!, $score: String!, $lowScore: Boolean!, $continueScore: Boolean!, $maxPlayers: Int!) {
    createGameType(
      gameName: $name,
      subGenre: $subGenre,
      gameType: $typeGame
      scoreType: $score,
      lowScoreWins: $lowScore,
      continuousScoring: $continueScore,
      maxPlayers: $maxPlayers
    ) {
      gameName
    }
  }
`

export default graphql(Create_New_Game, {name: 'createNewGame'})(CreateGame_Create)