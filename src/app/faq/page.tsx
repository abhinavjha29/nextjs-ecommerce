import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Next.js?",
    answer:
      "Next.js is a React framework for production that makes it easy to build server-rendered and statically generated web applications.",
  },
  {
    question: "How do I install Next.js?",
    answer:
      "You can install Next.js using npm or yarn. Run `npm install next react react-dom` or `yarn add next react react-dom`.",
  },
  {
    question: "What is TypeScript?",
    answer:
      "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing to the language.",
  },
  {
    question: "How do I add TypeScript to a Next.js project?",
    answer:
      "You can add TypeScript to a Next.js project by installing the necessary packages (`typescript`, `@types/react`, `@types/node`) and creating a `tsconfig.json` file.",
  },
  {
    question: "What is server-side rendering (SSR)?",
    answer:
      "Server-side rendering (SSR) is the process of rendering a web page on the server instead of in the browser. Next.js supports SSR out of the box.",
  },
  {
    question: "What is static site generation (SSG)?",
    answer:
      "Static site generation (SSG) is the process of generating HTML pages at build time. Next.js supports SSG with `getStaticProps` and `getStaticPaths`.",
  },
  {
    question: "How do I create dynamic routes in Next.js?",
    answer:
      "You can create dynamic routes in Next.js by using square brackets in the file name, like `[id].tsx`. You can then fetch data based on the dynamic parameter.",
  },
  {
    question: "What is API routing in Next.js?",
    answer:
      "API routing in Next.js allows you to create API endpoints inside the `pages/api` directory. Each file in this directory is mapped to an API endpoint.",
  },
  {
    question: "How do I use CSS in Next.js?",
    answer:
      "Next.js supports CSS modules and global CSS. You can import CSS files in your components or pages, and Next.js will handle the rest.",
  },
  {
    question: "What is incremental static regeneration (ISR)?",
    answer:
      "Incremental static regeneration (ISR) allows you to update static content after you’ve built your site. With ISR, you can retain the benefits of static while scaling to millions of pages.",
  },
];

const Page: React.FC = () => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Frequently Asked Questions</h1>
      <div className="accordion" id="faqAccordion">
        {faqData.map((item, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`heading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${index}`}
                aria-expanded="false"
                aria-controls={`collapse${index}`}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`collapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
