exports.getPrivateData = (req, res) => {
  res.status(200).json({
    sucess: true,
    data: "you have access the private data",
  });
};
