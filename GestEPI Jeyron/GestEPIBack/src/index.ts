//********** Imports **********//
import app from "./app";

import db from "./config/db";
import epis from "./pages/epi";
app.use("/epis", epis);

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion à la base de données :", err.message);
  } else {
    console.log("✅ Connecté à la base de données MySQL !");
  }
});


const port = process.env.PORT || 5500;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
