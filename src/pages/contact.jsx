import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

import Header from '../components/Header/Header';
import Container from '../components/Container/Container';
import Footer from '../components/Footer/Footer';
import config from '../../config/SiteConfig';

const Contact = () => (
  <div className="container contact-container">
    <Helmet title={`Contact | ${config.siteTitle}`} />
    <Header>Contact</Header>
    <Container text>

      <p>
      If you have a question that isn’t answered on our extensive <Link to="/fa-qs" activeClassName="active">FAQs</Link>, please email or message either of us on Facebook, Whatsapp or via email at richardynatasha@gmail.com. But first, please read through this entire page since we have tried really hard to answer most questions we could think of in relation to the wedding and travel to Portugal.

During the week of the wedding, we will likely be hard to reach, so if you have any urgent questions, please contact Meda Sandu (+44 7580 093993) and Jonathan Moss (+44 7912 861335) via phone or Whatsapp. They are lovely and will be happy to help.

      </p>
    </Container>
    <Footer />
  </div>
);

export default Contact;
