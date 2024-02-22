import { poolConection } from "../connection/db.js";

export const storeHomeAll = async (req, res) => {
  try {
    // throw new Error("Erro");
    const [respon] = await poolConection.query("SELECT * FROM products");
    res.json(respon);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener datos de la base de datos" });
  }
};

export const createStore = async (req, res) => {
  const {
    nombre,
    descripcion,
    marca,
    precio,
    promociones,
    talla,
    color,
    imagen,
    categoria,
  } = req.body;
  try {
    const [rows] = await poolConection.query(
      "INSERT INTO products (nombre, descripcion, marca, precio, promociones, talla, color, imagen, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        descripcion,
        marca,
        precio,
        promociones,
        talla,
        color,
        imagen,
        categoria,
      ]
    );
    res.send({
      id: rows.insertId,
      nombre,
      descripcion,
      marca,
      precio,
      promociones,
      talla,
      color,
      imagen,
      categoria,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener datos de la base de datos" });
  }
};

export const getStorePorId = async (req, res) => {
  try {
    //TODO: EL PARAMS AYUDA A OBTENER EL OBJETO QUE SE BUSCA
    // console.log(req.params.id);

    //? AQUI LA CONSULTA PUDE CAMBIAR SEGUN LO QUE SE REQUIERA, EN MI CASO PUSE POR NOMBRE Y FUNCIONA BIEN

    const [rows] = await poolConection.query(
      "SELECT * FROM products WHERE id = ?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({ message: "No se encontro resultado" });

    //TODO: SE PUEDE PONER 0 PARA QUE SOLO ARROJE UN SOLO RESULTADO PERO SI QUIERES TODOS LOS DATOS SOLO DEJALO CON ROWS

    // res.json(rows[0]);
    res.json(rows);
    // console.log(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener datos de la base de datos" });
  }
};

export const deleteStore = async (req, res) => {
  try {
    const [resultado] = await poolConection.query(
      "DELETE FROM products WHERE id = ?",
      [req.params.id]
    );

    //TODO: ACA SE APLICA LA MISMA LOGICA DE IF DONDE SI EL EFFECTEDROWS QUE SON LAS COLUMAS DE LOS DATOS SON IGALES A 0 SE ENVIA EL MENSAJE.

    if (resultado.affectedRows <= 0)
      return res.status(404).json({ message: "Objeto no fue encontrado" });

    // console.log(resultado);

    //TODO: PODEMOS REVOLVER UN MENSAJE VACIO CUANDO SEA 204 PERO TAMBIEN SE PUEDE ENVIAR UN MENSAJE DE QUE FUE ELIMINADO CON EXITO
    // res.sendStatus(204);
    res.json({ message: "El objeto fue eliminado" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener datos de la base de datos" });
  }
};

export const updataStore = async (req, res) => {
  //TODO: SE PUEDE USAR LAS 2 MANERAS PARA RECOPILAR EL ID
  const { id } = req.params;
  // const id = req.params.id;
  const {
    nombre,
    descripcion,
    marca,
    precio,
    promociones,
    talla,
    color,
    imagen,
    categoria,
  } = req.body;
  try {
    const [resul] = await poolConection.query(
      "UPDATE products SET nombre = IFNULL(?,nombre), descripcion = IFNULL(?,descripcion), marca = IFNULL(?,marca), precio = IFNULL(?,precio),promociones = IFNULL(?,promociones), talla = IFNULL(?,talla), color = IFNULL(?,color), imagen = IFNULL(?,imagen), categoria = IFNULL(?,categoria) WHERE id = ?",
      [
        nombre,
        descripcion,
        marca,
        precio,
        promociones,
        talla,
        color,
        imagen,
        categoria,
        id,
      ]
    );

    if (resul.affectedRows === 0)
      return res.status(404).json({ message: "El id no existe" });

    const [updateDate] = await poolConection.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    // console.log(resul);
    res.json(updateDate[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener datos de la base de datos" });
  }
};
