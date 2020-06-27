import React from 'react'

type Props = {
  klass: string,
  type: any,
}

export default class Button extends React.Component<Props>{
  state:{
    count: number
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  incres(){
    const current = this.state.count
    this.setState({count: current+1})
  }
  render(){
    return(
      <div>
        <button onClick={() => this.incres()} className={this.props.klass} type={this.props.type}>
          {this.state.count}
        </button>
      </div>
    )
  }
}