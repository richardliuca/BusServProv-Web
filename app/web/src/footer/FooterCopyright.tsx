import { AppConfig } from '../utils/AppConfig';

const FooterCopyright = () => (
  <div>
    © {new Date().getFullYear()} {AppConfig.title}. UI layout based on{' '}
    <a
      className="text-primary-500 hover:underline"
      href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template"
      rel="noopener noreferrer"
      target="_blank"
    >
      Next JS Landing Page Starter Template
    </a>
    .
  </div>
);

export { FooterCopyright };
