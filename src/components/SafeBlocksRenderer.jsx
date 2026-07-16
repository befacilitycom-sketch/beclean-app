import React from 'react';

/**
 * SafeBlocksRenderer - Renders Payload CMS lexical rich text content.
 * Supports both structured arrays (Payload lexical JSON) and plain strings.
 * Replaces the old @strapi/blocks-react-renderer dependency.
 */
export default function SafeBlocksRenderer({ content }) {
  if (!content) return null;

  // 1. If it's a Payload lexical AST array, render each node
  if (Array.isArray(content)) {
    try {
      return (
        <div className="rich-text-content">
          {content.map((node, i) => renderNode(node, i))}
        </div>
      );
    } catch (err) {
      console.error('[SafeBlocksRenderer] Failed rendering content:', err);
      return <p style={{ whiteSpace: 'pre-line', color: 'var(--color-text-muted)' }}>[Erreur de rendu]</p>;
    }
  }

  // 2. If it's a plain string, render as text
  if (typeof content === 'string') {
    const cleanText = content.replace(/<[^>]*>/g, '');
    return <p style={{ whiteSpace: 'pre-line' }}>{cleanText}</p>;
  }

  return null;
}

function renderNode(node, key) {
  if (!node) return null;

  switch (node.type) {
    case 'h1': return <h1 key={key} style={{ fontSize: '2rem', fontWeight: '700', margin: '1.5rem 0 1rem', color: '#fff' }}>{renderChildren(node.children)}</h1>;
    case 'h2': return <h2 key={key} style={{ fontSize: '1.5rem', fontWeight: '700', margin: '1.5rem 0 0.8rem', color: '#fff' }}>{renderChildren(node.children)}</h2>;
    case 'h3': return <h3 key={key} style={{ fontSize: '1.2rem', fontWeight: '700', margin: '1.2rem 0 0.6rem', color: 'var(--accent-cyan)' }}>{renderChildren(node.children)}</h3>;
    case 'paragraph': return <p key={key} style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{renderChildren(node.children)}</p>;
    case 'ul': return <ul key={key} style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>{node.children?.map((li, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{renderChildren(li.children)}</li>)}</ul>;
    case 'ol': return <ol key={key} style={{ listStyle: 'decimal', paddingLeft: '1.5rem', marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>{node.children?.map((li, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{renderChildren(li.children)}</li>)}</ol>;
    case 'blockquote': return <blockquote key={key} style={{ borderLeft: '3px solid var(--accent-cyan)', paddingLeft: '1rem', margin: '1.5rem 0', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>{renderChildren(node.children)}</blockquote>;
    default:
      // Leaf text nodes
      if (node.text !== undefined) return renderLeaf(node, key);
      // Unknown node with children — recurse
      if (node.children) return <span key={key}>{renderChildren(node.children)}</span>;
      return null;
  }
}

function renderChildren(children) {
  if (!children) return null;
  return children.map((child, i) => renderNode(child, i));
}

function renderLeaf(node, key) {
  let text = node.text || '';
  if (node.bold) text = <strong key={key}>{text}</strong>;
  else if (node.italic) text = <em key={key}>{text}</em>;
  else if (node.underline) text = <u key={key}>{text}</u>;
  else if (node.strikethrough) text = <s key={key}>{text}</s>;
  else if (node.code) text = <code key={key} style={{ background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.4rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.9em' }}>{text}</code>;
  else text = <span key={key}>{text}</span>;
  return text;
}
