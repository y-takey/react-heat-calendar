const React = require("react");

const STYLES = {
  outline: {
    float: "right",
    color: "#767676",
    fontSize: "9px",
    lineHeight: "1.5em",
    marginTop: "10px"
  },
  box: {
    position: "relative",
    paddingLeft: "0",
    bottom: "-1px",
    display: "inline-block",
    margin: "0px 2px 0px 5px",
    listStyle: "none"
  },
  item: {
    display: "inline-block",
    marginRight: "3px",
    width: "10px",
    height: "10px"
  }
}

export default class Legend extends React.Component {
  renderItem(index, color) {
    const style = Object.assign({}, STYLES.item, { backgroundColor: color })
    return <li key={ `legend-item${index}` } style={ style }></li>
  }

  render() {
    return <div style={ STYLES.outline }>
      Less
      <ul style={ STYLES.box }>
        {this.props.colors.map((color, i) => this.renderItem(i, color))}
      </ul>
      More
    </div>
  }
}
