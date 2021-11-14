import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Authorization = ({ component: Component, ...rest }) => {
  console.log(rest, 'prosssssss');

  return <>{rest.adminLoginstatus && <Component {...rest} />}</>;
};

// function for mapping redux state values with props //
const mapStateToProps = (state) => {
  const { adminLoginstatus } = state.adminReducer;

  return {
    adminLoginstatus
  };
};

export default connect(mapStateToProps, null)(Authorization);
