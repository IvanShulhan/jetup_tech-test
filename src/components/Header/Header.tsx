import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

type Props = {
  title: string;
  content?: string;
};

export const Header: React.FC<Props> = ({title, content}) => (
  <div className="header">
    <h2 className="header__title">
      {title}
    </h2>
    {
      !content 
        ? <Link to='/' className="header__home-button"/> 
        : <span className="header__content">{content}</span>
      }
  </div>
)