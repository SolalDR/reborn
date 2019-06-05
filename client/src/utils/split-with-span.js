export default function formatText(text) {
  const regex = /([^\x00-\x80]|\w|\.|\,|\-|\?)/g;
  return text.replace(regex, '<span class="letter">$&</span>');
};
