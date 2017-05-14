import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';

import history from '../../history';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }
  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch({ redirect: `/record/${this.state.search.split('.')[0]}` });
  }

  onChange = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    return (
      <header className={`${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <Link className={`${s.title}`} to="/">
            <b>ens.trade</b>
            <div className={s.subTitle}>open source ethereum name trading via smart contracts</div>
          </Link>
          <div className="mdl-layout-spacer" />
          <div>
            <form onSubmit={this.submitForm}>
              <input type="text" placeholder="Search" value={this.state.search} onChange={this.onChange}/>
            </form>
          </div>
        </div>
      </header>
    );
  }

}

function mapStateToProps(store) {
  window.store = store;
  return {
    dispatch: store.dispatch,
  };
}

export default connect(mapStateToProps)(Header);