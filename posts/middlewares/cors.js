import cors from "cors";

const allowList = ["http://localhost:5173"];

let corsOptions;

//Callback Function that is used to dynamically determine the CORS options for each incoming request.

const corsOptionsDelegate = (req, callback) => {
  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: true,
      methods: ["GET", "POST"], // Establece los métodos HTTP permitidos.
      allowedHeaders: ["Content-Type", "Authorization"], // Establece las cabeceras permitidas.
      optionsSuccessStatus: 200, // Respuesta de éxito para las solicitudes de OPTIONS.
      credentials: true, // Permite el uso de cookies en las solicitudes.
    };
  } else {
    corsOptions = { origin: false }; // Rechaza la solicitud.
  }
  callback(null, corsOptions); // First argument = no error, Second argument = option selected
};

// Middleware personalizado para manejar las solicitudes OPTIONS

const handlePreflight = (req, res, next) => {
  if (req.method === "OPTIONS") {
    cors(corsOptionsDelegate)(req, res, next);
  } else {
    //Move to next middleware in the stack
    next();
  }
};

const corsMiddleware = cors(corsOptionsDelegate);

export { corsMiddleware, handlePreflight };
