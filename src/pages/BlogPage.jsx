import { useParams } from 'react-router-dom';
import { notesBySlug } from '../content/blog/index.js';
import BlogNote from './BlogNote.jsx';
import NotFound from './NotFound.jsx';

export default function BlogPage() {
  const { slug } = useParams();
  const note = notesBySlug[slug];
  if (!note) return <NotFound />;
  return <BlogNote note={note} />;
}
