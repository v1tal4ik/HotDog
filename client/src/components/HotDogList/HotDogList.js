import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHotDogListRequest } from '../../modules/actions';
import { getHotDogList , getLoading } from '../../modules/reducers';
import  HotDogItem from '../HotDogItem';
import Preloader from '../Preloader';
import './style.css';


class HotDogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: 'baz',
    };
  }


  componentDidMount = async () => {
    const { fetchHotDogListRequest} = this.props;
    await fetchHotDogListRequest();
  };


  render() {
    const { hotDogList , isLoading } = this.props;
    return (
      <>
        <div className='hot-dog-list'>
          { isLoading ? <Preloader /> :
           (hotDogList.length) ?
            hotDogList.map((el)=>(
               <HotDogItem key = { el.id }  el = { el } />
            )):
            <div className='not-found'> Not found :( </div>     
        }
        </div>
      </>
    );
  }
}


export default connect(state => ({
  hotDogList: getHotDogList(state),
  isLoading: getLoading(state),
}), { fetchHotDogListRequest })(HotDogList);