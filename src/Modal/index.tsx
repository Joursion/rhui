import React, { Component, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import  './index.less';

interface IPriv {
  remove: () => void;
}

interface IProps{
  child: Component | React.ReactNode
  maskClose?: boolean; // 是否支持 wrap 层点击隐藏
  destroyAfterClose?: boolean; // 隐藏后是否销毁
  visible?: boolean;
  timeout?: number; // 动画时间，ms

}

const Modal = (props: IProps & IPriv) => {
  const [visible, setVisible] = useState(props.visible || true);
  
  const onClose = () => {
    if (props.destroyAfterClose) {
      props.remove();
    } else if (props.maskClose) {
      setVisible(false);
    }
  }

  const timeout = props.timeout || 0;
  const display = visible ? 'block' : 'none';

  return (
    <CSSTransition
      in={visible}
      timeout={timeout}
      className={'modal-wrap'}
      onClick={onClose}
      style={{display}}
    >
    <div className={'modal-body'} onClick={onClose}>
      {props.child}
    </div>
    </CSSTransition>
  )
}


function createModal(props: IProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(
    <Modal
      {...props}
      remove={() => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
      }}
    />, div);
  return div;
}

export default {
  alert(params: IProps) {
    const modal = createModal(params);
    return {
      // 可在外部 close
      close() {
        ReactDOM.unmountComponentAtNode(modal);
        document.body.removeChild(modal);
      }
    }
  }
}
