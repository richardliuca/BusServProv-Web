import { AppConfig } from '../utils/AppConfig';

const FooterCopyright = () => (
  <div>
    © {new Date().getFullYear()} {AppConfig.title}
  </div>
);

export { FooterCopyright };
