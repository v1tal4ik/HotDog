import React, { Component } from 'react';
import Rodal from 'rodal';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTypeSort } from '../../modules/reducers';
import { fetchHotDogListRequest } from '../../modules/actions';
import { deleteHotDogById } from '../../api/index';
import 'rodal/lib/rodal.css';
import './style.css';



class HotDogItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      item: {}
    };
  }


  handleEdit = async ( item ) => {
    this.setState({ visible: true , item });
  }


  handleDelete = async ( id ) => {
    const answer = window.confirm('You really want delete this Hot Dog ?')
    const { fetchHotDogListRequest, typeSort } = this.props;

    if ( answer ){
      const result = await deleteHotDogById( id );
      if(result) {
        await fetchHotDogListRequest({ typeSort });
      }
    }
  }


  closeModal = () => {
    const { fetchHotDogListRequest, typeSort } = this.props;
    fetchHotDogListRequest({ typeSort });
    this.setState({ visible: false });
  }


  render() {
    // eslint-disable-next-line object-curly-newline
    const { id, name, price, img } = this.props.el;
    const { item , visible } = this.state;
    const w = window.innerWidth / 1.5;
    const h = window.innerHeight / 1.5; // width and height for modal window
    return (
      <>
        <div className = 'hot-dog-item'>
            <i className="fas fa-pencil-alt" onClick = { () => { this.handleEdit({ id, name, price, img, willEdit:true }); } } ></i>
            <i className="fas fa-times" onClick = { () => { this.handleDelete( id ) } } ></i>
            <p className = 'hot-dog-name'> {name} </p>
            <img id = 'img' className = 'hot-dog-img' src = {img} alt = {name} />
            <p id = 'price' className = 'hot-dog-price'> {price} $ </p>
        </div>
        <Rodal visible = { visible } onClose = { this.closeModal } animation = { 'slideDown' }	duration = { 400 } width = { w } height = { h }>
            <Modal { ...item } close = { this.closeModal } />
        </Rodal>
      </>
    );
  }
}

HotDogItem.propTypes = {
  typeSort: PropTypes.string.isRequired,
  fetchHotDogListRequest: PropTypes.func.isRequired,
  el: PropTypes.shape({
    id: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};


export default connect(state => ({
  typeSort: getTypeSort(state),
}), { fetchHotDogListRequest })(HotDogItem);
