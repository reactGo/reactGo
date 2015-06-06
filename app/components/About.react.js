var React = require('react');

var About = React.createClass({

  render: function() {
    return (
      <div className="about">
        <h1 className="about__header">About Ninja Ocean</h1>
        <p className="about__description">Ninja Ocean is comprised of a team of passionate developers, hackers & scientists, aimed to do good.</p>
      </div>
    );
  }
});

module.exports = About;
