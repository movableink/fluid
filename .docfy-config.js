const addClasses = require('rehype-add-classes');
const highlight = require('rehype-highlight');

module.exports = {
  repository: {
    url: 'https://github.com/movableink/fluid',
    editBranch: 'master',
  },
  remarkPlugins: [],
  rehypePlugins: [
    [highlight],
    [
      addClasses,
      {
        a: 'text-blue-400 hover:text-blue-600',
        p: 'body-base my-4',
        'h1,h2,h3,h4,h5,h6': 'font-bold mb-4',
        h1: 'heading-2xl',
        h2: 'heading-xl',
        h3: 'heading-lg',
        h4: 'heading-md',
        h5: 'heading-sm',
        h6: 'heading-xs',
        blockquote:
          'bg-neutral-200 border-l-8 border-neutral-500 px-4 py-2 text-neutral-700 italic',
        'ol,ul': 'pl-10',
        ul: 'list-disc',
        ol: 'list-decimal',
        pre: 'border border-neutral-500 border-l-8 bg-neutral-200 px-4 py-2',
        table: 'mb-4',
        'th,td': 'border-b border-neutral-400 text-black p-3',
        th: 'bg-neutral-300 font-bold',
      },
    ],
  ],
};
