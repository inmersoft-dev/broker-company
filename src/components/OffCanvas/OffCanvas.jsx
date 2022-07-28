// sito components
import SitoContainer from "sito-container";

// contexts
import { useLanguage } from "../../contexts/LanguageProvider";
import { useRoute } from "../../contexts/RouteProvider";

// utils
import { scrollTo } from "../../utils/functions";

const OffCanvas = () => {
  const { languageState } = useLanguage();
  const { routeState, setRouteState } = useRoute();
  const { active } = routeState;

  const linkTo = (e) => {
    const { id } = e.target;
    setRouteState(id);
    scrollTo(`section-${id}`);
    if (id !== "login") e.preventDefault();
  };

  return (
    <div id="offcanvas-push" data-uk-offcanvas="mode: push; overlay: true">
      <SitoContainer flexDirection="column" className="uk-offcanvas-bar">
        <button
          className="uk-offcanvas-close"
          type="button"
          data-uk-close
        ></button>

        <h3>{languageState.texts.CompanyName}</h3>
        <ul className={`uk-nav uk-nav-primary uk-nav-left`}>
          {languageState.texts.Navbar.Links.map((item) => (
            <li
              key={item.label}
              className={item.id === active ? "uk-active" : ""}
            >
              <a onClick={linkTo} href={item.to} id={item.id}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </SitoContainer>
    </div>
  );
};

export default OffCanvas;
