import React, { Component } from 'react';
import Rodal from 'rodal';
import { Select } from 'antd';
import { connect } from 'react-redux';
import Modal from '../Modal';
import { fetchHotDogListRequest, changeSortType } from '../../modules/actions';
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
    };
  }

  handleOpenModal = () => this.setState({ visible: true });


  handleChangeSortType = async ( typeSort ) => {
    const { fetchHotDogListRequest ,changeSortType } = this.props;
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
    const { visible } = this.state;
    const w = window.innerWidth / 1.5;
    const h = window.innerHeight / 1.5; // width and height for modal window
    return (
      <>
        <header >
            <button className = 'header-btn' onClick = {this.handleOpenModal} > Add </button>

            <div className = 'search-block'>
                <input className = 'header-inp' type = 'text' placeholder = 'name...' onChange = { this.handleChangeInput }/>
                <button className = 'header-btn' > search </button>
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


export default connect(null, { fetchHotDogListRequest, changeSortType })(Header);
