import React, { Component } from 'react';
import Rodal from 'rodal';
import { Select } from 'antd';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { fetchHotDogListRequest, changeSortType, changeInputValue } from '../../modules/actions';
import 'rodal/lib/rodal.css';
import './antd-select.css';
import './style.css';


const { Option } = Select;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      typeSort: 'expensive',
      inputValue:'',
    };
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.toggleIconClear(false);
    this.setState({ [name]: value.toUpperCase() });
  };

  toggleIconClear = (off) => {
    const elClassList = document.getElementsByClassName('clear')[0].classList;
    (off) ? elClassList.add('hide') : elClassList.remove('hide');
  };  

  handleSearchInputValue = async () => {
    const { changeInputValue } = this.props;
    const { inputValue } = this.state;
    await changeInputValue( inputValue );
  }

  handleClearInputValue = async () => {
    const { changeInputValue } = this.props;
    this.setState({ inputValue: ''});
    await changeInputValue( '' );
    this.toggleIconClear( true );
  }

  handleOpenModal = () => this.setState({ visible: true });


  handleChangeSortType = async ( typeSort ) => {
    const { fetchHotDogListRequest, changeSortType } = this.props;
    this.setState({ typeSort });
    await changeSortType( typeSort );
    await fetchHotDogListRequest({ typeSort });
  }

  closeModal = () => {
    const { fetchHotDogListRequest } = this.props;
    const { typeSort } = this.state;
    fetchHotDogListRequest({ typeSort });
    this.setState({ visible: false });
  };


  render() {
    const { visible, inputValue } = this.state;
    const w = window.innerWidth / 1.5;
    const h = window.innerHeight / 1.5; // width and height for modal window
    return (
      <>
        <header >
            <button className = 'header-btn' onClick = {this.handleOpenModal} > Add </button>

            <div className = 'search-block'>
                <i className="clear fas fa-times hide" onClick = { this.handleClearInputValue } ></i>
                <input 
                  className = 'header-inp' 
                  type = 'text' 
                  name = 'inputValue' 
                  value = { inputValue } 
                  placeholder = 'name...' 
                  onChange = { this.handleChangeInput } 
                  />
                <button className = 'header-btn' onClick={ this.handleSearchInputValue } > search </button>
            </div>

            <div className = 'sort-block'>
              <span className = 'sort-block-text'> Sort by </span>
              <Select
                  optionFilterProp = "children"
                  className = 'sort-select-block'
                  defaultValue = 'Price (expensive first)'
                  onChange = { this.handleChangeSortType }
                  >
                  <Option key = 'expensive' value = 'expensive'> Price (expensive first) </Option>
                  <Option key = 'cheaper' value = 'cheaper'> Price (cheaper first) </Option>
              </Select>
            </div>

        </header>
        <Rodal visible = { visible } onClose = { this.closeModal } animation = { 'slideDown' } duration = { 400 } width = { w } height = { h }>
            <Modal />
        </Rodal>
      </>
    );
  }
}


export default connect(null, { fetchHotDogListRequest, changeSortType , changeInputValue })(Header);
