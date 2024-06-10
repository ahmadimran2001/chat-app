// ahmedimran15122001      xGk6VsRAmnmQJtXi
export const login = async (req, res) => {
  try {
    const { fullName, username, password, confirmPasword, gender } = req.body;
  } catch (err) {}
};

export const logout = (req, res) => {
  res.send("logout user");
  console.log("Logout User");
};

export const signup = (req, res) => {
  res.send("signup user");
  console.log("signup User");
};
