const submit = document.getElementById("submit");
const inputTag = document.getElementsByTagName("input");

// submit.disabled = true;
function submitdisabled(x) {
  submit.disabled = x;
}

inputTag[0].onchange = () => {
  switch (true) {
    case inputTag[0].value === inputTag[0].value.toUpperCase():
      submitdisabled(true);
      break;

    case inputTag[0].value === inputTag[0].value.toLowerCase():
      submitdisabled(true);
      break;

    default:
      submitdisabled(false);
      break;
  }
};

inputTag[1].onchange = () => {
  const compare = inputTag[1].value === inputTag[2].value;
  if (compare === true) {
    submitdisabled(false);
  } else{
    submitdisabled(true);
  }
};
