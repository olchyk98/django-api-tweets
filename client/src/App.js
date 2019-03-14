import React, { Component } from 'react';

const Tweet = ({ content, date }) => (
    <article className="tweets-item">
        <span className="tweets-item-date">{ date }</span>
        <p className="tweets-item-content">
            { content }
        </p>
    </article>
);

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: false
        }

        this.newInputRef = React.createRef();
    }

    componentDidMount() {
        fetch("http://localhost:4000/tweets", {
            method: "GET"
        }).then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`ERROR ${ res.status } (${ res.statusText })`);
            }
        }).then((res) => {
            this.setState(() => ({
                tweets: res
            }))
        }).catch(console.error);
    }

    convertTime(time) { // 23 June, 2018
        let a = new Date(time),
            b = [
                "Jan",
                "Feb",
                "March",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ][ a.getMonth() ]

        return `${ a.getDate() } ${ b }, ${ a.getFullYear() }`
    }

    submit = () => {
        let content = this.newInputRef.value;

        fetch(`http://localhost:4000/tweets/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        }).then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`ERROR ${ res.status } (${ res.statusText })`);
            }
        }).then((tweet) => {
            this.setState(({ tweets }) => ({
                tweets: [
                    tweet,
                    ...tweets
                ]
            }));
        }).catch(console.error);

        this.newInputRef.value = "";
    }

    render() {
        return(
            <div className="tweets">
                <form className="tweets-submit" onSubmit={ e => { e.preventDefault(); this.submit(); } }>
                    <input
                        placeholder="Tweet"
                        type="text"
                        ref={ ref => this.newInputRef = ref }
                    />
                    <button type="submit">Submit</button>
                </form>
                {
                    (this.state.tweets) ? (
                        this.state.tweets.map(({ id, date, content }) => (
                            <Tweet
                                key={ id }
                                date={ this.convertTime(date) }
                                content={ content }
                            />
                        ))
                    ) : (
                        <div className="tweets-loading" />
                    )
                }
            </div>
        );
    }
}

export default Hero;