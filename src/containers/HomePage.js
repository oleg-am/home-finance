import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CurrencyForm from 'components/CurrencyForm';
import CurrencyLine from 'components/CurrencyLine';
import { load, add, remove } from 'redux/modules/currencies';

class HomePage extends Component {
  componentWillMount() {
    const { currencies, dispatch } = this.props;
    if (!currencies.loading && !currencies.data) {
      dispatch(load());
    }
  }

  addCurrency = ({ code }) => {
    const { currencies, dispatch } = this.props;
    const prymary = !currencies.data || Object.keys(currencies.data).length === 0;
    dispatch(add({ code, prymary }));
  }

  removeCurrency = ({ currencyId }) => {
    const { dispatch } = this.props;
    dispatch(remove({ currencyId }));
  }

  render() {
    const { user, currencies } = this.props;
    return (
      <div>
        Hello, {user.email} !
        {currencies.data && Object.values(currencies.data).map(currency =>
          <CurrencyLine key={currency.id} currency={currency} onRemove={this.removeCurrency} />
        )}
        <CurrencyForm onSubmit={this.addCurrency} />
      </div>
    );
  }
}

HomePage.propTypes = {
  currencies: PropTypes.object,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    user: state.auth.user,
    currencies: state.currencies,
  })
)(HomePage);
