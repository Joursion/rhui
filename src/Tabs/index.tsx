import React, { useState } from 'react';

import './index.less';

interface IProps {
  currentIndex?: number;
  tabs: React.ReactNode[];
  onChangeTab?: (index: number) => void;
  children?: any;
}

const Tabs = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex || 0);
  const [tabs, setTabs] = useState(props.tabs || []);

  const renderContent = () => {
    // 只有一个 child 的话，只渲染一个
    if (React.Children.toArray(props.children).length === 1) {
      return <>{props.children}</>
    }
    return React.Children.map(props.children, (elem, index) => {
      if (index === currentIndex) {
        return (
          <>{elem.props.children}</>
        )
      }
    });
  }

  const onChangeCurrentIndex = (e: any) => {
    const index = Number(e.currentTarget.dataset.index);
    setCurrentIndex(index);
    props.onChangeTab && props.onChangeTab(index);
  }

  const width = (100 / (tabs.length)).toFixed(3) + '%';

  return (
    <div className={'tab-container'}>
      <div className={'tab'}>
        <div className='tab-inner'>
          {
            // tslint:disable-next-line:jsx-no-multiline-js
            tabs.map((tab, index) => {
              const clsName = currentIndex === index ? 'tab-tit active' : 'tab-tit';
              return (
                <div className={clsName} key={`tabs-${index}`} data-index={index} onClick={onChangeCurrentIndex}>
                  {tab}
                </div>
              )
            })
          }
        </div>
        <div
          className='tab-bar'
          style={{ width: width, transform: `translateX(${currentIndex * 100}%)` }}
        />
      </div>

      <div className={'tab-content'}>
        {renderContent()}
      </div>
    </div>
  )
}

export default Tabs;
