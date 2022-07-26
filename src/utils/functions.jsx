/**
 * Scroll to a target position, default the top of the page.
 * @param {number} [target=0] - The target position to scroll to. If a string is passed it looks for respective element with target id
 */
export const scrollTo = (target = 0) => {
  let localTarget = 0;
  if (typeof target === "string") {
    const element = document.getElementById(target);
    if (element !== null) localTarget = element.offsetTop;
  }
  window.scroll({
    top: target > 55 ? target - 55 : localTarget,
    left: 0,
    behavior: "smooth",
  });
};
