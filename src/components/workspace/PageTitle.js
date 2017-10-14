import React from 'react';
import { connect } from 'react-redux';

const PageTitle = ({ pageTitle }) => {
  const title = pageTitle.subTitle ? `${pageTitle.title} | ${pageTitle.subTitle}` : pageTitle.title;
  return <span>{title}</span>
};

const mapStateToProps = state => (
  {
    pageTitle: state.workspaceReducers.pageTitle,
  }
);

const PageTitleWrapper = connect(
  mapStateToProps,
  null,
)(PageTitle);


export default PageTitleWrapper;
