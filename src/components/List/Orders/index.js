import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import OrderCreationForm from '../OrderCreationForm';
import Order from '../Order';

// np__added_start unit: list, comp: Orders, loc: styling

const OrdersStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// np__added_end unit: list, comp: Orders, loc: styling

class Orders extends Component {
  state = {
    selectedOrderId: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = e => {
    const node = this.wrapperRef.current;

    if (
      node &&
      node !== e.target &&
      !node.contains(e.target)
    ) {
      this.setState({ selectedOrderId: null });
    }
  }

  handleSelect = id => this.setState({ selectedOrderId: id });

  render () {
    const { itemId, orders, refetchQueries, onUpdate } = this.props;
    const { selectedOrderId } = this.state;

    {/* np__added_start unit: list, comp: Orders, loc: renderBeginning */}
    {/* np__added_end unit: list, comp: Orders, loc: renderBeginning */}

    return (
      <OrdersStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <OrderCreationForm
          parentId={ itemId }
          refetchQueries={refetchQueries}
        />

        { orders.map(order => (
          <Order
            key={v4()}
            order={ order }
            selected={ order.id === selectedOrderId }
            onUpdate={onUpdate}
            parentId={ itemId }
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        )) }
  {/* np__added_start unit: list, comp: Orders, loc: renderEnding */}
  {/* np__added_end unit: list, comp: Orders, loc: renderEnding */}

  </OrdersStyleWrapper>
  )
  }
}

export default Orders;
