import React from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css';

const MarkdownText = ({ children }) => (
    <Markdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
        {children}
    </Markdown>
);

export default MarkdownText;