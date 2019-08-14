import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Preloader from '../Preloader';
import HotDogItem from '../HotDogItem';
import { fetchHotDogListRequest } from '../../modules/actions';
import { getHotDogList, getLoading, getTypeSort } from '../../modules/reducers';
import './style.css';


class HotDogList extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = async () => {
      const { fetchHotDogListRequest, typeSort } = this.props;
      await fetchHotDogListRequest({ typeSort });
    };
  }


  render() {
    const { hotDogList, isLoading } = this.props;
    if (isLoading) {
      return <div className='hot-dog-list'>
                <Preloader />
             </div>;
    }

    if (hotDogList.length) {
      return <div className='hot-dog-list'>
              {
                hotDogList.map(el => (
                  <HotDogItem key = { el.id } el = { el } />
                ))
              }
            </div>;
    }
    return <div className='hot-dog-list'>
                <div className='not-found'> Not found :( </div>
            </div>;
  }
}


HotDogList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  typeSort: PropTypes.string.isRequired,
  fetchHotDogListRequest: PropTypes.func.isRequired,
  hotDogList: PropTypes.array.isRequired,
};

export default connect(state => ({
  hotDogList: getHotDogList(state),
  isLoading: getLoading(state),
  typeSort: getTypeSort(state),
}), { fetchHotDogListRequest })(HotDogList);
