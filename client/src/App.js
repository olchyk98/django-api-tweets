import React, { Component } from 'react';

const Tweet = () => (
    <article class="tweets-item">
        <span class="tweets-item-date">23 June, 2018</span>
        <p class="tweets-item-content">
            asdk kj asd asdajsdn asdk kj asd asdajsdn asdk kj asd asdajsdn asdk kj asd asdajsdn asdk kj asd asdajsdn asdk kj asd asdajsdn 
        </p>
    </article>
);

class Hero extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tweets: false
        }
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
            console.log(res);
            this.setState(() => ({
                tweets: res
            }))
        }).catch(console.error);
    }

    render() {
        return(
            <div className="tweets">
                {
                    (this.state.tweets) ? (
                        <Tweet />
                    ) : (
                        <div className="tweets-loading" />
                    )
                }
            </div>
        );
    }
}

export default Hero;