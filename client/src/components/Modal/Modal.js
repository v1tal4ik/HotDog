import React, { Component } from 'react';
import Rodal from 'rodal';
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
  price: '',
  img: '/img/no-photo.png'
};

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  static getDerivedStateFromProps(props,state) {
    const { willEdit, id, name, price, img } = props;
    const { isEdit, edited } = state.change;


    if( willEdit && !isEdit && !edited ){
      return { 
        ...state,
        id,
        name,
        price,
        img,
        change: {
          isEdit: true,
          edited: false
        }
      }
    };


    if( isEdit ){
      return state;
    };


    return {
      ...state,
      change: {
        isEdit: false,
        edited: false,
      }, 
    };
  }


  changeInput = (e) => this.setState({[e.target.name]:e.target.value});


  changeInputImage = async (e) => {
    const img = e.target.files[0];
    let result = await saveImage({ img });
    this.setState({...this.state, img: `/img/hotDogIcon/${result}`});
  }


  handleSave = async (e) => {
    const { id, name, price, img } = this.state;

    if(name && price){
        e.preventDefault();
        const { status, message } = ( id ) ? await editHotDogById({ id, name, price, img }) : await addNewHotDog({ name, price, img });
        this.setState({ visible: true, message, status });
    }
  }


  closeModalMessage = () => {
    const { status } = this.state;
    const { close } = this.props;
    if (status) {
      this.setState({
        ...initialState, change: { isEdit: false, edited: true },
      });
      if( close ){ close() };
    } else {
      this.setState({
        ...this.state, visible: false, message: '', status: false,
      });
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

export default Modal;
