const Token = () => {
  const data =
    localStorage.getItem("auth") && JSON.parse(localStorage.getItem("auth"));
  return data;
};

export default Token;
