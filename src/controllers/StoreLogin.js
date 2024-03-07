import { poolConection } from "../connection/db.js";

export const login = async (req, res) => {
  const { email_user, password_user } = req.body;

  try {
    const [result] = await poolConection.query(
      "SELECT * FROM users WHERE email_user = ? AND password_user = ?",
      [email_user, password_user]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Credenciales incorrectas" });
    }
    const user = result[0];

    res.json({ message: "Autenticación exitosa", user });
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
