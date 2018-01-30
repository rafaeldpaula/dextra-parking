import React, {
    Component
} from 'react';

import '../styles/FloatingButton.css';

function mergeClassNames(props, classes) {
    let {
        className,
    } = props;        
    return classes + " " + className;
}

export class BottomFloatingButton extends Component {
  render() {
    return (  
        <button type="button" 
                className=
                {mergeClassNames(
                    this.props, 
                    "btn floating-button bottom-floating-button"
                )}>
            {this.props.label}
        </button>
    );
  }
}

export class TopFloatingButton extends Component {
    render() {
      return (      
          <button type="button" 
          className=
          {mergeClassNames(
              this.props, 
              "btn floating-button top-floating-button"
          )}>
              {this.props.label}
          </button>
      );
    }
}