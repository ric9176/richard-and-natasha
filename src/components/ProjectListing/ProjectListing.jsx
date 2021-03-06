import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import Palette from 'react-palette';
import styles from './ProjectListing.module.scss';

const ProjectListing = (props) => {

    const list = props.projectEdges.map(projectEdge => (
      {
        path: projectEdge.node.fields.slug,
        cover: projectEdge.node.frontmatter.cover.childImageSharp.sizes,
        client: projectEdge.node.frontmatter.client,
        subtitle: projectEdge.node.frontmatter.subtitle,
        imageURL: projectEdge.node.frontmatter.cover.childImageSharp.sizes.src
      }
    ))

    return (
      <div className={styles.base}>
        {list.map(project => (
          <div key={project.path} className={styles.wrapper}>
            <div className={styles.content}>
              <div className={styles.image}>
                <Img sizes={project.cover} />
              </div>
              <Link
                to={project.path}
                key={project.path}
                className={styles.link}
              >
                <Palette image={project.imageURL}>
                  {palette => (
                    <div
                      className={styles.overlay}
                      style={{ backgroundColor: palette.vibrant }}
                    />
					)}
                </Palette>
                <h2 className={styles.client} key={project.client}>
                  {project.client}
                </h2>
                <div className={styles.subtitle} key={project.subtitle}>
                  {project.subtitle}
                </div>
              </Link>
            </div>
          </div>
		))}
      </div>
    )
  }

export default ProjectListing
