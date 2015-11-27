import { animate } from "liquid-fire";

export default function (opts={}) {
  var transition = this;
  return animate(transition.oldElement, { scale: [0.9, 1],
    opts}).then(function() {
      return animate(transition.newElement, { scale: [1, 0.9]}, opts);
    });
}
