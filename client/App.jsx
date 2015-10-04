App = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    }
  },

  renderData () {
    if (!this.data.currentUser) {
      return (
        <div className="alert alert-warning">
          Please login or create account first.
        </div>
      );
    }

    return (
      <div>
        <ProjectAllocations />
        <hr />
        <YourAllocations />
      </div>
    );
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Self Allocation</h1>
        </header>
        
        {this.renderData()}
      </div>
    );
  }
});
