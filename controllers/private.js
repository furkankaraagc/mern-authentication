exports.getPrivateData = (req, res) => {
  res.status(200).json({
    sucess: true,
    data: "You have access the private page",
  });
};
