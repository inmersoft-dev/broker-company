// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Footer = () => {
  const { languageState } = useLanguage();

  return (
    <div class="uk-grid-divider uk-child-width-expand@s" uk-grid>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div>
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </div>
      <div>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </div>
    </div>
  );
};

export default Footer;
