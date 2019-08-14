import React, { Component } from 'react';
import Rodal from 'rodal';
import PropTypes from 'prop-types';
import  { saveImage , addNewHotDog, editHotDogById } from '../../api/index';
import 'rodal/lib/rodal.css';
import './style.css';

const initialState = {
  visible: false,
  message: '',
  status: false,
  change: {
    isEdit: false,
    edited: false,
  },
  id: '',
  name: '',
  price: 0,
  img: '/img/no-photo.png',
};


class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  componentWillReceiveProps(nextProps){
    const { id, name, price, img } = nextProps;
    if(id && name && price && img){
      this.setState({
        ...this.state,
        id,
        name,
        price,
        img
      });
    }
  }


  changeInput = (e) => this.setState({[e.target.name]:e.target.value});


  changeInputImage = async (e) => {
    const img = e.target.files[0];
    let result = await saveImage({ img });
    this.setState({...this.state, img: `/img/hotDogIcon/${result}`});
  }


  handleSave = async (e) => {
    const { id, name,  img } = this.state;
    const price = +this.state.price;
    if(name && price){
        e.preventDefault();
        const { status, message } = ( id ) ? await editHotDogById({ id, name, price, img }) : await addNewHotDog({ name, price, img });
        this.setState({ visible: true, message, status });
    }
  }


  closeModalMessage = () => {
    const { status } = this.state;
    const { close } = this.props;
    if (!status) {
      this.setState({
        visible: false, 
        message: '', 
        status: false,
      });
    } else {
      if(close) { close() } 
      this.setState(initialState);
    }

  };
    

  render(){
    const { name, price, img, visible, message } = this.state;
    return (
      <>
        <form className = 'add-modal'>
            <div className = 'add-modal-block'>
              <label className = 'add-modal-label'> Name * </label>
              <input className = 'add-modal-inpt' onChange = { this.changeInput } name = "name" type = "text"  value = { name } required/>
            </div>

            <div className = 'add-modal-block'>
              <label className = 'add-modal-label'>Price *</label>
              <input className = 'add-modal-inpt' onChange = { this.changeInput } name = "price" type = "number" value = { price } required/>
            </div>

            <div className = 'add-modal-block'>
              <img src = { img } alt = 'Load img'/>
              <input className = 'add-modal-inpt-img' onChange = { this.changeInputImage } name = "img" type = "file" accept = "image/*" />
            </div>
            <button className = 'modal-btn' onClick = { this.handleSave }>Save</button>
        </form>
        
        <Rodal visible = { visible } animation = { 'rotate' } onClose = { this.closeModalMessage }>
            <div className = 'modal-message'> { message } </div>
        </Rodal>
      </>
    )
  }
}


Modal.propTypes = {
  close: PropTypes.func,
}


export default Modal;
