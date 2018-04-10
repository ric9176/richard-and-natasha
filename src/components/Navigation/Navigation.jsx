import React, { Component } from 'react';
import Link from 'gatsby-link';
import Headroom from 'react-headroom';
import { FaInstagram, FaBehance, FaDribbble } from 'react-icons/lib/fa';
import { slide as Menu } from 'react-burger-menu';
import { Fade } from 'react-reveal';
import config from '../../../config/SiteConfig';
import styles from './Navigation.module.scss';
import './Headroom.scss';
import SignOutButton from '../../signup/SignOutButton'

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <header>
        <Headroom calcHeightOnResize disableInlineStyles>
          <Fade down duration={2000} className={styles.wrapper}>
            <nav className={styles.navigation}>
              <span>
                <Link to="/richard-and-natasha" activeClassName="active">
                  About
                </Link>
                <Link to="/rsvp" activeClassName="active">
                  RSVP
                </Link>
                <Link to="/the-big-day" activeClassName="active">
                  Schedule
                </Link>
                <Link to="/honeymoon-sal-cape-verde" activeClassName="active">
                  Registry
                </Link>
                <Link to="/fa-qs" activeClassName="active">
                  FAQs
                </Link>
                <Link to="/contact" activeClassName="active">
                  Contact
                </Link>
              </span>
            </nav>
            <div className={styles.name}>
              <span>
                <Link to="/">
                  <h3>{config.siteTitle}</h3>
                </Link>
              </span>
            </div>
            <SignOutButton />
            <div className={styles.socialMedia}>
              <span>
                <a
                  href="https://www.instagram.com/tashandrich"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </span>
            </div>
          </Fade>
        </Headroom>
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavName}>
            <h3>{config.siteTitle}</h3>
          </div>
          <div className={styles.menu}>
            <Menu
              isOpen={this.state.menuOpen}
              onStateChange={this.handleStateChange}
              width="100%"
            >
              <Link to="/" onClick={() => this.closeMenu()}>
                <h1>{config.siteTitle}</h1>
              </Link>
              <Link
                to="/richard-and-natasha"
                activeClassName="active"
                onClick={() => this.closeMenu()}
              >
                About
              </Link>
              <Link to="/rsvp" activeClassName="active" onClick={() => this.closeMenu()}>
                RSVP
              </Link>
              <Link
                to="/the-big-day"
                activeClassName="active"
                onClick={() => this.closeMenu()}
              >
                Schedule
              </Link>
              <Link to="/honeymoon-sal-cape-verde" activeClassName="active" onClick={() => this.closeMenu()}>
                Registry
              </Link>
              <Link to="/fa-qs" activeClassName="active" onClick={() => this.closeMenu()}>
                FAQs
              </Link>
              <Link to="/contact" activeClassName="active" onClick={() => this.closeMenu()}>
                Contact
              </Link>
              <div className={styles.mobileNavSocialMedia}>
                <a
                  href="https://www.instagram.com/tashandrich"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </div>
            </Menu>
          </div>
        </div>
      </header>
    );
  }
}
