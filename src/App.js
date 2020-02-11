import React, { useEffect, useState, componentDidMount } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      quoteData: "",
      backgroundImages: [
        "https://freecodecampassets.s3.us-east-2.amazonaws.com/piotr-chrobot-6oUsyeYXgTg-unsplash.jpg",
        "https://freecodecampassets.s3.us-east-2.amazonaws.com/jj-jordan-S3-kHziSt00-unsplash.jpg",
        "https://freecodecampassets.s3.us-east-2.amazonaws.com/federico-beccari-ahi73ZN5P0Y-unsplash.jpg",
        "https://freecodecampassets.s3.us-east-2.amazonaws.com/joey-kyber-vXtX07KVcE8-unsplash.jpg"
      ],
      index: 0,

      //array of inline css styles used on large viewports
      quoteBoxStyles: [
        // red and dark grey
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "50%",

          backgroundColor: "rgba(28, 26, 24, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#d10000",

          padding: "3%"
        },
        //blue and orange
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "50%",

          backgroundColor: "rgba(36, 26, 70, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#ff2f05",

          padding: "3%"
        },
        //black and purple
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "50%",

          backgroundColor: "rgba(28, 26, 24, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#9f21ff",

          padding: "3%"
        },
        //white and dark grey
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "50%",

          backgroundColor: "rgba(28, 26, 24, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#fffef5",

          padding: "3%"
        }
      ],

      //array of css inline styles used on small viewports
      quoteBoxStylesSmall: [
        // red and dark grey
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "80%",

          backgroundColor: "rgba(28, 26, 24, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#d10000",

          padding: "3%"
        },
        //blue and orange
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "80%",

          backgroundColor: "rgba(36, 26, 70, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#ff2f05",

          padding: "3%"
        },
        //black and purple
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "80%",

          backgroundColor: "rgba(28, 26, 24, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#9f21ff",

          padding: "3%"
        },
        //white and dark grey
        {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "15%",
          width: "80%",

          backgroundColor: "rgba(28, 26, 24, 0.9)",
          borderRadius: "20%",
          borderStyle: "solid",
          borderColor: "#fffef5",

          padding: "3%"
        }
      ]
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getData = this.getData.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.resize = this.resize.bind(this);
  }

  //initial call of API upon mounting
  async componentDidMount() {
    this.getData();
    this.resize();
  }

  //function sets the index when id="new-quote" is clicked
  handleClick() {
    let i = this.state.index < 3 ? (this.state.index += 1) : 0;
    this.setState({ index: i });
  }

  // function setting the background image of the body in ReactDOM dynamically - also sets the styling of id="quote-box"
  setBackground() {
    document.body.style.backgroundImage =
      "url(" + this.state.backgroundImages[this.state.index] + ")";

    this.handleClick();
  }

  // function that is called and assigns a new quote to the global state when "new-quote" is clicked
  async getData() {
    const url = "https://api.quotable.io/random";
    const response = await fetch(url);
    var newData = await response.json();
    this.setState({ loading: false, quoteData: newData });
    this.newQuote = this.state.quoteData.content;
    this.setBackground();
    console.log = this.state.quoteData.content;
  }

  // function that forces App to re-render upon resizing
  resize() {
    window.onresize = function() {
      this.forceUpdate();
    }.bind(this);
  }

  render() {
    //style block in which font size changes depending on the length of a quote
    let inputStyle = {
      position: "relative",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "0%",

      color: "white",
      fontFamily: "Shadows Into Light, cursive",
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: 27
    };

    let quoteForLengthTest = this.state.quoteData.content;

    if (!this.state.loading) {
      if (quoteForLengthTest.length > 230) {
        inputStyle = {
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "0%",
          color: "white",
          fontFamily: "Shadows Into Light, cursive",

          fontStyle: "normal",
          fontWeight: 300,
          fontSize: 23
        };
      }
    }

    // conditions for handling the API call
    if (this.state.loading) {
      return <div>"loading..."</div>;
    } else if (window.innerWidth < 800) {
      // version with styling for smaller viewports
      return (
        <div
          id="quote-box"
          className="App"
          style={this.state.quoteBoxStylesSmall[this.state.index]}
        >
          <div id="text" style={inputStyle}>
            "{this.state.quoteData.content}"
          </div>
          <div id="author">- {this.state.quoteData.author}</div>
          <br></br>
          <div id="loadCheck">{this.state.loading}</div>

          {/* button which appears as refresh icon that calls the API for a new quote */}
          <button id="new-quote" className="buttonClass" onClick={this.getData}>
            <FontAwesomeIcon icon={faRedo} size="3x"></FontAwesomeIcon>
          </button>

          {/* anchor tag that is rendered as a Tweet icon which loads quote into Twitter tweet box*/}
          <a
            className="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${this.state.quoteData.content}`}
            data-size="large"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              color="white"
              style={{
                backgroundColor: "none",
                display: "inline-block",
                width: "20%",
                marginLeft: "0%"
              }}
            ></FontAwesomeIcon>
          </a>
        </div>
      );
    } else {
      //version with styling for larger viewports
      return (
        <div
          id="quote-box"
          className="App"
          style={this.state.quoteBoxStyles[this.state.index]}
        >
          <div id="text" style={inputStyle}>
            "{this.state.quoteData.content}"
          </div>
          <div id="author">- {this.state.quoteData.author}</div>
          <br></br>
          <div id="loadCheck">{this.state.loading}</div>

          {/* button which appears as refresh icon that calls the API for a new quote */}
          <button id="new-quote" className="buttonClass" onClick={this.getData}>
            <FontAwesomeIcon icon={faRedo} size="3x"></FontAwesomeIcon>
          </button>

          {/* anchor tag that is rendered as a Tweet icon which loads quote into Twitter tweet box*/}
          <a
            className="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${this.state.quoteData.content}`}
            data-size="large"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              size="2x"
              color="white"
              style={{
                backgroundColor: "none",
                display: "inline-block",
                width: "20%",
                marginLeft: "0%"
              }}
            ></FontAwesomeIcon>
          </a>
        </div>
      );
    }
  }
}

export default App;
