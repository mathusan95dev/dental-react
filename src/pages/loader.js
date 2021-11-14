import Loader from 'react-loader-spinner';
import React from 'react';
import { connect } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function Loaders(props) {
  return (
    <>
      {console.log(props, 'propsprops')}
      {props.loadingStatus && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: '10000'
          }}
        >
          <Loader type="Triangle" color="#00BFFF" height={100} width={100} timeout={30000} />
        </div>
      )}
    </>
  );
}

const mapStateToProps = ({ commonReducer }) => {
  const { loadingStatus } = commonReducer;
  return {
    loadingStatus
  };
};

export default connect(mapStateToProps, null)(Loaders);
