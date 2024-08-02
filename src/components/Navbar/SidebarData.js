import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Categories',
    path: '/Categories/',
    icon: <MdIcons.MdShoppingBasket />,
    cName: 'nav-text',
  },
  {
    title: 'Add Recipe',
    path: '/NewMealForm/',
    icon: <FaIcons.FaEdit />,
    cName: 'nav-text',
  },
  {
    title: 'Bookmarks',
    path: '/Bookmarks/',
    icon: <FaIcons.FaBookmark />,
    cName: 'nav-text',
  },
];

export default SidebarData;
