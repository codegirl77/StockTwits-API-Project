import React, {Component} from 'react';
import axios from 'axios';
import MessageList from './MessageList.jsx'
import styles from '../public/styles.css'

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
        let stockSymbol = this.state.stockSymbolInput.toLowerCase()
        axios.get(`https://api.stocktwits.com/api/2/streams/symbol/${stockSymbol}.json`,  {
            headers: { 
              "Access-Control-Allow-Origin": "*",
            },
          responseType: 'json',
           })
          .then((response) => {
            let symbolsMessagesUpdate = this.state.storedSymbolsMessages
            symbolsMessagesUpdate[stockSymbol] = response.data.messages
            this.setState({
              storedSymbolsMessages: symbolsMessagesUpdate,
              stockSymbols: Object.keys(symbolsMessagesUpdate),
              currentSymbol: stockSymbol,
              stockSymbolInput:'',
              errorIsOn:false
            })
          })
          .catch((error)=> {
            this.setState({
                errorIsOn:true
            })
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
          <div className='bodyContainer'>
            <div className='formContainer'>
                   <div className="formName">Input a Stock Symbol</div> 
                    <input
                    type="text" 
                    value={this.state.stockSymbolInput}
                    name="stockSymbolInput"
                    onChange={this.handleInputChange} />
                <button  onClick={this.getSymbolMessages}>Search</button>
                <button onClick={this.deleteSymbol}>Delete</button>
            </div>
            <div className='notificationsContainer'>
               {this.state.errorIsOn && <div className='error'>Not a Vaild Stock Symbol</div>}
            </div>
            <div className='stockSymbolContainer'>
                {this.state.stockSymbols.map((symbol) =>(
                    <div className= 'stockSymbolStyle' onClick={()=>(this.changeCurrentSymbol(symbol))}>{symbol}</div>
                ))}
            </div>
            {this.state.currentSymbol !== '' && <MessageList messages={this.state.storedSymbolsMessages[this.state.currentSymbol]}/>}
          </div>
        )
    }
}


export default App;