import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet';
import { BLOG_TITLE } from '@/constants';
import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
import CircularColorsDemo from '@/components/CircularColorsDemo';

export async function generateMetadata({params}) {
  const { postSlug } = await params;
  const post = await loadBlogPost(postSlug);
  return {
    title: `${post.frontmatter.title} . ${BLOG_TITLE}`,
    description: post.frontmatter.abstract
  }
}

async function BlogPost({params}) {
  const { postSlug } = await params;
  const post = await loadBlogPost(postSlug);
  const frontmatter  = post.frontmatter

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
          <MDXRemote source={post.content} components={{pre: CodeSnippet, DivisionGroupsDemo, CircularColorsDemo}}/>
      </div>
    </article>
  );
}

export default BlogPost;
