import React from 'react';
import Helmet from 'react-helmet';
import { Fade } from 'react-reveal';
import Palette from 'react-palette';
import format from 'date-fns/format';
import config from '../../config/SiteConfig';
import SEO from '../components/SEO/SEO';
import Footer from '../components/Footer/Footer';
import Container from '../components/Container/Container';
import styles from './project.module.scss';

const Project = (props) => {
  console.log('props', props)
  console.log(props.pathContext)
  const { slug } = props.pathContext;
  let content
  if (!props.data) {
    content = <p>...loading</p>
  } else {
    const postNode = props.data.markdownRemark;
    const project = postNode.frontmatter;
    const date = format(project.date, config.dateFormat);
    // const imageURL = project.cover.childImageSharp.resize.src;
    if (!project.id) {
      project.id = slug;
    }
    content = (
      <div className="container project-container">
        <Helmet title={`${project.title} | ${config.siteTitle}`} />
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className={styles.headerWrapper}>
          <Palette>
            {palette => (
              <section
                className={styles.header}
                style={{ backgroundColor: palette.vibrant }}
              >
                <div className={styles.title}>
                  <Fade down duration={1250} tag="h1">
                    {project.title}
                  </Fade>
                </div>
                <div className={styles.information}>
                  <div className={styles.infoBlock}>
                    <Fade up duration={1250} className={styles.top}>
                      {config.client}
                    </Fade>
                    <Fade
                      up
                      duration={1250}
                      delay={500}
                      className={styles.bottom}
                    >
                      {project.client}
                    </Fade>
                  </div>
                  <div className={styles.infoBlock}>
                    <Fade up duration={1250} className={styles.top}>
                      {config.date}
                    </Fade>
                    <Fade
                      up
                      duration={1250}
                      delay={500}
                      className={styles.bottom}
                    >
                      {date}
                    </Fade>
                  </div>
                  <div className={styles.infoBlock}>
                    <Fade up duration={1250} className={styles.top}>
                      {config.service}
                    </Fade>
                    <Fade
                      up
                      duration={1250}
                      delay={500}
                      className={styles.bottom}
                    >
                      {project.service}
                    </Fade>
                  </div>
                </div>
              </section>
  						)}
          </Palette>
        </div>
        <Container>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: postNode.html }}
          />
        </Container>
        <Footer />
      </div>
    )
  }

  return content
};

export default Project;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query ProjectPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    html
    frontmatter {
      title
      date
      client
      service
    }
  }
}
`
