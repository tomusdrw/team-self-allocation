App = React.createClass({
  getTasks() {
    return [
      { _id: 1, text: "This is task 1" },
      { _id: 2, text: "This is task 2" },
      { _id: 3, text: "This is task 3" }
    ];
  },
 
  renderTasks() {
    if (!Meteor.userId) {
      return;
    }
    return this.getTasks().map((task) => {
      return <div key={task._id}>{task}</div>;
    });
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Self Allocation</h1>
          <login-buttons />
        </header>
        
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});
