// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

const request = require("request");

export default (req, res) => {
  // path to file
  const filePath = req.query.filename;
  console.log("filePath: ", filePath);

  // filename only
  const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

  // set header
  res.setHeader("content-disposition", "attachment; filename=" + fileName);

  const url = "https://cdn2.thecatapi.com/images/"
  // send request to the original file
  request
    .get(url + filePath) // download original image
    .on("error", function (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>404 not found</h1>");
      res.end();
      return;
    })
    .pipe(res); // pipe converted image to HTTP response
};