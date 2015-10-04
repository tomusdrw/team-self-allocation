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
        <div>
          <ProjectAllocations />
          <hr />
          <div className="alert alert-warning">
            Please login or create your account to change your allocations.
          </div>
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
      <div>
        <header>
          <h1 className="text-center">Self Allocation</h1>
          <p>
            You can read more about the process in <a
              href="http://blogs.msdn.com/b/bharry/archive/2015/07/24/self-forming-teams-at-scale.aspx"
              >
              Self forming teams at scale
            </a> 
            .
          </p>
        </header>
        <hr />
        {this.renderData()}
      </div>
    );
  }
});
