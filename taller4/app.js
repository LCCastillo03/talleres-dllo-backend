const { app, port } = require("./server");
const routes = require("./routes");

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de usuarios 🎉");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
