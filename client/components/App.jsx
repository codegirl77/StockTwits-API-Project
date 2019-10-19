import React, {Component} from 'react';
import axios from 'axios';
import MessageList from './MessageList.jsx'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            stockSymbolInput:'',
            currentSymbol:'',
            stockSymbols: [],
            storedSymbolsMessages:{},
            errorIsOn: false
        }
    }

    getSymbolMessages = () => {
        axios.get(`https://api.stocktwits.com/api/2/streams/symbol/${this.state.stockSymbolInput}.json`)
          .then((response) => {
            let symbolsMessagesUpdate = this.state.storedSymbolsMessages
            symbolsMessagesUpdate[this.state.stockSymbolInput] = response.data.messages
            this.setState({
              storedSymbolsMessages: symbolsMessagesUpdate,
              stockSymbols: Object.keys(symbolsMessagesUpdate),
              currentSymbol: this.state.stockSymbolInput
            })
          })
          .catch((error)=> {
            console.log(error);
          })
          event.preventDefault();
    }

    changeCurrentSymbol = (symbol) => {
       this.setState({
           currentSymbol: symbol
       })
    }

    deleteSymbol = () => {
        event.preventDefault();
        let symbolsMessagesUpdate = this.state.storedSymbolsMessages
        delete symbolsMessagesUpdate[this.state.stockSymbolInput]
        this.setState({
            storedSymbolsMessages: symbolsMessagesUpdate,
            stockSymbols: Object.keys(symbolsMessagesUpdate),
            currentSymbol: ''
        })
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
          [name]: value
        });
      }

    render(){
        return(
          <div>
            <form>
              <label>
                 Stock Symbol
                <input
                  name="stockSymbolInput"
                  onChange={this.handleInputChange} />
              </label>
              <button onClick={this.getSymbolMessages}>Search</button>
              <button onClick={this.deleteSymbol}>Delete</button>
            </form>
            {this.state.stockSymbols.map((symbol) =>(
                <div onClick={()=>(this.changeCurrentSymbol(symbol))}>{symbol}</div>
            ))}
            {this.state.currentSymbol !== '' && <MessageList messages={this.state.storedSymbolsMessages[this.state.currentSymbol]}/>}
          </div>
        )
    }
}

export default App;