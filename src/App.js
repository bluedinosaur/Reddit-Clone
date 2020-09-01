import React from "react";
import "./App.css";
import { data } from "./redditdata";

const dataArray = data.data.children;
console.log(dataArray);

const PostList = ({ postData, updateScore }) => {
  return (
    <ul>
      {postData.map((singlePost, index) => (
        <li className="listitem" key={singlePost.id}>
          <Post
            data={singlePost}
            increment={() => updateScore(index, 1)}
            decrement={() => updateScore(index, -1)}
          />
        </li>
      ))}
    </ul>
  );
};

const Post = ({ data, increment, decrement }) => {
  return (
    <div className="postcontainer">
      <div className="votesthumbnail">
        <Votes
          upvotes={data.data.ups}
          increment={increment}
          decrement={decrement}
        />
        <Thumbnail seed={data.data.id} />
      </div>
      <div>
        <div>
          {data.data.title}
          <span className="url">{data.data.url}</span>
        </div>
        <div>Submitted by {data.data.author}</div>
        <div>
          <Comments numcomments={data.data.num_comments} />
          <Link>share</Link>
          <Link>save</Link>
          <Link>hide</Link>
          <Link>report</Link>
        </div>
      </div>
    </div>
  );
};

const Comments = ({ numcomments }) => {
  return (
    <span>
      {numcomments}
      <Link>comments</Link>
    </span>
  );
};

const Link = ({ children }) => {
  return (
    <a className="link" href="https://www.reddit.com">
      {children}
    </a>
  );
};

const Votes = ({ upvotes, increment, decrement }) => {
  return (
    <div className="votes">
      <div>
        <i
          className="arrowicon fas fa-caret-up"
          onClick={() => increment()}
        ></i>
      </div>
      <div>{upvotes}</div>
      <div>
        <i
          className="arrowicon fas fa-caret-down"
          onClick={() => decrement()}
        ></i>
      </div>
    </div>
  );
};

const Thumbnail = ({ seed }) => {
  return (
    <img
      className="image"
      src={`https://picsum.photos/seed/${seed}/100/100`}
      alt=""
    />
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: data.data.children,
    };
  }

  updateScore(index, val) {
    let listCopy = this.state.list.slice();
    listCopy[index].data.ups += val;
    listCopy.sort((a, b) => {
      return b.data.ups - a.data.ups;
    });
    this.setState({ list: listCopy });
  }
  render() {
    let listCopy = this.state.list.slice();
    listCopy.sort((a, b) => {
      return b.data.ups - a.data.ups;
    });
    return (
      <PostList postData={listCopy} updateScore={this.updateScore.bind(this)} />
    );
  }
}

export default App;
