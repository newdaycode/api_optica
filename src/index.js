import app from "./app"
import './database/database'

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {{}
  console.log("Servidor iniciado y en espera en puerto " + PORT);
});
