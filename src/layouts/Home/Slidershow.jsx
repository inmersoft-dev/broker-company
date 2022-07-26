/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";

const Slideshow = () => {
  const { languageState } = useLanguage();

  return (
    <div uk-slideshow="animation: push">
      <div
        class="uk-position-relative uk-visible-toggle uk-light"
        tabindex="-1"
      >
        <ul class="uk-slideshow-items">
          <li>
            <img src="images/photo.jpg" alt="" uk-cover />
          </li>
          <li>
            <img src="images/dark.jpg" alt="" uk-cover />
          </li>
          <li>
            <img src="images/light.jpg" alt="" uk-cover />
          </li>
        </ul>

        <a
          class="uk-position-center-left uk-position-small"
          href="#"
          data-uk-slidenav-previous
          data-uk-slideshow-item="previous"
        ></a>
        <a
          class="uk-position-center-right uk-position-small"
          href="#"
          data-uk-slidenav-next
          data-uk-slideshow-item="next"
        ></a>
      </div>

      <ul class="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>
    </div>
  );
};

export default Slideshow;
